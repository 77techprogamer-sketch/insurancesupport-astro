
import asyncio
from playwright.async_api import async_playwright

async def debug_overflow(page):
    await page.set_viewport_size({"width": 390, "height": 844})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    # Check what's causing overflow
    overflow_info = await page.evaluate("""
        () => {
            const doc = document.documentElement;
            const body = document.body;
            return {
                docScrollWidth: doc.scrollWidth,
                docClientWidth: doc.clientWidth,
                bodyScrollWidth: body.scrollWidth,
                bodyClientWidth: body.clientWidth,
                overflow: doc.scrollWidth - doc.clientWidth
            };
        }
    """)
    print("Overflow info:", overflow_info)
    
    # Find elements wider than viewport
    wide_elements = await page.evaluate("""
        () => {
            const viewportWidth = document.documentElement.clientWidth;
            const results = [];
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width > viewportWidth + 10) {
                    results.push({
                        tag: el.tagName,
                        class: el.className,
                        id: el.id,
                        width: rect.width,
                        left: rect.left,
                        right: rect.right
                    });
                }
            });
            return results;
        }
    """)
    print("\nWide elements:")
    for el in wide_elements[:20]:
        print("  " + str(el['tag']) + " class=" + str(el['class']) + " id=" + str(el['id']) + " width=" + str(el['width']) + " left=" + str(el['left']) + " right=" + str(el['right']))

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_overflow(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
