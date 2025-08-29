"use client";

import Ads from "@/components/ui/ad";
import TrendyPost from "@/components/ui/TrendyPost";
import { useFootballStore } from "@/store/footballStore";
import { useParams } from "next/navigation";

export default function SuperEaglesTeamNews() {
   const params = useParams();

  const tournament = params.id as string;

 const tournamentURLName = tournament.replace(/-/g, " ");

   const { categories, matchPreview } =
      useFootballStore();
      
      
      
             const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
             const tournamentName = tournamentMatchPreviewName || tournamentURLName
  
      

    const filteredCategories = categories.filter(category => category?.name === tournamentName)

  return (
     <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
          
    
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
