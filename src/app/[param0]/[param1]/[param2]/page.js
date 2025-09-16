// // src/app/[param1]/[param2]/page.js
// import FullPost from "@/Components/User/FullPost";
// import { notFound } from "next/navigation";

// export async function generateMetadata({ params }) {
//   const { param1, param2 } = await params;
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(`${API_URL}/api/posts/${param1}/${param2}`, {
//       cache: "no-store", // disable cache for fresh metadata
//     });

//     // if (!res.ok) {
//     //   return {
//     //     title: "Not Found",
//     //     description: "This blog post is not available.",
//     //   };
//     // }

//     const json = await res.json();
//     const post = json.data;
//     const schemaJSON = post?.schema ? JSON.stringify(post.schema) : "";

//     return {
//       title: post?.seoTitle || "Blog Post",
//       description: post?.seoDescription || "Read the full blog post.",
//       openGraph: {
//         title: post?.seoTitle,
//         description: post?.seoDescription,
//         type: "article",
//         url: `${API_URL}/${param1}/${param2}`,
//         images: post?.featured_image
//           ? [`${API_URL}/${post.featured_image}`]
//           : [],
//       },
//       alternates: {
//         canonical: `${API_URL}/${param1}/${param2}`,
//       },
//       // If you want to inject schema in your component
//       customSchema: schemaJSON,
//     };
//   } catch (error) {
//     console.error("Metadata fetch error:", error);
//     return {
//       title: "Error",
//       description: "Unable to load metadata",
//     };
//   }
// }

// export default async function Page({ params }) {
//   const { param1, param2 } = await params;
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(`${API_URL}/api/posts/${param1}/${param2}`, {
//       cache: "no-store",
//     });
//     console.log("Fetching post:", `${API_URL}/api/posts/${param1}/${param2}`);
//     console.log("Response status:", res.status);
//     console.log("Response headers:", res);
//     // if (!res.ok) {
//     //   if (res.status === 403 || res.status === 404) {
//     //     notFound(); // 🚫 Show Next.js built-in 404
//     //   }
//     //   throw new Error("Unexpected response from server");
//     // }

//     const json = await res.json();
//     const post = json?.data;

//     return <FullPost param1={param1} param2={param2} post={post} />;
//   } catch (error) {
//     console.log("Page fetch error:", error);
//     return (
//       <div className="flex flex-col h-screen items-center justify-center text-center">
//         <div className="bg-red-100 text-red-600 rounded-xl shadow-md p-6 max-w-lg w-full">
//           <h2 className="text-2xl font-semibold mb-2">
//             Oops! Something went wrong 😕
//           </h2>
//           <p className="text-base text-gray-700">
//             We couldn’t load the blog post right now. Please try again later or check back soon.
//           </p>
//           {/* <button
//             onClick={() => window.location.reload()}
//             className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md transition duration-300">
//             Retry
//           </button> */}
//         </div>
//       </div>
//     );
//   }
// }

// src/app/[param1]/[param2]/page.js
import FullPost from "@/Components/User/FullPost";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { param1, param2 } = params;
  const API_URL = process.env.NEXT_PUBLIC_WP_URL;

  try {
    // Fetch by slug
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/posts?slug=${param2}&_embed`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Not Found",
        description: "This blog post is not available.",
      };
    }

    const posts = await res.json();
    const post = posts[0]; // WP returns an array for slug queries

    if (!post) {
      return {
        title: "Not Found",
        description: "This blog post is not available.",
      };
    }

    return {
      title: post.yoast_head_json?.title || post.title?.rendered || "Blog Post",
      description:
        post.yoast_head_json?.description ||
        post.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
        "Read the full blog post.",
      openGraph: {
        title:
          post.yoast_head_json?.title || post.title?.rendered || "Blog Post",
        description:
          post.yoast_head_json?.description ||
          post.excerpt?.rendered?.replace(/<[^>]+>/g, ""),
        type: "article",
        url: `https://homimprovement.com//${param1}/${param2}`,
        images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
          ? [post._embedded["wp:featuredmedia"][0].source_url]
          : [],
      },
      alternates: {
        canonical: `https://homimprovement.com/${param1}/${param2}`,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Error",
      description: "Unable to load metadata",
    };
  }
}

export default async function Page({ params }) {
  const { param1, param2 } = params;
  const API_URL = process.env.NEXT_PUBLIC_WP_URL;
  console.log(`${API_URL}/wp-json/wp/v2/posts?slug=${param2}&_embed`);
  try {
    // Fetch post by slug
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/posts?slug=${param2}&_embed`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      if (res.status === 403 || res.status === 404) {
        notFound();
      }
      throw new Error("Unexpected response from server");
    }

    const posts = await res.json();
    const post = posts[0]; // WordPress returns array

    if (!post) {
      notFound();
    }

    return <FullPost param1={param1} param2={param2} post={post} />;
  } catch (error) {
    console.error("Page fetch error:", error);
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center">
        <div className="bg-red-100 text-red-600 rounded-xl shadow-md p-6 max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-2">
            Oops! Something went wrong 😕
          </h2>
          <p className="text-base text-gray-700">
            We couldn’t load the blog post right now. Please try again later or
            check back soon.
          </p>
        </div>
      </div>
    );
  }
}
