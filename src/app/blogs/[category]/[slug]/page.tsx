import { getPost, getPosts } from "@/services/blog";
import { Post } from "@/types/blog.types";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;

  const posts = (await getPosts()) as Post[];

  const postId = posts.find((post) => post.slug === slug)?.id;

  const postDetails = (await getPost(postId as number)) as Post;

  return (
    <main className="post-content mx-auto grid max-w-[1076px] gap-y-4 px-2.5 py-5 lg:py-[3.25rem]">
      <div className="rounded-lg bg-white p-8">
        <h1 className="text-3xl font-bold">{postDetails.title.rendered}</h1>
        <div
          className="text-neutral-200"
          dangerouslySetInnerHTML={{ __html: postDetails.content.rendered }}
        />
      </div>
    </main>
  );
}
