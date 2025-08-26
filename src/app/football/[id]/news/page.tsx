"use client";

import { getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import NavLinkList from "@/components/ui/navlink-list";
import TrendyPost from "@/components/ui/TrendyPost";
import { useFootballStore } from "@/store/footballStore";
import { useParams } from "next/navigation";
// import { lists } from "@/constants/data";

export default function SuperEaglesNews() {
   const params = useParams();

  const tournament = params.id as string;

  const tournamentName = tournament.replace(/-/g, " ");

   const { categories } =
      useFootballStore();
  
      

    const filteredCategories = categories.filter(category => category?.name === tournamentName)

  const lists = getTournamentNavLists(tournament);
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
    
              <TrendyPost categories={filteredCategories} news={true}/>
          <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
           
            <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
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
