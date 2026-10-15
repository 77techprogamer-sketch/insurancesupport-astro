#!/usr/bin/env bash
set -euo pipefail

SITEMAP_INDEX="${1:-dist/sitemap-index.xml}"

if [ ! -f "$SITEMAP_INDEX" ]; then
  echo "ERROR: sitemap-index.xml not found at $SITEMAP_INDEX" >&2
  exit 1
fi

MISSING=0

for path in /sitemaps/lead-magnets-sitemap.xml /sitemaps/case-studies-sitemap.xml /sitemaps/compare-sitemap.xml; do
  if ! rg -q "$path" "$SITEMAP_INDEX"; then
    echo "ERROR: $path is missing from sitemap-index.xml" >&2
    MISSING=$((MISSING + 1))
  fi
done

if [ "$MISSING" -gt 0 ]; then
  echo "ERROR: $MISSING intent-rich sitemap(s) missing from sitemap-index.xml" >&2
  exit 1
fi

echo "OK: sitemap-index.xml includes lead magnets, case studies, and comparisons sitemaps."
