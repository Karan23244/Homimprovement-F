import AboutUs from "@/Components/Common/About";
// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    title: "",
    description: "",
    openGraph: {
      url: "https://homimprovement.com/about-us",
    },
    alternates: {
      canonical: "https://homimprovement.com/about-us",
    },
  };
}
export default async function AboutPage() {
  return (
    <>
      <AboutUs />
    </>
  );
}
