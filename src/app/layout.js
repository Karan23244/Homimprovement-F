import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import ScrollButtons from "@/Components/Common/ScrollButton";
import Subscribe from "@/Components/Common/Subscribe";
import SubscribePopup from "@/Components/Common/Popup";
import Script from "next/script";
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
];

export default async function RootLayout({ children }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";

  const [categoriesRes, postsRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/posts`, { cache: "no-store" }),
  ]);

  const [categoriesData, postsData] = await Promise.all([
    categoriesRes.json(),
    postsRes.json(),
  ]);

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/Hero.webp"
          type="image/webp"
          media="(min-width: 1024px)"
        />
        <link
          rel="preload"
          as="image"
          href="/heromobile.avif"
          type="image/avif"
          media="(max-width: 1023px)"
        />

        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGLXVJCS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

        {/* ✅ Defer GTM using requestIdleCallback */}
        <Script id="gtm-defer" strategy="afterInteractive">
          {`
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                const gtmScript = document.createElement('script');
                gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WGLXVJCS';
                gtmScript.async = true;
                document.head.appendChild(gtmScript);
              });
            }
          `}
        </Script>

        {/* ✅ Render Components */}
        <Navbar categories={categoriesData.data} posts={postsData.data} />
        {children}
        <ScrollButtons />
        <SubscribePopup />
        <Subscribe />
        <Footer />
      </body>
    </html>
  );
}
