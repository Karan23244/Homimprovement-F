// src/app/layout.js
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import ScrollButtons from "@/Components/Common/ScrollButton";
import Subscribe from "@/Components/Common/Subscribe";
import SubscribePopup from "@/Components/Common/Popup";
import "./globals.css";

  export const metadata = {
    title: "Home Improvement Ideas & Design | HomImprovement",
    description:
      "Upgrade your home with the best home improvement tips & interior design ideas. Get inspired with DIY projects, décor trends, and start your dream home today!",
    keywords:
      "Home improvement,Home renovation tips,Interior design ideas,Home decor inspiration, House renovation,home improvement ideas",
    openGraph: {
      title: "Home Improvement Ideas & Design | HomImprovement",
      description:
        "Upgrade your home with the best home improvement tips & interior design ideas. Get inspired with DIY projects, décor trends, and start your dream home today!",
      type: "website",
      url: "https://homimprovement.com",
    },
    alternates: {
      canonical: "https://homimprovement.com",
    },
    icons: {
      icon: "/favicon.webp", // or .ico, .png, etc.
    },
  };  

export default async function RootLayout({ children }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";

  const categoriesRes = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });
  const postsRes = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

  const categories = await categoriesRes.json();
  const posts = await postsRes.json();

  return (
    <html lang="en">
      <body>
        <Navbar categories={categories.data} posts={posts.data} />
        {/* Only render children; don't include UserHome here */}
        {children}
        <ScrollButtons />
        <SubscribePopup />
        <Subscribe />
        <Footer />
      </body>
    </html>
  );
}
