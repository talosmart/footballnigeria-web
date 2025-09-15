"use client";

import SwitchView from "@/components/ui/tab-switch-view";
import Image from "next/image";
import { useState } from "react";
import SquadClientPage from "../squad/client-page";
import LeagueTable from "@/components/ui/league-table";
import { MatchList } from "@/components/ui/match-list";
import MatchTable from "@/components/ui/MatchTable";

export default function ClientSummaryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMatchTab, setActiveMatchTab] = useState("all");

  return (
    <>
      <MatchTable activeTab={activeTab} activeMatchTab={activeMatchTab} setActiveTab={setActiveTab} setActiveMatchTab={setActiveMatchTab} />

      <section className="mt-2.5">
        <GreenHeader heading="Squad" />
        <div className="mb-2.5">
          <SquadClientPage />
        </div>
      </section>

      <section className="pt-5">
        {/* <LeagueTable /> */}
      </section>
    </>
  );
}

const GreenHeader = ({ heading }: { heading: string }) => {
  return (
    <h3 className="bg-primary mb-1 rounded-t-lg px-3 py-2 text-sm font-extrabold text-[#F3F3F3] uppercase">
      {heading}
    </h3>
  );
};

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
        <Tab
          key={tag}
          text={tag}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

const Tab = ({
  text,
  activeTab,
  setActiveTab,
}: {
  text: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <button
      className={`font-lato rounded-full px-3 py-1 text-sm ${
        activeTab === text.toLowerCase()
          ? "bg-primary text-[#F3F3F3]"
          : "bg-[#E6E6E6]"
      }`}
      onClick={() => setActiveTab(text.toLowerCase())}
    >
      {text}
    </button>
  );
};
