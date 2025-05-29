import Disclaimer from "@/Components/Common/Disclaimer";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    title: "Disclaimer | Information Use at HomImprovement",
    description:
      "Read the HomImprovement.com disclaimer to understand how we present information. Learn about limitations of liability, accuracy, and third-party content use.",
    openGraph: {
      url: "https://homimprovement.com/disclaimer",
    },
    alternates: {
      canonical: "https://homimprovement.com/disclaimer",
    },
  };
}
export default async function DisclaimerPage() {
  return (
    <>
      <Disclaimer />
    </>
  );
}
