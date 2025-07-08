// src/app/not-found.js

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">The blog you're looking for does not exist or is unpublished.</p>
    </div>
  );
}
