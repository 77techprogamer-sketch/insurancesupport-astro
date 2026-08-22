import json

with open('/c/Users/A/Desktop/insurancesupport-astro/src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# --- How to Appeal a Rejected Insurance Claim in India ---
appeal_guide_slug = "how-to-appeal-rejected-insurance-claim-india-2026"
lsi_phrases = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization"]
appeal_guide_tags_to_add = ["medical insurance claim denied", "term plan claim rejected", "cashless claim pre-authorization", "claim appeal guide"]

for b in blogs:
    if b["slug"] == appeal_guide_slug:
        c = b["content"]
        
        # Add to tags
        tags = b.get("tags", [])
        for t in appeal_guide_tags_to_add:
            if t not in tags:
                tags.append(t)
        b["tags"] = tags

        # Inject into content - the content in JSON has literal \n characters
        anchor = "This guide gives you the exact step-by-step process to fight back and get your claim paid.\n\n"
        lsi_sentence = " Whether you are dealing with a medical insurance claim denied situation, a term plan claim rejected issue, or a cashless claim pre-authorization refusal, understanding the right appeal mechanism is crucial to securing your settlement.\n\n"
        
        if anchor in c and "medical insurance claim denied" not in c:
            b["content"] = c.replace(anchor, anchor + lsi_sentence, 1)
            print(f"Injected LSI keywords into {appeal_guide_slug}")
        elif "medical insurance claim denied" in c:
            print(f"LSI keywords already present in {appeal_guide_slug}")
        else:
            print(f"Anchor not found for {appeal_guide_slug}, trying alternate insertion")
            alt_anchor = "IRDAI data shows that 15-20% of claims are initially rejected, but a significant percentage of those are approved on appeal.\n\n"
            if alt_anchor in c:
                b["content"] = c.replace(alt_anchor, alt_anchor + lsi_sentence, 1)
                print(f"Injected LSI via alternate anchor into {appeal_guide_slug}")
            else:
                print(f"Could not find any suitable anchor for {appeal_guide_slug}")
        break

with open('/c/Users/A/Desktop/insurancesupport-astro/src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print("Script completed.")
