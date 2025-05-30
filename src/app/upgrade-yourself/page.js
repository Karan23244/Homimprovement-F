import HomeInsights from "@/Components/User/HomeInsights";
import UpgradeYourself from "@/Components/User/UpgradeYourself";
// This function runs server-side when the page is requested
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
export default async function AboutPage() {
  return (
    <>
      <UpgradeYourself />
    </>
  );
}
