const HTML = "text/html";
const MARKDOWN = "text/markdown";

function parseAccept(header) {
  if (!header || !header.trim()) return [];
  return header
    .split(",")
    .map((part, order) => {
      const [mediaRange, ...parameters] = part.trim().split(";");
      const media = mediaRange.toLowerCase();
      const [type, subtype] = media.split("/");
      if (!type || !subtype) return null;
      let quality = 1;
      for (const parameter of parameters) {
        const [name, value] = parameter.trim().split("=");
        if (name?.toLowerCase() === "q") {
          const parsed = Number(value);
          quality = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
        }
      }
      const specificity = type === "*" ? 0 : subtype === "*" ? 1 : 2;
      return { type, subtype, quality, specificity, order };
    })
    .filter(Boolean);
}

function qualityFor(media, ranges) {
  const [type, subtype] = media.split("/");
  const matches = ranges.filter(
    (range) =>
      (range.type === "*" || range.type === type) &&
      (range.subtype === "*" || range.subtype === subtype),
  );
  if (!matches.length) return { quality: 0, specificity: -1, order: Number.MAX_SAFE_INTEGER };
  matches.sort((a, b) => b.specificity - a.specificity || a.order - b.order);
  return matches[0];
}

export function chooseRepresentation(acceptHeader) {
  const ranges = parseAccept(acceptHeader);
  if (!ranges.length) return "html";
  const html = qualityFor(HTML, ranges);
  const markdown = qualityFor(MARKDOWN, ranges);
  if (html.quality <= 0 && markdown.quality <= 0) return "unsupported";
  if (html.quality !== markdown.quality) return markdown.quality > html.quality ? "markdown" : "html";
  if (html.specificity !== markdown.specificity) return markdown.specificity > html.specificity ? "markdown" : "html";
  if (html.order !== markdown.order) return markdown.order < html.order ? "markdown" : "html";
  return "html";
}

function isPagePath(pathname) {
  if (pathname === "/" || pathname.endsWith("/") || pathname.endsWith(".html")) return true;
  const finalSegment = pathname.split("/").pop() || "";
  return !finalSegment.includes(".");
}

export function markdownPath(pathname) {
  if (pathname === "/") return "/index.md";
  if (pathname.endsWith("/")) return `${pathname}index.md`;
  if (pathname.endsWith(".html")) return `${pathname.slice(0, -5)}.md`;
  return `${pathname}/index.md`;
}

function setVariantHeaders(response, contentType, link) {
  const headers = new Headers(response.headers);
  headers.set("Content-Type", `${contentType}; charset=utf-8`);
  const existingVary = (headers.get("Vary") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const requiredVary = ["Accept", "Accept-Encoding"];
  const requiredNames = new Set(requiredVary.map((value) => value.toLowerCase()));
  const additionalVary = existingVary.filter((value) => !requiredNames.has(value.toLowerCase()));
  headers.set("Vary", [...requiredVary, ...additionalVary].join(", "));
  if (link) headers.set("Link", `<${link}>; rel="alternate"; type="text/markdown"`);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function markdownNotFound(requestUrl) {
  const url = new URL(requestUrl);
  const body = `# Page not found\n\nNo TAIS Lab page exists at \`${url.pathname}\`.\n\n- [Agent guide](${url.origin}/llms.txt)\n- [XML sitemap](${url.origin}/sitemap.xml)\n- [Research](${url.origin}/research/)\n- [Publications](${url.origin}/publications/)\n- [People](${url.origin}/people/)\n- [Contact](${url.origin}/contact/)\n- [Home](${url.origin}/)\n`;
  return new Response(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}

function notAcceptable() {
  return new Response("No acceptable representation is available. Request text/html or text/markdown.\n", {
    status: 406,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}

async function fetchAsset(env, request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  const headers = new Headers(request.headers);
  headers.delete("Accept");
  return env.ASSETS.fetch(new Request(url, { method: request.method, headers }));
}

export async function handleRequest(request, env) {
  const url = new URL(request.url);

  if (url.pathname.endsWith(".md")) {
    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) return markdownNotFound(request.url);
    return setVariantHeaders(response, MARKDOWN);
  }

  if (!["GET", "HEAD"].includes(request.method)) {
    return env.ASSETS.fetch(request);
  }

  if (!isPagePath(url.pathname)) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const representation = chooseRepresentation(request.headers.get("Accept"));
    if (representation === "markdown") return markdownNotFound(request.url);

    // A missing dotted path can still be requested as either HTML or Markdown.
    // Mark the HTML 404 as negotiated so shared caches do not reuse it for a
    // later Markdown request to the same URL.
    return setVariantHeaders(response, HTML);
  }

  const representation = chooseRepresentation(request.headers.get("Accept"));
  if (representation === "unsupported") return notAcceptable();

  const alternate = markdownPath(url.pathname);
  if (representation === "markdown") {
    const response = await fetchAsset(env, request, alternate);
    if (response.status === 404) {
      const htmlResponse = await env.ASSETS.fetch(request);
      if (htmlResponse.status === 404) return markdownNotFound(request.url);
      const htmlQuality = qualityFor(HTML, parseAccept(request.headers.get("Accept"))).quality;
      if (htmlQuality <= 0) return notAcceptable();
      return setVariantHeaders(htmlResponse, HTML);
    }
    return setVariantHeaders(response, MARKDOWN);
  }

  const response = await env.ASSETS.fetch(request);
  return setVariantHeaders(response, HTML, response.ok ? alternate : undefined);
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },
};
