<?php
// This is a diagnostic script saved for your use
// It will output results into an HTML page with tables summarizing the SEO health
// Run via: php scripts/seo-diagnostic.php > seo-report.html
// Or run via node by piping the output
?>
<?php
echo "=== SEO DIAGNOSTIC SCRIPT ===\n";
echo "Run this via Node.js, curl, or browser for full analysis\n";
echo str_repeat("-", 50) . "\n\n";

echo "Section: robots.txt\n";
$robotsContent = file_get_contents("https://insurancesupport.online/robots.txt");
echo $robotsContent . "\n\n";

echo "Section: sitemap.xml URL count\n";
$sitemapContent = file_get_contents("https://insurancesupport.online/sitemap.xml");
$urlCount = substr_count($sitemapContent, "<url><loc>");
echo "Total URLs in sitemap.xml: " . $urlCount . "\n\n";

echo "Section: Bing IndexNow key file check\n";
$keyFile = file_get_contents("https://insurancesupport.online/71a80a3568ae5d1d945fda3ef57fe18e.txt");
echo "IndexNow key content: " . $keyFile . "\n";

echo "Section: Homepage canonical and meta verification\n";
$homepageHTML = file_get_contents("https://insurancesupport.online/");
preg_match("/<link rel='canonical' href='([^']+)'/", $homepageHTML, $matches);
if (!$matches) {
    preg_match('/<link rel="canonical" href="([^"]+)"/', $homepageHTML, $matches);
}
echo "Homepage canonical URL: " . ($matches[1] ?? 'NOT FOUND') . "\n";

preg_match('/<meta name="msvalidate.01" content="([^"]+)"/', $homepageHTML, $msMatch);
echo "Bing verification meta tag present: " . (isset($msMatch[1]) ? $msMatch[1] : 'NO') . "\n";

preg_match('/<meta name="google-site-verification" content="([^"]+)"/', $homepageHTML, $gscMatch);
echo "GSC verification meta tag present: " . (isset($gscMatch[1]) ? $gscMatch[1] : 'NO') . "\n";

echo "\nSection: Sample page structured data check\n";
$blogHTML = file_get_contents("https://insurancesupport.online/blog/how-to-appeal-rejected-insurance-claim-india-2026");
preg_match('/<script type="application\/ld\+json">([^<]+)<\/script>/', $blogHTML, $sdMatch);
if (isset($sdMatch[1])) {
    echo "Found JSON-LD structured data (showing first 200 chars):\n";
    $decoded = json_decode($sdMatch[1], true);
    if ($decoded && isset($decoded['@type'])) {
        echo "Schema type: " . $decoded['@type'] . "\n";
        echo "Has datePublished: " . (isset($decoded['datePublished']) ? 'YES' : 'NO') . "\n";
        echo "Has dateModified: " . (isset($decoded['dateModified']) ? 'YES (' . $decoded['dateModified'] . ')' : 'NO') . "\n";
        echo "Has mainEntityOfPage: " . (isset($decoded['mainEntityOfPage']) ? 'YES' : 'NO') . "\n";
        echo "Has author: " . (isset($decoded['author']) ? (is_array($decoded['author']) ? $decoded['author']['name'] : $decoded['author']) : 'NO') . "\n";
        echo "Has publisher: " . (isset($decoded['publisher']) ? 'YES' : 'NO') . "\n";
    }
} else {
    echo "No JSON-LD structured data found on blog page\n";
}

echo "\nDone.\n";
?>