
import asyncio
from playwright.async_api import async_playwright

async def debug_overflow(page):
    await page.set_viewport_size({"width": 390, "height": 844})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    # Check for elements with negative margins or overflow
    overflow_elements = await page.evaluate("""
        () => {
            const viewportWidth = document.documentElement.clientWidth;
            const results = [];
            document.querySelectorAll('*').forEach(el => {
                const style = getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                // Check for negative margins
                const ml = parseFloat(style.marginLeft);
                const mr = parseFloat(style.marginRight);
                const pl = parseFloat(style.paddingLeft);
                const pr = parseFloat(style.paddingRight);
                if (ml < 0 || mr < 0 || rect.left < -10 || rect.right > viewportWidth + 10) {
                    results.push({
                        tag: el.tagName,
                        class: el.className,
                        id: el.id,
                        width: rect.width,
                        left: rect.left,
                        right: rect.right,
                        marginLeft: ml,
                        marginRight: mr,
                        paddingLeft: pl,
                        paddingRight: pr,
                        overflowX: style.overflowX,
                        overflowY: style.overflowY
                    });
                }
            });
            return results;
        }
    """)
    print("Elements with negative margins or overflow:")
    for el in overflow_elements[:30]:
        print("  " + str(el['tag']) + " class=" + str(el['class'][:80]) + " id=" + str(el['id']) + " width=" + str(el['width']) + " left=" + str(el['left']) + " right=" + str(el['right']) + " ml=" + str(el['marginLeft']) + " mr=" + str(el['marginRight']) + " pl=" + str(el['paddingLeft']) + " pr=" + str(el['paddingRight']) + " ox=" + str(el['overflowX']) + " oy=" + str(el['overflowY']))

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_overflow(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
