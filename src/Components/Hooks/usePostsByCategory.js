"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const formatCategory = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// const usePostsByCategory = () => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const { param0, param1 } = useParams(); // Get params from URL
//   const formattedCategoryType = param0 ? formatCategory(param0) : "";
//   const formattedCategoryName = param1 ? formatCategory(param1) : "";
//   const categoryLimits = {
//     "Upgrade Yourself": 16,
//     "Home Insights": 19,
//   };
//   const fetchPosts = async (page = 1) => {
//     try {
//       setLoading(true);

//       // Set limit dynamically based on category type (default to 10 if not found)
//       const limit = categoryLimits[formattedCategoryType] || 10;

//       const response = await axios.get(
//         `${baseUrl}/api/category/${param0}/${param1}`,
//         {
//           params: { page, limit }, // Apply dynamic limit
//         }
//       );
//       const { data, totalPages, currentPage } = response.data;
//       setPosts(data.data);
//       setTotalPages(data.totalPages);
//       setCurrentPage(data.currentPage);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (param1 && param0) {
//       fetchPosts();
//     }
//   }, [param1, param0]);

//   return {
//     posts,
//     loading,
//     error,
//     categoryName: formattedCategoryName,
//     categoryType: formattedCategoryType,
//     totalPages,
//     currentPage,
//     fetchPosts, // Allow pagination controls to trigger new fetches
//   };
// };

// export default usePostsByCategory;

const usePostsByCategory = () => {
  const baseUrl = process.env.NEXT_PUBLIC_WP_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { param0, param1 } = useParams(); // category type + category name
  const formattedCategoryType = param0 ? formatCategory(param0) : "";
  const formattedCategoryName = param1 ? formatCategory(param1) : "";

  // limits if you want to keep your old design logic
  const categoryLimits = {
    "Upgrade Yourself": 16,
    "Home Insights": 19,
  };

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);

      const limit = categoryLimits[formattedCategoryType] || 10;

      // 1. Get category ID by slug
      const categorySlug = param1?.toLowerCase().replace(/\s+/g, "-");
      const categoryRes = await axios.get(
        `${baseUrl}/wp-json/wp/v2/categories?slug=${categorySlug}`
      );
      if (!categoryRes.data || categoryRes.data.length === 0) {
        throw new Error("Category not found");
      }

      const categoryId = categoryRes.data[0].id;
      console.log(categoryId, "Category ID");
      // 2. Fetch posts by category ID
      const postsRes = await axios.get(`${baseUrl}/wp-json/wp/v2/posts`, {
        params: {
          categories: categoryId,
          per_page: limit,
          page,
          _embed: true, // to get featured image and author
        },
      });
      function decodeHTML(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }
      // Transform posts to fit your existing design
      const mappedPosts = postsRes.data.map((post) => ({
        id: post.id,
        title: decodeHTML(post.title.rendered),
        seoDescription: decodeHTML(
          post.excerpt.rendered.replace(/<[^>]+>/g, "")
        ),
        featured_image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        Custom_url: post.slug,
        category_names:
          post._embedded?.["wp:term"]?.[0]?.map((c) => c.name).join(",") || "",
        category_types:
          post._embedded?.["wp:term"]?.[0]?.map((c) => c.slug).join(",") || "",
        view_count: post.view_count || 0, // fallback if WP doesn’t provide
      }));

      setPosts(mappedPosts);
      setTotalPages(Number(postsRes.headers["x-wp-totalpages"]) || 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param1 && param0) {
      fetchPosts();
    }
  }, [param1, param0]);

  return {
    posts,
    loading,
    error,
    categoryName: formattedCategoryName,
    categoryType: formattedCategoryType,
    totalPages,
    currentPage,
    fetchPosts,
  };
};

export default usePostsByCategory;
