import Link from "next/link";
import Image from "next/image";

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function HomeInsights({ posts }) {
  const categoryFilter = [
    { name: "Product Reviews", link: "/home-insights/product-reviews" },
    { name: "Comparisons", link: "/home-insights/comparisons" },
    { name: "Best Picks", link: "/home-insights/best-picks" },
    { name: "How To Guides", link: "/home-insights/how-to-guides" },
    { name: "Deals", link: "/home-insights/deals" },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.blog_type === "published" &&
      post.categories.some((category) =>
        categoryFilter.some((filter) => filter.name === category.category_name)
      )
  );

  const groupedPosts = categoryFilter.map((category) => ({
    category,
    posts: filteredPosts.filter((post) =>
      post.categories?.some((cat) => cat.category_name === category.name)
    ),
  }));

  return (
    <>
      <div className="relative w-full h-[350px] lg:h-[400px] overflow-hidden">
        <Image
          src="/homeinsights.webp"
          alt="Home Insights Background"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 flex flex-col justify-center gap-3 py-5 px-[2%] lg:px-[10%] h-full text-white bg-black/40">
          <h1 className="lg:text-5xl text-xl font-semibold">Home Insights</h1>
          <p className="lg:text-base text-xs leading-relaxed">
            Welcome to Home Insights, the ultimate destination for improving
            your living area. Make informed decisions with our products reviews
            section, where we cover everything from the newest home gadgets to
            quirky gifts and essentials. For tips and tricks for setting up your
            smart home and other home improvement projects check out our How To
            Guides. In our Comparisons section below, we compare two similar
            products to make it easier for you to purchase the perfect one for
            your specific needs. And see our Best Picks, which are items
            expertly chosen by our product reporters and writers. Finally, make
            sure to check out our Deals section to save hundreds of products on
            premium goods. Home Insights was founded to enrich you with
            value and savings for a smarter home.
          </p>
        </div>
      </div>

      <div className="lg:space-y-10 lg:px-8 my-4 mx-4">
        {groupedPosts.map(({ category, posts }, index) => (
          <div
            key={category.name}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6`}>
            <div className="mt-6 w-full">
              <div className="text-3xl md:text-5xl font-bold text-center">
                <h2>{category.name}</h2>
              </div>
              {index % 2 === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 mt-8 mb-8">
                  {posts.slice(0, 8).map((post) => (
                    <LatestBlogs key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 mt-8 mb-8">
                  {posts.slice(0, 6).map((post) => (
                    <HorizontalBlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-3 mb-6">
                <button className="bg-[#E0E0E0] text-sm md:text-lg px-6 py-2 text-black border-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-[#00008B] hover:text-white">
                  <Link href={category.link} className="block">
                    See More
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const HorizontalBlogCard = ({ post }) => {
  return (
    <Link
      href={`/${createSlug(post?.categories[0]?.category_type)}/${createSlug(
        post?.categories[0]?.category_name
      )}/${createSlug(post?.Custom_url)}`}
      className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full lg:w-1/3 h-48 lg:h-auto">
        <Image
          src={
            post?.featured_image
              ? `${baseUrl}/${post?.featured_image}`
              : "https://via.placeholder.com/300x200.png?text=No+Image"
          }
          alt={post?.title}
          width={300}
          height={200}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col items-start justify-start gap-2 w-full lg:w-2/3">
        <h2 className="text-lg lg:text-xl font-semibold line-clamp-2">
          {post?.title}
        </h2>
        <p className="text-sm lg:text-base text-gray-600 line-clamp-2">
          {post?.seoDescription}
        </p>
        <span className="inline-block w-fit px-5 py-2 mt-2 border border-[#DEDEFF] hover:bg-indigo-700 text-black hover:text-white rounded-full font-medium transition duration-300">
          Read More...
        </span>
      </div>
    </Link>
  );
};

const LatestBlogs = ({ post }) => {
  return (
    <Link
      href={`/${createSlug(post?.categories[0]?.category_type)}/${createSlug(
        post?.categories[0]?.category_name
      )}/${createSlug(post?.Custom_url)}`}
      className="bg-white overflow-hidden block transition-shadow duration-300">
      <Image
        src={
          post?.featured_image
            ? `${baseUrl}/${post.featured_image}`
            : "https://via.placeholder.com/300x200.png?text=No+Image"
        }
        alt={post?.title || "Blog Image"}
        width={300}
        height={200}
        className="object-cover rounded-lg w-full h-48"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg lg:text-xl font-semibold mb-2 line-clamp-2">
          {post?.title}
        </h2>
        <p className="text-gray-600 mb-4 text-sm lg:text-base line-clamp-2">
          {post?.seoDescription}
        </p>
      </div>
    </Link>
  );
};
