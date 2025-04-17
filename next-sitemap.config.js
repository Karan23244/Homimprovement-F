// next-sitemap.config.js
const baseUrl = "https://homimprovement.com"; // replace with your domain

module.exports = {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "public", // where sitemap.xml will be created
  additionalPaths: async (config) => {
    // Static routes
    const staticPaths = [
      { loc: `${baseUrl}/`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/about`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/privacy_policy`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/terms_and_condition`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/disclaimer`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/upgrade-yourself/smart-home-technology`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/upgrade-yourself/diy-home-projects`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/upgrade-yourself/interior-design-trends`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/home-insights/reviews`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/home-insights/how-to`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/home-insights/vs`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/home-insights/best`, lastmod: "2025-04-01" },
      { loc: `${baseUrl}/home-insights/deals`, lastmod: "2025-04-01" },
    ];

    // Dynamic blog posts
    const res = await fetch(`${baseUrl}/api/posts`);
    const posts = await res.json();

  const dynamicPaths = posts.data.map((post) => {
    const categorySlug = post?.category_names
    ?.[0] // Assuming you're taking the first category name
    ?.trim()
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    ?.replace(/[^a-z0-9-]/g, "");  // removes special characters

  const urlSlug = post?.Custom_url
    ?.trim()
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    ?.replace(/[^a-z0-9-]/g, ""); // similar sanitization

  return {
    loc: `${baseUrl}/${categorySlug}/${urlSlug}`,
    lastmod: post.updatedAt || "2025-04-01",
  };
});


    return [...staticPaths, ...dynamicPaths];
  },
};
