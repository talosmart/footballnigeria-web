"use client";

import { useFootballStore } from "@/store/footballStore";
import { fetchFootballData, getCountryNavLists, getTournamentNavLists } from "@/components/methods";
import SpinnerLoader from "@/components/SpinnerLoader";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import FeaturedMatchCard, {
  FeaturedMatchSliderControl,
} from "@/components/ui/card-matches";
import LeagueTable, { NPFLLeagueTable } from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
// import { lists } from "@/constants/data";
import { useUserStore } from "@/store/userStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TrendyPost from "@/components/ui/TrendyPost";

export default function SuperEagles() {
   const params = useParams();

   const { hydrated } = useUserStore();
  const tournament = params.id as string;

  const tournamentName = tournament.replace(/-/g, " ");

   const { categories, posts, calendar, fixtures, liveFixtures, standings, loading, error } =
      useFootballStore();

  
       useEffect(() => {
      if (hydrated) {
        fetchFootballData();
      }
    }, [hydrated]);

    const filteredStandings = standings.filter(standing => standing?.competition?.name === tournamentName)
    const filteredCategories = categories.filter(category => category?.name === tournamentName)
    const filteredLivefixtures = liveFixtures.filter(fixture => fixture?.matchInfo?.competition.name === tournamentName)

    const standingsData = filteredStandings?.[0]?.stage?.[0]?.division.filter(div => div?.type === "total")

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

  const lists = getTournamentNavLists(tournament);
  // const lists = getCountryNavLists(tournament);
  return (
    <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-5 px-2.5 lg:px-0">
        <BreadCrumb />

        <aside className="mt-5 mb-5 flex h-[50.44px] items-center justify-center bg-[#d9d9d9] lg:mt-7 lg:h-[139.7px]">
          Ads
        </aside>
      </div>

      <section className="mb-5 bg-white px-2.5 lg:px-5">
        <h1 className="border-b-border-default font-lato border-b px-2 py-4 text-2xl font-semibold">
          {tournamentName}
        </h1>
        <NavLinkList lists={lists} />
      </section>

          <TrendyPost categories={filteredCategories} />
      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
       
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
          {filteredLivefixtures.length > 0 && <MatchPreviewCard filteredfixtures={filteredLivefixtures} />}
          <Ads />
            <div className="p-4">
                <SubTitle title="Table" />
              </div>
          {standingsData?.map((data) => {
            return <div key={data.groupId}><LeagueTable tournamentName={tournamentName} data={data} /></div>
          })}
        </aside>
      </section>

      <section className="px-2.5 lg:px-0">
        {/* <SubTitle title="Featured Matches" /> */}

        {/* <div className="no-scrollbar -mx-2.5 mt-2.5 mb-7 flex w-screen gap-5 overflow-x-auto px-2.5 lg:mx-0 lg:mt-5 lg:w-auto lg:px-0">
          <FeaturedMatchCard />
          <FeaturedMatchCard />
          <FeaturedMatchCard />
        </div> */}
{/* <div className="grid grow gap-y-5 rounded-lg bg-white px-2.5 py-5 lg:px-5 lg:py-5">
          <section>
            <SubTitle title={`${tournamentName} Latest News`} />
            <div className="mt-5 grid gap-y-5">
             
            </div>
          </section>
        </div> */}
        {/* <FeaturedMatchSliderControl /> */}
      </section>
    </main>
  );
}
