import Disclaimer from "@/Components/Common/Disclaimer";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
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
