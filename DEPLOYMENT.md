# Cloudflare Pages Deployment Manifest - insurancesupport.online
# Target: Production
# Files: 360+ generated pages

# 1. Claim Reversal Microsite (High Conversion)
# /claim-reversal/index.html
# /claim-reversal/*.pdf

# 2. City Pages (Local SEO)
# /cities/bangalore/index.html
# /cities/mumbai/index.html
# /cities/mangalore/index.html
# /cities/udupi/index.html

# 3. Plan Pages (Commercial Intent)
# /plans/tech-term/index.html
# /plans/jeevan-labh/index.html
# /plans/new-pension/index.html

# 4. Competitor Pages (Comparison Intent)
# /alternatives/policybazaar/index.html
# /alternatives/acko/index.html
# /alternatives/star-health/index.html
# /alternatives/hdfc-ergo/index.html
# /alternatives/lic-india/index.html

# DEPLOYMENT COMMANDS
# Run from repository root D:\insurancesupport-astro
# npx wrangler pages deploy . --project-name=insurancesupport-online --branch=main

echo "Deployment manifest generated. Run npx wrangler pages deploy to push changes."