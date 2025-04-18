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
    icon: "/favicon.webp",
  },
};
const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Homimprovement",
    url: "https://homimprovement.com/",
    logo: "https://homimprovement.com/headerlogo.webp",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Smart Home Technology",
        item: "https://homimprovement.com/upgrade-yourself/smart-home-technology",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "DIY Home Projects",
        item: "https://homimprovement.com/upgrade-yourself/diy-home-projects",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Interior Design Trends",
        item: "https://homimprovement.com/upgrade-yourself/interior-design-trends",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: "https://homimprovement.com/home-insights/reviews",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How To",
        item: "https://homimprovement.com/home-insights/how-to",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "VS",
        item: "https://homimprovement.com/home-insights/vs",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best",
        item: "https://homimprovement.com/home-insights/best",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://homimprovement.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Deals",
        item: "https://homimprovement.com/home-insights/deals",
      },
    ],
  },
];
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGLXVJCS');`,
          }}
        />
        {/* LH Verify Code */}
        <meta name="lhverifycode" content="32dc01246faccb7f5b3cad5016dd5033" />
        {/* <!-- Organization Schema --> */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGLXVJCS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

        <Navbar categories={categories.data} posts={posts.data} />
        {children}
        <ScrollButtons />
        <SubscribePopup />
        <Subscribe />
        <Footer />
      </body>
    </html>
  );
}
