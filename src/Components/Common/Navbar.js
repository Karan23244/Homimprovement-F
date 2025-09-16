"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const baseUrl = "https://admin.homimprovement.com";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // 🔁 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/wp-json/wp/v2/categories?per_page=100`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();

        // Remove uncategorized
        const filtered = data.filter(
          (cat) => cat.name.toLowerCase() !== "uncategorized" && cat.id !== 1
        );

        // Build hierarchy
        const main = filtered.filter((c) => c.parent === 0);
        const subs = filtered.filter((c) => c.parent !== 0);

        const structured = main.map((m) => ({
          ...m,
          children: subs.filter((s) => s.parent === m.id),
        }));

        setCategories(structured);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔎 Search blogs (using WP posts API)
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }
      try {
        const res = await fetch(
          `${baseUrl}/wp-json/wp/v2/posts?search=${encodeURIComponent(
            query
          )}&_embed`
        );
        const posts = await res.json();
        setSuggestions(posts);
        setShowDropdown(posts.length > 0);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 300),
    []
  );
  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel && debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSuggestionClick = (post) => {
    setSearchTerm("");
    setSuggestions([]);
    setShowDropdown(false);
    router.push(`/blog/${post.slug}`);
  };

  return (
    <header>
      <nav className="relative border-gray-200 border shadow-xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 pl-3 py-1">
            <Link href="/" prefetch>
              <Image
                src="/headerlogo.webp"
                alt="Logo"
                width={80}
                height={80}
                priority
                unoptimized
              />
            </Link>
            <div className="w-[2px] h-12 bg-black"></div>
            <h2 className="lg:text-lg text-sm font-medium">
              Inspiring Spaces for Life
            </h2>
          </div>

          {/* Menu & Search */}
          <div className="flex items-center pr-3">
            {/* Desktop nav */}
            <ul className="hidden lg:flex gap-10">
              <li className="relative group">
                <span className="cursor-pointer text-xl hover:text-[#00008B] font-semibold">
                  Blog Categories
                </span>
                <ul className="absolute hidden group-hover:block left-0 w-[250px] z-200 bg-white shadow-lg border border-black">
                  {categories.map((cat) => (
                    <li key={cat.id} className="relative group/item">
                      <Link
                        href={`/${createSlug(cat.slug)}`}
                        className="block px-4 py-2 hover:bg-gray-100 ">
                        {cat.name}
                      </Link>
                      {cat.children.length > 0 && (
                        <ul className="absolute hidden group-hover/item:block left-full top-0 z-30 bg-white shadow-lg border border-black w-[250px]">
                          {cat.children.map((sub) => (
                            <li
                              key={sub.id}
                              className="hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
                              <Link
                                href={`/${createSlug(cat.slug)}/${createSlug(
                                  sub.slug
                                )}`}
                                className="block px-4 py-2 text-black">
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-xl font-semibold hover:text-[#00008B]">
                  About Us
                </Link>
              </li>
            </ul>

            {/* Search bar */}
            <div className="relative ml-6" ref={dropdownRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#00008B]"
                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              />
              {showDropdown && (
                <ul
                  ref={dropdownRef}
                  className="suggestion-item absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-30">
                  {suggestions.map((s) => (
                    <li
                      key={s.id}
                      className="px-6 py-2 flex items-center font-medium justify-between hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200"
                      onClick={() => handleSuggestionClick(s)}>
                      <span>
                        {decodeHTML(s.title.rendered.replace(/<[^>]+>/g, ""))}
                      </span>
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
            {/* Search bar */}
            {/* <div className="relative ml-6" ref={dropdownRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00008B] focus:outline-none w-64"
                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              />
              {showDropdown && (
                <ul ref={dropdownRef} className="absolute bg-white border border-gray-200 rounded-xl shadow-lg w-[22rem] mt-2 py-2 z-30 max-h-72 overflow-y-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map((s) => (
                      <li
                        key={s.id}
                        className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer transition duration-150"
                        onClick={() => handleSuggestionClick(s)}>
                        <span className="truncate text-gray-800">
                          {decodeHTML(s.title.rendered.replace(/<[^>]+>/g, ""))}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17l9-9m0 0v6m0-6H10"
                          />
                        </svg>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500 text-sm">
                      No results found
                    </li>
                  )}
                </ul>
              )}
            </div> */}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-3 p-2">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            <ul>
              <li>
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === "blog" ? null : "blog")
                  }
                  className="w-full flex justify-between px-4 py-3 border-b">
                  Blog Categories {openCategory === "blog" ? "▲" : "▼"}
                </button>
                {openCategory === "blog" && (
                  <ul className="bg-gray-50">
                    {categories.map((cat) => (
                      <li key={cat.id} className="border-b">
                        <div className="flex justify-between px-6 py-2">
                          <Link
                            href={`/${createSlug(cat.slug)}`}
                            onClick={() => setIsMenuOpen(false)}>
                            {cat.name}
                          </Link>
                          {cat.children.length > 0 && (
                            <button
                              onClick={() =>
                                setOpenSubCategory(
                                  openSubCategory === cat.id ? null : cat.id
                                )
                              }>
                              {openSubCategory === cat.id ? "▲" : "▼"}
                            </button>
                          )}
                        </div>
                        {openSubCategory === cat.id && (
                          <ul className="bg-white">
                            {cat.children.map((sub) => (
                              <li key={sub.id} className="pl-10 py-2">
                                <Link
                                  href={`/${createSlug(cat.slug)}/${createSlug(
                                    sub.slug
                                  )}`}
                                  onClick={() => setIsMenuOpen(false)}>
                                  {sub.name}
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
              <li className="border-b px-4 py-3">
                <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

// "use client";

// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// const debounce = (func, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };

// function createSlug(text) {
//   return text
//     ?.toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");
// }
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";
// function Navbar() {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchBarOpen, setSearchBarOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [openCategory, setOpenCategory] = useState(null); // for second level
//   const [openSubCategory, setOpenSubCategory] = useState(null); // for third level
//   const [categories, setCategories] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const dropdownRef = useRef();
//   // 🔁 Fetch categories & posts on mount
//   useEffect(() => {
//     // Fetch categories first
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/api/categories`, {
//           cache: "no-store",
//         });
//         const data = await res.json();
//         setCategories(data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     // Then fetch posts (no need to block category rendering)
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
//         const data = await res.json();
//         setPosts(data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//       }
//     };

//     fetchCategories();
//     fetchPosts();
//   }, []);

//   const handleRedirect = (type) => {
//     const lowerType = type.toLowerCase();
//     if (lowerType === "upgrade yourself") {
//       router.push("/upgrade-yourself");
//     } else if (lowerType === "home insights") {
//       router.push("/home-insights");
//     }
//     setIsMenuOpen(false);
//   };
//   const groupedCategories = useMemo(() => {
//     return categories.reduce((acc, category) => {
//       if (!acc[category.category_type]) {
//         acc[category.category_type] = [];
//       }
//       acc[category.category_type].push(category);
//       return acc;
//     }, {});
//   }, [categories]);

//   const toggleMenu = () => {
//     // Toggle the menu state
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const handleClickMenu = () => {
//     // Toggle the menu state
//     setIsMenuOpen(false);
//   };
//   const toggleSearchBar = () => {
//     // If the menu is open, close it when toggling the search bar
//     if (isMenuOpen) {
//       setIsMenuOpen(false);
//     }
//     // Toggle the search bar state
//     setSearchBarOpen(!searchBarOpen);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !event.target.closest(".suggestion-item")
//       ) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       if (query.trim()) {
//         const matches = posts.filter(
//           (post) =>
//             post.title.toLowerCase().includes(query.toLowerCase()) ||
//             post.content.toLowerCase().includes(query.toLowerCase())
//         );
//         setSuggestions(matches.slice(0, 6));
//         setShowDropdown(matches.length > 0);
//       } else {
//         setSuggestions([]);
//         setShowDropdown(false);
//       }
//     }, 300),
//     [posts]
//   );

//   useEffect(() => {
//     debouncedSearch(searchTerm);
//     return debouncedSearch.cancel;
//   }, [searchTerm, debouncedSearch]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);
//     debouncedSearch(query);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm("");
//     setSuggestions([]);
//     setShowDropdown(false);
//     router.push(
//       `/${createSlug(suggestion?.categories[0]?.category_type)}/${createSlug(
//         suggestion?.categories[0]?.category_name
//       )}/${createSlug(suggestion?.Custom_url)}`
//     );
//   };

//   return (
//     <header>
//       <nav className="relative border-gray-200 border border-b-1 shadow-xl">
//         <div className="flex justify-between items-center">
//           <div className="flex flex-row items-center lg:gap-4 gap-2 lg:w-[40%] pl-3 py-1">
//             <div className="flex items-center space-x-3 cursor-pointer">
//               <Link href="/" prefetch={true}>
//                 <Image
//                   src="/headerlogo.webp"
//                   alt="Logo"
//                   width={80}
//                   height={80}
//                   priority
//                   unoptimized
//                 />
//               </Link>
//             </div>

//             {/* Horizontal Divider */}
//             <div className="w-[2px] h-12 bg-black"></div>
//             <div>
//               <h2 className="lg:text-lg text-sm font-medium text-center">
//                 Inspiring Spaces for Life
//               </h2>
//             </div>
//           </div>
//           {/* Nav & Search */}
//           <div className="flex items-center lg:order-2 pr-3">
//             <div className="flex flex-row justify-center items-center gap-28">
//               <ul className="hidden lg:flex flex-row lg:space-x-8 gap-14">
//                 <li className="relative group">
//                   <button className="block text-black text-xl hover:text-[#00008B] font-semibold">
//                     Blog Categories
//                   </button>
//                   {/* Second level - dropdown with types */}
//                   <ul className="absolute hidden group-hover:block left-0 w-[250px] z-200 bg-white shadow-lg border border-black">
//                     {Object.keys(groupedCategories).map((type) => (
//                       <li
//                         key={type}
//                         className="relative group/type hover:bg-gray-100">
//                         <button
//                           onClick={() => handleRedirect(type)}
//                           className="w-full text-left px-4 py-2 text-black hover:text-[#00008B] font-medium cursor-pointer">
//                           {type}
//                         </button>

//                         {/* Third level - submenu for category names */}
//                         <ul className="absolute hidden group-hover/type:block left-full top-0 w-[250px] z-30 bg-white shadow-lg border border-black">
//                           {groupedCategories[type].map((category) => (
//                             <li
//                               key={category.category_id}
//                               className="hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
//                               <Link
//                                 href={`/${category.category_type
//                                   .replace(/\s+/g, "-")
//                                   .toLowerCase()}/${category.category_name
//                                   .replace(/\s+/g, "-")
//                                   .toLowerCase()}`}
//                                 className="block px-4 py-2 text-black">
//                                 {category.category_name === "How To"
//                                   ? "How To ?"
//                                   : category.category_name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//                 <li>
//                   <Link
//                     href={`/about-us`}
//                     className="block text-black text-xl hover:text-[#00008B] font-semibold">
//                     About Us
//                   </Link>
//                 </li>
//               </ul>

//               {/* Search Input */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Search blogs..."
//                   className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#00008B]"
//                 />
//                 {showDropdown && (
//                   <ul
//                     ref={dropdownRef}
//                     className="suggestion-item absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-30">
//                     <div className="px-4 text-md font-semibold">
//                       Searching For
//                     </div>
//                     {suggestions.map((suggestion) => (
//                       <li
//                         key={suggestion?.id}
//                         onClick={() => handleSuggestionClick(suggestion)}
//                         className="px-6 py-2 flex items-center font-medium justify-between hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
//                         <span>{suggestion?.title}</span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-6 w-6 text-gray-700"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={3}
//                             d="M7 17l9-9m0 0v6m0-6H10"
//                           />
//                         </svg>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             {/* Hamburger Menu Button */}
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
//               <span className="sr-only">Open main menu</span>
//               {!isMenuOpen ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown */}
//         <div
//           className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
//             isMenuOpen
//               ? "opacity-100 top-[100%] visible"
//               : "opacity-0 -top-full invisible"
//           }`}
//           style={{ zIndex: 1000 }}>
//           <ul className="flex flex-col bg-white mt-2">
//             {/* Blog Categories */}
//             <li className="border-b border-gray-300">
//               <button
//                 onClick={() =>
//                   setOpenCategory(openCategory === "blog" ? null : "blog")
//                 }
//                 className="w-full text-left px-4 py-3 text-black text-lg font-semibold flex justify-between items-center">
//                 Blog Categories
//                 <span>{openCategory === "blog" ? "▲" : "▼"}</span>
//               </button>

//               {openCategory === "blog" && (
//                 <ul className="flex flex-col bg-gray-50 border-t border-gray-300 ">
//                   {Object.keys(groupedCategories).map((type) => (
//                     <li
//                       key={type}
//                       className="border-b border-gray-200 flex flex-col">
//                       <div className="flex justify-between items-center px-6 py-2">
//                         {/* Redirect button */}
//                         <button
//                           onClick={() => handleRedirect(type)}
//                           className="text-black font-medium text-left flex-1">
//                           {type}
//                         </button>

//                         {/* Toggle submenu button */}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation(); // prevent parent clicks
//                             setOpenSubCategory(
//                               openSubCategory === type ? null : type
//                             );
//                           }}
//                           className="ml-2 text-black font-medium"
//                           aria-label="Toggle submenu">
//                           {openSubCategory === type ? "▲" : "▼"}
//                         </button>
//                       </div>

//                       {/* Third level submenu */}
//                       {openSubCategory === type && (
//                         <ul className="flex flex-col bg-white border-t border-gray-200">
//                           {groupedCategories[type].map((category) => (
//                             <li key={category.category_id}>
//                               <Link
//                                 onAbort={handleClickMenu}
//                                 href={`/${category.category_type
//                                   .replace(/\s+/g, "-")
//                                   .toLowerCase()}/${category.category_name
//                                   .replace(/\s+/g, "-")
//                                   .toLowerCase()}`}
//                                 className="block px-8 py-2 text-black hover:bg-gray-200">
//                                 {category.category_name === "How To"
//                                   ? "How To ?"
//                                   : category.category_name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>

//             {/* About Us */}
//             <li className="border-b border-gray-300 px-4 py-3">
//               <Link
//                 href={`/about-us`}
//                 className="block text-black text-xl hover:text-[#00008B] font-semibold">
//                 About Us
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// }
// // // Helper function to create slug
// // const createSlug = (title) => {
// //   // Check if the title is not null and is a string before processing
// //   if (typeof title !== "string") {
// //     return ""; // Return an empty string or handle the case as needed
// //   }

// //   return title
// //     .toLowerCase()
// //     .trim()
// //     .replace(/[^\w\s-]/g, "") // Remove special characters
// //     .replace(/\s+/g, "-"); // Replace spaces with hyphens
// // };

// export default Navbar;
