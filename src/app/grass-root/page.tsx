"use client";

import SubTitle from "@/components/ui/subtitle";
import TrendyPost from "@/components/ui/TrendyPost";
import { useFootballStore } from "@/store/footballStore";
import { useParams } from "next/navigation";

export default function GrassRoot() {
   const params = useParams();
  
    const tournament = params.id as string;
  
   const tournamentURLName = tournament?.replace(/-/g, " ");
  
     const { categories, matchPreview } =
        useFootballStore();
        
        
        
               const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
               const tournamentName = tournamentMatchPreviewName || tournamentURLName
    
        
  
      const filteredCategories = categories.filter(category => category?.name === tournamentName)
  
  return (
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
      <section>
        <SubTitle title="Grass Root Football" />
        <section className="my-10">
           <TrendyPost categories={filteredCategories} news={true}/>
        </section>
        <div className="mt-2.5 grid gap-5 lg:mt-8 lg:grid-cols-3">
          {/* <div className="lg:col-span-3">
            <NewsCardLandscape />
          </div>
          <NewsCard noReadMore />
          <NewsCard noReadMore />
          <NewsCard noReadMore />
          <NewsCard noReadMore />
          <NewsCard noReadMore />
          <NewsCard noReadMore /> */}
        </div>
      </section>
    </main>
  );
}
