"use client"

import Link from "next/link";

import Slider from "@/components/ui/slider";
import SubTitle from "@/components/ui/subtitle";
import MobileFooterMenu from "@/components/layout/mobile-footer-menu";
import { NewsCard, NewsCardLandscape } from "@/components/ui/card-news";

import { categoriesData, getCategories, getPosts, samplePosts } from "@/services/blog";
import { Categories, Post } from "@/types/blog.types";
import formatDate from "@/utils/format-date";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  // const categories = (await getCategories()) as Categories;
    const { hydrated } = useUserStore();
   useEffect(() => {
    if (!hydrated) return;

    const getData = async () => {
      try {
        const res = (await getCategories()) as Categories;;
        console.log('Data:', res);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [hydrated]);
  // const posts = (await getPosts()) as Post[];

  // console.log(categories, 'categories')

  const trendingPosts = categoriesData
    .filter((category) => category.count > 0)
    .slice(0, 6)
    .map((category) => {
      const post = samplePosts.find((post) => post.categories.includes(category.id));
      return post ? { post, category } : null;
    })
    .filter(Boolean)
    .slice(0, 6);

  return (
    <>
      <main className="mx-auto grid max-w-[1076px] gap-y-12 px-2.5 py-5 lg:py-[6.25rem]">
        <div className="lg:hidden">
          <Slider />
        </div>

        {/* Trending Posts */}
        <section className="grid items-start gap-5 lg:grid-cols-3">
          <div className="lg:col-span-3">
            {trendingPosts[0] && (
              <NewsCardLandscape
                media={trendingPosts[0].post.featured_media_src_url}
                title={trendingPosts[0].post.title.rendered}
                path={`/blogs/${trendingPosts[0].category.slug}/${trendingPosts[0].post.slug}`}
              />
            )}
          </div>

          {trendingPosts.slice(1).map((post, index) => (
            <NewsCard
              key={index}
              noReadMore
              media={post?.post.featured_media_src_url as string}
              title={post?.post.title.rendered as string}
              path={`/blogs/${post?.category.slug}/${post?.post.slug}`}
              description={post?.post.excerpt.rendered as string}
              date={formatDate(post?.post.date_gmt as string)}
            />
          ))}
        </section>

        {categoriesData
          .filter((category) => category.count > 0)
          .map((category) => {
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

                {category.count > 6 && (
                  <MoreButton
                    path={`/news?category=${category.id}`}
                    title={`More ${category.name}`}
                  />
                )}
              </section>
            );
          })}
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
