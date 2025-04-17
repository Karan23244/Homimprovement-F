"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function createSlug(text) {
  return text
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function Navbar({ categories = [], posts }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (!acc[category.category_type]) {
        acc[category.category_type] = [];
      }
      acc[category.category_type].push(category);
      return acc;
    }, {});
  }, [categories]);

  const toggleMenu = () => {
    // If the search bar is open, close it when toggling the menu
    if (searchBarOpen) {
      setSearchBarOpen(false);
    }
    // Toggle the menu state
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    // If the menu is open, close it when toggling the search bar
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Toggle the search bar state
    setSearchBarOpen(!searchBarOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".suggestion-item")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        const matches = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(matches.slice(0, 6));
        setShowDropdown(matches.length > 0);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300),
    [posts]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm("");
    setSuggestions([]);
    setShowDropdown(false);
    router.push(
      `/${createSlug(suggestion?.category_names[0])}/${createSlug(
        suggestion?.Custom_url
      )}`
    );
  };

  return (
    <header>
      <nav className="relative border-gray-200 border border-b-1 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center lg:gap-4 gap-2 lg:w-[40%] pl-3 py-1">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Link
                href="/"
                className="">
                <img
                  src="/headerlogo.webp"
                  alt="Logo"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Horizontal Divider */}
            <div className="w-[2px] h-12 bg-black"></div>
            <div>
              <h2 className="lg:text-lg text-sm font-medium text-center">
                Inspiring Spaces for Life
              </h2>
            </div>
          </div>
          {/* Nav & Search */}
          <div className="flex items-center lg:order-2 pr-3">
            <div className="flex flex-row justify-center items-center gap-28">
              <ul className="hidden lg:flex flex-row lg:space-x-8 gap-14">
                {Object.keys(groupedCategories).map((type) => (
                  <li className="relative group" key={type}>
                    <button className="block text-black text-xl hover:text-[#00008B] font-semibold">
                      {type}
                    </button>
                    <ul className="absolute hidden group-hover:block w-[250px] z-10 bg-white shadow-lg border border-black">
                      {groupedCategories[type].map((category) => (
                        <li
                          key={category.category_id}
                          className="p-1 hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
                          <Link
                            href={`/${category.category_type
                              .replace(/\s+/g, "-")
                              .toLowerCase()}/${category.category_name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="block px-4 py-2 hover:border-gray-600 text-black">
                            {category.category_name === "How To"
                              ? "How To ?"
                              : category.category_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search blogs..."
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#00008B]"
                />
                {showDropdown && (
                  <ul
                    ref={dropdownRef}
                    className="suggestion-item absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-10">
                    <div className="px-4 text-md font-semibold">
                      Searching For
                    </div>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion?.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-6 py-2 flex items-center font-medium justify-between hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
                        <span>{suggestion?.title}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M7 17l9-9m0 0v6m0-6H10"
                          />
                        </svg>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 top-[100%] visible"
              : "opacity-0 -top-full invisible"
          }`}
          style={{ zIndex: 1000 }}>
          <ul className="space-y-4 p-4">
            <div className="flex flex-col gap-4">
              {Object.keys(groupedCategories).map((type) => (
                <div key={type} className="relative group">
                  <button
                    className="flex justify-between items-center w-full px-4 py-2 text-black text-xl font-semibold hover:text-[#00008B] border-b"
                    onClick={() =>
                      setActiveCategory(activeCategory === type ? null : type)
                    }>
                    {type}
                    {activeCategory === type ? (
                      <FaChevronUp className="text-gray-600 text-sm" />
                    ) : (
                      <FaChevronDown className="text-gray-600 text-sm" />
                    )}
                  </button>
                  <ul
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      activeCategory === type ? "max-h-[500px]" : "max-h-0"
                    }`}>
                    {groupedCategories[type].map((category) => (
                      <li key={category.category_id} className="px-6 py-2">
                        <Link
                          href={`/${category.category_type
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${category.category_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className="block text-black hover:text-blue-800">
                          {category.category_name === "How To"
                            ? "How To ?"
                            : category.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
// // Helper function to create slug
// const createSlug = (title) => {
//   // Check if the title is not null and is a string before processing
//   if (typeof title !== "string") {
//     return ""; // Return an empty string or handle the case as needed
//   }

//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "") // Remove special characters
//     .replace(/\s+/g, "-"); // Replace spaces with hyphens
// };

export default Navbar;
