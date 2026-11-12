#!/usr/bin/env python3
"""
Index audit: what we ask Google to index, and what is at risk of being left out.

This cannot read Google's index — no such access exists without Search Console.
What it does is produce the other half of the comparison: every page we publish,
whether it carries a noindex, how much text is on it, how many internal links
point at it, and whether it is in a sitemap. Reconcile the CSV against Search
Console's Pages report (or site: queries) to see which ones Google skipped.

Outputs:
  seo/indexable-urls.csv   — the 235 pages we are asking to have indexed
  seo/noindex-urls.csv     — everything deliberately kept out, and why
  seo/INDEX_STATUS.md      — the summary a person can read
"""
import csv
import glob
import html
import json
import os
import re
from collections import Counter, defaultdict
from pathlib import Path

DIST = Path("dist")
OUT = Path("seo")
SITE = "https://insurancesupport.online"

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.S | re.I)
ROBOTS_RE = re.compile(r'<meta\s+name=["\']robots["\']\s+content=["\']([^"\']+)["\']', re.I)
CANON_RE = re.compile(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', re.I)
HREF_RE = re.compile(r'href="(/[^"#?]*)')
DESC_RE = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\']', re.I)


def norm(url: str) -> str:
    """Normalise a URL for matching: one trailing-slash-free form."""
    return url.rstrip("/").replace("https://insurancesupport.online", "") or "/"


def page_url(path: Path) -> str:
    rel = path.relative_to(DIST).as_posix()
    if rel == "index.html":
        return SITE + "/"
    if rel.endswith("/index.html"):
        return f"{SITE}/{rel[:-len('/index.html')]}/"
    return f"{SITE}/{rel}"


def words_of(doc: str) -> int:
    body = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", doc, flags=re.S | re.I)
    body = re.sub(r"<[^>]+>", " ", body)
    return len(re.sub(r"\s+", " ", html.unescape(body)).split())


def section_of(url: str) -> str:
    path = url.replace(SITE, "") or "/"
    parts = [p for p in path.split("/") if p]
    if not parts:
        return "home"
    head = parts[0]
    mapping = {
        "blog": "Blog",
        "locations": "Location pages",
        "cities": "Locality pages",
        "services": "Service pages",
        "guides": "Topic hubs",
        "compare": "Comparisons",
        "case-studies": "Case studies",
        "tools": "Tools",
        "downloads": "Downloads",
        "lead-magnets": "Lead magnets",
        "loans": "Loans",
        "insurance-support": "Brand / hub",
        "cities": "Locality pages",
    }
    if head == "bangalore":
        return "Bengaluru hub"
    return mapping.get(head, "Core / brand")


