"use client";

import Image from "next/image";
import { useState } from "react";

export default function StatisticsClientPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <section className="mt-6 overflow-hidden rounded-lg text-sm">
      <div className="flex flex-col gap-y-1 lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="flex items-center gap-x-2.5">
          <select className="appearance-none">
            <option value="">CAF Africa Cup of Nations</option>
          </select>
          <Image src="/chevron-black.svg" alt="" width={12} height={6} />
        </div>

        <div>
          <button
            className={`px-3 py-1 font-bold uppercase ${activeTab === "general" ? "border-b-primary border-b-[3px] bg-[#E6F3EE]" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General Statistics
          </button>
          <button
            className={`px-3 py-1 font-bold uppercase ${activeTab === "player" ? "border-b-primary border-b-[3px] bg-[#E6F3EE]" : ""}`}
            onClick={() => setActiveTab("player")}
          >
            Player Statistics
          </button>
        </div>
      </div>

      {activeTab === "general" ? <GeneralStat /> : <PlayerStat />}
    </section>
  );
}

const GeneralStat = () => {
  return (
    <>
      <div className="grid grid-cols-2 bg-[#E6F3EE] px-1 py-4 font-bold lg:grid-cols-4">
        <div></div>
        <div className="grid grid-cols-3 text-center lg:col-span-3">
          <span className="px-3">Total</span>
          <span className="px-3">Home</span>
          <span className="px-3">Away</span>
        </div>
      </div>
      <ul>
        <GeneralStatList statTitle="Matches Played" />
        <GeneralStatList statTitle="Wins" />
        <GeneralStatList statTitle="Avg. goals conceded p/m" />
        <GeneralStatList statTitle="Avg. goals scored p/m" />
        <GeneralStatList statTitle="Failed to score" />
        <GeneralStatList statTitle="Biggest Victory" />
        <GeneralStatList statTitle="Biggest defeat" />
      </ul>
    </>
  );
};

const GeneralStatList = ({ statTitle }: { statTitle: string }) => {
  return (
    <li className="border-b-border-default grid grid-cols-2 border-b py-3.5 font-bold lg:grid-cols-4">
      <p className="pl-5">{statTitle}</p>
      <div className="grid grid-cols-3 text-center lg:col-span-3">
        <span>10</span>
        <span>2</span>
        <span>8</span>
      </div>
    </li>
  );
};

const PlayerStat = () => {
  return (
    <div className="mt-2 grid gap-2 lg:grid-cols-2">
      <PlayerStatCard statName="apperance" />
      <PlayerStatCard statName="Goals" />
      <PlayerStatCard statName="assits" />
      <PlayerStatCard statName="dribbles" />
      <PlayerStatCard statName="tackles" />
      <PlayerStatCard statName="interception" />
      <PlayerStatCard statName="clearance" />
    </div>
  );
};

const PlayerStatCard = ({ statName }: { statName: string }) => {
  return (
    <article className="border-border-default flex gap-x-2 rounded-lg border p-1">
      <div className="flex w-[102.18px] shrink-0 flex-col items-center gap-y-1 py-1.5 lg:w-[157px]">
        <div className="relative h-[93.28px] w-[67.69px] overflow-hidden lg:h-[142.32px] lg:w-[104px]">
          <Image src="/player-stat.svg" alt="" fill />
        </div>
        <div className="text-center text-xs font-extrabold">
          <h3 className="text-primary uppercase">{statName}</h3>
          <p>201</p>
        </div>
      </div>
      <ul className="grow">
        <PlayerStatList />
        <PlayerStatList />
        <PlayerStatList />
        <PlayerStatList />
      </ul>
    </article>
  );
};

const PlayerStatList = () => {
  return (
    <li className="border-b-border-default font-lato grid grid-cols-4 items-center gap-x-2.5 border-b px-2.5 py-2 text-sm font-bold even:bg-[#FAFAFA]">
      <div className="col-span-3 flex items-center gap-x-2.5">
        <div className="relative h-[32.95px] w-[32.95px] overflow-hidden rounded-full border border-[#E6F3EE]">
          <Image src="/player-image.png" alt="" fill className="object-cover" />
        </div>
        <p>Victor Osihmen</p>
      </div>
      <p className="">196</p>
    </li>
  );
};
