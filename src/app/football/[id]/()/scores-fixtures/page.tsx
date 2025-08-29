"use client";

import { useFootballStore } from "@/store/footballStore";
import {  getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import LeagueTable from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
import { useParams, useSearchParams } from "next/navigation";
import SwitchView from "@/components/ui/tab-switch-view";
import { useEffect, useState } from "react";
import SwitchViewTab from "@/components/ui/switchViewTab";

export default function ScoresAndFixtures() {
   const params = useParams();
     const searchParams = useSearchParams(); 
     const fixtureId = searchParams.get("fixture"); 
      const [activeTab, setActiveTab] = useState("fixtures");
    

  const tournament = params.id as string;

  const tournamentURLName = tournament.replace(/-/g, " ");

   const { fixtures, matchPreview } =
      useFootballStore();

       const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
       const tournamentName = fixtureId ? tournamentMatchPreviewName : tournamentURLName;
    

const liveFixturesData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Fixture")

const resultData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Played")
    const filteredResultData = resultData.filter(fixture => fixture?.matchInfo?.competition.name === tournamentName)
    const filteredLivefixtures = liveFixturesData.filter(fixture => fixture?.matchInfo?.competition.name === tournamentName)

    console.log(filteredLivefixtures, 'filteredLivefixtures')
  return (
    <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-2">

     <SubTitle title={'Scores and Fixtures'} />
      </div>
<SwitchViewTab
        tabs={["Fixtures", "Results"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
       
          {filteredLivefixtures.length > 0 && activeTab === 'fixtures' && <MatchPreviewCard detail={true} type = 'Fixture' title="Today's Matches / Next Match"  filteredfixtures={filteredLivefixtures} tournamentName={tournamentName} />}
          {filteredResultData.length > 0 && activeTab === 'results' && <MatchPreviewCard detail={true} type = 'Played' title="Latest Scores"  filteredfixtures={filteredResultData} tournamentName={tournamentName} />}
          <Ads />
         
        </aside>
      </section>
    </main>
  );
}
