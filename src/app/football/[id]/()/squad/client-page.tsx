"use client";

import SectionHeading from "@/components/trophies/section-heading";
import Trophy from "@/components/trophies/trophy-list";
import GreenHeader from "@/components/ui/green-header";
import SwitchView from "@/components/ui/tab-switch-view";
import Image from "next/image";
import { useState } from "react";

export default function SquadClientPage() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <section className="mt-6 overflow-hidden rounded-lg text-sm">
      <div className="flex flex-col gap-y-1 lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="flex items-center gap-x-2.5">
          <select className="appearance-none">
            <option value="">2025 Moroco</option>
          </select>
          <Image src="/chevron-black.svg" alt="" width={12} height={6} />
        </div>

        <SwitchView
          tabs={["Statistics", "Current", "Sidelined"]}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>

      {activeTab === "statistics" ? (
        <Statistics />
      ) : activeTab === "current" ? (
        <Current />
      ) : activeTab === "sidelined" ? (
        <Sidelined />
      ) : null}
    </section>
  );
}

const Current = () => {
  return (
    <>
      <section>
        <SectionTitle title={"GOALKEEPERS"} />
        <div className="grid gap-4 p-2.5 lg:grid-cols-3">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </section>
      <section>
        <SectionTitle title={"DEFENDERS"} />
        <div className="grid gap-4 p-2.5 lg:grid-cols-3">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </section>
      <section>
        <SectionTitle title={"MIDFIELDERS"} />
        <div className="grid gap-4 p-2.5 lg:grid-cols-3">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </section>
      <section>
        <SectionTitle title={"ATTACKERS"} />
        <div className="grid gap-4 p-2.5 lg:grid-cols-3">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </section>
    </>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="font-bai-jamjuree bg-[#E6F3EE] py-1 text-center font-bold">
      {title}
    </h3>
  );
};

const PlayerCard = () => {
  return (
    <article className="flex items-center gap-x-5 rounded-lg bg-[#F5F5F5] p-2.5">
      <section className="flex items-center">
        <div className="border-border-default mr-3.5 border-r pr-3.5">
          <div className="relative h-[71px] w-[71px] overflow-hidden rounded-full border border-[#E6F3EE]">
            <Image
              src="/player-image.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid gap-y-0.5">
          <p>
            <span className="mr-2 inline-block w-[52px] text-neutral-200">
              Name:
            </span>
            <span className="font-medium">A. Obasogie</span>
          </p>
          <p>
            <span className="mr-2 inline-block w-[52px] text-neutral-200">
              Age:
            </span>
            <span className="font-medium">24 years</span>
          </p>
          <p>
            <span className="mr-2 inline-block w-[52px] text-neutral-200">
              Position:
            </span>
            <span className="font-medium">Goalkeeper</span>
          </p>
        </div>
      </section>
      <section>
        <div>
          <Image
            src="/jersey.png"
            alt=""
            width={70.55}
            height={70.55}
            className="mb-2.5"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1">
            <Image src="/flag-post.svg" width={12.02} height={12.02} alt="" />{" "}
            <span className="text-[10px]">1</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Image src="/ball.svg" width={12.02} height={12.02} alt="" />{" "}
            <span className="text-[10px]">0</span>
          </div>
        </div>
      </section>
    </article>
  );
};

const Sidelined = () => {
  return (
    <section>
      <div className="grid grid-cols-3 bg-[#E6F3EE] py-4 pl-3.5 font-bold tracking-[0.2px]">
        <h3>Player</h3>
        <h3 className="text-center">Start Date</h3>
        <h3 className="text-center">End Date</h3>
      </div>
      <ul>
        <SideLinedList />
        <SideLinedList />
        <SideLinedList />
        <SideLinedList />
      </ul>
    </section>
  );
};

const SideLinedList = () => {
  return (
    <li className="border-b-border-default grid grid-cols-3 items-center border-b py-3.5 pl-3.5 font-bold even:bg-[#FAFAFA]">
      <div className="flex items-center gap-x-2.5">
        <Image src="/flag-circle.png" alt="" width={24} height={24} />
        <span className="truncate">Sikiru Kamaldeen</span>
      </div>
      <span className="flex items-center justify-center gap-x-3 text-center">
        <Image src="/first-aid-bag.png" alt="" width={24} height={24} />
        21-09-25
      </span>
      <span className="text-center">21-09-25</span>
    </li>
  );
};

