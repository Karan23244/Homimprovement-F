// app/page.js

import NewPage from "@/Components/User/NewPage";

// Static generation
export const dynamic = "force-static";

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch posts
  const postsRes = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 60 },
  });
  const postsJson = await postsRes.json();
  const allposts = postsJson.data.filter(
    (post) => post.blog_type === "published"
  );

  // Fetch top reads and editor's choice
  const topRes = await fetch(`${baseUrl}/api/posts/topReadsAndEditorsChoice`, {
    next: { revalidate: 60 },
  });
  const topJson = await topRes.json();

  const latest = allposts.slice(0, 16);
  const latestIds = new Set(latest.map((p) => p.id));

  const topReads = (topJson.data?.topReads || [])
    .filter((post) => post.blog_type === "published" && !latestIds.has(post.id))
    .slice(0, 9);

  const topIds = new Set(topReads.map((p) => p.id));

  const editorsChoice = (topJson.data?.editorsChoice || [])
    .filter(
      (post) =>
        post.blog_type === "published" &&
        !latestIds.has(post.id) &&
        !topIds.has(post.id)
    )
    .slice(0, 8);

  return (
    <NewPage
      allposts={allposts}
      topReads={topReads}
      editorsChoice={editorsChoice}
    />
  );
}
