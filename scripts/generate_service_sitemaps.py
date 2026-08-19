
import json
import os
from datetime import datetime
from urllib.parse import urljoin
import xml.etree.ElementTree as ET

# Base directory for the Astro project
PROJECT_ROOT = "C:/Users/A/Desktop/insurancesupport-astro"
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
SITEMAPS_DIR = os.path.join(PUBLIC_DIR, "sitemaps")
ROBOTS_TXT_PATH = os.path.join(PUBLIC_DIR, "robots.txt")

# Ensure sitemaps directory exists
os.makedirs(SITEMAPS_DIR, exist_ok=True)

BASE_URL = "https://insurancesupport.online"
CURRENT_DATE = datetime.now().isoformat() + "Z"

def load_json_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_sitemap_xml(urls, filename):
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for url_loc in urls:
        url_elem = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_elem, "loc")
        loc.text = url_loc
        lastmod = ET.SubElement(url_elem, "lastmod")
        lastmod.text = CURRENT_DATE
    
    tree = ET.ElementTree(urlset)
    # Pretty print XML
    ET.indent(tree, space="  ", level=0)
    tree.write(os.path.join(SITEMAPS_DIR, filename), encoding='utf-8', xml_declaration=True)

def update_robots_txt(sitemap_index_url):
    try:
        with open(ROBOTS_TXT_PATH, 'r', encoding='utf-8') as f:
            content = f.readlines()
    except FileNotFoundError:
        content = []

    new_content = []
    sitemap_index_added = False
    for line in content:
        if line.strip().startswith("Sitemap:"):
            # Replace existing sitemap directive if it points to a default sitemap.xml
            # Or remove it if we are managing sitemaps ourselves.
            # For now, let's remove existing generic ones and add ours.
            if "sitemap.xml" in line: # Assuming default Astro sitemap
                continue
            elif sitemap_index_url in line:
                sitemap_index_added = True
            else:
                new_content.append(line)
        else:
            new_content.append(line)
    
    if not sitemap_index_added:
        new_content.append(f"Sitemap: {sitemap_index_url}\n")
    
    with open(ROBOTS_TXT_PATH, 'w', encoding='utf-8') as f:
        f.writelines(new_content)

def main():
    print("Starting sitemap generation based on services...")

    services_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/services.json"))
    blogs_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/blogs.json"))
    case_studies_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/case-studies.json"))
    lead_magnets_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/lead-magnets.json"))

    sitemap_index_urls = []
    
    # Generate sitemap for each service
    for service in services_data:
        service_slug = service["slug"]
        service_title = service["title"]
        service_urls = [urljoin(BASE_URL, f"/services/{service_slug}")]

        print(f"Generating sitemap for service: {service_title}")

        # Add relevant blog posts
        for blog in blogs_data:
            blog_title_lower = blog["title"].lower()
            blog_tags_lower = [tag.lower() for tag in blog.get("tags", [])] if blog.get("tags") else []
            
            # Simple keyword matching: service title or slug in blog title/tags
            if service_title.lower() in blog_title_lower or service_slug.lower() in blog_title_lower or service_slug.lower() in blog_tags_lower:
                service_urls.append(urljoin(BASE_URL, f"/blog/{blog['slug']}"))

        # Add relevant case studies
        for cs in case_studies_data:
            cs_title_lower = cs["title"].lower()
            if service_title.lower() in cs_title_lower or service_slug.lower() in cs_title_lower:
                service_urls.append(urljoin(BASE_URL, f"/case-studies/{cs['slug']}"))

        # Add relevant lead magnets
        for lm in lead_magnets_data:
            lm_title_lower = lm["title"].lower()
            if service_title.lower() in lm_title_lower or service_slug.lower() in lm_title_lower:
                service_urls.append(urljoin(BASE_URL, f"/lead-magnets/{lm['slug']}"))

        service_sitemap_filename = f"{service_slug}-sitemap.xml"
        generate_sitemap_xml(list(set(service_urls)), service_sitemap_filename) # Use set to remove duplicates
        sitemap_index_urls.append(urljoin(BASE_URL, f"/sitemaps/{service_sitemap_filename}"))
    
    # Generate main sitemap index
    sitemap_index_root = ET.Element("sitemapindex", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for sitemap_url in sitemap_index_urls:
        sitemap_elem = ET.SubElement(sitemap_index_root, "sitemap")
        loc = ET.SubElement(sitemap_elem, "loc")
        loc.text = sitemap_url
        lastmod = ET.SubElement(sitemap_elem, "lastmod")
        lastmod.text = CURRENT_DATE
    
    tree = ET.ElementTree(sitemap_index_root)
    ET.indent(tree, space="  ", level=0)
    tree.write(os.path.join(PUBLIC_DIR, "sitemap-index.xml"), encoding='utf-8', xml_declaration=True)
    print("Generated sitemap-index.xml")

    # Update robots.txt
    update_robots_txt(urljoin(BASE_URL, "/sitemap-index.xml"))
    print("Updated robots.txt with sitemap index reference.")
    print("Sitemap generation complete.")

if __name__ == "__main__":
    main()
