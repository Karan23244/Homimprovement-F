// app/terms-and-condition/page.tsx (if using App Router structure)
import TermsAndConditions from "@/Components/Common/Terms";

// This function runs server-side when the page is requested
export async function generateMetadata() {
  return {
    openGraph: {
      url: "https://homimprovement.com/terms-and-condition",
    },
    alternates: {
      canonical: "https://homimprovement.com/terms-and-condition",
    },
  };
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
