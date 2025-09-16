import HomeInsights from "@/Components/User/HomeInsights";

export async function generateMetadata() {
  return {
    title: "Essential Home Maintenance Tips for Every Homeowner ",
    description:
      "Get the latest product reviews, practical how-to guides, and side-by-side comparisons. Check out our best picks and amazing deals to save money today!",
    openGraph: {
      title: "Essential Home Maintenance Tips for Every Homeowner ",
      description:
        "Get the latest product reviews, practical how-to guides, and side-by-side comparisons. Check out our best picks and amazing deals to save money today!",
      type: "article",
      url: "https://homimprovement.com/home-insights",
    },
    alternates: {
      canonical: "https://homimprovement.com/home-insights",
    },
    links: [
      {
        rel: "preload",
        href: "/homeinsights.webp",
        as: "image",
        type: "image/webp",
      },
    ],
  };
}

const baseUrl = process.env.NEXT_PUBLIC_WP_URL;

export default async function HomePage() {
  try {
    const postsRes = await fetch(
      `${baseUrl}/wp-json/wp/v2/posts?_embed&per_page=50`,
      { cache: "no-store" } // always fetch fresh data (SSR)
    );

    if (!postsRes.ok) {
      console.error("Failed to fetch posts:", postsRes.statusText);
      return <HomeInsights posts={[]} />;
    }

    const posts = await postsRes.json();

    // Normalize WordPress post structure → your design format
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      seoDescription: post.excerpt.rendered.replace(/<[^>]+>/g, ""), // strip HTML tags
      featured_image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories: post._embedded?.["wp:term"]?.[0]?.map((cat) => ({
        category_name: cat.name,
        category_type: "category",
      })),
      Custom_url: post.slug,
    }));

    return <HomeInsights posts={formattedPosts} />;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <HomeInsights posts={[]} />;
  }
}
