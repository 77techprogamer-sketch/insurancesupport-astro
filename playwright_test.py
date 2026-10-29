
import asyncio
from playwright.async_api import async_playwright

async def test_viewport(page, width, height, name):
    """Test a single viewport."""
    await page.set_viewport_size({"width": width, "height": height})
    await page.goto("https://insurancesupport.online/?verify=mmit-sha", wait_until="domcontentloaded", timeout=60000)
    
    results = {"viewport": name, "width": width, "height": height, "passed": True, "errors": []}
    
    # 1. No horizontal overflow
    overflow = await page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
    if overflow > 1:
        results["passed"] = False
        results["errors"].append(f"Horizontal overflow: {overflow}px")
    
    # 2. Exactly one site header
    header_count = await page.locator('#site-header').count()
    if header_count != 1:
        results["passed"] = False
        results["errors"].append(f"Header count: {header_count} (expected 1)")
    
    # 3. Exactly one footer
    footer_count = await page.locator('footer[role="contentinfo"]').count()
    if footer_count != 1:
        results["passed"] = False
        results["errors"].append(f"Footer count: {footer_count} (expected 1)")
    
    # 4. Exactly one GST banner
    gst_count = await page.locator('.gst-banner').count()
    if gst_count != 1:
        results["passed"] = False
        results["errors"].append(f"GST banner count: {gst_count} (expected 1)")
    
    # 5. No escaped SVG text
    body_text = await page.locator('body').inner_text()
    if '<svg' in body_text or '</svg>' in body_text or '<path' in body_text or 'viewBox=' in body_text:
        results["passed"] = False
        results["errors"].append("Escaped SVG text found in body")
    
    # 6. All VISIBLE SVG containers reasonably bounded
    bad_svgs = await page.locator('svg').evaluate_all("""
        (svgs) => svgs.map(svg => {
            const parent = svg.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            const svgRect = svg.getBoundingClientRect();
            const style = getComputedStyle(svg);
            const parentStyle = parent ? getComputedStyle(parent) : null;
            // Only check visible SVGs
            const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
            const parentVisible = parentStyle ? (parentStyle.display !== 'none' && parentStyle.visibility !== 'hidden' && parentStyle.opacity !== '0') : true;
            return {
                svgWidth: svgRect.width,
                svgHeight: svgRect.height,
                parentWidth: parentRect ? parentRect.width : 0,
                parentHeight: parentRect ? parentRect.height : 0,
                isVisible: isVisible && parentVisible,
                parentClass: parent ? parent.className : '',
                html: svg.outerHTML.slice(0, 150)
            };
        }).filter(svg => 
            svg.isVisible && (
                svg.svgWidth <= 0 || 
                svg.svgHeight <= 0 || 
                svg.parentWidth <= 0 || 
                svg.parentHeight <= 0 || 
                svg.parentWidth > 200 || 
                svg.parentHeight > 200
            )
        )
    """)
    if bad_svgs:
        results["passed"] = False
        results["errors"].append(f"Oversized visible SVG containers: {len(bad_svgs)} found")
    
    # 7. Mobile contact bar fixed on mobile, hidden on desktop
    if width < 768:  # mobile
        sticky_bar = page.locator('.fixed.bottom-0.left-0.right-0')
        if await sticky_bar.count() == 0:
            results["passed"] = False
            results["errors"].append("Mobile sticky bar not found on mobile")
        else:
            is_fixed = await sticky_bar.evaluate("el => getComputedStyle(el).position === 'fixed'")
            if not is_fixed:
                results["passed"] = False
                results["errors"].append("Mobile sticky bar not fixed")
    else:  # desktop
        sticky_bar = page.locator('.fixed.bottom-0.left-0.right-0')
        if await sticky_bar.count() > 0:
            is_hidden = await sticky_bar.evaluate("el => getComputedStyle(el).display === 'none'")
            if not is_hidden:
                results["passed"] = False
                results["errors"].append("Mobile sticky bar visible on desktop")
    
    # 8. No console errors
    console_errors = []
    def handle_console(msg):
        if msg.type == "error":
            console_errors.append(msg.text)
    page.on("console", handle_console)
    await page.wait_for_timeout(1000)
    if console_errors:
        results["passed"] = False
        results["errors"].append(f"Console errors: {console_errors}")
    
    # Screenshot
    await page.screenshot(path=f"screenshot_{name}.png", full_page=True)
    
    return results

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        viewports = [
            (360, 800, "mobile-360"),
            (390, 844, "mobile-390"),
            (768, 1024, "tablet-768"),
            (1280, 800, "desktop-1280"),
            (1440, 900, "desktop-1440"),
        ]
        
        all_results = []
        for width, height, name in viewports:
            print(f"Testing {name} ({width}x{height})...")
            try:
                result = await test_viewport(page, width, height, name)
                all_results.append(result)
                status = "PASS" if result["passed"] else "FAIL"
                print(f"  {status}: {result['errors'] if not result['passed'] else 'All checks passed'}")
            except Exception as e:
                print(f"  ERROR: {e}")
                all_results.append({"viewport": name, "passed": False, "errors": [str(e)]})
        
        await browser.close()
        
        # Summary
        print("\n=== TEST SUMMARY ===")
        passed = sum(1 for r in all_results if r["passed"])
        total = len(all_results)
        print(f"Passed: {passed}/{total}")
        for r in all_results:
            status = "PASS" if r["passed"] else "FAIL"
            print(f"  {r['viewport']}: {status}")
            if not r["passed"]:
                for err in r["errors"]:
                    print(f"    - {err}")
        
        return all_results

if __name__ == "__main__":
    asyncio.run(main())
