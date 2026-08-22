import json
import re

# Read the blogs.json file
with open('/c/Users/A/Desktop/insurancesupport-astro/src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Function to safely insert LSI keywords
def inject_lsi_keywords(content, slug, lsi_phrases, insertion_pattern, insertion_text_template, tags_to_add):
    updated_content = content
    # Add LSI keywords to tags
    for blog in blogs:
        if blog.get("slug") == slug:
            current_tags = blog.get("tags", [])
            for tag in tags_to_add:
                if tag not in current_tags:
                    current_tags.append(tag)
            blog["tags"] = current_tags
            break

    # Inject into content if not already present
    if not any(phrase in content for phrase in lsi_phrases):
        match = re.search(insertion_pattern, content)
        if match:
            # Construct the insertion text
            insertion_text = insertion_text_template.format(lsi_phrases=lsi_phrases)
            updated_content = content[:match.end()] + insertion_text + content[match.end():]
            print(f"Injected LSI for {slug}")
        else:
            print(f"Warning: Insertion pattern not found for {slug}. Skipping content injection.")
    else:
        print(f"LSI keywords already present in content for {slug}. Skipping content injection.")
    return updated_content

# --- How to Appeal a Rejected Insurance Claim in India: Complete 2026 Guide ---
appeal_guide_slug = "how-to-appeal-rejected-insurance-claim-india-2026"
appeal_guide_lsi_phrases = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization"]
appeal_guide_insertion_pattern = r"(This guide gives you the exact step-by-step process to appeal a rejected insurance claim in India\.)"
appeal_guide_insertion_text_template = r" Whether you are dealing with a {lsi_phrases[0]} situation, a {lsi_phrases[1]} issue, or a {lsi_phrases[2]} refusal, understanding the right appeal mechanism is crucial to securing your settlement."
appeal_guide_tags_to_add = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization", "claim appeal guide"]

for i, blog in enumerate(blogs):
    if blog.get("slug") == appeal_guide_slug:
        blog["content"] = inject_lsi_keywords(
            blog["content"],
            appeal_guide_slug,
            appeal_guide_lsi_phrases,
            appeal_guide_insertion_pattern,
            appeal_guide_insertion_text_template,
            appeal_guide_tags_to_add
        )

# Write back
with open('/c/Users/A/Desktop/insurancesupport-astro/src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print("\nLSI keyword update for appeal guide completed successfully!")
