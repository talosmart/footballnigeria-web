"use client";

import { useEffect, useState } from "react";
import GreenHeader from "@/components/ui/green-header";
import Image from "next/image";
import LeagueTable from "@/components/ui/league-table";
import { useFootballStore } from "@/store/footballStore";
import { useUserStore } from "@/store/userStore";
import { fetchFootballData } from "@/components/methods";
import SubTitle from "@/components/ui/subtitle";

export default function Tables() {
  const { categories, fixtures, standings, matchPreview, loading, error } =
    useFootballStore();
  const { hydrated } = useUserStore();

  // ✅ Keep tab consistent (store original case, not lowercase)
  const [activeTab, setActiveTab] = useState("All");

  // Fetch data once user store is hydrated
  useEffect(() => {
    if (hydrated) {
      fetchFootballData();
    }
  }, [hydrated]);

  // ✅ Extract competition names
  const competitionNames = standings.map(
    (s) => s?.competition?.name || "Unknown"
  );

  // ✅ Build tags (unique list)
  const competitionTags = ["All", ...new Set(competitionNames)];

  // ✅ Filter standings by activeTab
  const filteredStandings =
    activeTab === "All"
      ? standings
      : standings.filter((s) => s?.competition?.name === activeTab);

  // ✅ Extract divisions with type="total"
  const standingsData =
    filteredStandings?.[0]?.stage?.[0]?.division.filter(
      (div) => div?.type === "total"
    ) || [];

  return (
    <section className="rounded-lg bg-white p-2.5 lg:p-5">
      <GreenHeader heading={activeTab} />

      <div className="px-3 py-2.5">

        {/* ✅ Tabs */}
        <TabList
          tags={competitionTags}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* ✅ Active Tag & Year */}
        {/* <div className="my-3.5 flex w-fit gap-x-3 rounded-full bg-[#D9EDE5] p-1">
          <TagPill text={activeTab} />
          <TagPill text="2025" />
        </div> */}
      </div>

      <div className="p-4">
        <SubTitle title="Table" />
      </div>

      {/* ✅ Render first two divisions */}
      {standingsData?.map((data) => (
        <div key={data.groupId}>
          <LeagueTable tournamentName={activeTab === "All" ? '' : activeTab} data={data} />
        </div>
      ))}
    </section>
  );
}

/* ------------------------------
   🔹 Tab Components
--------------------------------*/
function TabList({
  tags,
  activeTab,
  setActiveTab,
}: {
  tags: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Tab key={tag} text={tag} activeTab={activeTab} setActiveTab={setActiveTab} />
      ))}
    </div>
  );
}

function Tab({
  text,
  activeTab,
  setActiveTab,
}: {
  text: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const isActive = activeTab === text;

  return (
    <button
      className={`font-lato rounded-full px-3 py-1 text-sm transition-colors ${
        isActive
          ? "bg-primary text-white font-bold shadow-sm"
          : "bg-[#E6E6E6] hover:bg-[#D0D0D0]"
      }`}
      onClick={() => setActiveTab(text)}
      aria-pressed={isActive}
    >
      {text}
    </button>
  );
}

function TagPill({ text }: { text: string }) {
  return (
    <div className="font-lato flex items-center gap-x-2.5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#1E1E1E]">
      {text}
      <Image src="/chevron-black.svg" alt="" width={12} height={6} />
    </div>
  );
}
