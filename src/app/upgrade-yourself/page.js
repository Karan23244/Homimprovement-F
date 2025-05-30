import UpgradeYourself from "@/Components/User/UpgradeYourself";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const res = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 60 }, // optional caching (ISR)
  });
  const json = await res.json();

  const allPublishedPosts = json.data.filter(
    (post) => post.blog_type === "published"
  );

  return <UpgradeYourself posts={allPublishedPosts} />;
}
