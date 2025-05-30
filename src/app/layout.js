// src/app/layout.js
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/Hero.webp" type="image/webp" />

        {/* Schema JSON-LD */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <meta name="lhverifycode" content="32dc01246faccb7f5b3cad5016dd5033" />
        <meta name="fo-verify" content="a98b21b4-ddf9-40a6-a1ea-00d196380a4d" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGLXVJCS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

        {/* GTM - Lazy load using lazyOnload for better performance */}
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGLXVJCS');`,
          }}
        />

        {/* Skimlinks - Also lazy load */}
        <Script
          id="skimlinks"
          src="https://s.skimresources.com/js/285761X1772273.skimlinks.js"
          strategy="lazyOnload"
        />

        {/* Optional: Use requestIdleCallback for ultra-low priority */}
        <Script id="defer-scripts" strategy="afterInteractive">
          {`
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                const skim = document.createElement('script');
                skim.src = "https://s.skimresources.com/js/285761X1772273.skimlinks.js";
                skim.async = true;
                document.body.appendChild(skim);
              });
            }
          `}
        </Script>

        {/* Minimal navbar, postpone fetch to client or hydrate */}
        <Navbar />
        {children}
        <ScrollButtons />
        <SubscribePopup />
        <Subscribe />
        <Footer />
      </body>
    </html>
  );
}
