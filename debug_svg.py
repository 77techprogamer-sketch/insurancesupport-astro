
import asyncio
from playwright.async_api import async_playwright

async def debug_svgs(page):
    await page.set_viewport_size({"width": 1280, "height": 800})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    svg_info = await page.locator('svg').evaluate_all("""
        (svgs) => svgs.map(svg => {
            const parent = svg.parentElement;
            const parentStyle = parent ? getComputedStyle(parent) : null;
            const svgStyle = getComputedStyle(svg);
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            const svgRect = svg.getBoundingClientRect();
            return {
                svgWidth: svgRect.width,
                svgHeight: svgRect.height,
                parentWidth: parentRect ? parentRect.width : 0,
                parentHeight: parentRect ? parentRect.height : 0,
                svgWidthAttr: svg.getAttribute('width'),
                svgHeightAttr: svg.getAttribute('height'),
                parentClass: parent ? parent.className : '',
                svgClass: svg.className.baseVal || '',
                svgStyleWidth: svgStyle.width,
                svgStyleHeight: svgStyle.height,
                parentStyleWidth: parentStyle ? parentStyle.width : '',
                parentStyleHeight: parentStyle ? parentStyle.height : '',
                html: svg.outerHTML.slice(0, 200)
            };
        })
    """)
    
    for i, info in enumerate(svg_info[:10]):
        print("SVG " + str(i+1) + ":")
        print("  SVG rect: " + str(info['svgWidth']) + "x" + str(info['svgHeight']))
        print("  Parent rect: " + str(info['parentWidth']) + "x" + str(info['parentHeight']))
        print("  SVG width attr: " + str(info['svgWidthAttr']))
        print("  SVG height attr: " + str(info['svgHeightAttr']))
        print("  Parent class: " + str(info['parentClass']))
        print("  SVG class: " + str(info['svgClass']))
        print("  SVG style width: " + str(info['svgStyleWidth']))
        print("  Parent style width: " + str(info['parentStyleWidth']))

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_svgs(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
