"use client";

// import MatchTable from "@/components/ui/MatchTable";
// import { useState } from "react";

// const Table = () => {
//     const [activeTab, setActiveTab] = useState("all");
//       const [activeMatchTab, setActiveMatchTab] = useState("all");
//     return  <MatchTable activeTab={activeTab} activeMatchTab={activeMatchTab} setActiveTab={setActiveTab} setActiveMatchTab={setActiveMatchTab} />
// }

// export default Table;


"use client";

import { useFootballStore } from "@/store/footballStore";
import {  getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import LeagueTable from "@/components/ui/league-table";
import SubTitle from "@/components/ui/subtitle";
import { useParams, useSearchParams } from "next/navigation";

export default function SuperEagles() {
   const params = useParams();
  const tournament = params.id as string;
   const searchParams = useSearchParams(); 
       const fixtureId = searchParams.get("fixture"); 

  const tournamentURLName = tournament.replace(/-/g, " ");

   const { standings, matchPreview } =
      useFootballStore();

     const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
       const tournamentName = fixtureId ? tournamentMatchPreviewName : tournamentURLName;

     const filteredStandings = standings.filter(standing => standing?.competition?.name === tournamentName)


    const standingsData = filteredStandings?.[0]?.stage?.[0]?.division.filter(div => div?.type === "total")

  // const lists = getCountryNavLists(tournament);
  return (
    <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-5 px-2.5 lg:px-0">

        <aside className="mt-5 mb-5 flex h-[50.44px] items-center justify-center bg-[#d9d9d9] lg:mt-7 lg:h-[139.7px]">
          Ads
        </aside>
      </div>

      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
       
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
          <Ads />
            <div className="p-4">
                <SubTitle title={`${tournamentName} Table`} />
              </div>
          {standingsData?.map((data) => {
            return <div key={data.groupId}><LeagueTable tournamentName={tournamentName} data={data} detail={true} /></div>
          })}
         
        </aside>
      </section>
    </main>
  );
}



