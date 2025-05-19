import PrivacyPolicy from "@/Components/Common/Privacy_policy";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    openGraph: {
      url: "https://homimprovement.com/privacy-policy",
    },
    alternates: {
      canonical: "https://homimprovement.com/privacy-policy",
    },
  };
}

export default async function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
