// next.config.js
const blogRedirects = [
  {
    from: "/smart-home-technology/why-smart-home-technology-works-best-with-built-in-wifi",
    to: "/upgrade-yourself/smart-home-technology/built-in-wifi-smart-home",
  },
  {
    from: "/smart-home-technology/abb-exec-on-the-future-of-smart-buildings-smart-homes",
    to: "/upgrade-yourself/smart-home-technology/abb-smart-buildings",
  },
  {
    from: "/smart-home-technology/how-much-is-smart-home-privacy-worth",
    to: "/upgrade-yourself/smart-home-technology/smart-home-privacy",
  },
  {
    from: "/smart-home-technology/why-the-smart-home-market-needs-a-killer-app",
    to: "/upgrade-yourself/smart-home-technology/killer-app-needed",
  },
  {
    from: "/smart-home-technology/iotas-brings-smart-home-technology-experience-to-apartments",
    to: "/upgrade-yourself/smart-home-technology/iotas-smart-home-apartments",
  },
  {
    from: "/smart-home-technology/realizing-the-smart-home-with-matter",
    to: "/upgrade-yourself/smart-home-technology/smart-home-with-matter",
  },
  {
    from: "/smart-home-technology/radar-sensors-improve-smart-home-security-safety-comfort-and-more",
    to: "/upgrade-yourself/smart-home-technology/radar-sensors-benefits",
  },
  {
    from: "/smart-home-technology/smart-home-spending-remains-strong-despite-cost-of-living-crisis",
    to: "/upgrade-yourself/smart-home-technology/smart-home-demand-2025",
  },
  {
    from: "/smart-home-technology/smart-products-become-smarter-with-right-approach",
    to: "/upgrade-yourself/smart-home-technology/smart-products-evolve-with-right-approach",
  },
  {
    from: "/smart-home-technology/using-real-time-ai-to-secure-smart-home-device-data",
    to: "/upgrade-yourself/smart-home-technology/real-time-ai-for-smart-home-devices",
  },
  {
    from: "/upgrade-yourself/smart-home-technology/the-rise-of-home-robots-ai-home-robots-for-home-use",
    to: "/upgrade-yourself/smart-home-technology/ai-home-robots",
  },
  {
    from: "/upgrade-yourself/smart-home-technology/future-of-smart-homes-generative-ai-for-personalization",
    to: "/upgrade-yourself/smart-home-technology/future-of-smart-homes",
  },
  {
    from: "/upgrade-yourself/smart-home-technology/emotion-sensing-smart-homes",
    to: "/upgrade-yourself/smart-home-technology/emotion-sensing-smart-homes",
  },
  {
    from: "/upgrade-yourself/smart-home-technology/rental-friendly-smart-home-security-systems",
    to: "/upgrade-yourself/smart-home-technology/rental-friendly-smart-home-security-systems",
  },
  {
    from: "/smart-home-technology/rental-friendly-smart-home-security-systems",
    to: "/upgrade-yourself/smart-home-technology",
  },
  {
    from: "/home-insights/how-to",
    to: "/home-insights/how-to-guides",
  },
  {
    from: "/home-insights/vs",
    to: "/home-insights/comparisons",
  },
  {
    from: "/home-insights/how-to",
    to: "/home-insights/how-to-guides",
  },
  {
    from: "/home-insights/reviews",
    to: "/home-insights/product-reviews",
  },

  // Add more here
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["homimprovement.com", "localhost"],
  },
  async redirects() {
    return blogRedirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
