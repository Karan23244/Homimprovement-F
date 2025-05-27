const baseUrl = "https://homimprovement.com"; // replace with your domain

module.exports = {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "public", // where sitemap.xml will be created
  additionalPaths: async (config) => {
    // Static routes with priority
    const staticPaths = [
      { loc: `${baseUrl}/`, lastmod: "2025-04-01", priority: 1.0 },
      {
        loc: `${baseUrl}/upgrade-yourself`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      { loc: `${baseUrl}/home-insights`, lastmod: "2025-04-01", priority: 0.9 },
      {
        loc: `${baseUrl}/upgrade-yourself/smart-home-technology`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/upgrade-yourself/diy-home-projects`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/upgrade-yourself/interior-design-trends`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/home-insights/product-reviews`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/home-insights/how-to-guides`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/home-insights/comparisons`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/home-insights/best-picks`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/home-insights/deals`,
        lastmod: "2025-04-01",
        priority: 0.9,
      },
      { loc: `${baseUrl}/about-us`, lastmod: "2025-04-01", priority: 0.7 },
      {
        loc: `${baseUrl}/privacy-policy`,
        lastmod: "2025-04-01",
        priority: 0.7,
      },
      {
        loc: `${baseUrl}/terms-and-condition`,
        lastmod: "2025-04-01",
        priority: 0.7,
      },
      { loc: `${baseUrl}/disclaimer`, lastmod: "2025-04-01", priority: 0.7 },
    ];

    // Dynamic blog posts with priority
    const res = await fetch(`${baseUrl}/api/posts`);
    const posts = await res.json();

    const dynamicPaths = posts.data.map((post) => {
      const categoryType = post?.categories[0]?.category_type
        ?.trim()
        ?.toLowerCase()
        ?.replace(/\s+/g, "-")
        ?.replace(/[^a-z0-9-]/g, "");
      const categorySlug = post?.categories[0]?.category_name
        ?.trim()
        ?.toLowerCase()
        ?.replace(/\s+/g, "-")
        ?.replace(/[^a-z0-9-]/g, "");

      const urlSlug = post?.Custom_url?.trim()
        ?.toLowerCase()
        ?.replace(/\s+/g, "-")
        ?.replace(/[^a-z0-9-]/g, "");

      return {
        loc: `${baseUrl}/${categorySlug}/${urlSlug}`,
        lastmod: post.updatedAt || "2025-04-01",
        priority: 0.8,
      };
    });

    return [...staticPaths, ...dynamicPaths];
  },
};
