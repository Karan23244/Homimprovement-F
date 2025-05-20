"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const feedbacks = [
  {
    name: "John",
    comment:
      "I recently tried a few of the suggestions made in this blog, and WOW what a difference it has made in my home! They were all simple, but they worked.",
  },
  {
    name: "Emily ",
    comment:
      "The tutorial on house flipping changed everything for me. After reading this blog I felt brave to start my own projects.",
  },
  {
    name: "Michael ",
    comment:
      "I loved the stuff about do-it-yourself home decor. This photo is amazing and so inspiring and creative, and he also inspired so much creativity, and also my home was in top creative form!",
  },
  {
    name: "Sarah ",
    comment:
      "I just implemented some of the the tips in this blog and my home is looking amazing! The concepts were simple but powerful.",
  },
  {
    name: "David",
    comment:
      "The step-by-step renovation guide was good for me. Now I feel ready to take on my own DIYs after going deeper into this blog!",
  },
  {
    name: "Jessica",
    comment:
      "The Smart Home Technology articles inspired me, my place never looked better!",
  },
];

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
function NewPage({ allposts }) {
  const [topReads, setTopReads] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Step 2: Latest 7 posts
        const latest = allposts.slice(0, 16);
        const latestIds = new Set(latest.map((p) => p.id));

        // Step 3: Top Reads (not in latest)
        const resTop = await fetch(
          `${baseUrl}/api/posts/topReadsAndEditorsChoice`
        );
        const topJson = await resTop.json();
        const topRaw = topJson.data?.topReads || [];
        const topReadsFiltered = topRaw
          .filter(
            (post) => post.blog_type === "published" && !latestIds.has(post.id)
          )
          .slice(0, 9);
        const topIds = new Set(topReadsFiltered.map((p) => p.id));

        // Step 4: Editor’s Choice (not in latest or topReads)
        const editorRaw = topJson.data?.editorsChoice || [];
        const editorsChoiceFiltered = editorRaw
          .filter(
            (post) =>
              post.blog_type === "published" &&
              !latestIds.has(post.id) &&
              !topIds.has(post.id)
          )
          .slice(0, 8);
        setTopReads(topReadsFiltered);
        setEditorsChoice(editorsChoiceFiltered);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog data: " + err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getUniqueCategoryBlogs = (allBlogs, usedBlogs) => {
    const usedBlogIds = new Set(usedBlogs.map((blog) => blog.Custom_url));
    const uniqueCategories = new Set();
    const featuredCategoryBlogs = [];

    for (const blog of allBlogs) {
      if (
        !usedBlogIds.has(blog.Custom_url) &&
        blog.category_names &&
        blog.category_names.length > 0
      ) {
        const category = blog.category_names[0];

        if (!uniqueCategories.has(category)) {
          uniqueCategories.add(category);
          featuredCategoryBlogs.push(blog);
        }

        if (featuredCategoryBlogs.length === 8) break;
      }
    }

    return featuredCategoryBlogs;
  };

  // Example usage:
  const featureCategoryBlogs = getUniqueCategoryBlogs(allposts, [
    ...topReads,
    ...editorsChoice,
    ...allposts.slice(0, 8),
  ]);
  return (
    <>
      <Hero />
      <LatestBlogs allposts={allposts} />
      <FeatureCategory featureCategoryBlogs={featureCategoryBlogs} />
      <section className="p-6 bg-gray-100">
        <h2 className="mb-6 text-center text-lg lg:text-3xl font-bold">
          Top Reads
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading || !topReads?.length
            ? Array.from({ length: 6 }).map((_, i) => (
                <HorizontalBlogCardSkeleton key={i} />
              ))
            : topReads
                .slice(0, 12)
                .map((post) => (
                  <HorizontalBlogCard key={post.id} post={post} />
                ))}
        </div>
      </section>

      <section className="p-6 bg-gray-100">
        <h2 className="mb-6 text-center text-lg lg:text-3xl font-bold">
          Editor's Choice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading || !editorsChoice?.length
            ? Array.from({ length: 8 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : editorsChoice
                .slice(0, 8)
                .map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </section>

      <CategorySection />
      <FeedbackSlider />
    </>
  );
}

