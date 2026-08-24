from __future__ import annotations

import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.depth = 0
        self.visible_text: list[str] = []
        self.links: set[str] = set()
        self.meta_refresh = False
        self.json_ld: list[str] = []
        self.in_json_ld = False
        self.alternates: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag == "meta" and attributes.get("http-equiv", "").lower() == "refresh":
            self.meta_refresh = True
        if tag == "script" and attributes.get("type") == "application/ld+json":
            self.in_json_ld = True
        if tag == "link" and "alternate" in attributes.get("rel", "").split():
            self.alternates.append(attributes)
        if tag == "a" and attributes.get("href"):
            self.links.add(attributes["href"])
        if not self.in_main and attributes.get("role") == "main":
            self.in_main = True
            self.depth = 1
        elif self.in_main and tag not in {"br", "hr", "img", "input", "meta", "link", "source"}:
            self.depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "script":
            self.in_json_ld = False
        if self.in_main and tag not in {"br", "hr", "img", "input", "meta", "link", "source"}:
            self.depth -= 1
            if self.depth == 0:
                self.in_main = False

    def handle_data(self, data: str) -> None:
        if self.in_json_ld:
            self.json_ld.append(data)
        elif self.in_main and data.strip():
            self.visible_text.append(data.strip())


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def route_files(route: str) -> tuple[Path, Path]:
    route = unquote(route)
    if route in {"", "/"}:
        return SITE / "index.html", SITE / "index.md"
    relative = route.lstrip("/")
    if route.endswith("/"):
        return SITE / relative / "index.html", SITE / relative / "index.md"
    if relative.endswith(".html"):
        return SITE / relative, SITE / f"{relative[:-5]}.md"
    return SITE / relative / "index.html", SITE / relative / "index.md"


class AgentReadinessTest(unittest.TestCase):
    def test_404_is_recoverable_and_does_not_redirect(self) -> None:
        source = (ROOT / "_pages/404.md").read_text(encoding="utf-8")
        self.assertNotIn("redirect: true", source)
        page = parse_page(SITE / "404.html")
        self.assertFalse(page.meta_refresh)
        for link in {"/", "/research/", "/publications/", "/people/", "/llms.txt", "/sitemap.xml", "/contact/"}:
            self.assertIn(link, page.links)

    def test_llms_file_follows_required_shape_and_is_copied_verbatim(self) -> None:
        source = (ROOT / "llms.txt").read_text(encoding="utf-8")
        self.assertEqual(source, (SITE / "llms.txt").read_text(encoding="utf-8"))
        meaningful = [line.strip() for line in source.splitlines() if line.strip()]
        self.assertRegex(meaningful[0], r"^# [^#]")
        self.assertTrue(meaningful[1].startswith("> "))
        self.assertIn("## When to use this site", meaningful)
        self.assertIn("## How to use this site", meaningful)
        self.assertIn("## Optional", meaningful)
        section_started = False
        for line in meaningful:
            if line.startswith("## "):
                section_started = True
                continue
            if section_started:
                self.assertRegex(line, r"^- \[[^]]+\]\(https://[^)]+\):?", msg=line)

    def test_trust_pages_have_substantive_visible_content(self) -> None:
        for route in ("about", "contact", "privacy"):
            page = parse_page(SITE / route / "index.html")
            text = re.sub(r"\s+", " ", " ".join(page.visible_text)).strip()
            self.assertGreaterEqual(len(text), 500, f"/{route}/ has only {len(text)} visible characters")

    def test_trust_pages_are_in_sitemap_and_linked_from_footer(self) -> None:
        sitemap = ElementTree.parse(SITE / "sitemap.xml")
        locations = {item.text for item in sitemap.findall(".//{*}loc") if item.text}
        for route in ("about", "contact", "privacy"):
            self.assertIn(f"https://www.taislab.co.kr/{route}/", locations)
        home = parse_page(SITE / "index.html")
        for link in ("/about/", "/contact/", "/privacy/"):
            self.assertIn(link, home.links)

    def test_homepage_json_ld_has_complete_person_and_organization(self) -> None:
        page = parse_page(SITE / "index.html")
        documents = [json.loads(raw) for raw in page.json_ld if raw.strip()]
        nodes = [node for document in documents for node in document.get("@graph", [])]
        person = next(node for node in nodes if node.get("@type") == "Person")
        self.assertEqual(person["name"], "Younghan Lee")
        self.assertEqual(person["jobTitle"], "Assistant Professor")
        self.assertEqual(person["url"], "https://www.taislab.co.kr/people/")
        self.assertGreater(len(person["description"]), 100)
        self.assertGreaterEqual(len(person["sameAs"]), 4)
        self.assertTrue(any(node.get("@type") == "ResearchOrganization" for node in nodes))

    def test_every_sitemap_page_has_a_markdown_alternate(self) -> None:
        sitemap = ElementTree.parse(SITE / "sitemap.xml")
        routes = sorted({urlparse(item.text).path or "/" for item in sitemap.findall(".//{*}loc") if item.text})
        self.assertGreaterEqual(len(routes), 10)
        for route in routes:
            html_path, markdown_path = route_files(route)
            self.assertTrue(html_path.exists(), route)
            self.assertTrue(markdown_path.exists(), route)
            markdown = markdown_path.read_text(encoding="utf-8")
            self.assertIn("Canonical URL:", markdown)
            self.assertGreater(len(markdown), 150, route)
            page = parse_page(html_path)
            expected_url = "https://www.taislab.co.kr/" + markdown_path.relative_to(SITE).as_posix()
            self.assertTrue(
                any(link.get("type") == "text/markdown" and link.get("href") == expected_url for link in page.alternates),
                route,
            )

    def test_404_has_generated_markdown_alternate(self) -> None:
        markdown = (SITE / "404.md").read_text(encoding="utf-8")
        self.assertIn("# Page not found", markdown)
        page = parse_page(SITE / "404.html")
        self.assertTrue(any(link.get("href") == "https://www.taislab.co.kr/404.md" for link in page.alternates))

    def test_generated_markdown_avoids_ambiguous_link_and_table_markup(self) -> None:
        home = (SITE / "index.md").read_text(encoding="utf-8")
        publications = (SITE / "publications/index.md").read_text(encoding="utf-8")
        self.assertNotIn(")[", home)
        self.assertRegex(home, r"Jun 06, 2026\s+—\s+")
        self.assertNotRegex(publications, r"\[Bib\](?!\()")

    def test_machine_readable_files_and_internal_llms_links_resolve(self) -> None:
        self.assertTrue((SITE / ".nojekyll").exists())
        for filename in ("llms.txt", "robots.txt", "sitemap.xml", "feed.xml"):
            file_path = SITE / filename
            self.assertTrue(file_path.exists(), filename)
            self.assertGreater(file_path.stat().st_size, 50, filename)
        ElementTree.parse(SITE / "sitemap.xml")
        ElementTree.parse(SITE / "feed.xml")
        self.assertIn("https://www.taislab.co.kr/sitemap.xml", (SITE / "robots.txt").read_text(encoding="utf-8"))

        llms = (SITE / "llms.txt").read_text(encoding="utf-8")
        internal_urls = re.findall(r"https://www\.taislab\.co\.kr(/[^)\s]*)", llms)
        self.assertGreaterEqual(len(internal_urls), 12)
        for route in internal_urls:
            if route.endswith("/"):
                target = SITE / route.lstrip("/") / "index.html"
            else:
                target = SITE / route.lstrip("/")
            self.assertTrue(target.exists(), route)


if __name__ == "__main__":
    unittest.main()
