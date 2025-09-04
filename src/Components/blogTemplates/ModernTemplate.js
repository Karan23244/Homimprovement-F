import Image from "next/image";
import Link from "next/link";
import CommentSection from "../Common/Comment";
import "../User/styles.css";

const ModernTemplate = ({
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
  const imageUrl = post?.featured_image
    ? `${API_URL}/${post.featured_image}`
    : "";

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent leading-tight">
        {post.title}
      </h1>

      {/* Featured Image */}
      <div className="overflow-hidden rounded-3xl shadow-lg mb-12">
        <Image
          src={imageUrl || "https://via.placeholder.com/900x400"}
          alt={post.title}
          width={1200}
          height={500}
          className="w-full h-auto transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>

      {/* Blog Content */}
      <div
        className="custom-html prose prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed mb-16 animate-fadeIn"
        dangerouslySetInnerHTML={{ __html: updatedContent }}
      />

      {/* Comments */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Share Your Thoughts
        </h2>
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

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Related Blogs
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/${createSlug(
                  blog.categories[0]?.category_type
                )}/${createSlug(
                  blog.categories[0]?.category_name
                )}/${createSlug(blog.Custom_url)}`}
                className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                  <img
                    src={`${API_URL}/${blog.featured_image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
