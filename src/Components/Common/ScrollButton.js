'use client'; // 👈 Required for useEffect/useState

import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollButtons = () => {
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowScrollDown(false);
      } else {
        setShowScrollDown(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3 z-10">
      {showScrollDown ? (
        <button
          onClick={scrollToBottom}
          className="bg-[#00008B] text-white p-3 rounded-lg shadow-lg transition duration-300"
          aria-label="Scroll to Bottom"
        >
          <FaArrowDown size={20} />
        </button>
      ) : (
        <button
          onClick={scrollToTop}
          className="bg-[#00008B] text-white p-3 rounded-lg shadow-lg transition duration-300"
          aria-label="Scroll to Top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
