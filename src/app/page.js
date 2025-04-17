import UserHome from "@/Components/User/UserHome";

export async function generateMetadata({ params }) {
  
}

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";
  const postsRes = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  const posts = await postsRes.json();
  console.log(posts)
  return (
    <>
      <UserHome posts={posts.data} />
    </>
  );
}
