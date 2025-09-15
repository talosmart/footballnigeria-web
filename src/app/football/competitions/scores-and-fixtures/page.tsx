"use client";

import { useFootballStore } from "@/store/footballStore";
import {  getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import LeagueTable from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
import SwitchView from "@/components/ui/tab-switch-view";
import { useEffect, useState } from "react";
import SwitchViewTab from "@/components/ui/switchViewTab";

export default function ScoresAndFixtures() {
      const [activeTab, setActiveTab] = useState("fixtures");
    

   const { fixtures, matchPreview } =
      useFootballStore();

       const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
       const tournamentName = tournamentMatchPreviewName 
    

const liveFixturesData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Fixture")

const resultData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Played")

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
       
          {liveFixturesData.length > 0 && activeTab === 'fixtures' && <MatchPreviewCard detail={true} type = 'Fixture' title="Today's Matches / Next Match"  filteredfixtures={liveFixturesData} tournamentName={''} />}
          {resultData.length > 0 && activeTab === 'results' && <MatchPreviewCard detail={true} type = 'Played' title="Latest Scores"  filteredfixtures={resultData} tournamentName={''} />}
          <Ads />
         
        </aside>
      </section>
    </main>
  );
}
