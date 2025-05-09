// components/SkeletonLoader.js

export default function SkeletonLoader() {
    return (
      <div className="animate-pulse space-y-8">
        {/* Latest Blogs */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md"></div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2 border border-gray-200 p-2 rounded-md">
                <div className="w-full h-32 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Top Reads */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 border border-gray-200 p-2 rounded-md">
                <div className="w-2/5 h-32 bg-gray-300 rounded"></div>
                <div className="flex flex-col gap-2 w-3/5">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2 mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Editor's Choice */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2 border border-gray-200 p-2 rounded-md">
                <div className="w-full h-32 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  