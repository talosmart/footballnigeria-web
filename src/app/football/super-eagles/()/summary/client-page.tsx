"use client";

import SwitchView from "@/components/ui/tab-switch-view";
import Image from "next/image";
import { useState } from "react";
import SquadClientPage from "../squad/client-page";
import LeagueTable from "@/components/ui/league-table";
import { MatchList } from "@/components/ui/match-list";

export default function ClientSummaryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMatchTab, setActiveMatchTab] = useState("all");

  return (
    <>
      <section>
        <GreenHeader heading="Matches" />
        <div className="px-3 py-2.5">
          <p className="mb-2.5 text-sm font-bold">COMPETITIONS:</p>
          <TabList
            tags={[
              "All",
              "Friendlies",
              "CAF Africa Cup of Nations",
              "Africa Cup of Nations Qualification",
              "CAF World Cup Qualifiers",
              "Africa Nations Championship Qualification",
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="p-2.5 text-sm">
          <SwitchView
            tabs={["All", "Home", "Away"]}
            setActiveTab={setActiveMatchTab}
            activeTab={activeMatchTab}
          />

          <h3 className="font-bai grid grid-cols-3 bg-[#E6F3EE] px-6 py-4 text-center font-bold text-neutral-200">
            <span className="col-span-2 flex items-center justify-center gap-x-2.5">
              <Image src="/flag-sq.svg" alt="" width={16} height={11} />
              NIGERIA: NPFL
            </span>
            <span>STANDINGS</span>
          </h3>
          <ul>
            <MatchList status="win" />
            <MatchList status="lose" />
            <MatchList status="draw" />
          </ul>
          <div className="mt-5 flex justify-center lg:justify-end">
            <button className="border-primary text-primary font-lato rounded-full border px-12 py-1 text-sm leading-[22px] font-bold tracking-[0.2px] capitalize">
              Show more matches
            </button>
          </div>
        </div>
      </section>

      <section className="mt-2.5">
        <GreenHeader heading="Squad" />
        <div className="mb-2.5">
          <SquadClientPage />
        </div>
      </section>

      <section className="pt-5">
        <LeagueTable />
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
