"use client"; // For app directory
// Remove above line if using pages directory

import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import usePostsByCategory from "../Hooks/usePostsByCategory";
import usePageTracker from "../Hooks/usePageTracker";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}

const getSeoDetails = (category) => {
  const seoData = {
    "Smart Home Technology": {
      title: "Smart Home Automation Technology | HomImprovement",
      description:
        "Explore the best home automation devices and the smart home automation technology. Make your home smarter and safer with innovative smart solutions today!",
      keywords:
        "home automation technology, best home automation devices,Smart home automation",
      shortDescription:
        "At homimprovement, we are devoted to bringing you the new improvements in Smart Home Technology, a category that is revolutionizing the way we stay. Smart Home Technology includes an extensive range of gadgets, systems, and solutions designed to make your home smart, efficient, and stable. From smart lighting fixtures and thermostats to great security systems and voice-controlled assistants, these innovations are reworking normal homes into smart living spaces. With our carefully curated choice of companies, we intend to help you make a smart home that isn't handiest present day but additionally tailor-made on your particular life-style. By incorporating home automation technology, you can seamlessly manage your home’s various aspects with ease.",
    },
    "Diy Home Projects": {
      title: "DIY Home Decor & Home Improvement Projects",
      description:
        "Personalize your home with DIY decor and projects. Transform your space with home improvement tips. Start your next DIY adventure today!",
      keywords: "DIY home decor,DIY home projects,best DIY home security",
      shortDescription:
        "Wherein creativity meets functionality! Engaging in do-it-yourself home projects now not most effective permits you to change your home but also saves your money compared to hiring professionals. There’s a unique delight that arrives from creating something together with your own ideas, whether it’s constructing a new bookshelf, painting a room, or make smart home device for your home. These tasks can substantially decorate your home’s aesthetic and capability. Additionally, incorporating DIY home decor can add a personalized touch to every corner of your house.",
    },
    "Interior Design Trends": {
      title: "Top Interior Design Styles & Modern Trends to Know",
      description:
        "Discover the latest interior design trends and modern styles. Stay ahead with fresh ideas and elevate your space with the best design inspiration for 2025",
      keywords:
        "interior design styles,modern interior design,interior design trends,interior design ideas for home",
      shortDescription:
        "Where we explore the state-of-the-art interior design trends and thoughts to transform your dwelling space into a haven of splendor and comfort. Staying updated with modern interior design tendencies is essential for developing a home that reflects your character even as also being purposeful and alluring. Whether you’re making plans for a whole protection or just trying to refresh a room, knowledge of the latest trends can inspire you to make impactful adjustments.",
    },
    "How To Guides": {
      title: "Home Maintenance Tips & Guides | Homimprovement",
      description:
        "Get the best home maintenance tips and guides to keep your home beautiful and functional year-round. Actionable advice on repairs, upgrades, and more!",
      keywords:
        "home maintenance list,home maintenance tips,Home improvement guides",
      shortDescription:
        'Welcome to Homimprovement\'s "How To Guides" category, where we give you specified step-by-step instructions and useful guidelines on how to use the arena of smart technology. With greater smart home gadgets available on the market these days, getting to know the way to set up, use, and fasten them is crucial in order to achieve their advantages. You are both a technology amateur or a pro user; our special home improvement guides will make sure you get the first-rate from your smart home experience.',
    },
    "Best Picks": {
      title: "Best Smart Home System: Guide to Top Devices & Integration ",
      description:
        "Explore top smart home systems that blend security, energy efficiency, and seamless integration. Find the best devices to upgrade your home today!",
      keywords: "best smart home devices,best smart home system",
      shortDescription:
        'Welcome to the "Best Picks" category of Homimprovement, wherein we pick and present to you the greatest products, equipment, and solutions for each element of your own home development task. If you need the high-quality smart home devices, the maximum appropriate equipment for home improvement tasks, or the maximum rated materials for preservation, our expertly decided on guidelines will provide you with the entirety you need. Based on expert evaluation and consumer reviews, you can choose with confidence the satisfaction to transform your home.',
    },
    Comparisons: {
      title: "Product and Technology Comparison | Homimprovement",
      description:
        "Explore in-depth product and technology comparisons to help you make smarter choices for your next home purchase. Find the best options today!",
      keywords: "product comparison,technology comparison",
      shortDescription:
        'Welcome to the "Versus" section of Homimprovement, in which we compare famous home improvement products and tools in opposition to each other to assist you in making better choices. In a world full of picks, it may be hard to determine which products are surely satisfactorily suited to your functions. Our intensity product comparison and technology comparison will come up with an idea of the strengths and weaknesses of each choice so you can make a smart decision for your own home development endeavours.',
    },
    "Product Reviews": {
      title: "Product Analysis and Reviews | Best Product Review Website",
      description:
        "Explore honest product analysis and the latest reviews for your smart home. Get expert buying advice and discover the best products today!",
      keywords: "product analysis, best product review websites",
      shortDescription:
        "Welcome to Homimprovement's 'Product Reviews' category, In which we explore the area of smart home devices to help you in making your living area greater linked, green, and cushy. With technology advancing every day, smart home gadgets are gaining titanic popularity, presenting comfort, security, and electricity efficiency. Whether you're a tech geek or a property owner who wants to smarten up your house, our in-depth opinions will assist you choose the maximum appropriate smart home brand to your necessities. Our product analysis guarantees that every gadget is assessed thoroughly to help you make the best choice.",
    },
    Deals: {
      title: "Smart Home Deals: Discounts You Can’t Miss!",
      description:
        "Get exclusive smart home deals today! Shop top smart home bundle deals to automate your home for less. Save big on automation essentials—Act now!",
      keywords:
        "smart home bundle deals, smart home deals today, home automation deals, great deal products, smart deal, smart deals, smart deals now",
      shortDescription:
        "In our increasingly busy world, adding smart home technology to your abode has never been easier. Here at Homimprovement, we are pleased to showcase a wide range of smart home bundle deals to suit any budget and need. Whether you're looking to get into home automation for the first time or are an experienced tech person, our smart home bundle deals allow you to start building out a better home.",
    },
  };

  return (
    seoData[category] || {
      title: "Homimprovement | Home Improvement Blog",
      description: "Explore a wide range of home improvement ideas and trends.",
      keywords: "Home Improvement, DIY, Interior Design, Smart Technology",
    }
  );
};

