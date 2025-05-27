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
  const [openCategory, setOpenCategory] = useState(null); // for second level
  const [openSubCategory, setOpenSubCategory] = useState(null); // for third level
  const dropdownRef = useRef();

  const handleRedirect = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "upgrade yourself") {
      router.push("/upgrade-yourself");
    } else if (lowerType === "home insights") {
      router.push("/home-insights");
    }
    setIsMenuOpen(false);
  };
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
    // Toggle the menu state
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickMenu = () => {
    // Toggle the menu state
    setIsMenuOpen(false);
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
              <Link href="/">
                <img src="/headerlogo.webp" alt="Logo" width={80} height={80} />
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
                <li className="relative group">
                  <button className="block text-black text-xl hover:text-[#00008B] font-semibold">
                    Blog Categories
                  </button>
                  {/* Second level - dropdown with types */}
                  <ul className="absolute hidden group-hover:block left-0 w-[250px] z-20 bg-white shadow-lg border border-black">
                    {Object.keys(groupedCategories).map((type) => (
                      <li
                        key={type}
                        className="relative group/type hover:bg-gray-100">
                        <button
                          onClick={() => handleRedirect(type)}
                          className="w-full text-left px-4 py-2 text-black hover:text-[#00008B] font-medium cursor-pointer">
                          {type}
                        </button>

                        {/* Third level - submenu for category names */}
                        <ul className="absolute hidden group-hover/type:block left-full top-0 w-[250px] z-30 bg-white shadow-lg border border-black">
                          {groupedCategories[type].map((category) => (
                            <li
                              key={category.category_id}
                              className="hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
                              <Link
                                href={`/${category.category_type
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}/${category.category_name
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                                className="block px-4 py-2 text-black">
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
                </li>
                <li>
                  <Link
                    href={`/about-us`}
                    className="block text-black text-xl hover:text-[#00008B] font-semibold">
                    About Us
                  </Link>
                </li>
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
                    className="suggestion-item absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-30">
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
          <ul className="flex flex-col bg-white mt-2">
            {/* Blog Categories */}
            <li className="border-b border-gray-300">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === "blog" ? null : "blog")
                }
                className="w-full text-left px-4 py-3 text-black text-lg font-semibold flex justify-between items-center">
                Blog Categories
                <span>{openCategory === "blog" ? "▲" : "▼"}</span>
              </button>

              {openCategory === "blog" && (
                <ul className="flex flex-col bg-gray-50 border-t border-gray-300 ">
                  {Object.keys(groupedCategories).map((type) => (
                    <li
                      key={type}
                      className="border-b border-gray-200 flex flex-col">
                      <div className="flex justify-between items-center px-6 py-2">
                        {/* Redirect button */}
                        <button
                          onClick={() => handleRedirect(type)}
                          className="text-black font-medium text-left flex-1">
                          {type}
                        </button>

                        {/* Toggle submenu button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent parent clicks
                            setOpenSubCategory(
                              openSubCategory === type ? null : type
                            );
                          }}
                          className="ml-2 text-black font-medium"
                          aria-label="Toggle submenu">
                          {openSubCategory === type ? "▲" : "▼"}
                        </button>
                      </div>

                      {/* Third level submenu */}
                      {openSubCategory === type && (
                        <ul className="flex flex-col bg-white border-t border-gray-200">
                          {groupedCategories[type].map((category) => (
                            <li key={category.category_id}>
                              <Link
                                onAbort={handleClickMenu}
                                href={`/${category.category_type
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}/${category.category_name
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                                className="block px-8 py-2 text-black hover:bg-gray-200">
                                {category.category_name === "How To"
                                  ? "How To ?"
                                  : category.category_name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* About Us */}
            <li className="border-b border-gray-300 px-4 py-3">
              <Link
                href={`/about-us`}
                className="block text-black text-xl hover:text-[#00008B] font-semibold">
                About Us
              </Link>
            </li>
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