const Statistics = () => {
  return (
    <section>
      {/* heading */}
      <div className="font-montserrat relative bg-[#E6F3EE] py-4 font-extrabold lg:text-2xl">
        <h2 className="text-center">PLAYER INFORMATION</h2>
        <button className="absolute top-1/2 left-6 -translate-y-1/2">
          <Image src="/arrow-curve.svg" alt="" width={18.41} height={14.71} />
        </button>
      </div>

      {/* player summary */}
      <div className="mb-5 p-2.5">
        <article className="font-montserrat flex flex-col items-center justify-between gap-4 rounded-3xl bg-[#008751]/70 bg-[url(/naija-flag.jpg)] bg-cover bg-center px-5 py-2.5 bg-blend-darken lg:flex-row">
          <section className="flex items-start gap-x-2.5 lg:items-center">
            <div className="relative h-[91.56px] w-[87.23px] shrink-0 overflow-hidden rounded-xl lg:h-[169px] lg:w-[161px]">
              <Image
                src="/player-image.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="grow text-white">
              <div className="mb-2 flex items-center justify-between gap-x-2.5">
                <p className="tracking-[0.15px]lg:text-xl font-bold">
                  VICTOR OSHIMEN
                </p>
                <Image src="/star.svg" alt="star" width={20} height={19.07} />
              </div>
              <span className="mb-2 inline-block rounded-full bg-[#002F1C] px-3 py-2 text-[8px] leading-[13.45px] font-semibold lg:text-[10px]">
                FORWARD/ATTACKER
              </span>
              <div className="flex items-center gap-x-4">
                <Image src="/club2.png" width={33.39} height={51.39} alt="" />
                <div className="font-lato">
                  <p className="font-semibold text-[#f3f3f3] lg:text-lg">
                    Galatasaray Spor Kulubu
                  </p>
                  <p className="text-[9px] leading-[18px] lg:text-xs">
                    Contract until 30 Jun 2025
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            className="rounded-2xl bg-white p-4 lg:max-w-[429px]"
            // style={{ boxShadow: "0 4px 4px 0 #E6F3EE" }}
          >
            <h3 className="text-center font-bold text-black">
              VICTOR OSHIMEN #54
            </h3>
            <p className="p-2.5 text-xs leading-[18px]">
              Born 8 November 1996, is a professional footballer who plays for
              Galatasaray Contract until 30 Jun 2025
            </p>
          </section>
        </article>
      </div>

      <div className="grid max-w-[703px] gap-y-5">
        {/* Player Details */}
        <section>
          <GreenHeader heading="Player Details" />
          <section className="rounded-2xl bg-[#F5F5F5] px-5 py-4">
            <section className="mb-2.5 flex flex-wrap justify-around gap-3.5">
              <PlayerDetails
                info={{ title: "Nationality", value: "Nigeria" }}
              />
              <PlayerDetails
                info={{ title: "Date of Birth", value: "29-12-98 (26)" }}
              />
              <PlayerDetails
                info={{ title: "Country Of Birth", value: "Nigeria" }}
              />
              <PlayerDetails info={{ title: "Position", value: "Attacker" }} />
              <PlayerDetails info={{ title: "Height", value: "185cm" }} />
              <PlayerDetails info={{ title: "Weight", value: "78kg" }} />
              <PlayerDetails info={{ title: "Foot", value: "Right" }} />
            </section>
            <section className="grid gap-y-2">
              <PlayerDetailsProgress />
              <PlayerDetailsProgress />
              <PlayerDetailsProgress />
              <PlayerDetailsProgress />
              <PlayerDetailsProgress />
              <PlayerDetailsProgress />
            </section>
          </section>
        </section>

        {/* Transfers & loans */}
        <section>
          <GreenHeader heading="Transfers & loans" />
        </section>

        {/* Teams */}
        <section>
          <GreenHeader heading="Teams" />
          <ul className="grid gap-y-3 rounded-b-lg bg-[#f5f5f5] p-2.5 text-[11px] lg:text-[13px]">
            <TeamList />
            <TeamList />
          </ul>
        </section>

        {/* Trophies */}
        <section>
          <GreenHeader heading="Trophies" />
          <div className="bg-[#f5f5f5] p-2.5">
            <section className="mb-6 tracking-[0.2px]">
              <SectionHeading title="  CLUB DOMESTIC" />
              <ul className="grid gap-y-3 text-[11px] lg:text-[13px]">
                {/* <Trophy />
                <Trophy /> */}
              </ul>
            </section>

            <section className="tracking-[0.2px]">
              <SectionHeading title="National" />
              <ul className="grid gap-y-3 text-[11px] lg:text-[13px]">
                {/* <Trophy />
                <Trophy /> */}
              </ul>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

const PlayerDetails = ({
  info,
}: {
  info: { title: string; value: string };
}) => {
  return (
    <div className="font-montserrat px-2 text-center text-xs leading-[18px] tracking-[0.2px] lg:px-8">
      <p className="text-text-secondary font-semibold">{info.title}</p>
      <p className="flex items-center justify-center gap-x-1 font-bold text-black">
        {info.title === "Nationality" && (
          <Image src="/flag-circle.png" alt="" width={15} height={15} />
        )}
        {info.value}
      </p>
    </div>
  );
};

const PlayerDetailsProgress = () => {
  return (
    <div>
      <div className="font-poppins mb-2 flex items-center justify-between text-[8px] font-semibold text-black uppercase lg:text-[10px]">
        <p>Goals</p>
        <p>2</p>
      </div>
      <div className="h-1 rounded-full bg-[#0C0C0C] lg:h-1.5">
        <div className="bg-primary h-full w-[70%] rounded-full" />
      </div>
    </div>
  );
};

const TeamList = () => {
  return (
    <li className="grid grid-cols-2 items-center">
      <div className="flex items-center gap-x-2.5 text-neutral-200">
        <Image src="/club1.png" alt="" width={16} height={24.63} />
        Napoli
      </div>

      <p className="font-bold">(04/09/2024 - 30/06/2025)</p>
    </li>
  );
};
