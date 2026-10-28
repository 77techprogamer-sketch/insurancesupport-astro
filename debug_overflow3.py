
import asyncio
from playwright.async_api import async_playwright

async def debug_overflow(page):
    await page.set_viewport_size({"width": 390, "height": 844})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    # Check header specifically
    header_info = await page.evaluate("""
        () => {
            const header = document.querySelector('#site-header');
            if (!header) return null;
            const style = getComputedStyle(header);
            const rect = header.getBoundingClientRect();
            return {
                width: rect.width,
                left: rect.left,
                right: rect.right,
                style: {
                    display: style.display,
                    flexDirection: style.flexDirection,
                    justifyContent: style.justifyContent,
                    gap: style.gap,
                    paddingLeft: style.paddingLeft,
                    paddingRight: style.paddingRight,
                    overflow: style.overflow,
                    overflowX: style.overflowX,
                    overflowY: style.overflowY,
                }
            };
        }
    """)
    print("Header info:", header_info)
    
    # Check header-actions
    actions_info = await page.evaluate("""
        () => {
            const el = document.querySelector('.header-actions');
            if (!el) return null;
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                width: rect.width,
                left: rect.left,
                right: rect.right,
                style: {
                    display: style.display,
                    flexDirection: style.flexDirection,
                    justifyContent: style.justifyContent,
                    gap: style.gap,
                    paddingLeft: style.paddingLeft,
                    paddingRight: style.paddingRight,
                    overflow: style.overflow,
                    overflowX: style.overflowX,
                    overflowY: style.overflowY,
                }
            };
        }
    """)
    print("Header-actions info:", actions_info)
    
    # Check mobile menu btn
    btn_info = await page.evaluate("""
        () => {
            const el = document.querySelector('#mobile-menu-btn');
            if (!el) return null;
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                width: rect.width,
                left: rect.left,
                right: rect.right,
            };
        }
    """)
    print("Mobile menu btn:", btn_info)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await debug_overflow(page)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
