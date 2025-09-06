"use client";

import GreenHeader from "@/components/ui/green-header";
import SwitchView from "@/components/ui/tab-switch-view";
import Image from "next/image";
import { useState } from "react";

export default function News() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMatchTab, setActiveMatchTab] = useState("all");

  return (
    <section className="rounded-lg bg-white p-2.5 lg:p-5">
      <GreenHeader heading="AFCON - Scores & Fixtures" />

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

      <div className="mt-1 overflow-hidden rounded-lg">
        <SwitchView
          tabs={["All", "Home", "Away"]}
          setActiveTab={setActiveMatchTab}
          activeTab={activeMatchTab}
        />
        <h3 className="font-bai bg-[#E6F3EE] px-6 py-3.5 text-sm font-bold text-[#757575] uppercase lg:text-base">
          Tuesday, November 19, 2024
        </h3>
        <ul>
          <Score$FixtureList />
          <Score$FixtureList />
          <Score$FixtureList />
          <Score$FixtureList />
        </ul>
      </div>
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

const Score$FixtureList = () => {
  return (
    <li className="font-lato flex items-center border-b border-b-[#D9D9D9] py-1.5 odd:bg-white even:bg-[#FAFAFA]">
      <div className="flex flex-col gap-x-1 px-2.5 text-sm leading-[1.125rem] font-medium text-[#757575] lg:pr-20 lg:pl-7">
        <span>29.011.</span>
        <span>FT</span>
      </div>
      <div className="grid grow gap-y-4 border-x border-x-[#D9D9D9] px-3 text-sm lg:px-9">
        <div className="flex justify-between font-bold">
          <div>Shooting Stars</div>
          <div>3</div>
        </div>
        <div className="flex justify-between">
          <div>Eyimba</div>
          <div>1</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-3 px-6 lg:px-28">
        <Image src="/user-2.svg" alt="" width={24} height={24} className="h-[1.125rem] w-[1.125rem] lg:h-6 lg:w-6" />
        <Image src="/lucide_view.svg" alt="" width={24} height={24} className="h-[1.125rem] w-[1.125rem] lg:h-6 lg:w-6" />
        <Image src="/pitch.svg" alt="" width={24} height={24} className="h-[1.125rem] w-[1.125rem] lg:h-6 lg:w-6" />
      </div>
    </li>
  );
};