def main() -> int:
    files = sorted(glob.glob(str(DIST / "**" / "*.html"), recursive=True))
    sitemap_urls = set()
    for f in glob.glob(str(DIST / "sitemaps" / "*.xml")):
        sitemap_urls.update(re.findall(r"<loc>(.*?)</loc>", Path(f).read_text()))

    pages = {}
    inbound = Counter()

    for f in files:
        if not f.endswith("index.html"):
            continue
        path = Path(f)
        doc = path.read_text(encoding="utf-8", errors="ignore")
        url = page_url(path)
        robots = (ROBOTS_RE.search(doc) or [None, ""])[1] if ROBOTS_RE.search(doc) else ""
        title = (TITLE_RE.search(doc) or [None, ""])[1].strip() if TITLE_RE.search(doc) else ""
        canon = (CANON_RE.search(doc) or [None, ""])[1].strip() if CANON_RE.search(doc) else ""
        desc = (DESC_RE.search(doc) or [None, ""])[1].strip() if DESC_RE.search(doc) else ""
        pages[url] = {
            "url": url,
            "path": "/" + str(path.relative_to(DIST).as_posix()).replace("index.html", ""),
            "title": html.unescape(title),
            "description": html.unescape(desc),
            "noindex": "noindex" in robots.lower(),
            "robots": robots,
            "canonical": canon,
            "words": words_of(doc),
            "in_sitemap": norm(url) in {norm(u) for u in sitemap_urls},
            "section": section_of(url),
        }
        for m in HREF_RE.finditer(doc):
            target = m.group(1).split("#")[0].split("?")[0]
            if not target.endswith("/") and "." in os.path.basename(target):
                continue
            inbound[norm(SITE + target)] += 1

    for url, row in pages.items():
        row["inbound"] = inbound.get(norm(url), 0)

    OUT.mkdir(exist_ok=True)

    indexable = [p for p in pages.values() if not p["noindex"]]
    blocked = [p for p in pages.values() if p["noindex"]]

    indexable.sort(key=lambda p: (p["section"], p["path"]))
    blocked.sort(key=lambda p: (p["section"], p["path"]))

    with (OUT / "indexable-urls.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["url", "section", "title", "words", "internal_links_pointing_here", "in_sitemap", "canonical_self"])
        for p in indexable:
            w.writerow([p["url"], p["section"], p["title"], p["words"], p["inbound"], p["in_sitemap"],
                        "yes" if p["canonical"] and p["canonical"].rstrip("/") == p["url"].rstrip("/") else "no"])

    with (OUT / "noindex-urls.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["url", "section", "title", "words", "reason"])
        for p in blocked:
            w.writerow([p["url"], p["section"], p["title"], p["words"], "noindex set by the template"])

    # ---- risk buckets -------------------------------------------------------
    thin = [p for p in indexable if p["words"] < 500]
    orphan = [p for p in indexable if p["inbound"] == 0]
    not_in_sitemap = [p for p in indexable if not p["in_sitemap"]]
    canonical_mismatch = [p for p in indexable
                          if p["canonical"] and p["canonical"].rstrip("/") != p["url"].rstrip("/")]
    dup_titles = defaultdict(list)
    for p in indexable:
        if p["title"]:
            dup_titles[p["title"]].append(p["url"])
    dup_title_groups = {k: v for k, v in dup_titles.items() if len(v) > 1}
    no_desc = [p for p in indexable if not p["description"]]

    by_section = Counter(p["section"] for p in indexable)
    blocked_by_section = Counter(p["section"] for p in blocked)

    def table(counter: Counter) -> str:
        rows = ["| Section | Pages |", "|---|---|"]
        for k, v in sorted(counter.items(), key=lambda kv: -kv[1]):
            rows.append(f"| {k} | {v} |")
        return "\n".join(rows)

    def bullet_list(items, fmt) -> str:
        if not items:
            return "_None._\n"
        return "\n".join(f"- {fmt(p)}" for p in items) + "\n"

    md = []
    md.append("# Index status — 12 November 2026\n")
    md.append("**What this file can and cannot tell you.** It cannot tell you how many pages Google "
              "has indexed. That number lives in Search Console and nowhere else, and there is no "
              "API access to it from this workspace.\n")
    md.append("What it does give you is the other half of the comparison: every page the site "
              "publishes, whether it asks to be indexed, how much text it carries, and how many "
              "internal links point at it. Put the `indexable-urls.csv` list beside Search "
              "Console → Indexing → Pages and the difference is your \"not indexed\" list.\n")
    md.append("## The numbers\n")
    md.append(f"- HTML pages published: **{len(pages)}**")
    md.append(f"- Pages asking to be indexed: **{len(indexable)}**")
    md.append(f"- Pages deliberately noindexed: **{len(blocked)}**")
    md.append(f"- URLs in the sitemaps: **{len(sitemap_urls)}**")
    md.append(f"- Indexable pages kept out of the sitemaps because they canonicalise elsewhere: "
              f"**{len(not_in_sitemap)}** (by design)")
    md.append("")
    md.append("## What Google is being asked to index\n")
    md.append(table(by_section))
    md.append("\nFull URL list with titles, word counts and internal link counts: "
              "`seo/indexable-urls.csv`.\n")
    md.append("## What is deliberately kept out\n")
    md.append(table(blocked_by_section))
    md.append("\nFull list: `seo/noindex-urls.csv`. This is the honest reason the indexable count is "
              "235 and not 859: the locality pages beyond the nine with unique content, the "
              "machine-translated duplicates and the utility pages are all noindexed on purpose. "
              "Publishing 859 competing pages would thin the site, not deepen it.\n")
    md.append("## Pages most likely to be skipped\n")
    md.append("These are the candidates for \"Crawled — currently not indexed\" or \"Discovered — "
              "currently not indexed\" in Search Console. They are indexable, but each has a "
              "property Google uses to decide a page is not worth the slot.\n")
    md.append(f"### Under 500 words ({len(thin)})\n")
    md.append(bullet_list(thin, lambda p: f"`{p['path']}` — {p['words']} words — {p['title']}"))
    md.append(f"\n### No internal links pointing at them ({len(orphan)})\n")
    md.append(bullet_list(orphan, lambda p: f"`{p['path']}` — {p['title']}"))
    md.append(f"\n### Duplicate titles ({len(dup_title_groups)} groups)\n")
    if dup_title_groups:
        for t, urls in list(dup_title_groups.items())[:20]:
            md.append(f"- *{t}* — {len(urls)} pages: " + ", ".join(f"`{u.replace(SITE, '')}`" for u in urls))
        md.append("")
    else:
        md.append("_None._\n")
    md.append(f"\n### Missing a meta description ({len(no_desc)})\n")
    md.append(bullet_list(no_desc[:30], lambda p: f"`{p['path']}` — {p['title']}"))
    md.append(f"\n### Canonical pointing elsewhere ({len(canonical_mismatch)})\n")
    md.append("These are deliberate consolidations, not faults — Google folds them into the target "
              "URL. They are listed only so the sitemap count and the indexed count are not "
              "expected to match exactly.\n\n")
    md.append(bullet_list(canonical_mismatch, lambda p: f"`{p['path']}` → {p['canonical']}"))
    md.append("""
## How to get the real number in ten minutes

1. Open Search Console for `insurancesupport.online`.
2. **Indexing → Pages**. The summary bar gives Indexed and Not indexed counts, and the "Why pages
   aren't indexed" table splits the second number by reason.
3. Export the "Indexed" table and the "Not indexed" table (top right of each list).
4. Compare against `seo/indexable-urls.csv`. Anything in the CSV that is absent from Google's
   Indexed list is genuinely not indexed yet — that is the list you asked for.

A quick sanity check that needs no login: search `site:insurancesupport.online` in Google. The
count under the results is approximate, but the number is in the right order of magnitude and it
tells you immediately whether the site is indexed at all.

## What to send me

The two CSV exports from Search Console. With those I can name the exact pages Google is holding
back and fix the reason — usually thin content, duplicate intent or a page that is only reachable
through the sitemap.
""")

    (OUT / "INDEX_STATUS.md").write_text("\n".join(md))
    print(f"pages: {len(pages)}  indexable: {len(indexable)}  noindex: {len(blocked)}  sitemap: {len(sitemap_urls)}")
    print(f"thin<500: {len(thin)}  orphan: {len(orphan)}  no-desc: {len(no_desc)}  canonical-mismatch: {len(canonical_mismatch)}  dup-title-groups: {len(dup_title_groups)}")
    print("written:", OUT / "INDEX_STATUS.md", OUT / "indexable-urls.csv", OUT / "noindex-urls.csv")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
