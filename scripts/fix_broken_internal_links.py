#!/usr/bin/env python3
"""
Repair broken absolute self-links (https://insurancesupport.online/...) in
src/data/blogs.json.

A previous bulk internal-linking pass produced two kinds of damage:

  1. Nested markdown links baked into the URL itself, e.g.
     https://insurancesupport.online/blog/[insurance](/blog/x)-claim-rejection-rate-india-2026-data/
  2. Links to routes that were never built, mostly location x service
     combinations (/locations/kerala/thrissur/life-insurance/) and
     /resources/guides|faq/... paths.

Strategy: resolve every target against the set of pages actually built in
dist/, by (a) unwrapping a nested artifact, (b) exact match, (c) longest
existing ancestor path, (d) a small prefix map, (e) falling back to the
section hub. Nothing is deleted; only the href changes.

Usage: python3 scripts/fix_broken_internal_links.py [--dry-run]
"""
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOGS = ROOT / "src/data/blogs.json"
DOMAIN_RE = re.compile(r"https?://insurancesupport\.online([^\s\"'<>]*)")

# Corrupted anchors from an earlier script: the URL was cut at the domain and
# glued to the next word, e.g. <a href="https://insurancesupport.onlinea>.
GLUED_ANCHOR_RE = re.compile(
    r"<a\s+href=([\"']?)https?://insurancesupport\.online(?![\/\"\'\s>])[^>]*>",
    re.IGNORECASE,
)

PREFIX_MAP = {
    "/resources/guides/": "/resources/",
    "/resources/faq/": "/faq/",
    "/resources/loans": "/loans/",
    "/resources/": "/resources/",
    "/tools/": "/tools/",
    "/locations/": "/locations/",
    "/blog/": "/blog/",
}


def built_pages() -> set:
    pages = set()
    for base, _dirs, files in os.walk(ROOT / "dist"):
        if "index.html" in files:
            rel = os.path.relpath(base, ROOT / "dist").replace(os.sep, "/")
            pages.add("/" if rel == "." else "/" + rel + "/")
    return pages


def unwrap(path: str) -> str:
    """Pull the inner URL out of a nested-markdown artifact."""
    if "[" not in path and "]" not in path:
        return path
    inner = re.search(r"\(\s*(?:https?://insurancesupport\.online)?(/[^)\s]*)\s*\)", path)
    if inner:
        return inner.group(1)
    return path.split("[")[0]


def resolve(path: str, pages: set) -> str:
    path = unwrap(path)
    if path in ("", "/"):
        return "/"
    if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
        path += "/"
    if path in pages:
        return path

    # Longest existing ancestor, e.g. /locations/kerala/thrissur/life-insurance/
    # -> /locations/kerala/ -> /locations/
    parts = [p for p in path.split("/") if p]
    for i in range(len(parts) - 1, 0, -1):
        candidate = "/" + "/".join(parts[:i]) + "/"
        if candidate in pages:
            return candidate

    for prefix, target in PREFIX_MAP.items():
        if path.startswith(prefix):
            return target if target in pages else "/"

    return "/"


def clean_path(raw_path: str) -> str:
    """Cut a path at the first markdown or bracket artifact in it."""
    for sep in ("[", "(", "]", ")"):
        idx = raw_path.find(sep)
        if idx != -1:
            raw_path = raw_path[:idx]
    return raw_path.rstrip(".,;")


def main() -> int:
    dry = "--dry-run" in sys.argv
    pages = built_pages()
    data = json.loads(BLOGS.read_text())

    changes = []
    for post in data:
        content = post.get("content") or ""
        if "insurancesupport.online" not in content:
            continue

        content = GLUED_ANCHOR_RE.sub('<a href="/">', content)

        def repl(match: re.Match) -> str:
            raw = match.group(0)
            path = match.group(1) or ""
            if path in ("", "/") or not path.startswith("/"):
                return raw
            # keep a closing paren only when the URL sits inside markdown link
            # syntax: ](https://site/path/)
            tail = re.search(r"[)\]]*$", raw).group(0)
            prev = match.string[match.start() - 1] if match.start() > 0 else ""
            if not (prev == "(" and tail):
                tail = ""
            new = resolve(clean_path(path), pages)
            if new == "/" and path.startswith("/"):
                new = resolve(path, pages)
            if new == path:
                return raw
            changes.append((post["slug"], path, new))
            return "https://insurancesupport.online" + new + tail

        post["content"] = DOMAIN_RE.sub(repl, content)

    if not dry:
        BLOGS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")

    from collections import Counter

    targets = Counter((c[1], c[2]) for c in changes)
    print(f"rewrote {len(changes)} links in {len({c[0] for c in changes})} posts "
          f"({len(targets)} distinct target pairs){' [dry run]' if dry else ''}")
    for (old, new), n in targets.most_common(15):
        print(f"  {n:4}  {old[:70]} -> {new}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
