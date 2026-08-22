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
            insertion_text = insertion_text_template.format(lsi_phrases=', '.join(f'"{p}"' for p in lsi_phrases))
            updated_content = content[:match.end()] + insertion_text + content[match.end():]
            print(f"Injected LSI for {slug}")
        else:
            print(f"Warning: Insertion pattern not found for {slug}. Skipping content injection.")
    else:
        print(f"LSI keywords already present in content for {slug}. Skipping content injection.")
    return updated_content

# --- LIC Claim Rejection: How to Appeal and Get Your Money Back in 2026 ---
lic_slug = "lic-claim-rejection-appeal-guide-2026"
lic_lsi_phrases = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization"]
lic_insertion_pattern = r"(If you are reading this, chances are you or someone you know has received a claim rejection letter from LIC\. This article will walk you through exactly how to respond, appeal, and ultimately get your rightful claim paid\.\\n\\n)"
lic_insertion_text_template = r"**As an IRDAI-certified insurance advisor (Reg No: 0149161D) with 25+ years of experience recovering over ₹50 Cr in rejected claims, I\'ve seen firsthand how proper appeals can reverse wrongful denials.** Whether you are dealing with a {lsi_phrases[0]}, a {lsi_phrases[1]}, or a {lsi_phrases[2]} refusal, the appeal process remains fundamentally the same.\\n\\n---"
lic_tags_to_add = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization", "claim recovery tips"]

# --- Insurance Claim Rejection Rates in India 2026: Complete Data by Insurer ---
rejection_rate_slug = "insurance-claim-rejection-rate-india-2026-data"
rejection_rate_lsi_phrases = ["term plan claim rejected", "medical insurance claim denied"]
rejection_rate_insertion_pattern = r"(Understanding claim rejection rates helps Indian consumers choose the right insurer\.)"
rejection_rate_insertion_text_template = r" Whether a {lsi_phrases[0]} affects your retirement planning or a {lsi_phrases[1]} disrupts your treatment financing, knowing the data helps you pick insurers with lower denial patterns."
rejection_rate_tags_to_add = ["term plan claim rejected", "medical insurance claim denied", "claim denial reasons", "insurance claim rejected India"]

# --- How to Appeal a Rejected Insurance Claim in India: Complete 2026 Guide ---
appeal_guide_slug = "how-to-appeal-rejected-insurance-claim-india-2026"
appeal_guide_lsi_phrases = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization"]
appeal_guide_insertion_pattern = r"(This comprehensive guide walks you through the exact steps to appeal a rejected insurance claim in India)"
appeal_guide_insertion_text_template = r", covering scenarios like {lsi_phrases[0]} cases, {lsi_phrases[1]} situations, and {lsi_phrases[2]} refusal appeals."
appeal_guide_tags_to_add = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization", "claim appeal guide"]


for i, blog in enumerate(blogs):
    if blog.get("slug") == lic_slug:
        blog["content"] = inject_lsi_keywords(
            blog["content"],
            lic_slug,
            lic_lsi_phrases,
            lic_insertion_pattern,
            lic_insertion_text_template.format(lsi_phrases=lic_lsi_phrases), # Pass the phrases for formatting
            lic_tags_to_add
        )
    elif blog.get("slug") == rejection_rate_slug:
        blog["content"] = inject_lsi_keywords(
            blog["content"],
            rejection_rate_slug,
            rejection_rate_lsi_phrases,
            rejection_rate_insertion_pattern,
            rejection_rate_insertion_text_template.format(lsi_phrases=rejection_rate_lsi_phrases), # Pass the phrases for formatting
            rejection_rate_tags_to_add
        )
    elif blog.get("slug") == appeal_guide_slug:
        blog["content"] = inject_lsi_keywords(
            blog["content"],
            appeal_guide_slug,
            appeal_guide_lsi_phrases,
            appeal_guide_insertion_pattern,
            appeal_guide_insertion_text_template.format(lsi_phrases=appeal_guide_lsi_phrases), # Pass the phrases for formatting
            appeal_guide_tags_to_add
        )

# Write back
with open('/c/Users/A/Desktop/insurancesupport-astro/src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print("\\nAll LSI keyword updates completed successfully!")
