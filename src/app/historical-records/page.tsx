"use client"

import Image from "next/image";
import ShareStoryForm from "@/components/form/share-story";
import SubTitle from "@/components/ui/subtitle";
import { NewsCard, NewsCardLandscape } from "@/components/ui/card-news";
import { useFootballStore } from "@/store/footballStore";
import { useEffect } from "react";
import { fetchFootballData } from "@/components/methods";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useUserStore } from "@/store/userStore";
import { samplePosts } from "@/services/blog";

export default function HistoricalRecords() {
  const { hydrated } = useUserStore();
  const { categories, posts, liveFixtures, fixtures, loading, error } =
      useFootballStore();
  
       useEffect(() => {
      if (hydrated) {
        fetchFootballData();
      }
    }, [hydrated]);

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
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
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

      <section>
        <SubTitle title="Latest Fan Diaries" />
        <div className="my-10">
        {categories
                  ?.filter((category) => category?.posts_count > 0)
                  ?.map((category) => {
                    const postsInCategory = samplePosts.filter((post) =>
                      post.categories.includes(category.id),
                    );
        
                    return (
                      <section key={category.id} className="grid gap-y-5 lg:gap-y-10 my-4">
                        
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
                      </section>
                    );
                  })}
        </div>
        <div className="flex justify-end">
          {/* <button className="font-lato border-text-secondary flex items-center gap-x-3 rounded-full border px-8 py-2">
            Next
            <Image
              src="/arrow-black.svg"
              alt=""
              width={12}
              height={12}
              className="inline"
            />
          </button> */}
        </div>
      </section>

      <ShareStoryForm />
    </main>
  );
}
