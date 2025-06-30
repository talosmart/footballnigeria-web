"use client";

import { useState } from "react";
import GreenHeader from "@/components/ui/green-header";
import Image from "next/image";
import { CompetitionsTable } from "@/components/ui/league-table";

export default function Tables() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="rounded-lg bg-white p-2.5 lg:p-5">
      <GreenHeader heading="Africa Cup of Nations Qualifying Table 2025" />

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

        <div className="my-3.5 flex w-fit gap-x-3 rounded-full bg-[#D9EDE5] p-1">
          <div className="font-lato flex gap-x-2.5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#1E1E1E]">
            African Cup of Nation
            <Image src="/chevron-black.svg" alt="" width={12} height={6} />
          </div>
          <div className="font-lato flex gap-x-2.5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#1E1E1E]">
            2025
            <Image src="/chevron-black.svg" alt="" width={12} height={6} />
          </div>
        </div>
      </div>

      <CompetitionsTable />
    </section>
  );
}

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
