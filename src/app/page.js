import NewPage from "@/Components/User/NewPage";
import UserHome from "@/Components/User/UserHome";

export async function generateMetadata({ params }) {}

export default async function HomePage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL;
  const postsRes = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  const postsJson = await postsRes.json();
  const posts = postsJson.data.filter(
    (post) => post.blog_type === "published"
  );
  return (
    <>
      <UserHome allposts={posts} />
      {/* <NewPage allposts={posts} /> */}
    </>
  );
}
