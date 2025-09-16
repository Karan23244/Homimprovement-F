"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import CommentSection from "../Common/Comment";
import "./styles.css";
import Image from "next/image";

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}

const FullPost = ({ post, param1, param2 }) => {
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_WP_URL;

  // ✅ WordPress fields mapping
  const postTitle = post?.title?.rendered || "Untitled";
  const postContent = post?.content?.rendered || "";
  const postExcerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "");
  const postDate = post?.date || post?.modified;
  const postAuthor =
    post?._embedded?.author?.[0]?.name ||
    post?.yoast_head_json?.author ||
    "Unknown";
  const postImage =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/600x400.png?text=No+Image";

  useEffect(() => {
    if (post) {
      const parser = new DOMParser();
      const contentDocument = parser.parseFromString(
        decodeHtml(postContent),
        "text/html"
      );

      // Extract headings for TOC
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

      setToc(tocData);
      setUpdatedContent(contentDocument.body.innerHTML);

      // Related blogs fetch by first category
      const fetchRelatedBlogs = async () => {
        try {
          if (post?.categories?.length > 0) {
            const catId = post.categories[0];
            const res = await axios.get(
              `${API_URL}/wp-json/wp/v2/posts?categories=${catId}&per_page=4&_embed`
            );
            setRelatedBlogs(res.data.filter((b) => b.id !== post.id));
          }
        } catch (err) {
          console.error("Error fetching related blogs:", err);
        }
      };

      fetchRelatedBlogs();
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

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const schemaJSON = post?.yoast_head_json
    ? JSON.stringify(post?.yoast_head_json)
    : "";

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
        <title>{post?.yoast_head_json?.title || postTitle}</title>
        <meta
          name="description"
          content={post?.yoast_head_json?.description || postExcerpt}
        />
        <meta
          property="og:title"
          content={post?.yoast_head_json?.title || postTitle}
        />
        <meta
          property="og:description"
          content={post?.yoast_head_json?.description || postExcerpt}
        />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
        {schemaJSON && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJSON }}
          />
        )}
      </Head>

      <div className="mx-auto px-4 lg:px-8 pt-16">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-1/4 pr-8">
            {toc.length > 0 && (
              <div className="sticky top-16 overflow-auto border-r-2 border-black h-screen">
                <h2 className="text-3xl text-center font-semibold text-gray-900 mb-2">
                  Table of Contents
                </h2>
                <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
                <ul className="space-y-3">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={`padding-${item.level === "h2" ? "4" : "8"} ${
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
            )}
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/5">
            <div className="mb-6">
              <h1
                className="lg:text-5xl text-3xl font-extrabold text-gray-900 mb-2 tracking-tight"
                dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
              />
            </div>

            <div className="flex items-center gap-6 mb-8 text-gray-600">
              <p className="font-semibold text-lg">{`By ${postAuthor}`}</p>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium text-lg">
                  {new Date(postDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={postImage}
                alt={postTitle}
                width={600}
                height={400}
                className="object-cover w-full h-auto"
                priority
              />
            </div>

            <div
              className="custom-html text-gray-700 leading-relaxed prose prose-indigo max-w-none mb-12 min-h-[600px]"
              dangerouslySetInnerHTML={{ __html: updatedContent }}
            />

            {/* Comments */}
            <div className="my-5 min-h-[100px]">
              <CommentSection
                comments={comments}
                handleSubmit={() => {}}
                loading={loading}
                name={name}
                setName={setName}
                comment={comment}
                setComment={setComment}
              />
            </div>
          </main>

          {/* Related Blogs */}
          <aside className="lg:w-1/4">
            {relatedBlogs.length > 0 && (
              <div className="sticky top-16 mx-4 overflow-auto lg:h-screen">
                <h3 className="text-xl font-bold mb-4">Related Blogs</h3>
                {relatedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/${post._embedded?.["wp:term"]?.[0]?.[0]?.slug}/${
                      post._embedded?.["wp:term"]?.[0]?.[1]?.slug || ""
                    }/${post.slug}`}>
                    <div className="mb-4">
                      <img
                        src={
                          blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                        }
                        alt={blog.title.rendered}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <p className="font-semibold text-gray-900">
                        {blog.title.rendered}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default FullPost;
