"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function HomeInsights() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all published posts
        const postsRes = await fetch(`${baseUrl}/api/posts`);
        const postsJson = await postsRes.json();

        const allPublishedPosts = postsJson.data.filter(
          (post) => post.blog_type === "published"
        );

        setPosts(allPublishedPosts);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
      }
    };

    fetchData();
  }, []);
  const categoryFilter = [
    {
      name: "Product Reviews",
      link: "/home-insights/product-reviews",
    },
    {
      name: "Comparisons",
      link: "/home-insights/comparisons",
    },
    {
      name: "Best Picks",
      link: "/home-insights/best-picks",
    },
    {
      name: "How To Guides",
      link: "/home-insights/how-to-guides",
    },
    {
      name: "Deals",
      link: "/home-insights/deals",
    },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.blog_type === "published" &&
      post.category_names.some((category) =>
        categoryFilter.some((filter) => filter.name === category)
      )
  );

  const groupedPosts = categoryFilter.map((category) => ({
    category,
    posts: filteredPosts.filter((post) =>
      post.category_names.includes(category.name)
    ),
  }));

  return (
    <>
      <div
        className="relative w-full lg:h-[400px] h-[350px] flex flex-col justify-center gap-3 py-5 px-[2%] lg:px-[10%]"
        style={{
          backgroundImage: `url('/homeinsights.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-xl font-semibold text-white">
          Home Insights
        </h1>
        <p className="lg:text-base text-xs text-white leading-relaxed">
          Our “Upgrade Yourself” line is your final stop for all things
          innovative, creative, and stylish that will help you upgrade your
          house and your life. Explore the latest Smart Home Technology and its
          benefits of controlling devices, personalization and comfort. And for
          those who can’t do enough of home projects or fast and easy DIY
          projects, our DIY Home Projects provides faster and more specific
          how-to DIY, with great pictures and uncomplicated style to personalize
          your weekend and home, with or without wood. Get ahead of the curve
          with Interior Design Trends, a modern, decorative design blog for all
          things interior design, and discover the latest trends along with tips
          and tricks for achieving a top-looking space! Whether you are a tech
          geek, a DIY enthusiast, a wise design fan, this category helps you to
          upgrade yourself and surround your home with ease and art.
        </p>
      </div>
      <div className="space-y-10 sm:px-6 lg:px-8 my-12">
        {groupedPosts.map(({ category, posts }, index) => (
          <div
            key={category.name}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6`}>
            {/* Main Content */}
            <div className="mt-6">
              <div className="text-3xl md:text-5xl font-bold text-center">
                <h2>{category.name}</h2>
              </div>
              {index % 2 === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-8">
                  {posts.slice(0, 8).map((post) => (
                    <LatestBlogs key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
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
      href={`/${createSlug(post?.category_names[0])}/${createSlug(
        post?.Custom_url
      )}`}
      className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image on left */}
      <div className="w-full lg:w-1/3 h-48 lg:h-auto">
        {/* <img
          src={
            post?.featured_image
              ? `${baseUrl}/${post?.featured_image}`
              : "https://via.placeholder.com/300x200.png?text=No+Image"
          }
          alt={post?.title}
          className="w-full h-full object-cover"
          loading="lazy"
        /> */}
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

      {/* Content on right */}
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
      key={post.id}
      href={`/${createSlug(post?.category_names?.[0])}/${createSlug(
        post?.Custom_url
      )}`}
      className="bg-white  overflow-hidden block transition-shadow duration-300">
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
