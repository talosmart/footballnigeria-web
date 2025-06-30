import Link from "next/link";
import Image from "next/image";
import Ads from "@/components/ui/ad";
import Hero from "@/components/ui/hero";
import TagList from "@/components/ui/tag-list";
import MatchPreviewCard from "@/components/ui/card-match-preview";

export default function FanZone() {
  return (
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
      <Hero
        title="Welcome to the Fan Zone!"
        description="Share your stories, vote on polls, and connect with other fans."
      />

      <section className="max-w-[801.77px]">
        <TagList
          tags={[
            "Daily Discussion",
            "Super Eagles",
            "NPFL Discussion",
            "Math Thrend",
            "Post-Match Thrend",
            "Recent",
            "Top",
            "Top Thrending",
          ]}
        />
      </section>

      <section className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="grid gap-y-5">
          <FanZoneCard />
          <FanZoneCard2 />
          <FanZoneCard />
        </div>
        <aside className="grid w-full gap-y-5 lg:max-w-[371px]">
          <MatchPreviewCard />
          <Ads />
        </aside>
      </section>
    </main>
  );
}

const FanZoneCard = () => {
  return (
    <article className="font-lato grid gap-y-2.5 rounded-lg bg-white p-2.5">
      <section className="grid gap-y-3.5 p-2.5">
        <FanCardProfile />
        <h3 className="text-lg font-bold">
          Enugu Rangers Vs Eyimba Discussion
        </h3>
        <TagList
          tags={["Free Predictions", "Bettings"]}
          className="bg-primary text-white"
        />
      </section>

      <section
        className="relative h-[239px] rounded-lg bg-[#00000040] py-5 backdrop-blur-[100px] lg:h-[507px] lg:py-14"
        style={{ boxShadow: "0 0 4px 0 #00000040" }}
      >
        <div className="relative h-full">
          <Image src="/story-image.png" alt="" fill className="bg-cover" />
        </div>
      </section>

      <p className="font-medium">
        Match ends, Nigeria 1, South Africa 1. 90&apos;+6&apos;. Second Half
        ends, Nigeria 1, South Africa 1. 90&apos;+4&apos;. Foul by Khuliso Mudau
        (South Africa). Full Commentary.
      </p>

      <EngagementActions />
    </article>
  );
};

const FanZoneCard2 = () => {
  return (
    <article className="font-lato grid gap-y-2.5 rounded-lg bg-white p-2.5">
      <section className="grid gap-y-3.5 py-2.5 lg:px-2.5">
        <FanCardProfile />
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

const FanCardProfile = () => {
  return (
    <div className="flex items-center gap-x-2.5">
      {/* avatar */}
      <div className="border-primary flex h-8 w-8 items-center justify-center rounded-full border bg-[#E6F3EE]">
        <Image src="/linux.svg" alt="admin" width={15.85} height={19.19} />
      </div>
      {/* role & time */}
      <div className="flex items-center">
        <p className="text-lg font-bold">admin</p>
        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
          <Image src="/dot-separator.svg" alt="" width={6} height={6} />
        </div>
        <p className="text-text-tertiary text-sm font-medium">2hrs. ago</p>
      </div>
    </div>
  );
};

const EngagementActions = () => {
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
          1.5K
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
