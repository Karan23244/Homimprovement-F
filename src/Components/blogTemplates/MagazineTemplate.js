import Image from "next/image";
import Link from "next/link";
import CommentSection from "../Common/Comment";
import "../User/styles.css";

const MagazineTemplate = ({
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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid lg:grid-cols-12 gap-10">
      {/* Main Content */}
      <main className="lg:col-span-8">
        <h1 className="text-4xl font-extrabold mb-6">{post.title}</h1>
        <Image
          src={imageUrl || "https://via.placeholder.com/700x400"}
          alt={post.title}
          width={700}
          height={400}
          className="w-full rounded-xl mb-8"
        />
        <div
          className="custom-html text-gray-700 leading-relaxed prose prose-indigo max-w-none mb-12 min-h-[600px]"
          dangerouslySetInnerHTML={{ __html: updatedContent }}
        />
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
      <aside className="lg:col-span-4">
        <h2 className="text-2xl font-semibold mb-6">Related Blogs</h2>
        <div className="space-y-6">
          {relatedBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/${createSlug(
                blog.categories[0]?.category_type
              )}/${createSlug(blog.categories[0]?.category_name)}/${createSlug(
                blog.Custom_url
              )}`}
              className="flex gap-4">
              <img
                src={`${API_URL}/${blog.featured_image}`}
                alt={blog.title}
                className="w-24 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{blog.title}</h3>
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
      </aside>
    </div>
  );
};

export default MagazineTemplate;
