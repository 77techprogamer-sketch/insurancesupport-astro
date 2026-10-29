
import asyncio
from playwright.async_api import async_playwright

async def debug_svgs(page):
    await page.set_viewport_size({"width": 1280, "height": 800})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=120000)
    
    svg_info = await page.locator('svg').evaluate_all("""
        (svgs) => svgs.map(svg => {
            const parent = svg.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            const svgRect = svg.getBoundingClientRect();
            const style = getComputedStyle(svg);
            const parentStyle = parent ? getComputedStyle(parent) : null;
            const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
            const parentVisible = parentStyle ? (parentStyle.display !== 'none' && parentStyle.visibility !== 'hidden' && parentStyle.opacity !== '0') : true;
            return {
                svgWidth: svgRect.width,
                svgHeight: svgRect.height,
                parentWidth: parentRect ? parentRect.width : 0,
                parentHeight: parentRect ? parentRect.height : 0,
                isVisible: isVisible && parentVisible,
                parentClass: parent ? parent.className : '',
                svgClass: svg.className.baseVal || '',
                html: svg.outerHTML.slice(0, 150)
            };
        })
    """)
    
    visible = [s for s in svg_info if s['isVisible']]
    print(f"Total SVGs: {len(svg_info)}, Visible: {len(visible)}")
    
    oversized = [s for s in visible if s['parentWidth'] > 200 or s['parentHeight'] > 200 or s['parentWidth'] <= 0 or s['parentHeight'] <= 0]
    print(f"Oversized/zero: {len(oversized)}")
    
    for s in oversized:
        print(f"  Parent: {s['parentClass']} | Parent size: {s['parentWidth']}x{s['parentHeight']} | SVG: {s['svgClass']} | HTML: {s['html'][:100]}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_svgs(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
