"use client";

export default function SwitchView({
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
          className={`px-3 py-1 text-sm font-bold uppercase ${activeTab === tab.toLowerCase() ? "border-b-primary border-b-[3px] bg-[#E6F3EE]" : ""}`}
          onClick={() => setActiveTab(tab.toLowerCase())}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
