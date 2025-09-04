import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "../Common/CommentSection";

const ClassicTemplate = ({
  post,
  updatedContent,
  comments,
  handleSubmit,
  loading,
  name,
  setName,
  comment,
  setComment,
  relatedBlogs,
  createSlug,
  API_URL,
}) => {
  const [toc, setToc] = useState([]);
  const imageUrl = post?.featured_image
    ? `${API_URL}/${post.featured_image}`
    : "";

  // Generate Table of Contents
  useEffect(() => {
    if (!updatedContent) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedContent, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3"));
    const tocItems = headings.map((h) => ({
      id: h.textContent.replace(/\s+/g, "-").toLowerCase(),
      text: h.textContent,
      level: h.tagName,
    }));
    setToc(tocItems);
  }, [updatedContent]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
        <Image
          src={imageUrl || "https://via.placeholder.com/1200x600"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <main className="lg:col-span-8">
          <article
            className="prose prose-lg lg:prose-xl prose-indigo max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: updatedContent }}
          />

          {/* Comments */}
          <div className="mt-12">
            <CommentSection
              comments={comments}
              handleSubmit={handleSubmit}
              loading={loading}
              name={name}
              setName={setName}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Table of Contents */}
          {toc.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {toc.map((item, idx) => (
                  <li
                    key={idx}
                    className={`ml-${item.level === "H3" ? "4" : "0"}`}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-indigo-600 transition">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Advertisement Placeholder */}
          <div className="bg-gray-100 border rounded-xl h-40 flex items-center justify-center text-gray-500 text-sm">
            Advertisement
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Related Posts</h2>
              <div className="space-y-4">
                {relatedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/${createSlug(
                      blog.categories[0]?.category_type
                    )}/${createSlug(
                      blog.categories[0]?.category_name
                    )}/${createSlug(blog.Custom_url)}`}
                    className="flex items-center gap-4 group">
                    <img
                      src={`${API_URL}/${blog.featured_image}`}
                      alt={blog.title}
                      className="w-20 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ClassicTemplate;
