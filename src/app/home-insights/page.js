import HomeInsights from "@/Components/User/HomeInsights";
// This function runs server-side when the page is requested
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
export default async function AboutPage() {
  return (
    <>
      <HomeInsights />
    </>
  );
}
