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
    for url_loc in sorted(set(urls)):
        url_elem = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_elem, "loc")
        loc.text = url_loc
        lastmod = ET.SubElement(url_elem, "lastmod")
        lastmod.text = CURRENT_DATE

    tree = ET.ElementTree(urlset)
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
        stripped = line.strip()
        if stripped.startswith("Sitemap:"):
            # Keep only our index URL, drop any legacy sitemap.xml lines
            if stripped == f"Sitemap: {sitemap_index_url}":
                sitemap_index_added = True
                new_content.append(line)
        else:
            new_content.append(line)

    if not sitemap_index_added:
        new_content.append(f"Sitemap: {sitemap_index_url}\r\n")

    with open(ROBOTS_TXT_PATH, 'w', encoding='utf-8', newline='') as f:
        f.writelines(new_content)

# Location slug → service sitemaps it should be listed under
def classify_location(city):
    text = (city.get('name', '') + ' ' + city.get('desc', '') + ' ' +
            city.get('it_focus', '') + ' ' + city.get('senior_focus', '')).lower()
    assigned = []
    if 'health' in text or 'medical' in text or 'hospital' in text:
        assigned.append('health-insurance')
    if 'term' in text or 'lic' in text or 'life' in text or 'pension' in text:
        assigned.append('life-insurance')
    if 'motor' in text or 'car' in text or 'bike' in text or 'renewal' in text:
        assigned.append('motor-insurance')
    if 'sme' in text or 'business' in text or 'industrial' in text or 'factory' in text or 'keyman' in text:
        assigned.append('sme-insurance')
    if not assigned:
        assigned = ['life-insurance']
    return assigned

