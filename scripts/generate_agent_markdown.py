#!/usr/bin/env python3
"""Generate Markdown alternatives for canonical Jekyll pages.

The script reads the built sitemap, converts each page's main content to a
compact Markdown representation, and writes a sibling `.md` file. It has no
third-party dependencies so it can run in the existing GitHub Actions build.
"""

from __future__ import annotations

import argparse
import html
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree


VOID_ELEMENTS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
SKIP_ELEMENTS = {"script", "style", "noscript", "svg", "canvas", "nav", "footer"}


class MainContentMarkdownParser(HTMLParser):
    """Convert the element carrying role=main into conservative Markdown."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.in_main = False
        self.main_depth = 0
        self.skip_depth = 0
        self.link_stack: list[str] = []
        self.list_stack: list[dict[str, int | str]] = []
        self.in_pre = False
        self.found_main = False
        self.table_cells_in_row = 0

    @staticmethod
    def _attrs(attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {key: value or "" for key, value in attrs}

    def _block(self) -> None:
        self.parts.append("\n\n")

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = self._attrs(attrs)
        if not self.in_main:
            if attributes.get("role") == "main":
                self.in_main = True
                self.found_main = True
                self.main_depth = 1
            return

        if tag not in VOID_ELEMENTS:
            self.main_depth += 1

        if self.skip_depth:
            if tag not in VOID_ELEMENTS:
                self.skip_depth += 1
            return
        if tag in SKIP_ELEMENTS or attributes.get("aria-hidden") == "true":
            self.skip_depth = 1
            return

        if re.fullmatch(r"h[1-6]", tag):
            self._block()
            self.parts.append("#" * int(tag[1]) + " ")
        elif tag in {"p", "section", "article", "div", "header", "aside", "blockquote"}:
            self._block()
            if tag == "blockquote":
                self.parts.append("> ")
        elif tag == "br":
            self.parts.append("  \n")
        elif tag == "hr":
            self.parts.append("\n\n---\n\n")
        elif tag in {"strong", "b"}:
            self.parts.append("**")
        elif tag in {"em", "i"}:
            self.parts.append("*")
        elif tag == "code" and not self.in_pre:
            self.parts.append("`")
        elif tag == "pre":
            self._block()
            self.parts.append("```\n")
            self.in_pre = True
        elif tag == "a":
            href = attributes.get("href", "")
            if href:
                if self.parts and not self.parts[-1].endswith((" ", "\n", "[")):
                    self.parts.append(" ")
                self.parts.append("[")
            self.link_stack.append(href)
        elif tag == "img":
            alt = attributes.get("alt", "").strip()
            src = attributes.get("src", "").strip()
            if alt and src:
                self.parts.append(f"![{alt}]({src})")
        elif tag in {"ul", "ol"}:
            self._block()
            self.list_stack.append({"tag": tag, "count": 0})
        elif tag == "li":
            self.parts.append("\n")
            indent = "  " * max(0, len(self.list_stack) - 1)
            if self.list_stack and self.list_stack[-1]["tag"] == "ol":
                self.list_stack[-1]["count"] = int(self.list_stack[-1]["count"]) + 1
                marker = f"{self.list_stack[-1]['count']}. "
            else:
                marker = "- "
            self.parts.append(indent + marker)
        elif tag == "tr":
            self._block()
            self.table_cells_in_row = 0
        elif tag in {"th", "td"}:
            if self.table_cells_in_row:
                self.parts.append(" — ")
            self.table_cells_in_row += 1

    def handle_endtag(self, tag: str) -> None:
        if not self.in_main:
            return

        if self.skip_depth:
            self.skip_depth -= 1
        else:
            if re.fullmatch(r"h[1-6]", tag) or tag in {"p", "section", "article", "header", "aside", "blockquote"}:
                self._block()
            elif tag in {"strong", "b"}:
                self.parts.append("**")
            elif tag in {"em", "i"}:
                self.parts.append("*")
            elif tag == "code" and not self.in_pre:
                self.parts.append("`")
            elif tag == "pre":
                self.parts.append("\n```\n")
                self.in_pre = False
            elif tag == "a":
                href = self.link_stack.pop() if self.link_stack else ""
                if href:
                    self.parts.append(f"]({href})")
            elif tag == "tr":
                self._block()
            elif tag in {"ul", "ol"}:
                if self.list_stack:
                    self.list_stack.pop()
                self._block()

        if tag not in VOID_ELEMENTS:
            self.main_depth -= 1
        if self.main_depth == 0:
            self.in_main = False

    def handle_data(self, data: str) -> None:
        if not self.in_main or self.skip_depth:
            return
        if self.in_pre:
            self.parts.append(data)
            return
        cleaned = re.sub(r"\s+", " ", html.unescape(data))
        if cleaned.strip():
            if self.parts and not self.parts[-1].endswith((" ", "\n", "[", "*", "`")) and not cleaned.startswith((" ", ".", ",", ":", ";", ")")):
                self.parts.append(" ")
            self.parts.append(cleaned)

    def markdown(self) -> str:
        rendered = "".join(self.parts)
        rendered = re.sub(r"[ \t]+\n", "\n", rendered)
        rendered = re.sub(r"\n[ \t]+", "\n", rendered)
        rendered = re.sub(r"\n{3,}", "\n\n", rendered)
        return rendered.strip()


def source_html_path(site_dir: Path, route: str) -> Path:
    route = unquote(route)
    if route in {"", "/"}:
        return site_dir / "index.html"
    relative = route.lstrip("/")
    if route.endswith("/"):
        return site_dir / relative / "index.html"
    if relative.endswith(".html"):
        return site_dir / relative
    return site_dir / relative / "index.html"


def markdown_path(site_dir: Path, route: str) -> Path:
    route = unquote(route)
    if route in {"", "/"}:
        return site_dir / "index.md"
    relative = route.lstrip("/")
    if route.endswith("/"):
        return site_dir / relative / "index.md"
    if relative.endswith(".html"):
        return site_dir / f"{relative[:-5]}.md"
    return site_dir / relative / "index.md"


def canonical_routes(site_dir: Path) -> list[str]:
    sitemap = ElementTree.parse(site_dir / "sitemap.xml")
    routes: list[str] = []
    for location in sitemap.findall(".//{*}loc"):
        if location.text:
            routes.append(urlparse(location.text.strip()).path or "/")
    if "/404.html" not in routes:
        routes.append("/404.html")
    return sorted(set(routes))


def generate(site_dir: Path, base_url: str) -> list[Path]:
    # The deployment branch contains the already rendered Jekyll site. Without
    # this marker GitHub Pages attempts a second Jekyll pass over the generated
    # Markdown alternatives, which can reinterpret publication text as Liquid.
    (site_dir / ".nojekyll").write_text("", encoding="utf-8")
    worker_source = Path(__file__).resolve().parents[1] / "edge" / "worker.mjs"
    (site_dir / "_worker.js").write_text(worker_source.read_text(encoding="utf-8"), encoding="utf-8")
    written: list[Path] = []
    for route in canonical_routes(site_dir):
        source = source_html_path(site_dir, route)
        if not source.exists():
            raise FileNotFoundError(f"Built HTML is missing for {route}: {source}")
        parser = MainContentMarkdownParser()
        parser.feed(source.read_text(encoding="utf-8"))
        if not parser.found_main:
            raise ValueError(f"No role=main element found in {source}")
        content = parser.markdown()
        if not content:
            raise ValueError(f"No main content extracted from {source}")
        canonical = base_url.rstrip("/") + (route if route.startswith("/") else f"/{route}")
        body = (
            "<!-- Generated from the canonical HTML during the site build. -->\n\n"
            f"Canonical URL: [{canonical}]({canonical})\n\n"
            f"{content}\n"
        )
        destination = markdown_path(site_dir, route)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(body, encoding="utf-8")
        written.append(destination)
    return written


def main() -> None:
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument("--site-dir", type=Path, default=Path("_site"))
    argument_parser.add_argument("--base-url", default="https://www.taislab.co.kr")
    args = argument_parser.parse_args()
    files = generate(args.site_dir.resolve(), args.base_url)
    print(f"Generated {len(files)} Markdown alternatives in {args.site_dir}")


if __name__ == "__main__":
    main()
