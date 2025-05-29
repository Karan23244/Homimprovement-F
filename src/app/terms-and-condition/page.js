// app/terms-and-condition/page.tsx (if using App Router structure)
import TermsAndConditions from "@/Components/Common/Terms";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    title: "Terms & Conditions | Use of HomImprovement Website",
    description:
      "Review the terms and conditions for using HomImprovement.com. Understand your rights, responsibilities, and our policies to ensure a safe and informed experience.",
    openGraph: {
      url: "https://homimprovement.com/terms-and-condition",
    },
    alternates: {
      canonical: "https://homimprovement.com/terms-and-condition",
    },
  };
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
