import Link from "next/link";
import Image from "next/image";
import { FaTag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import FeedbackSlider from "../Common/FeedbackSlider";

function createSlug(text) {
  return text?.toLowerCase().replace(/\s+/g, "-");
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function getUniqueCategoryBlogs(allBlogs, usedBlogs) {
  const usedBlogIds = new Set(usedBlogs.map((blog) => blog.Custom_url));
  const uniqueCategories = new Set();
  const featuredCategoryBlogs = [];

  for (const blog of allBlogs) {
    if (
      !usedBlogIds.has(blog.Custom_url) &&
      Array.isArray(blog.categories) &&
      blog.categories.length > 0
    ) {
      const categoryName = blog.categories[0].category_name;
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.add(categoryName);
        featuredCategoryBlogs.push(blog);
      }
    }
    if (featuredCategoryBlogs.length === 8) break;
  }

  return featuredCategoryBlogs;
}

function NewPage({ allposts, topReads, editorsChoice }) {
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
          {topReads.slice(0, 12).map((post) => (
            <HorizontalBlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="p-6 bg-gray-100">
        <h2 className="mb-6 text-center text-lg lg:text-3xl font-bold">
          Editor's Choice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorsChoice.slice(0, 8).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <CategorySection />
      <FeedbackSlider />
    </>
  );
}

export default NewPage;

// const Hero = () => {
//   return (
//     <>
//       <div
//         className="relative lg:h-[500px] h-[400px] w-full bg-cover bg-center"
//         style={{ backgroundImage: `url("/Hero.webp")` }}>
//         <div className="relative z-10 flex items-center h-full px-10 md:px-20">
//           <div className="text-white max-w-4xl space-y-6">
//             <h1 className="lg:text-4xl text-lg font-bold leading-tight">
//               Discover 200+ Home Improvement Blogs with HomImprovement for Your
//               Dream House
//             </h1>
//             <p className="text-base lg:text-xl">
//               Browse HomImprovement for expert guides on home renovation,
//               design, and smart tech. Transform your living space with trusted
//               advice!
//             </p>
//             <Link href="/home-insights">
//               <button className="lg:mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full lg:font-semibold font-medium transition duration-300 cursor-pointer">
//                 More Insights
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#DEDEFF] py-8 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="lg:text-5xl text-2xl font-bold text-[#202D53] mb-6">
//             House Renovation Ideas By Homimprovement
//           </h2>
//           <p className="lg:text-lg text-base text-black">
//             Impact-Site-Verification: b3c75536-987d-4beb-bf76-99f0bc030a14
//           </p>
//           <p className="lg:text-lg text-base text-black">
//             Ready to revamp your home? Homimprovement offers comprehensive house
//             renovation and unique design ideas to help you create the perfect
//             living space.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

const Hero = () => {
  return (
    <>
      <div className="relative lg:h-[500px] h-[400px] w-full overflow-hidden">
        {/* Replace background image with an img tag */}
        <Image
          src="/Hero.webp"
          alt="Hero Image"
          fill
          className="object-cover object-center z-0"
          priority
          loading="eager"
          fetchPriority="high"
        />

        {/* Content */}
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
            <Link href="/home-insights">
              <button className="lg:mt-4 px-6 py-3 bg-white hover:bg-indigo-700 text-black hover:text-white rounded-full lg:font-semibold font-medium transition duration-300 cursor-pointer">
                More Insights
              </button>
            </Link>
          </div>
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
  const postsToShow = allposts.slice(0, 8);

  return (
    <>
      <section className="p-6 bg-gray-100">
        <header className="mb-6 text-center">
          <h2 className="text-lg lg:text-3xl font-bold">Latest Blogs</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {postsToShow.map((post, index) => (
            <Link
              key={post.id}
              href={`/${createSlug(
                post?.categories[0]?.category_type
              )}/${createSlug(post?.categories[0]?.category_name)}/${createSlug(
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
          ))}
        </div>
      </section>
      <div className="bg-[#DEDEFF] py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="lg:text-5xl text-2xl font-bold text-[#202D53] mb-6">
            House Renovation Ideas By Homimprovement
          </h2>
          <p className="lg:text-lg text-base text-black">
            Impact-Site-Verification: b3c75536-987d-4beb-bf76-99f0bc030a14
          </p>
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
  return (
    <section className="p-6 bg-gray-100">
      <header className="mb-6 text-center">
        <h2 className="text-lg lg:text-3xl font-bold">Featured Categories</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featureCategoryBlogs.map((post, index) => (
          <Link
            key={post.id}
            href={`/${createSlug(
              post?.categories[0]?.category_type
            )}/${createSlug(post?.categories[0]?.category_name)}/${createSlug(
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
                  {post?.categories[0]?.category_name}
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
        ))}
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
      href={`/${createSlug(post?.categories[0]?.category_type)}/${createSlug(
        post?.categories[0]?.category_name
      )}/${createSlug(post?.Custom_url)}`}
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
        className="object-cover h-full w-full absolute inset-0"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      {/* Text over image */}
      <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
        <h2 className="text-lg lg:text-2xl font-bold mb-2 line-clamp-2">
          {post?.title}
        </h2>
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
      href={`/${createSlug(post?.categories[0]?.category_type)}/${createSlug(
        post?.categories[0]?.category_name
      )}/${createSlug(post?.Custom_url)}`}
      className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image on left */}
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
          <Link href="/upgrade-yourself">
            <button className="px-6 py-3 bg-white text-[#00008B] hover:bg-gray-200 font-medium rounded-full transition duration-300 cursor-pointer">
              More To Explore
            </button>
          </Link>
        </article>

        {/* Clickable Empty Box with Flexoffer */}
        <Link href="/flexoffer">
          <figure className="lg:w-1/2 w-full h-64 rounded-lg shadow-lg bg-white text-[#00008B] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
            <span className="text-xl font-semibold">Flexoffer</span>
          </figure>
        </Link>
      </div>
    </section>
  );
};
