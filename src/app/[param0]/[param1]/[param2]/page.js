// // src/app/[param1]/[param2]/page.js
// import FullPost from "@/Components/User/FullPost";
// import axios from "axios";
// import Head from "next/head";
// // DYNAMIC METADATA FUNCTION
// export async function generateMetadata({ params }) {
//   const { param0, param1, param2 } = await params;
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await axios.get(`${API_URL}/api/posts/${param1}/${param2}`);
//     const post = res.data.data;
//     return {
//       title: post?.seoTitle,
//       description: post?.seoDescription,
//       openGraph: {
//         title: post?.seoTitle,
//         description: post?.seoDescription,
//         type: "article",
//         url: `${API_URL}/${param0}/${param1}/${param2}`,
//         images: post?.featured_image
//           ? [`${API_URL}/${post.featured_image}`]
//           : [],
//       },
//       alternates: {
//         canonical: `${API_URL}/${param0}/${param1}/${param2}`,
//       },
//     };
//   } catch (error) {
//     console.error("Metadata fetch error:", error);
//     return {
//       title: "Blog Post",
//       description: "Unable to load metadata",
//     };
//   }
// }

// // DEFAULT PAGE RENDER
// export default async function Page({ params }) {
//   const { param1, param2 } = await params;
//   return (
//     <>
//       <FullPost param2={param2} param1={param1} />
//     </>
//   );
// }

// src/app/[param1]/[param2]/page.js
import FullPost from "@/Components/User/FullPost";
export async function generateMetadata({ params }) {
  const { param0, param1, param2 } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/posts/${param1}/${param2}`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    const json = await res.json();
    const post = json.data;

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
      <FullPost
        param1={param1}
        param2={param2}
        post={null}
        error="Fetch error"
      />
    );
  }
}
