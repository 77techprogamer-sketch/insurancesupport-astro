import json

# Comprehensive exact-match query clusters from user list
clusters = {
    "status_check": [
        "lic policy status check",
        "lic policy status by policy number",
        "lic policy status check online free",
        "lic policy status check by mobile number",
        "lic policy number check online free",
        "how to check lic policy status without registration",
        "check lic policy status by policy number"
    ],
    "surrender_loan": [
        "how to surrender lic policy",
        "loan against lic policy",
        "lic policy loan interest rate",
        "can i surrender lic policy online",
        "documents required to surrender lic policy",
        "online loan against lic policy",
        "lic policy loan form pdf download"
    ],
    "policy_details": [
        "lic policy details by policy number",
        "lic policy bond download pdf without login",
        "lic policy maturity calculator by policy number",
        "find lic policy details by policy number",
        "lic policy holder name by policy number"
    ],
    "hindi_hinglish": [
        "lic policy band karne ke liye application in hindi",
        "lic policy kya hai in hindi",
        "lic policy ka status kaise check kare",
        "lic policy ki details kaise nikale",
        "lic policy mobile number change online"
    ],
    "plans_children": [
        "amritbaal lic policy details",
        "best lic policy for girl child",
        "jeevan labh lic policy details",
        "kanyadan lic policy calculator",
        "lic policy jeevan utsav 771 plan details"
    ]
}

# Read blogs.json
with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Inject high-intent FAQ section into relevant LIC posts
for b in blogs:
    slug = b['slug']
    if 'lic' in slug:
        content = b.get('content', '')
        
        # Build keyword-rich FAQ block
        faq_injection = """

## Frequently Asked Questions (Exact Search Queries Answered)

### How can I check my LIC policy status by policy number online?
You can check your **lic policy status check online** via the official LIC customer portal or mobile app. Enter your policy number, premium amount, and date of birth to view active status, revival date, and bonus accrual.

### What is the process for loan against LIC policy and current interest rates?
Taking a **loan against lic policy** is available for endowment and money-back plans after 2-3 years of paid premiums. The current **lic policy loan interest rate** typically ranges between 9% to 10% per annum, repayable flexibly.

### How to surrender an LIC policy and calculate surrender value?
To execute a **surrender lic policy** request, submit your original policy bond, KYC documents, canceled cheque, and Form 3510 to your servicing LIC branch. Note that surrendering before 3 years yields zero surrender value.

### How to download LIC policy bond PDF without login?
For quick access to **lic policy bond download pdf without login**, use the LIC Quick Pay portal or registered mobile number authentication via the Customer Portal.

### What are the details of Amritbaal and Jeevan Utsav plans?
The **amritbaal lic policy details** focus on high guaranteed additions for children's higher education, while **lic policy jeevan utsav 771 plan details** offer lifetime guaranteed regular income benefits starting after the premium paying term.
"""
        # Append if not already present
        if "Frequently Asked Questions (Exact Search Queries Answered)" not in content:
            b['content'] = content + faq_injection
            print(f'Injected keyword FAQ block into: {slug}')

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print('Successfully updated blogs.json with exact-match keyword clusters!')
