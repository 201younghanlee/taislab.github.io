import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { chooseRepresentation, handleRequest, markdownPath } from "./worker.mjs";

class FakeAssets {
  constructor() {
    this.files = new Map([
      ["/", ["<html><body>home</body></html>", "text/html; charset=utf-8"]],
      ["/research/", ["<html><body>research</body></html>", "text/html; charset=utf-8"]],
      ["/html-only/", ["<html><body>html only</body></html>", "text/html; charset=utf-8"]],
      ["/index.md", ["# Home\n", "text/markdown; charset=utf-8"]],
      ["/research/index.md", ["# Research\n", "text/markdown; charset=utf-8"]],
      ["/404.html", ["<html><body>Page not found</body></html>", "text/html; charset=utf-8"]],
      ["/404.md", ["# Page not found\n", "text/markdown; charset=utf-8"]],
      ["/llms.txt", ["# TAIS Lab\n", "text/plain; charset=utf-8"]],
    ]);
  }

  async fetch(request) {
    const pathname = new URL(request.url).pathname;
    if (!this.files.has(pathname)) {
      return new Response("<html><body>missing</body></html>", {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    const [body, contentType] = this.files.get(pathname);
    const vary = pathname === "/research/" ? "Origin, Accept-Encoding" : "Accept-Encoding";
    return new Response(request.method === "HEAD" ? null : body, {
      status: 200,
      headers: { "Content-Type": contentType, Vary: vary },
    });
  }
}

const env = { ASSETS: new FakeAssets() };

test("Wrangler sends every request through the negotiation Worker", () => {
  const config = JSON.parse(readFileSync(new URL("./wrangler.jsonc", import.meta.url), "utf8"));
  assert.equal(config.assets.binding, "ASSETS");
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.assets.not_found_handling, "404-page");
  assert.equal(config.assets.html_handling, "auto-trailing-slash");
});

function request(path, accept, method = "GET") {
  const headers = accept ? { Accept: accept } : {};
  return new Request(`https://www.taislab.co.kr${path}`, { method, headers });
}

test("representation parser honours quality, specificity, and safe defaults", () => {
  assert.equal(chooseRepresentation(undefined), "html");
  assert.equal(chooseRepresentation("*/*"), "html");
  assert.equal(chooseRepresentation("text/markdown, text/html;q=0.8"), "markdown");
  assert.equal(chooseRepresentation("text/*;q=0.8, text/markdown;q=0.8"), "markdown");
  assert.equal(chooseRepresentation("text/markdown;q=0, */*;q=1"), "html");
  assert.equal(chooseRepresentation("application/json"), "unsupported");
});

test("page-path mapping selects generated Markdown siblings", () => {
  assert.equal(markdownPath("/"), "/index.md");
  assert.equal(markdownPath("/research/"), "/research/index.md");
  assert.equal(markdownPath("/404.html"), "/404.md");
  assert.equal(markdownPath("/research"), "/research/index.md");
});

test("Markdown negotiation returns Markdown and cache-safe Vary", async () => {
  const response = await handleRequest(request("/research/", "text/markdown"), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
  assert.equal(await response.text(), "# Research\n");
});

test("HTML negotiation preserves HTML and advertises its alternate", async () => {
  const response = await handleRequest(request("/research/", "text/html"), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding, Origin");
  assert.equal(response.headers.get("link"), '</research/index.md>; rel="alternate"; type="text/markdown"');
});

test("unsupported page representation returns 406", async () => {
  const response = await handleRequest(request("/research/", "application/json"), env);
  assert.equal(response.status, 406);
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
});

test("missing Markdown variant falls back to acceptable canonical HTML", async () => {
  const response = await handleRequest(request("/html-only/", "text/markdown, text/html;q=0.8"), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
  assert.equal(response.headers.get("link"), null);
  assert.match(await response.text(), /html only/);
});

test("missing Markdown variant returns 406 when canonical HTML is forbidden", async () => {
  const response = await handleRequest(request("/html-only/", "text/markdown"), env);
  assert.equal(response.status, 406);
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
});

test("missing Markdown page returns a recoverable Markdown 404", async () => {
  const response = await handleRequest(request("/not-a-page", "text/markdown"), env);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
  const body = await response.text();
  assert.match(body, /^# Page not found/);
  assert.match(body, /\/llms\.txt/);
  assert.match(body, /\/sitemap\.xml/);
  assert.match(body, /\/contact\//);
});

test("missing HTML page preserves a real 404", async () => {
  const response = await handleRequest(request("/not-a-page", "text/html"), env);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
  assert.equal(response.headers.get("link"), null);
});

test("direct Markdown files receive explicit Markdown headers", async () => {
  const response = await handleRequest(request("/research/index.md", "*/*"), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept, Accept-Encoding");
});

test("missing direct Markdown files use the recoverable Markdown 404", async () => {
  const response = await handleRequest(request("/missing.md", "*/*"), env);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.match(await response.text(), /XML sitemap/);
});