export default NewPage;

const Hero = () => {
  return (
    <>
      <div
        className="relative lg:h-[500px] h-[400px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url("/Hero.webp")` }}>
        <div className="relative z-10 flex items-center h-full px-10 md:px-20">
          <div className="text-white max-w-4xl space-y-6">
            <h1 className="lg:text-4xl text-lg font-bold leading-tight">
              Discover 200+ Home Improvement Blogs with HomImprovement for Your
              Dream House
            </h1>
            <p className="text-base lg:text-xl">
              Browse HomImprovement for expert guides on home renovation,
              design, and smart tech. Transform your living space with trusted
              advice!
            </p>
            <button className="lg:mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full lg:font-semibold font-medium transition duration-300">
              More Insights
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#DEDEFF] py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="lg:text-5xl text-2xl font-bold text-[#202D53] mb-6">
            House Renovation Ideas by homimprovement
          </h1>
          <p className="lg:text-lg text-base text-black">
            Ready to revamp your home? Homimprovement offers comprehensive house
            renovation and unique design ideas to help you create the perfect
            living space.
          </p>
        </div>
      </div>
    </>
  );
};

const LatestSkeletonCard = () => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="mt-4 h-10 w-28 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

const LatestBlogs = ({ allposts = [] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(allposts.length === 0);
  }, [allposts]);

  const postsToShow = loading
    ? Array.from({ length: 8 })
    : allposts.slice(0, 8);

  return (
    <section className="p-6 bg-gray-100">
      <header className="mb-6 text-center">
        <h1 className="text-lg lg:text-3xl font-bold">Latest Blogs</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {postsToShow.map((post, index) =>
          loading ? (
            <LatestSkeletonCard key={index} />
          ) : (
            <Link
              key={post.id}
              href={`/${createSlug(post?.category_names?.[0])}/${createSlug(
                post?.Custom_url
              )}`}
              className="bg-white shadow-md rounded-lg overflow-hidden block hover:shadow-lg transition-shadow duration-300">
              <Image
                src={
                  post?.featured_image
                    ? `${baseUrl}/${post.featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={post?.title || "Blog Image"}
                width={300}
                height={200}
                className="object-cover w-full h-48"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg lg:text-xl font-semibold mb-2 line-clamp-2">
                  {post?.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm lg:text-base line-clamp-2">
                  {post?.seoDescription}
                </p>
                <span className="inline-block px-5 py-2 border border-[#DEDEFF] hover:bg-indigo-700 text-black hover:text-white rounded-full font-medium transition duration-300">
                  Read More...
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

const SkeletonFeatureCard = () => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-56 bg-gray-300 relative"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="mt-4 h-10 w-28 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

const FeatureCategory = ({ featureCategoryBlogs = [] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!(featureCategoryBlogs.length > 0));
  }, [featureCategoryBlogs]);

  return (
    <section className="p-6 bg-gray-100">
      <header className="mb-6 text-center">
        <h1 className="text-lg lg:text-3xl font-bold">Featured Categories</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(loading ? Array.from({ length: 8 }) : featureCategoryBlogs).map(
          (post, index) =>
            loading ? (
              <SkeletonFeatureCard key={index} />
            ) : (
              <Link
                key={post.id}
                href={`/${createSlug(post?.category_names?.[0])}/${createSlug(
                  post?.Custom_url
                )}`}
                className="bg-white shadow-md rounded-lg overflow-hidden block hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <Image
                    src={
                      post?.featured_image
                        ? `${baseUrl}/${post.featured_image}`
                        : "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={post?.title || "Blog Thumbnail"}
                    width={300}
                    height={233}
                    className="object-cover w-full h-56"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-white bg-opacity-90 px-4 py-2 flex items-center gap-1 text-sm rounded-full shadow text-black">
                    <FaTag className="text-indigo-600 text-base" />
                    <span className="font-medium">
                      {post?.category_names?.[0] || "Uncategorized"}
                    </span>
                  </span>
                </div>

                <div className="p-4 flex flex-col h-full">
                  <h2 className="text-lg lg:text-xl line-clamp-2 font-semibold mb-2">
                    {post?.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm lg:text-base">
                    {post?.seoDescription}
                  </p>
                  <span className="w-fit px-5 py-2 border border-[#DEDEFF] hover:bg-indigo-700 text-black hover:text-white rounded-full font-medium transition duration-300">
                    Read More...
                  </span>
                </div>
              </Link>
            )
        )}
      </div>
    </section>
  );
};
const BlogCardSkeleton = () => (
  <div className="relative block h-72 rounded-lg overflow-hidden bg-gray-200 animate-pulse shadow-md">
    <div className="absolute inset-0 bg-gray-300" />
    <div className="absolute bottom-4 left-4 right-4 z-20">
      <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-full"></div>
    </div>
  </div>
);

const BlogCard = ({ post }) => {
  return (
    <Link
      href={`/${createSlug(post?.category_names[0])}/${createSlug(
        post?.Custom_url
      )}`}
      className="relative block h-72 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Background image */}
      <Image
        src={
          post?.featured_image
            ? `${baseUrl}/${post?.featured_image}`
            : "https://via.placeholder.com/400x300.png?text=No+Image"
        }
        alt={post?.title}
        width={400}
        height={300}
        className="object-cover absolute inset-0"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      {/* Text over image */}
      <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
        <h2 className="text-lg lg:text-2xl font-bold mb-2">{post?.title}</h2>
        <p className="text-sm lg:text-base line-clamp-2">
          {post?.seoDescription}
        </p>
      </div>
    </Link>
  );
};
const HorizontalBlogCardSkeleton = () => (
  <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full lg:w-1/3 h-48 lg:h-auto bg-gray-300" />
    <div className="p-4 flex flex-col justify-start gap-2 w-full lg:w-2/3">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
    </div>
  </div>
);

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
const CategorySection = () => {
  return (
    <section className="bg-[#00008B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <article className="lg:w-1/2">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
            Best House Renovation Solutions by Homimprovement
          </h2>
          <p className="mb-6 text-base lg:text-xl leading-relaxed">
            Get inspired with our home improvement ideas. From latest Interior
            Design Ideas to House renovation help, we will assist you for your
            home improvement.
          </p>
          <button className="px-6 py-3 bg-white text-[#00008B] hover:bg-gray-200 font-medium rounded-full transition duration-300">
            More To Explore
          </button>
        </article>

        <figure className="lg:w-1/2 w-full">
          <img
            src="/homepage.webp"
            alt="About us"
            className="w-full h-auto rounded-lg shadow-lg"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
};

const FeedbackSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive slidesToShow
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === feedbacks.length - 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <section className="py-12">
      <h2 className="text-center text-lg lg:text-3xl font-bold mb-8">
        What Our Users Say
      </h2>
      <div className="overflow-hidden max-w-7xl mx-auto px-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${feedbacks.length * (100 / slidesToShow)}%`,
            transform: `translateX(-${
              (100 / feedbacks.length) * currentIndex
            }%)`,
          }}>
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="px-4"
              style={{ width: `${100 / feedbacks.length}%` }}>
              <blockquote className=" p-6 text-center flex flex-col h-full">
                <FaUserCircle className="mx-auto w-12 h-12 text-gray-500 mb-4 shrink-0" />
                <h3 className="font-semibold text-black text-lg">{fb.name}</h3>
                <p className="text-gray-600 text-sm mt-2 flex-grow overflow-y-auto max-h-24">
                  "{fb.comment}"
                </p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
