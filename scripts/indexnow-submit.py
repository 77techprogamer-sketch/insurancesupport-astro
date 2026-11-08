#!/usr/bin/env python3
"""
IndexNow URL Submission Script
Submits all site URLs to IndexNow API (Bing, Seznam, IndexNow.org)
Run every 15 minutes via cron to keep search indexes fresh.
"""

import json
import urllib.request
import urllib.error
import sys
import os

# Configuration
SITEMAP_PATH = os.path.join(os.path.dirname(__file__), '..', 'all_urls.txt')
INDEXNOW_KEY = "53fe20be7b9f3f7d157e718bb02f7e4f"
HOST = "insurancesupport.online"
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://search.seznam.cz/indexnow"
]


def read_urls(filepath):
    """Read URLs from file, one per line."""
    with open(filepath, 'r') as f:
        return [line.strip() for line in f if line.strip()]


def submit_indexnow(urls, key, host, endpoints):
    """Submit URLs to IndexNow endpoints."""
    payload = {
        "host": host,
        "key": key,
        "keyLocation": f"https://{host}/{key}.txt",
        "urlList": urls
    }
    
    data = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    
    results = {}
    for endpoint in endpoints:
        req = urllib.request.Request(endpoint, data=data, headers=headers, method='POST')
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                result = response.read().decode('utf-8')
                results[endpoint] = {"status": response.status, "body": result, "success": True}
        except urllib.error.HTTPError as e:
            results[endpoint] = {"status": e.code, "body": e.read().decode('utf-8'), "success": False}
        except Exception as e:
            results[endpoint] = {"status": 0, "body": str(e), "success": False}
    
    return results


def main():
    # Read URLs
    if not os.path.exists(SITEMAP_PATH):
        print(f"ERROR: URL file not found at {SITEMAP_PATH}", file=sys.stderr)
        sys.exit(1)
    
    urls = read_urls(SITEMAP_PATH)
    print(f"Submitting {len(urls)} URLs to IndexNow...")
    
    # Submit
    results = submit_indexnow(urls, INDEXNOW_KEY, HOST, ENDPOINTS)
    
    # Report
    all_success = True
    for endpoint, result in results.items():
        status = "OK" if result["success"] else "FAILED"
        print(f"  {status} {endpoint}: HTTP {result['status']}")
        if not result["success"]:
            print(f"    Error: {result['body']}", file=sys.stderr)
            all_success = False
    
    if all_success:
        print("All submissions successful.")
        sys.exit(0)
    else:
        print("Some submissions failed.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()