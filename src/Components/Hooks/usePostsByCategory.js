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

const usePostsByCategory = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { param1, param2 } = useParams(); // Get params from URL
  console.log(param1, param2);
  const formattedCategoryType = param1 ? formatCategory(param1) : "";
  const formattedCategoryName = param2 ? formatCategory(param2) : "";
  const categoryLimits = {
    "Upgrade Yourself": 16,
    "Home Insights": 19,
  };
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);

      // Set limit dynamically based on category type (default to 10 if not found)
      const limit = categoryLimits[formattedCategoryType] || 10;

      const response = await axios.get(
        `${baseUrl}/api/category/${param1}/${param2}`,
        {
          params: { page, limit }, // Apply dynamic limit
        }
      );
      const { data, totalPages, currentPage } = response.data;
      setPosts(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param1 && param2) {
      fetchPosts();
    }
  }, [param1, param2]);

  return {
    posts,
    loading,
    error,
    categoryName: formattedCategoryName,
    categoryType: formattedCategoryType,
    totalPages,
    currentPage,
    fetchPosts, // Allow pagination controls to trigger new fetches
  };
};

export default usePostsByCategory;