def main():
    print("Starting sitemap generation with location grouping...")

    services_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/services.json"))
    blogs_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/blogs.json"))
    case_studies_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/case-studies.json"))
    lead_magnets_data = load_json_data(os.path.join(PROJECT_ROOT, "src/data/lead-magnets.json"))
    cities_data = load_json_data(os.path.join(PROJECT_ROOT, "src/content/cities/index.json"))

    sitemap_index_urls = []

    # ----- SERVICE SITEMAPS (service page + matching blogs/case studies/lead magnets/locations) -----
    for service in services_data:
        service_slug = service["slug"]
        service_title = service["title"]
        service_urls = [urljoin(BASE_URL, f"/services/{service_slug}")]

        for blog in blogs_data:
            blog_title_lower = blog["title"].lower()
            blog_tags_lower = [tag.lower() for tag in blog.get("tags", [])] if blog.get("tags") else []
            if service_title.lower() in blog_title_lower or service_slug.lower() in blog_title_lower or service_slug.lower() in blog_tags_lower:
                service_urls.append(urljoin(BASE_URL, f"/blog/{blog['slug']}"))

        for cs in case_studies_data:
            cs_title_lower = cs["title"].lower()
            if service_title.lower() in cs_title_lower or service_slug.lower() in cs_title_lower:
                service_urls.append(urljoin(BASE_URL, f"/case-studies/{cs['slug']}"))

        for lm in lead_magnets_data:
            lm_title_lower = lm["title"].lower()
            if service_title.lower() in lm_title_lower or service_slug.lower() in lm_title_lower:
                service_urls.append(urljoin(BASE_URL, f"/lead-magnets/{lm['slug']}"))

        for city in cities_data:
            if service_slug in classify_location(city):
                service_urls.append(urljoin(BASE_URL, f"/locations/{city['slug']}"))

        service_sitemap_filename = f"{service_slug}-sitemap.xml"
        generate_sitemap_xml(service_urls, service_sitemap_filename)
        sitemap_index_urls.append(urljoin(BASE_URL, f"/sitemaps/{service_sitemap_filename}"))

    # ----- LOCATION SITEMAP (master list of all /locations/* pages) -----
    location_urls = [urljoin(BASE_URL, "/locations")]
    for city in cities_data:
        location_urls.append(urljoin(BASE_URL, f"/locations/{city['slug']}"))
    generate_sitemap_xml(location_urls, "locations-sitemap.xml")
    sitemap_index_urls.append(urljoin(BASE_URL, "/sitemaps/locations-sitemap.xml"))

    # ----- BLOG SITEMAP (all blog posts + pagination) -----
    blog_urls = [urljoin(BASE_URL, "/blog")]
    for blog in blogs_data:
        blog_urls.append(urljoin(BASE_URL, f"/blog/{blog['slug']}"))
    for page in [2, 3, 4, 5, 6, 7, 8, 9]:
        blog_urls.append(urljoin(BASE_URL, f"/blog/page/{page}"))
    generate_sitemap_xml(blog_urls, "blog-sitemap.xml")
    sitemap_index_urls.append(urljoin(BASE_URL, "/sitemaps/blog-sitemap.xml"))

    # ----- CORE PAGES SITEMAP (home, about, services, contact, faq, support, resources, all /cities/*) -----
    core_urls = [
        urljoin(BASE_URL, "/"),
        urljoin(BASE_URL, "/about"),
        urljoin(BASE_URL, "/services"),
        urljoin(BASE_URL, "/contact"),
        urljoin(BASE_URL, "/faq"),
        urljoin(BASE_URL, "/support"),
        urljoin(BASE_URL, "/resources"),
        urljoin(BASE_URL, "/locations"),
        urljoin(BASE_URL, "/cities"),
    ]
    # All Bangalore neighborhood pages under /cities/
    import re
    areas_ts_path = os.path.join(PROJECT_ROOT, "src/data/areas.ts")
    if os.path.exists(areas_ts_path):
        with open(areas_ts_path, 'r', encoding='utf-8') as f:
            areas_ts = f.read()
        slugs = re.findall(r"slug:\s*'([^']+)'", areas_ts)
        for slug in slugs:
            core_urls.append(urljoin(BASE_URL, f"/cities/{slug}"))
    else:
        # Fallback list
        fallback_areas = ['whitefield', 'indiranagar', 'jayanagar', 'btm-layout', 'koramangala', 'hebbal', 'electronic-city', 'marathahalli', 'hsr-layout', 'rajajinagar', 'yelahanka', 'bannerghatta', 'kengeri', 'mysore-road', 'jalahalli', 'sadashivanagar', 'malleshwaram', 'rt-nagar', 'kammanahalli', 'shivajinagar', 'brigade-road', 'mg-road', 'ulsoor', 'hal', 'domlur', 'bellandur', 'kadubeesanahalli', 'panathur', 'hoodi', 'itpl', 'kr-puram', 'ramamurthy-nagar', 'banaswadi', 'hrbr-layout', 'kalyan-nagar', 'lingarajapuram', 'wilson-garden', 'j-p-nagar', 'btm', 'madiwala', 'ejipura', 'sanjaynagar', 'mahalakshmipuram', 'mathikere', 'kasturi-nagar', 'vimanapura', 'bommanahalli', 'kannur', 'bagalur', 'yelahanka-new-town', 'sahakara-nagar', 'kodigehalli', 'dasarahalli', 'nagasandra', 'mahalakshmi', 'subramanyapura', 'uttarahalli', 'kempapura', 'cox-town', 'richmond-town', 'city-market', 'girinagar', 'gottigere', 'horamavu', 'puttenahalli', 'yeshwantpur', 'hmt-layout', 'palace-guttahalli', 'subramanyanagar', 'prakash-nagar', 'vinayaka-layout', 'padmanabha-nagar', 'chikkalsandra', 'kumaraswamy-layout', 'andrahalli', 'pattabiram-nagar', 'hosahalli', 'nayandahalli', 'kaggalipura', 'bengaluru-south', 'bengaluru-north', 'bengaluru-east', 'bengaluru-west']
        for slug in fallback_areas:
            core_urls.append(urljoin(BASE_URL, f"/cities/{slug}"))
    generate_sitemap_xml(core_urls, "core-sitemap.xml")
    sitemap_index_urls.append(urljoin(BASE_URL, "/sitemaps/core-sitemap.xml"))

    # ----- MAIN SITEMAP INDEX -----
    sitemap_index_root = ET.Element("sitemapindex", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for sitemap_url in sorted(set(sitemap_index_urls)):
        sitemap_elem = ET.SubElement(sitemap_index_root, "sitemap")
        loc = ET.SubElement(sitemap_elem, "loc")
        loc.text = sitemap_url
        lastmod = ET.SubElement(sitemap_elem, "lastmod")
        lastmod.text = CURRENT_DATE

    tree = ET.ElementTree(sitemap_index_root)
    ET.indent(tree, space="  ", level=0)
    tree.write(os.path.join(PUBLIC_DIR, "sitemap-index.xml"), encoding='utf-8', xml_declaration=True)
    print("Generated sitemap-index.xml")

    update_robots_txt(urljoin(BASE_URL, "/sitemap-index.xml"))
    print("Updated robots.txt with sitemap index reference.")
    print("Sitemap generation complete.")

if __name__ == "__main__":
    main()