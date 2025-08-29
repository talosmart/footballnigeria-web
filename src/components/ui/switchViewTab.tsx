"use client";

export default function SwitchViewTab({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 text-sm font-bold uppercase rounded-[9px] h-[38px] w-[196.5px] ${activeTab === tab.toLowerCase() ? "bg-primary border-b-[3px] text-[#E6F3EE]" : "cursor-pointer"}`}
          onClick={() => setActiveTab(tab.toLowerCase())}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
