'use client';

import { use } from 'react';
import { AuthorizedApiRequest } from '@/constant/api.config';
import { useEffect, useState } from 'react';
import { Post } from '@/types/blog.types';
import { useUserStore } from '@/store/userStore';
import { getPosts } from '@/services/blog';
import SpinnerLoader from '@/components/SpinnerLoader';
import Image from 'next/image';

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = use(params); 
  const { hydrated } = useUserStore();

  const [post, setPost] = useState<Post | null>(null);
 
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (!hydrated) return;
  
      const getPostsData = async () => {
        try {
          const res = (await getPosts());
         setPosts(res?.response?.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      getPostsData();
    }, [hydrated]);

  // const posts = (await getPosts()) as Post[];
  
  const postId = posts?.find((post) => post.slug === slug)?.id;
  

  useEffect(() => {
    if (!hydrated || !postId) return;

    const fetchSinglePost = async () => {
      try {
        setLoading(true);
        const res = await AuthorizedApiRequest(`blog/single/${postId}`);
        setPost(res?.response?.data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [hydrated, postId]);

  if (loading) {
    return (
      <main className="py-20 flex justify-center items-center text-neutral-500">
       <SpinnerLoader width='md:w-10' height='md:h-10' borderThickness='border-5' borderTBg = 'border-t-green-500' borderT = 'border-t-5' />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="py-20 text-center text-red-500">
        {error || 'Post not found'}
      </main>
    );
  }

  return (
    <main className="post-content mx-auto grid max-w-[1076px] gap-y-4 px-2.5 py-5 lg:py-[3.25rem]">
      <div className="rounded-lg bg-white p-8 shadow">
        <div
        className={`relative w-1/2 shrink-0 overflow-hidden rounded-lg lg:min-h-[349px] mb-5`}
      >
        {post?.featured_image_url && <Image src={post?.featured_image_url} alt="news image" fill className="z-0 object-cover" />}
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div
          className="text-neutral-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
