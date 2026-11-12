#!/usr/bin/env python3
"""
Keyword map: one primary query per indexable page, and whether the page's own
title and H1 actually contain it.

The point is not to sprinkle keywords. It is to catch the pages that ask to be
found for something their title never says — those are the pages Google has no
reason to rank, because the one signal it weighs most heavily is missing.

Output: seo/keyword-map.csv  (+ a gap summary printed to stdout)
"""
import csv
import glob
import html
import os
import re
from pathlib import Path

DIST = Path("dist")
SITE = "https://insurancesupport.online"
OUT = Path("seo/keyword-map.csv")

STOP = {
    "the", "a", "an", "and", "or", "of", "in", "on", "for", "to", "after", "before",
    "your", "you", "is", "are", "was", "were", "how", "what", "why", "when", "who",
    "with", "without", "from", "by", "at", "as", "it", "its", "that", "this", "can",
    "should", "must", "do", "does", "2026", "2025", "guide", "complete", "india",
}

FIXED = {
    "/": ("insurance claim rejection help", "transactional"),
    "/bangalore/": ("insurance claim help Bengaluru", "local"),
    "/contact/": ("insurance advisor contact Bangalore", "transactional"),
    "/about/": ("IRDAI registered insurance advisor Bengaluru", "brand"),
    "/about-hari-kotian/": ("Hari Kotian IRDAI insurance advisor", "brand"),
    "/faq/": ("insurance claim questions answered", "informational"),
    "/guides/": ("insurance guides by topic", "informational"),
    "/tools/": ("free insurance calculators", "tool"),
    "/compare/": ("compare insurance plans India", "commercial"),
    "/locations/": ("insurance advisor locations India", "local"),
    "/cities/": ("LIC agent Bangalore areas", "local"),
    "/services/": ("insurance services Bangalore", "commercial"),
    "/claim-recovery/": ("insurance claim recovery help", "transactional"),
    "/resources/": ("insurance resources and checklists", "informational"),
    "/expert-insights/": ("insurance expert insights", "informational"),
}


def slug_phrase(path: str) -> str:
    slug = path.strip("/").split("/")[-1]
    words = [w for w in slug.replace("-", " ").split() if w not in STOP and not w.isdigit()]
    return " ".join(words)


def primary_for(url: str, title: str) -> tuple[str, str]:
    path = url.replace(SITE, "") or "/"
    if path in FIXED:
        return FIXED[path]
    if path.startswith("/locations/"):
        city = path.strip("/").split("/")[-1].replace("-", " ").title()
        return f"insurance advisor {city}", "local"
    if path.startswith("/cities/"):
        area = path.strip("/").split("/")[-1].replace("-", " ").title()
        return f"insurance advisor {area} Bangalore", "local"
    if path.startswith("/services/"):
        svc = path.strip("/").split("/")[-1].replace("-", " ")
        return f"{svc} Bengaluru", "commercial"
    if path.startswith("/guides/"):
        g = path.strip("/").split("/")[-1].replace("-", " ")
        return f"{g} insurance guides", "informational"
    if path.startswith("/blog/"):
        phrase = slug_phrase(path)
        return phrase or "insurance claim guide", "informational"
    if path.startswith("/compare/"):
        return f"{slug_phrase(path)} comparison", "commercial"
    if path.startswith("/case-studies/"):
        return f"{slug_phrase(path)} case study", "informational"
    if path.startswith("/tools/"):
        return f"{slug_phrase(path)} tool", "tool"
    if path.startswith("/lead-magnets/"):
        return f"{slug_phrase(path)} checklist", "transactional"
    return slug_phrase(path) or "insurance guidance", "informational"


def tokens(s: str) -> list[str]:
    s = html.unescape(s).lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return [w for w in s.split() if len(w) > 2 and w not in STOP and not w.isdigit()]


def main() -> int:
    rows = list(csv.DictReader(open("seo/indexable-urls.csv")))
    out = []
    for r in rows:
        url = r["url"]
        path = url.replace(SITE, "") or "/"
        f = DIST / (path.strip("/") + "/index.html" if path != "/" else "index.html")
        doc = f.read_text(encoding="utf-8", errors="ignore") if f.exists() else ""
        h1m = re.search(r"<h1[^>]*>(.*?)</h1>", doc, flags=re.S)
        h1 = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", h1m.group(1)))).strip() if h1m else ""
        primary, intent = primary_for(url, r["title"])
        want = set(tokens(primary))
        have_title = set(tokens(r["title"]))
        have_h1 = set(tokens(h1))
        in_title = len(want & have_title) / len(want) if want else 0
        in_h1 = len(want & have_h1) / len(want) if want else 0
        out.append({
            "url": path or "/",
            "section": r["section"],
            "primary_keyword": primary,
            "intent": intent,
            "title": r["title"],
            "h1": h1,
            "keyword_in_title": f"{in_title:.0%}",
            "keyword_in_h1": f"{in_h1:.0%}",
            "gap": "title" if in_title < 0.6 and in_h1 < 0.6 else ("h1" if in_h1 < 0.6 else ""),
            "words": r["words"],
        })

    OUT.parent.mkdir(exist_ok=True)
    with OUT.open("w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)

    gaps = [r for r in out if r["gap"]]
    print(f"{len(out)} indexable pages mapped")
    print(f"{len(gaps)} pages whose title and H1 both miss their own keyword\n")
    for r in gaps:
        print(f"  [{r['gap']:5}] {r['url']}")
        print(f"          wants: {r['primary_keyword']}")
        print(f"          title: {r['title'][:70]}")
        print(f"          h1   : {r['h1'][:70]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
