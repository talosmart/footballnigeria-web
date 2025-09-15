"use client";

import { useEffect, useState } from "react";
import { PredictionCard, PredictionCard2 } from "./card-prediction";
import { useUserStore } from "@/store/userStore";
import { getAllPolls } from "@/constant/api.config";
import { useFootballStore } from "@/store/footballStore";
import SpinnerLoader from "../SpinnerLoader";

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState("poll");
   const [nationalPolls, setNationalPolls] = useState([])
   const [leaguePolls, setLeaguePolls] = useState([])
   const { hydrated } = useUserStore();

    const {  loading, error } =
       useFootballStore();

    const getPolls = async () => {
   const pollsData = (await getAllPolls()) as any
   const leaguePolls = pollsData?.data?.filter((poll) => poll.type === 'league')
   const nationalPolls = pollsData?.data?.filter((poll) => poll.type === 'national')
   setLeaguePolls(leaguePolls)
   setNationalPolls(nationalPolls)
       }
   
        useEffect(() => {
       if (hydrated) {
         getPolls()
       }
     }, [hydrated]);

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
        {error || 'Polls not found'}
      </main>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-2.5">
      <div
        className="font-lato mb-7 flex overflow-hidden rounded-lg text-sm font-bold"
        style={{ boxShadow: "0 0 4px 0 #0000004D" }}
      >
        <button
        type="button"
          className={`w-1/2 py-3 ${activeTab === "poll" ? "bg-primary text-white" : "text-[#303030] cursor-pointer"}`}
          onClick={() => setActiveTab("poll")}
        >
          League Poll
        </button>
        <button
        type="button"
          className={`w-1/2 py-3 ${activeTab === "prediction" ? "bg-primary text-white" : "text-[#303030] cursor-pointer"}`}
          onClick={() => setActiveTab("prediction")}
        >
          National Poll
        </button>
      </div>

      {activeTab === "poll" ? (
        <div className="mt-2.5 grid gap-x-2.5 gap-y-5 lg:mt-5 lg:grid-cols-3">
           {leaguePolls?.map((poll) => (
        <PredictionCard key={poll.id} poll={poll} />
      ))}
        </div>
      ) : (
        <div className="mt-2.5 grid gap-x-2.5 gap-y-5 lg:mt-5 lg:grid-cols-3">
               {leaguePolls?.map((poll) => (
        <PredictionCard2 key={poll.id} poll={poll} />
      ))}
        </div>
      )}
    </section>
  );
}
