
import asyncio
from playwright.async_api import async_playwright

async def debug_svgs(page):
    await page.set_viewport_size({"width": 1280, "height": 800})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    svg_info = await page.locator('svg').evaluate_all("""
        (svgs) => svgs.map(svg => {
            const parent = svg.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            const svgRect = svg.getBoundingClientRect();
            return {
                svgWidth: svgRect.width,
                svgHeight: svgRect.height,
                parentWidth: parentRect ? parentRect.width : 0,
                parentHeight: parentRect ? parentRect.height : 0,
                parentClass: parent ? parent.className : '',
                html: svg.outerHTML.slice(0, 200)
            };
        })
    """)
    
    zero_parent = [s for s in svg_info if s['parentWidth'] == 0 and s['parentHeight'] == 0]
    print("SVGs with zero parent rect:")
    for s in zero_parent:
        print("  " + str(s['parentClass']) + " - " + str(s['html'][:100]))
    
    print("\nTotal SVGs: " + str(len(svg_info)))
    print("Zero parent rects: " + str(len(zero_parent)))

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_svgs(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
