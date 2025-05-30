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

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function AboutPage() {
  try {
    const postsRes = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store", // Ensures fresh data each request (SSR)
    });
    const postsJson = await postsRes.json();
    const allPublishedPosts = postsJson.data.filter(
      (post) => post.blog_type === "published"
    );

    return <HomeInsights posts={allPublishedPosts} />;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <HomeInsights posts={[]} />;
  }
}
