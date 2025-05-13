export default function SkeletonLatestBlogs() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      <div className="w-full h-[200px] bg-gray-300 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="space-y-2 border border-gray-200 p-2 rounded-md animate-pulse">
            <div className="w-full h-32 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
