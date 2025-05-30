"use client";
import { useEffect, useState } from "react";
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
                <p className="font-semibold text-black text-lg">{fb.name}</p>
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

export default FeedbackSlider;
