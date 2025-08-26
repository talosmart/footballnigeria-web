"use client";

import { useFootballStore } from "@/store/footballStore";
import {  getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import LeagueTable from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
import { useParams } from "next/navigation";

export default function ScoresAndFixtures() {
   const params = useParams();

  const tournament = params.id as string;

  const tournamentName = tournament.replace(/-/g, " ");

   const { fixtures } =
      useFootballStore();
    

const liveFixturesData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Fixture")

const resultData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Played")
    const filteredResultData = resultData.filter(fixture => fixture?.matchInfo?.competition.name === tournamentName)
    const filteredLivefixtures = liveFixturesData.filter(fixture => fixture?.matchInfo?.competition.name === tournamentName)

  // const lists = getCountryNavLists(tournament);
  return (
    <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
     

      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
       
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
          {filteredLivefixtures.length > 0 && <MatchPreviewCard detail={true} type = 'Fixture' title="Today's Matches / Next Match"  filteredfixtures={filteredLivefixtures} />}
          {filteredResultData.length > 0 && <MatchPreviewCard detail={true} type = 'Played' title="Latest Scores"  filteredfixtures={filteredResultData} />}
          <Ads />
         
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