const CategoryPosts = () => {
  // usePageTracker("category");

  const {
    posts,
    loading,
    error,
    categoryName,
    categoryType,
    totalPages,
    currentPage,
    fetchPosts,
  } = usePostsByCategory();
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  console.log(posts);
  const modifiedCategoryName =
    categoryName?.trim().toLowerCase() === "how to" ? "How To ?" : categoryName;

  const { title, description, keywords, shortDescription, html } =
    getSeoDetails(modifiedCategoryName);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <svg
          className="animate-spin h-10 w-10 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-lg">Loading, please wait...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <svg
          className="w-12 h-12 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold">Page Not Found!</p>
      </div>
    );

  const sortedPosts = [...posts].sort((a, b) => b.view_count - a.view_count);

  const UpgradeYourselfUI = () => (
    <>
      <div
        className="relative w-full lg:h-[250px] h-[350px] flex flex-col gap-3 py-5 px-[2%] lg:px-[10%]"
        style={{
          backgroundImage: `linear-gradient(90deg, #000025 0%, rgba(0, 0, 139, 0.3) 100%), url('/background.webp')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-xl font-semibold text-white">
          {modifiedCategoryName}
        </h1>
        <p className="lg:text-base text-xs text-white leading-relaxed">
          {shortDescription}
        </p>
      </div>

      <div className="lg:px-[15%] px-[2%] py-[2%] bg-[#00008B]/30">
        {posts.length > 0 && (
          <div className="mb-6">
            <h2 className="lg:text-2xl text-lg font-semibold mb-2">
              {posts[0].title}
            </h2>
            <Link
              href={`/${createSlug(
                posts[0]?.category_types?.split(",")[0]
              )}/${createSlug(
                posts[0]?.category_names?.split(",")[0]
              )}/${createSlug(posts[0]?.Custom_url)}`}
              className="block">
              <img
                src={
                  posts[0].featured_image
                    ? `${baseUrl}/${posts[0].featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={posts[0].title}
                className="w-full h-[300px] object-cover mb-4"
                loading="lazy"
              />
              <p className="lg:text-lg text-base text-gray-700">
                {posts[0].seoDescription}...
              </p>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                src={
                  post.featured_image
                    ? `${baseUrl}/${post.featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={post.title}
                className="w-full h-40 object-cover mb-2"
                loading="lazy"
              />
              <div className="p-2">
                <h3 className="text-base font-semibold line-clamp-2">
                  {post?.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {post?.seoDescription}
                </p>
                <Link
                  href={`/${createSlug(
                    post?.category_types?.split(",")[0]
                  )}/${createSlug(
                    post?.category_names?.split(",")[0]
                  )}/${createSlug(post?.Custom_url)}`}
                  className="text-[#00008B] hover:underline inline-block">
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
        <div className="leading-relaxed py-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );

  const HomeInsightsUI = () => (
    <>
      <div className="relative w-full lg:h-[250px] h-[350px] flex flex-col gap-3 py-5 px-[2%] lg:px-[10%]">
        <h1 className="lg:text-5xl text-center text-xl font-semibold text-black">
          {modifiedCategoryName}
        </h1>
        <p className="text-lg text-black text-justify leading-relaxed">
          {shortDescription}
        </p>
      </div>

      <div className="lg:mx-[10%] mx-[2%]">
        <div className="grid lg:gap-4 gap-2 lg:grid-cols-3">
          <div className="relative lg:col-span-2 order-1 lg:order-none">
            <Link
              href={`/${createSlug(
                posts[0]?.category_types?.split(",")[0]
              )}/${createSlug(
                posts[0]?.category_names?.split(",")[0]
              )}/${createSlug(posts[0]?.Custom_url)}`}
              className="block relative h-full">
              <img
                src={
                  posts[0]?.featured_image
                    ? `${baseUrl}/${posts[0]?.featured_image}`
                    : "https://via.placeholder.com/600x400.png?text=No+Image"
                }
                alt={posts[0]?.title}
                className="w-full lg:h-[450px] h-[250px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="lg:text-2xl text-lg font-semibold">
                  {posts[0]?.title}
                </h3>
                <p className="lg:text-lg text-base mt-2">
                  {posts[0]?.seoDescription}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-2 order-2 lg:order-none h-full">
            {posts.slice(1, 3).map((post) => (
              <div
                key={post.id}
                className="relative flex-1 flex flex-col bg-white">
                <Link
                  href={`/${createSlug(
                    post?.category_types?.split(",")[0]
                  )}/${createSlug(
                    post?.category_names?.split(",")[0]
                  )}/${createSlug(post?.Custom_url)}`}
                  className="block relative h-full">
                  <img
                    src={
                      post?.featured_image
                        ? `${baseUrl}/${post?.featured_image}`
                        : "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={post?.title}
                    className="w-full h-[150px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="lg:text-lg text-base font-semibold">
                      {post?.title}
                    </h3>
                    <p className="lg:text-base text-sm mt-1 line-clamp-2">
                      {post?.seoDescription}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-8 pb-8">
          {posts.slice(3).map((post) => (
            <div
              key={post.id}
              className="flex flex-row items-start gap-2 lg:gap-10">
              <div className="w-5/12">
                <img
                  src={
                    post?.featured_image
                      ? `${baseUrl}/${post?.featured_image}`
                      : "https://via.placeholder.com/300x200.png?text=No+Image"
                  }
                  alt={post?.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{post?.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {post?.seoDescription}
                </p>
                <Link
                  href={`/${createSlug(
                    post?.category_types?.split(",")[0]
                  )}/${createSlug(
                    post?.category_names?.split(",")[0]
                  )}/${createSlug(post?.Custom_url)}`}
                  className="text-[#00008B] hover:underline inline-block mt-1">
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
        <div className="leading-relaxed py-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="Category Page" />
        <meta property="og:url" content={`${currentUrl}`} />
        <link rel="canonical" href={`${currentUrl}`} />
      </Head>

      {categoryType === "Upgrade Yourself"
        ? UpgradeYourselfUI()
        : HomeInsightsUI()}
    </>
  );
};

export default CategoryPosts;
