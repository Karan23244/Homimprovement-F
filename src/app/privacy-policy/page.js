import PrivacyPolicy from "@/Components/Common/Privacy_policy";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    title: "Privacy Policy | How HomImprovement Protects Your Data",
    description:
      "Learn how HomImprovement collects, uses, and safeguards your personal information. Your privacy is our priority - read our full privacy policy here.",
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
