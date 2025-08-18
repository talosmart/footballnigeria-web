"use client"

import Link from "next/link";

import Slider from "@/components/ui/slider";
import SubTitle from "@/components/ui/subtitle";
import MobileFooterMenu from "@/components/layout/mobile-footer-menu";
import { NewsCard, NewsCardLandscape } from "@/components/ui/card-news";

import { categoriesData, getCategories, getPosts, samplePosts } from "@/services/blog";
import formatDate from "@/utils/format-date";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import SpinnerLoader from "@/components/SpinnerLoader";
import { PredictionCard } from "@/components/ui/card-prediction";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import Image from "next/image";
import { useFootballStore } from "../store/footballStore";
import { fetchFootballData } from "@/components/methods";
import { LiveFixtures } from "@/components/ui/live-fixtures";
import TrendyPost from "@/components/ui/TrendyPost";

export default function Home() {
 
const { hydrated } = useUserStore();
  const { categories, posts, liveFixtures, loading, error } =
    useFootballStore();

     useEffect(() => {
    if (hydrated) {
      fetchFootballData();
    }
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
        <div className="">
          <Slider posts={posts.slice(0, 5)} /> 
        </div>

        {/* Trending Posts */}
       <TrendyPost categories={categories} homePage={true} />
          <SubTitle title={`Live on Scores`} />
      <section className="relative w-full">
  <div className="flex gap-x-4 lg:gap-x-16 overflow-x-scroll scrollbar-none scroll-smooth snap-x snap-mandatory w-[40rem] lg:w-[55rem] ">
    {liveFixtures?.map((fixture) => (
      <div
        key={fixture.matchInfo.id}
        className="snap-start shrink-0 w-[300px]" // fixed width for sliding cards
      >
        <LiveFixtures
          path={`/football/${fixture.matchInfo.competition.name.replace(/\s+/g, "-")}`}
          fixture={fixture.matchInfo}
        />
      </div>
    ))}
  </div>
</section>
       
      {/* <MatchPreviewCard /> */}
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
                  {category.posts?.slice(0,3).map((post, index) => (
                    <NewsCard
                      key={index}
                      media={post.featured_image}
                      title={post.title}
                      path={`/blogs/${category.slug}/${post.slug}`}
                    />
                  ))}
                </div>

              
                  <MoreButton
                    path={`/football/${category.name.replace(/\s+/g, '-')}`}
                    title={`More ${category.name}`}
                  />
                  {/* <MoreButton
                    path={`/news?category=${category.id}`}
                    title={`More ${category.name}`}
                  /> */}
              
              </section>
            );
          })}
            <div className="w-[60%] mx-auto">
          <PredictionCard />
        </div>
          <section className="relative h-[241px] overflow-hidden rounded-2xl bg-blend-overlay lg:h-[457px]">
                  <Image
                    src="/play.svg"
                    alt=""
                    width={65}
                    height={65}
                    className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute top-0 left-0 z-40 h-full w-full bg-[#00000033]" />
                  <Image src="/naija-flag.jpg" alt="" fill className="object-cover" />
                </section>
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
