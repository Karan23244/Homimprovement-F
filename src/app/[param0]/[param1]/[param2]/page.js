
// src/app/[param1]/[param2]/page.js
import FullPost from "@/Components/User/FullPost";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { param0, param1, param2 } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/posts/${param1}/${param2}`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    const json = await res.json();
    const post = json.data;
    const schemaJSON = post.schema ? JSON.stringify(post.schema) : "";
    return {
      title: post?.seoTitle || "Blog Post",
      description: post?.seoDescription || "Read the full blog post.",
      openGraph: {
        title: post?.seoTitle,
        description: post?.seoDescription,
        type: "article",
        url: `${API_URL}/${param0}/${param1}/${param2}`,
        images: post?.featured_image
          ? [`${API_URL}/${post.featured_image}`]
          : [],
      },
      alternates: {
        canonical: `${API_URL}/${param0}/${param1}/${param2}`,
      },
      // ✅ Add this if you want to use it later in your component
      customSchema: schemaJSON,
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Blog Post",
      description: "Unable to load metadata",
    };
  }
}
export default async function Page({ params }) {
  const { param1, param2 } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/posts/${param1}/${param2}`, {
      next: { revalidate: 3600 }, // ISR: optional
    });
    const json = await res.json();
    return <FullPost param1={param1} param2={param2} post={json.data} />;
  } catch (error) {
    return (
      <>
        <Script>
          <Script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        </Script>

        <FullPost
          param1={param1}
          param2={param2}
          post={null}
          error="Fetch error"
        />
      </>
    );
  }
}
