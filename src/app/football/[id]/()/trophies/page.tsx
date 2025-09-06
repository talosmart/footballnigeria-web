"use client";

import SpinnerLoader from "@/components/SpinnerLoader";
import SectionHeading from "@/components/trophies/section-heading";
import Trophy from "@/components/trophies/trophy-list";
import { getTrophies } from "@/constant/api.config";
import { useFootballStore } from "@/store/footballStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Trophies() {
  const [trophyData, setTrophyData] = useState(null)
   const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

   const { categories, fixtures, standings, matchPreview, basicStats, squads } = useFootballStore();
   const params = useParams();
  const country = params.id as string;
   const getCountry = matchPreview?.matchInfo?.contestant?.filter(team => team.name === country)
   const countryId = getCountry?.[0]?.id

   useEffect(() => {
       const getTrophyData = async () => {
         try {
           if (countryId) {
             setLoading(true)
             const trophy = await getTrophies(countryId);
             setTrophyData(trophy)
              setLoading(false)
           }
         } catch (error) {
           console.error("Error fetching match preview:", error);
            setError(true)
         }
       };
   
       getTrophyData();
     }, [countryId, setTrophyData]);

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
               {error || 'Trophy not found'}
             </main>
           );
         }
     
  return (
    <section className="mt-6 overflow-hidden rounded-lg text-sm">
  <h2 className="bg-primary mb-1 px-3 py-2 font-extrabold text-[#f3f3f3]">
    TROPHIES
  </h2>

  <div className="bg-[#f5f5f5] p-2.5">
    {trophyData?.competition?.map((data) => (
      <section key={data.id} className="mb-6 tracking-[0.2px]">
        <SectionHeading title={data.name} />

        {/* ✅ Headings */}
        <ul className="grid grid-cols-7 items-center lg:grid-cols-3 border-b border-gray-300 text-[11px] lg:text-[13px] font-bold text-gray-700 pb-1 mb-2">
          <li className="col-span-2 lg:col-span-1">Winner</li>
          <li className="col-span-2 lg:col-span-1">Runner-up</li>
          <li className="col-span-3 lg:col-span-1">Date</li>
        </ul>

        {/* ✅ Rows */}
        {data?.trophy?.map((trophies) => (
          <ul
            key={trophies.tournamentCalendarStartDate}
            className="grid gap-y-3 text-[11px] lg:text-[13px]"
          >
            <Trophy data={trophies} />
          </ul>
        ))}
      </section>
    ))}
  </div>
</section>

  );
}
