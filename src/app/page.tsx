"use client"

import Link from "next/link";

import Slider from "@/components/ui/slider";
import SubTitle from "@/components/ui/subtitle";
import MobileFooterMenu from "@/components/layout/mobile-footer-menu";
import { NewsCard, NewsCardLandscape } from "@/components/ui/card-news";

import { categoriesData, getCategories, getPosts, samplePosts } from "@/services/blog";
import { Categories, Post } from "@/types/blog.types";
import formatDate from "@/utils/format-date";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
  // const categories = (await getCategories()) as Categories;
    const { hydrated } = useUserStore();
   useEffect(() => {
    if (!hydrated) return;

    const getCategoriesData = async () => {
      setLoading(true)
      try {
        const res = (await getCategories());
       
       setCategories(res?.response?.data);
       
      }  catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post');
      }finally {
        setLoading(false);
      }
    };
    const getPostsData = async () => {
      try {
        const res = (await getPosts());
       setPosts(res?.response?.data);
      } catch (err) {
        console.error(err);
      }
    };


    getCategoriesData();
    getPostsData();
  }, [hydrated]);
  // const posts = (await getPosts()) as Post[];

  // const trendingPosts = categories
  //   .filter((category) => category.posts_count > 0)
  //   .slice(0, 6)
  //   .map((category) => {
  //     const post = samplePosts.find((post) => post.categories.includes(category.id));
  //     return post ? { post, category } : null;
  //   })
  //   .filter(Boolean)
  //   .slice(0, 6);

   if (loading) {
    return (
      <main className="py-20 flex justify-center items-center text-neutral-500">
       <SpinnerLoader width='md:w-10' height='md:h-10' borderThickness='border-5' borderTBg = 'border-t-green-500' borderT = 'border-t-5' />
      </main>
    );
  }

  if (error ) {
    return (
      <main className="py-20 text-center text-red-500">
        {error || 'Post not found'}
      </main>
    );
  }
  return (
    <>
      <main className="mx-auto grid max-w-[1076px] gap-y-12 px-2.5 py-5 lg:py-[6.25rem]">
        <div className="lg:hidden">
          <Slider />
        </div>

        {/* Trending Posts */}
        <section className="grid items-start gap-5 lg:grid-cols-3">
          <div className="lg:col-span-3">
            {categories[0] && (
              <NewsCardLandscape
                media={categories?.[0].posts?.[0].featured_image}
                // media={categories[0].post.featured_media_src_url}
                title={categories?.[0].posts?.[0].title}
                path={`/blogs/${categories?.[0].slug}/${categories[0].posts?.[0].slug}`}
                // path={`/blogs/${categories[0].category.slug}/${trendingPosts[0].post.slug}`}
              />
            )}
          </div>

          {categories
    ?.filter((category) => category.posts_count > 0).map((post, index) => {
            return <NewsCard
              key={index}
              noReadMore
              media={post?.posts?.[0]?.featured_image as string}
              title={post?.posts?.[0]?.title as string}
              // path={`/blogs/${post?.category.slug}/${post?.post.slug}`}
              path={`/blogs/${post?.slug}/${post?.posts?.[0]?.slug}`}
              description={post?.posts?.[0]?.excerpt as string}
              // description={post?.post.excerpt.rendered as string}
              date={formatDate(post?.posts?.[0]?.published_at as string)}
            />
        })}
        </section>

        {categories
          ?.filter((category) => category?.posts_count > 0)
          ?.map((category) => {
            const postsInCategory = samplePosts.filter((post) =>
              post.categories.includes(category.id),
            );

            return (
              <section key={category.id} className="grid gap-y-5 lg:gap-y-10">
                <SubTitle title={category.name} />
                <div className="grid gap-5 lg:grid-cols-3">
                  {category.posts?.map((post, index) => (
                    <NewsCard
                      key={index}
                      media={post.featured_image}
                      title={post.title}
                      path={`/blogs/${category.slug}/${post.slug}`}
                    />
                  ))}
                </div>

                {category.posts_count > 6 && (
                  <MoreButton
                    path={`/news?category=${category.id}`}
                    title={`More ${category.name}`}
                  />
                )}
              </section>
            );
          })}
        {/* {categories
          ?.filter((category) => category.posts_count > 0)
          ?.map((category) => {
            const postsInCategory = samplePosts.filter((post) =>
              post.categories.includes(category.id),
            );

            return (
              <section key={category.id} className="grid gap-y-5 lg:gap-y-10">
                <SubTitle title={category.name} />
                <div className="grid gap-5 lg:grid-cols-3">
                  {postsInCategory.map((post, index) => (
                    <NewsCard
                      key={index}
                      media={post.featured_media_src_url}
                      title={post.title.rendered}
                      path={`/blogs/${category.slug}/${post.slug}`}
                    />
                  ))}
                </div>

                {category.posts_count > 6 && (
                  <MoreButton
                    path={`/news?category=${category.id}`}
                    title={`More ${category.name}`}
                  />
                )}
              </section>
            );
          })} */}
      </main>

      <MobileFooterMenu />
    </>
  );
}

function MoreButton({ path, title }: { path: string; title: string }) {
  return (
    <div className="text-right">
      <Link
        href={path}
        className="bg-primary font-lato inline-block rounded px-7 py-2.5 text-xs font-semibold text-white lg:text-sm"
      >
        {title}
      </Link>
    </div>
  );
}
