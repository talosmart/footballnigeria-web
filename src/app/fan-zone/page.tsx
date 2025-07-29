"use client"

import Link from "next/link";
import Image from "next/image";
import Ads from "@/components/ui/ad";
import Hero from "@/components/ui/hero";
import TagList from "@/components/ui/tag-list";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { getPostList, getTopics } from "@/services/blog";
import SpinnerLoader from "@/components/SpinnerLoader";
import formatDate from "@/utils/format-date";

export default function FanZone() {
  const [postList, setPostList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [postById, setPostById] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingTopics, setLoadingTopics] = useState(true);
     const [error, setError] = useState<string | null>(null);

      const { hydrated } = useUserStore();
     useEffect(() => {
      if (!hydrated) return;
  
      const getCategoriesData = async () => {
        setLoading(true)
        try {
          const res = (await getPostList());
         
         setPostList(res?.response?.posts);
         setPostById(res?.response?.posts);
         
        }  catch (err) {
          console.error('Failed to fetch post:', err);
          setError('Failed to load post');
        }finally {
          setLoading(false);
        }
      };
      
      const getTopicData = async () => {
        setLoadingTopics(true)
        try {
          const res = (await getTopics());
         
         setTopics(res?.response?.data?.topics);
         
        }  catch (err) {
          console.error('Failed to fetch post:', err);
          setError('Failed to load post');
        }finally {
          setLoadingTopics(false);
        }
      };
   
  
      getCategoriesData();
      getTopicData()
    }, [hydrated]);

      const handleTagClicked = useCallback((id: number) => {
    const fiterPostById = postList.filter((post) => post?.topic_id == id)
   
setPostById(fiterPostById)
  }, [postList])

    console.log(postList, 'postList')
    console.log(topics, 'topics')

      if (loading || loadingTopics) {
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
  const topicData = topics.map((topic) => ({id: topic.id, name: topic.name}))


  return (
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
      <Hero
        title="Welcome to the Fan Zone!"
        description="Share your stories, vote on polls, and connect with other fans."
      />

      <section className="max-w-[801.77px]">
        <TagList
          tags={topicData}
          // handleTagClicked={()=> {}}
          handleTagClicked={handleTagClicked}
        />
      </section>

      <section className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {postById.length > 0 ? <div className="grid gap-y-5">
          {postById?.map((post)=>{
            return <div key={post.id}><FanZoneCard post={post} /></div>
          })
            }
          <FanZoneCard2 />
          {/* <FanZoneCard /> */}
        </div> : <h3 className="py-20 text-center text-green-500 font-bold text-base w-full">No Post Available at the Moment</h3>}
        <aside className="grid w-full gap-y-5 lg:max-w-[371px]">
          <MatchPreviewCard />
          <Ads />
        </aside>
      </section>
    </main>
  );
}

const FanZoneCard = ({post}) => {
  return (
    <article className="font-lato grid gap-y-2.5 rounded-lg bg-white p-2.5">
      <section className="grid gap-y-3.5 p-2.5">
        <FanCardProfile user={post.user} />
        <h3 className="text-lg font-bold">
          Enugu Rangers Vs Eyimba Discussion
        </h3>
        <TagList
          tags={[{id: 1, name:"Free Predictions"}, {id: 2,name:"Bettings"}]}
          className="bg-primary text-white"
        />
      </section>

      <section
        className="relative h-[239px] rounded-lg bg-[#00000040] py-5 backdrop-blur-[100px] lg:h-[507px] lg:py-14"
        style={{ boxShadow: "0 0 4px 0 #00000040" }}
      >
        <div className="relative h-full">
          <Image src={`https://football.ogitechconsults.ng/public/uploads/${post?.media?.[0]?.url}`} alt="" fill className="bg-cover" />
        </div>
      </section>

      <p className="font-medium">
       {post.content}
      </p>

      <EngagementActions post={post} />
    </article>
  );
};

const FanZoneCard2 = (post) => {
  return (
    <article className="font-lato grid gap-y-2.5 rounded-lg bg-white p-2.5">
      <section className="grid gap-y-3.5 py-2.5 lg:px-2.5">
          <FanCardProfile user={post.user} />
        <article className="flex gap-x-2.5">
          <section className="grow">
            <div className="mb-2.5 shrink lg:mb-8">
              <h3 className="mb-2 text-sm font-bold lg:text-xl">
                Nigeria Qualified for word cup 2025
              </h3>
              <p className="text-[13px] font-medium lg:text-lg">
                Yes, Nigeria can still reach the finals to be staged across the
                United States, Canada and Mexico. All is not lost just yet,
                although there is a fast-closing ...
              </p>
            </div>
            <Link href="" className="text-sm font-medium text-[#32ADE6]">
              http://www.testinging.com
            </Link>
          </section>
          <div
            className="relative hidden w-full max-w-[124px] min-[420px]:block lg:max-w-[201.96px]"
            style={{ boxShadow: "0 0 1.12px 0 #00000040" }}
          >
            <Image
              src="/stories-image-2.jpg"
              alt=""
              fill
              className="bg-cover"
            />
          </div>
        </article>
        <EngagementActions />
      </section>
    </article>
  );
};

const FanCardProfile = ({user}) => {
  return (
    <div className="flex items-center gap-x-2.5">
      {/* avatar */}
      <div className="border-primary flex h-8 w-8 items-center justify-center rounded-full border bg-[#E6F3EE]">
        <Image src="/linux.svg" alt="admin" width={15.85} height={19.19} />
      </div>
      {/* role & time */}
      <div className="flex items-center">
        <p className="text-lg font-bold">{user?.full_name}</p>
        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
          <Image src="/dot-separator.svg" alt="" width={6} height={6} />
        </div>
        <p className="text-text-tertiary text-sm font-medium">{formatDate(user?.created_at)}</p>
      </div>
    </div>
  );
};

const EngagementActions = ({post}) => {
  return (
    <footer className="flex">
      <div className="bg-primary h-full w-1.5 rounded-l-md" />
      <div className="flex gap-x-2.5 p-2.5">
        <button className="font-lato flex items-center gap-x-1.5 rounded-full bg-[#E6E6E6] px-3 py-2.5 text-xs lg:px-5">
          <Image
            src="/likes.svg"
            alt=""
            width={16}
            height={16}
            className="shrink-0"
          />
          Likes
        </button>
        <Link
          href={"/fan-zone/0"}
          className="font-lato flex items-center gap-x-1.5 rounded-full bg-[#E6E6E6] px-3 py-2.5 text-xs lg:px-5"
        >
          <Image
            src="/comment.svg"
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
          {post?.comment_count > 0 ? post?.comment_count : ''}
        </Link>
        <button className="font-lato flex items-center gap-x-1.5 rounded-full bg-[#E6E6E6] px-3 py-2.5 text-xs lg:px-5">
          <Image
            src="/share.svg"
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
          Share
        </button>
      </div>
    </footer>
  );
};
