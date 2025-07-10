// app/components/FeedbackSliderWrapper.jsx
"use client";
import dynamic from "next/dynamic";

const FeedbackSlider = dynamic(() => import("../Common/FeedbackSlider"), {
  ssr: false,
  loading: () => <div className="text-center py-12">Loading feedback...</div>,
});

export default FeedbackSlider;
