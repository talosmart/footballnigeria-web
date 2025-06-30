"use client";

import { useState } from "react";
import { PredictionCard, PredictionCard2 } from "./card-prediction";

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState("poll");

  return (
    <section className="rounded-2xl bg-white p-2.5">
      <div
        className="font-lato mb-7 flex overflow-hidden rounded-lg text-sm font-bold"
        style={{ boxShadow: "0 0 4px 0 #0000004D" }}
      >
        <button
          className={`w-1/2 py-3 ${activeTab === "poll" ? "bg-primary text-white" : "text-[#303030]"}`}
          onClick={() => setActiveTab("poll")}
        >
          League Poll
        </button>
        <button
          className={`w-1/2 py-3 ${activeTab === "prediction" ? "bg-primary text-white" : "text-[#303030]"}`}
          onClick={() => setActiveTab("prediction")}
        >
          National Poll
        </button>
      </div>

      {activeTab === "poll" ? (
        <div className="mt-2.5 grid gap-x-2.5 gap-y-5 lg:mt-5 lg:grid-cols-3">
          <PredictionCard />
          <PredictionCard />
          <PredictionCard />
          <PredictionCard />
          <PredictionCard />
          <PredictionCard />
        </div>
      ) : (
        <div className="mt-2.5 grid gap-x-2.5 gap-y-5 lg:mt-5 lg:grid-cols-3">
          <PredictionCard2 />
          <PredictionCard2 />
          <PredictionCard2 />
          <PredictionCard2 />
          <PredictionCard2 />
          <PredictionCard2 />
        </div>
      )}
    </section>
  );
}
