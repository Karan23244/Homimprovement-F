import UpgradeYourself from "@/Components/User/UpgradeYourself";

const baseUrl = process.env.NEXT_PUBLIC_WP_URL;

export async function generateMetadata() {
  return {
    title:
      "Upgrade Yourself: Smart Home Tech, DIY Projects & Interior Design Trends for a Better Living.",
    description:
      "Explore innovative smart home technology, creative DIY home projects, and the latest interior design trends. Elevate your home with our expert insights and tips!",
    openGraph: {
      title:
        "Upgrade Yourself: Smart Home Tech, DIY Projects & Interior Design Trends for a Better Living.",
      description:
        "Explore innovative smart home technology, creative DIY home projects, and the latest interior design trends. Elevate your home with our expert insights and tips!",
      type: "article",
      url: "https://homimprovement.com/upgrade-yourself",
    },
    alternates: {
      canonical: "https://homimprovement.com/upgrade-yourself",
    },
    links: [
      {
        rel: "preload",
        href: "/upgradeypurself.webp",
        as: "image",
        type: "image/webp",
      },
    ],
  };
}

export default async function UpgradePage() {
  // Fetch posts from WP REST API
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?_embed&per_page=50`, // _embed to include images, per_page limit
    {
      next: { revalidate: 60 }, // ISR caching
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch posts", res.statusText);
    return <div>Error fetching posts</div>;
  }

  const posts = await res.json();

  // Map WordPress format → your design format
  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title.rendered,
    seoDescription: post.excerpt.rendered.replace(/<[^>]+>/g, ""), // strip HTML
    featured_image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    categories: post._embedded?.["wp:term"]?.[0]?.map((cat) => ({
      category_name: cat.name,
      category_type: "category", // WordPress only has categories/tags
    })),
    Custom_url: post.slug,
  }));

  return <UpgradeYourself posts={formattedPosts} />;
}
