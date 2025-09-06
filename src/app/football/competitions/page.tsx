"use client";

import { fetchFootballData } from "@/components/methods";
import SpinnerLoader from "@/components/SpinnerLoader";
import Ads from "@/components/ui/ad";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import FeaturedMatchCard, {
  FeaturedMatchSliderControl,
} from "@/components/ui/card-matches";
import LeagueTable, { CompetitionsTable } from "@/components/ui/league-table";
import MoreButton from "@/components/ui/MoreButton";
import SubTitle from "@/components/ui/subtitle";
import TrendyPost from "@/components/ui/TrendyPost";
import { useFootballStore } from "@/store/footballStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function News() {
  const { categories, fixtures, standings, matchPreview, loading, error } = useFootballStore();
    const tournamentName = matchPreview?.matchInfo?.competition?.name

     const { hydrated } = useUserStore();

  
    // ✅ fetch football data once hydrated
    useEffect(() => {
      if (hydrated) {
        fetchFootballData();
      }
    }, [hydrated]);
    const liveFixturesData = fixtures?.filter(
    (fixture) => fixture?.liveData?.matchDetails?.matchStatus === "Fixture"
  );

  const resultData = fixtures?.filter(
    (fixture) => fixture?.liveData?.matchDetails?.matchStatus === "Played"
  );

  const filteredCategories = categories.filter(
    (category) => category?.name === tournamentName
  );

   const standingstournamentName = standings.map(
    (standing) => standing?.competition?.name 
  );
   const standingstournamentTables = standings.map(
    (standing) => standing?.stage?.[0]?.division.filter(
    (div) => div?.type === "total")
  );

   const standingsData = standings?.[0]?.stage?.[0]?.division.filter(
    (div) => div?.type === "total"
  );


  if (loading) {
    return (
      <main className="py-20 flex justify-center items-center text-neutral-500">
        <SpinnerLoader
          width="md:w-10"
          height="md:h-10"
          borderThickness="border-5"
          borderTBg="border-t-green-500"
          borderT="border-t-5"
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-20 text-center text-red-500">
        {error || "Post not found"}
      </main>
    );
  }

  return (
    <>
      <section className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-start">
       

      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
          <TrendyPost categories={filteredCategories} />
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
          {liveFixturesData.length > 0 && (
            <MatchPreviewCard
              detail={false}
              type="Fixture"
              title="Today's Matches / Next Match"
              filteredfixtures={liveFixturesData}
            />
          )}
          {resultData.length > 0 && (
            <MatchPreviewCard
              detail={false}
              type="Played"
              title="Latest Scores"
              filteredfixtures={resultData}
            />
          )}

          {(liveFixturesData.length > 0 ||
            resultData.length > 0) && (
            <MoreButton
              path={"/football/competitions/scores-and-fixtures"}
              title={`More Scores & Fixtures`}
            />
          )}

          <Ads />

          <div className="p-4">
            <SubTitle title="Table" />
          </div>
          <div>
          {standings?.map((standing, index) => {
            return <div key={index}>  {standing?.stage?.[0]?.division.filter(
    (div) => div?.type === "total")?.slice(0, 2)?.map((data) => (
            <div key={data?.groupId} className="my-5">
              <LeagueTable tournamentName={standing?.competition?.name} data={data} />
            </div>
          ))}</div>
          })
         }</div>
          <div className="my-5">
            <MoreButton
              path={"/football/competitions/table"}
              title={`More tables`}
            />
          </div>
        </aside>
      </section>
        {/* <aside className="container grid w-full gap-y-5 px-2.5 lg:max-w-[371px] lg:px-0">
          <CompetitionsTable />
        </aside> */}
      </section>

      {/* <section className="px-2.5 lg:px-0">
        <SubTitle title="Featured Matches" />

        <div className="no-scrollbar -mx-2.5 mt-2.5 mb-7 flex w-screen gap-5 overflow-x-auto px-2.5 lg:mx-0 lg:mt-5 lg:w-auto lg:px-1 lg:py-1">
          <FeaturedMatchCard />
          <FeaturedMatchCard />
          <FeaturedMatchCard />
        </div>

        <FeaturedMatchSliderControl />
      </section> */}
    </>
  );
}
