// /pages/blog/[param2].js
"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import CommentSection from "../Common/Comment";
import "./styles.css";
import usePageTracker from "../Hooks/usePageTracker";
import Image from "next/image";

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}
const FullPost = ({ post, param1, param2 }) => {
  // usePageTracker("blogs");
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(post.content);
  const blogAds = [
    {
      id: "interior-design-ideas-glass-mirrors",
      image: "/toptop_ad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6221&pub_id=469&p1=click_id&source=hi",
    },
    {
      id: "budget-friendly-window-and-door-renovation-ideas",
      image: "/windowad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6259&pub_id=579",
    },
    {
      id: "homeowners-guide-to-going-solar",
      image: "/solarad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6258&pub_id=579",
    },
    {
      id: "budget-friendly-diy-bathroom-makeover-ideas",
      image: "/bathroomad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6260&pub_id=579",
    },
    {
      id: "choose-the-best-roofing-materials",
      image: "/roofad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6261&pub_id=579",
    },
  ];
  const adData = blogAds.find((blog) => blog.id === param2);

  const fetchComments = async () => {
    if (!post?.id) return;
    try {
      const res = await fetch(`${API_URL}/api/comments/${post.id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };
  useEffect(() => {
    if (post) {
      const timer = setTimeout(() => {
        fetchComments();
      }, 3000); // fetch comments after 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      const parser = new DOMParser();
      const contentDocument = parser.parseFromString(
        decodeHtml(post.content || ""),
        "text/html"
      );
      const headings = Array.from(contentDocument.querySelectorAll("h2, h3"));
      const tocData = headings.map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
          id,
          text: heading.textContent,
          level: heading.tagName.toLowerCase(),
        };
      });
      const fetchRelatedBlogs = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/api/posts/related/${post.categories[0].category_name}`
          );
          setRelatedBlogs(res.data.data);
        } catch (err) {
          console.error("Error fetching related blogs:", err);
        }
      };
      setToc(tocData);
      setUpdatedContent(contentDocument.body.innerHTML);
      if (post?.categories?.length > 0) {
        const timer = setTimeout(() => {
          fetchRelatedBlogs();
        }, 3000); // 3 seconds delay
        return () => clearTimeout(timer);
      }
      if (post) {
        const timer = setTimeout(() => {
          fetchComments();
        }, 3000); // fetch comments after 3 seconds delay
        return () => clearTimeout(timer);
      }
    }
  }, [post]);
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("h1, h2, h3");
    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTOCClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return alert("All fields are required!");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, name, comment }),
      });
      if (res.ok) {
        setName("");
        setComment("");
        fetchComments();
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
    setLoading(false);
  };

  const imageUrl = post?.featured_image
    ? `${API_URL}/${post.featured_image}`
    : "";
  const adimageUrl = post?.AdImage ? `${API_URL}/${post.AdImage}` : "";
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const schemaJSON = post?.schema ? JSON.stringify(post?.schema) : "";
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
          <strong className="font-bold">Page Not Found</strong>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.seoTitle || "Blog Post"}</title>
        <meta name="description" content={post.seoDescription || ""} />
        <meta property="og:title" content={post.seoTitle || "Blog Post"} />
        <meta property="og:description" content={post.seoDescription || ""} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJSON }}
        />
      </Head>
      {schemaJSON && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJSON }}
        />
      )}
      <div className="mx-auto px-4 lg:px-8 pt-16">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for Table of Contents */}
          <aside className="hidden lg:block w-1/4 pr-8 ">
            <div className="sticky top-16 p-4 overflow-auto border-r-2 border-black h-screen">
              <h2 className="text-3xl text-center font-semibold text-gray-900 mb-2">
                Table of Contents
              </h2>
              <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
              <ul className="space-y-3">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={`padding-${
                      item.level === "h2"
                        ? "4"
                        : item.level === "h3"
                        ? "8"
                        : "0"
                    }
                      ${
                        activeSection === item.id
                          ? "font-bold text-blue-600"
                          : "text-gray-800"
                      }`}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-blue-800 hover:underline text-lg font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTOCClick(item.id);
                      }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Blog Content */}
          <main className="lg:w-3/5">
            <div className="mb-6">
              <h1 className="lg:text-5xl text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {post.title || "Untitled"}
              </h1>
            </div>

            <div className="flex items-center gap-6 mb-8 text-gray-600">
              <p className="font-semibold text-lg hover:text-indigo-600 transition-colors cursor-default">
                By {post.author_name || "Unknown Author"}
              </p>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium text-lg">
                  {new Date(
                    post.scheduleDate || post.created_at
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={
                  post?.featured_image
                    ? imageUrl
                    : "https://via.placeholder.com/600x400.png?text=No+Image"
                }
                alt={post?.title || "Blog Thumbnail"}
                width={600}
                height={400}
                className="object-cover w-full h-auto"
                priority
                placeholder="blur"
                blurDataURL="/path-to-small-blur-placeholder.png"
              />
            </div>

            <div
              className="custom-html text-gray-700 leading-relaxed prose prose-indigo max-w-none mb-12 min-h-[600px]"
              dangerouslySetInnerHTML={{ __html: updatedContent }}
            />

            <div className="my-5 min-h-[100px]">
              {loading ? (
                <div className="space-y-4 max-w-2xl mx-auto">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : (
                <CommentSection
                  comments={comments}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  name={name}
                  setName={setName}
                  comment={comment}
                  setComment={setComment}
                />
              )}
            </div>
          </main>

          {adData && (
            <aside className="lg:w-1/4">
              <div
                className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen"
                id="sidebanner">
                <Link href={adData.link} target="_blank">
                  <Image
                    src={adData.image}
                    alt="ad"
                    className="w-full h-auto aspect-[4/3]" // reserve ratio
                  />
                </Link>
              </div>
            </aside>
          )}
          {post.AdImage && (
            <aside className="lg:w-1/4">
              <div
                className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen"
                id="sidebanner">
                <Link href={post.ad_url} target="_blank">
                  <img src={adimageUrl} alt="ad" />
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
      <div className="bg-[#F0F2F5]">
        {relatedBlogs.length > 0 && (
          <div className="lg:mx-[10%] lg:mt-12 py-5 px-5">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Related Blogs
            </h2>
            <div className="grid md:grid-cols-4 gap-6 py-5">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/${createSlug(
                    blog?.categories[0]?.category_type
                  )}/${createSlug(
                    blog?.categories[0]?.category_name
                  )}/${createSlug(blog?.Custom_url)}`}
                  className="block">
                  <img
                    src={`${API_URL}/${blog.featured_image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {blog.seoDescription}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FullPost;

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Head from "next/head";
// import "./styles.css";
// import ClassicTemplate from "@/components/blogTemplates/ClassicTemplate";
// import ModernTemplate from "@/components/blogTemplates/ModernTemplate";
// import MagazineTemplate from "@/components/blogTemplates/MagazineTemplate";

// function createSlug(text) {
//   return text?.toLowerCase().replace(/\s+/g, "-");
// }

// const FullPost = ({ post, param1, param2 }) => {
//   const [error, setError] = useState(null);
//   const [updatedContent, setUpdatedContent] = useState(null);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchComments = async () => {
//     if (!post?.id) return;
//     try {
//       const res = await fetch(`${API_URL}/api/comments/${post.id}`);
//       const data = await res.json();
//       setComments(data);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//     }
//   };

//   useEffect(() => {
//     if (post) {
//       // Decode HTML
//       const decodeHtml = (html) => {
//         const txt = document.createElement("textarea");
//         txt.innerHTML = html;
//         return txt.value;
//       };
//       const parser = new DOMParser();
//       const contentDocument = parser.parseFromString(
//         decodeHtml(post.content || ""),
//         "text/html"
//       );
//       setUpdatedContent(contentDocument.body.innerHTML);

//       // Fetch related blogs
//       const fetchRelatedBlogs = async () => {
//         try {
//           const res = await axios.get(
//             `${API_URL}/api/posts/related/${post.categories[0].category_name}`
//           );
//           setRelatedBlogs(res.data.data);
//         } catch (err) {
//           console.error("Error fetching related blogs:", err);
//         }
//       };
//       if (post?.categories?.length > 0) {
//         fetchRelatedBlogs();
//       }
//       fetchComments();
//     }
//   }, [post]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !comment) return alert("All fields are required!");
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/api/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ post_id: post.id, name, comment }),
//       });
//       if (res.ok) {
//         setName("");
//         setComment("");
//         fetchComments();
//       }
//     } catch (err) {
//       console.error("Error submitting comment:", err);
//     }
//     setLoading(false);
//   };

//   const imageUrl = post?.featured_image
//     ? `${API_URL}/${post.featured_image}`
//     : "";

//   const currentUrl = typeof window !== "undefined" ? window.location.href : "";
//   const schemaJSON = post?.schema ? JSON.stringify(post?.schema) : "";

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
//           <strong className="font-bold">Page Not Found</strong>
//         </div>
//       </div>
//     );
//   }

//   // Pick layout (you can also decide based on category or slug)
//   const templateType = post.layout || "modern"; // default to magazine

//   return (
//     <>
//       <Head>
//         <title>{post.seoTitle || "Blog Post"}</title>
//         <meta name="description" content={post.seoDescription || ""} />
//         <meta property="og:title" content={post.seoTitle || "Blog Post"} />
//         <meta property="og:description" content={post.seoDescription || ""} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:url" content={currentUrl} />
//         <link rel="canonical" href={currentUrl} />
//         {schemaJSON && (
//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{ __html: schemaJSON }}
//           />
//         )}
//       </Head>

//       {templateType === "classic" && (
//         <ClassicTemplate
//           post={post}
//           updatedContent={updatedContent}
//           comments={comments}
//           handleSubmit={handleSubmit}
//           loading={loading}
//           name={name}
//           setName={setName}
//           comment={comment}
//           setComment={setComment}
//           relatedBlogs={relatedBlogs}
//           createSlug={createSlug}
//           API_URL={API_URL}
//         />
//       )}

//       {templateType === "modern" && (
//         <ModernTemplate
//           post={post}
//           updatedContent={updatedContent}
//           comments={comments}
//           handleSubmit={handleSubmit}
//           loading={loading}
//           name={name}
//           setName={setName}
//           comment={comment}
//           setComment={setComment}
//           relatedBlogs={relatedBlogs}
//           createSlug={createSlug}
//           API_URL={API_URL}
//           className="custom-html"
//         />
//       )}

//       {templateType === "magazine" && (
//         <MagazineTemplate
//           post={post}
//           updatedContent={updatedContent}
//           comments={comments}
//           handleSubmit={handleSubmit}
//           loading={loading}
//           name={name}
//           setName={setName}
//           comment={comment}
//           setComment={setComment}
//           relatedBlogs={relatedBlogs}
//           createSlug={createSlug}
//           API_URL={API_URL}
//         />
//       )}
//     </>
//   );
// };

// export default FullPost;
