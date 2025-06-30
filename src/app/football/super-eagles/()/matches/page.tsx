"use client";

import GreenHeader from "@/components/ui/green-header";
import { LeagueTableWithForm } from "@/components/ui/league-table";
import SwitchView from "@/components/ui/tab-switch-view";
import Image from "next/image";
import { useState } from "react";

export default function Page1() {
  const [activeMatchTab, setActiveMatchTab] = useState("info");

  return (
    <section className="font-lato rounded-lg bg-white">
      <header className="item-center flex justify-between py-4 leading-[21.64px]">
        <div className="flex grow items-center gap-x-2.5">
          <Image src="/club1.png" alt="" width={30} height={41.11} />
          <div>
            <p className="font-semibold text-[#1E1E1E]">
              African Cup of Nations: Group C
            </p>
            <p className="text-sm text-[#757575]">AFCON</p>
          </div>
        </div>
        <Image
          src="/pitch.svg"
          alt="pitch icon"
          width={28}
          height={28}
          className="shrink-0"
        />
      </header>

      <Pitch />

      <section className="mb-7 flex items-center rounded-lg bg-[#F5F5F5] py-5">
        <article className="flex grow flex-col items-center justify-center">
          <div className="relative mb-1 w-[86.47px] lg:w-[115.3px]">
            <img src="/club1.png" alt="" className="object-cover" />
          </div>
          <h3 className="font-montserrat mb-2 text-[10.5px] font-bold text-[#333333]">
            NIGERIA
          </h3>
          <div className="flex gap-x-1">
            <TeamStat status="w" />
            <TeamStat status="w" />
            <TeamStat status="d" />
            <TeamStat status="w" />
            <TeamStat status="l" />
          </div>
        </article>
        <section className="shrink-0 text-center">
          <p className="font-bai-jamjuree mb-2 text-xl font-semibold text-[#1E1E1E]">
            <span>5</span> - <span>0</span>
          </p>
          <p className="font-montserrat rounded bg-[#E6E6E6] px-1.5 py-1 text-[9px] font-medium text-[#303030]">
            Full Time
          </p>
        </section>
        <article className="flex grow flex-col items-center justify-center">
          <div className="relative mb-1 w-[86.47px] lg:w-[115.3px]">
            <img src="/club2.png" alt="" className="object-cover" />
          </div>
          <h3 className="font-montserrat mb-2 text-[10.5px] font-bold text-[#333333]">
            GHANA
          </h3>
          <div className="flex gap-x-1">
            <TeamStat status="w" />
            <TeamStat status="w" />
            <TeamStat status="d" />
            <TeamStat status="w" />
            <TeamStat status="l" />
          </div>
        </article>
      </section>

      <section className="no-scrollbar mb-6 flex overflow-scroll border-t-2 border-b border-[#D9D9D9]">
        {[
          { title: "info" },
          { title: "summary" },
          { title: "line-ups" },
          { title: "table" },
          { title: "h2h" },
        ].map((tab, i) => (
          <button
            key={i}
            className={`text-neutral shrink-0 p-2.5 text-sm uppercase ${activeMatchTab === tab.title ? "text-primary border-b-[3px] font-semibold" : "text-[#303030]"}`}
            onClick={() => setActiveMatchTab(tab.title.toLowerCase())}
          >
            {tab.title}
          </button>
        ))}
      </section>

      {activeMatchTab === "info" && <Info />}
      {activeMatchTab === "summary" && <ExcitementIndex />}
      {activeMatchTab === "line-ups" && <LinesUps />}
      {activeMatchTab === "table" && <LeagueTableWithForm />}
      {activeMatchTab === "h2h" && <H2H />}
    </section>
  );
}

const TeamStat = ({ status }: { status: "w" | "d" | "l" }) => {
  return (
    <div
      className={`font-inter flex h-[17.87px] w-[17.87px] items-center justify-center rounded-full lg:h-[23.83px] lg:w-[23.83px] ${status === "w" ? "bg-[#68D100]" : status === "d" ? "bg-[#FFC501]" : "bg-[#EC1C24]"} text-[10px] font-bold text-white uppercase`}
    >
      {status}
    </div>
  );
};

const Info = () => {
  return (
    <>
      <GreenHeader heading="Match information" />

      <section className="mt-1 flex min-h-[380px] flex-col items-center justify-center rounded-lg bg-[#F5F5F5]">
        <ul className="font-lato grid gap-y-3.5 text-sm leading-[1.125rem] tracking-[0.2px] text-[#5A5A5A]">
          <li className="flex items-center justify-center gap-x-2.5">
            <Image
              src="/calendar.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
            5 Feb 2025
          </li>
          <li className="flex items-center justify-center gap-x-2.5">
            <Image
              src="/whistle-2.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            Adnan Deniz Kayatepe (Turkiye)
          </li>
          <li className="flex items-center justify-center gap-x-2.5">
            <Image
              src="/stadium.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            Eagles Square Fct Abuja
          </li>
        </ul>
      </section>
    </>
  );
};

const ExcitementIndex = () => {
  return (
    <>
      <GreenHeader heading="EXCITEMENT INDEX" />

      <section className="mt-1 flex flex-col items-center justify-center rounded-lg bg-[#F5F5F5]">
        <ul className="font-inter w-full px-3 text-xs leading-[140%] text-[#5A5A5A]">
          <li className="grid grid-cols-5 gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#274893]">31&apos;</span>
              <span className="font-spacegrotesk text-xs text-[#64666B]">
                0 - 1
              </span>
            </div>
          </li>

          <li className="grid grid-cols-5 gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">55&apos;</span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">G. Xhaka</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">55&apos;</span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">G. Xhaka</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 items-center gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">57&apos;</span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <Image src="/substitue.svg" alt="" width={24} height={24} />
              <div className="font-inter text-right text-xs">
                <p className="text-[#23262D]">I. Gundogan</p>
                <p className="text-[#939598]">Gabriel Jesus</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 items-center gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="col-span-2 flex items-center justify-end gap-x-2">
              <div className="font-inter text-right text-xs">
                <p className="text-[#23262D]">I. Gundogan</p>
                <p className="text-[#939598]">Gabriel Jesus</p>
              </div>
              <Image src="/substitue.svg" alt="" width={24} height={24} />
            </div>
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">57&apos;</span>
            </div>
          </li>

          <li className="grid grid-cols-5 items-center gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">57&apos;</span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <div className="relative">
                <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
                <div className="absolute right-1 bottom-1 h-[16.67px] w-[11.67px] bg-[#D90D2D]" />
              </div>
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">G. Xhaka</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 items-center gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="col-span-2 flex items-center justify-end gap-x-2">
              <div className="font-inter text-right text-xs">
                <p className="text-[#23262D]">B. Saka</p>
                <p className="text-[#939598]">Penalty</p>
              </div>
              <Image src="/soccer.svg" alt="" width={20} height={20} />
            </div>
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">57&apos;</span>
              <span className="font-spacegrotesk text-xs text-[#64666B]">
                0 - 1
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">G. Xhaka</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">55&apos;</span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">G. Xhaka</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 border-b border-b-[#d9d9d9] py-2 text-center font-bold text-[#64666B]">
            <div className="col-start-3 flex flex-col text-xs">
              <span>Half Time</span>
              <span>0 - 1</span>
            </div>
          </li>

          <li className="grid grid-cols-5 gap-x-3 border-b border-b-[#D9D9D9] py-2">
            <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
              <span className="text-sm font-bold text-[#23262D]">31&apos;</span>
              <span className="font-spacegrotesk text-xs text-[#64666B]">
                0 - 1
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-x-2">
              <Image src="/soccer.svg" alt="" width={20} height={20} />
              <div className="font-inter text-xs">
                <p className="text-[#23262D]">B. Saka</p>
                <p className="text-[#939598]">K. Tierney</p>
              </div>
            </div>
          </li>

          <li className="grid grid-cols-5 py-2 text-center font-bold text-[#64666B]">
            <span className="col-start-3">Kick Off</span>
          </li>
        </ul>
      </section>
    </>
  );
};

const LinesUps = () => {
  return (
    <>
      <GreenHeader heading="Line-ups" />

      <section className="font-lato">
        <div className="mb-1 grid grid-cols-2 px-3 py-1 text-sm font-bold text-[#1E1E1E]">
          <h3>Home</h3>
          <h3>Away</h3>
        </div>

        <section className="bg-[#F5F5F5] p-2.5">
          <section className="mb-5">
            <h4 className="mb-3 border-b border-b-[#D9D9D9] px-2.5 py-1.5 text-xs leading-[1.125rem] font-bold tracking-[0.2px] text-[#303030] uppercase">
              Players
            </h4>

            <div className="grid grid-cols-2 px-3">
              {/* Home */}
              <div className="grid gap-y-3">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={index}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      12
                    </div>
                    <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                  </div>
                ))}
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={index}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      12
                    </div>
                    <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-5">
            <h4 className="mb-3 border-b border-b-[#D9D9D9] px-2.5 py-1.5 text-xs leading-[1.125rem] font-bold tracking-[0.2px] text-[#303030] uppercase">
              Subsitute players
            </h4>

            <div className="grid grid-cols-2 px-3">
              {/* Home */}
              <div className="grid gap-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={index}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      12
                    </div>
                    <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                  </div>
                ))}
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={index}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      12
                    </div>
                    <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h4 className="mb-3 border-b border-b-[#D9D9D9] px-2.5 py-1.5 text-xs leading-[1.125rem] font-bold tracking-[0.2px] text-[#303030] uppercase">
              coaches
            </h4>

            <div className="grid grid-cols-2 px-3">
              {/* Home */}
              <div className="grid gap-y-3">
                <div className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]">
                  <Image src="/coach.svg" alt="" width={24} height={24} />
                  <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                </div>
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
                <div className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]">
                  <Image src="/coach.svg" alt="" width={24} height={24} />
                  <span className="text-[#1E1E1E]">Gokkan Akkan (GK)</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

const H2H = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeTab1, setActiveTab1] = useState("all");

  return (
    <>
      <section>
        <GreenHeader heading="head to head matches (h2h)" />

        <ul className="mb-8">
          <H2HList status="w" />
          <H2HList status="d" />
          <H2HList status="l" />
          <H2HList status="w" />
        </ul>
      </section>

      <div className="grid gap-x-7 lg:grid-cols-2">
        <section>
          <GreenHeader heading="nigeria matches" />

          <SwitchView
            tabs={["All", "Home", "Away"]}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <ul className="mb-8">
            <H2HListNoDropdown status="w" />
            <H2HListNoDropdown status="d" />
            <H2HListNoDropdown status="l" />
            <H2HListNoDropdown status="w" />
          </ul>
        </section>
        <section>
          <GreenHeader heading="ghana matches" />
          <SwitchView
            tabs={["All", "Home", "Away"]}
            setActiveTab={setActiveTab1}
            activeTab={activeTab1}
          />
          <ul className="mb-8">
            <H2HListNoDropdown status="w" />
            <H2HListNoDropdown status="d" />
            <H2HListNoDropdown status="l" />
            <H2HListNoDropdown status="w" />
          </ul>
        </section>
      </div>
    </>
  );
};

const H2HList = ({ status }: { status: "w" | "d" | "l" }) => {
  return (
    <li className="font-lato flex items-center border-b border-b-[#D9D9D9] py-1.5 odd:bg-[#FAFAFA] even:bg-white">
      <div className="flex gap-x-1 px-2.5 text-sm leading-[1.125rem] font-medium lg:px-9">
        <span className="text-[#757575]">29.011.</span>
        <span className="text-[#1E1E1E]">14:00</span>
      </div>
      <div className="grid grow gap-y-4 border-x border-x-[#D9D9D9] px-3 text-sm lg:px-12">
        <div className="flex justify-between font-bold">
          <div>Shooting Stars</div>
          <div>3</div>
        </div>
        <div className="flex justify-between">
          <div>Eyimba</div>
          <div>1</div>
        </div>
      </div>
      <div className="flex items-center gap-x-9 px-6 lg:px-9">
        <div className="flex items-center justify-center lg:px-[6.25rem]">
          <div
            className={`font-inter flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white capitalize ${status === "w" ? "bg-[#68D100]" : status === "l" ? "bg-[#EC1C24]" : "bg-[#FFC501]"}`}
          >
            {status}
          </div>
        </div>
        <button className="hidden shrink-0 lg:block">
          <Image src="/chevron-stroke-black.svg" alt="" width={12} height={6} />
        </button>
      </div>
    </li>
  );
};

const H2HListNoDropdown = ({ status }: { status: "w" | "d" | "l" }) => {
  return (
    <li className="font-lato flex items-center border-b border-b-[#D9D9D9] py-1.5 odd:bg-[#FAFAFA] even:bg-white">
      <div className="flex gap-x-1 px-2.5 text-sm leading-[1.125rem] font-medium">
        <span className="text-[#757575]">29.011.</span>
        <span className="text-[#1E1E1E]">14:00</span>
      </div>
      <div className="grid grow gap-y-4 border-x border-x-[#D9D9D9] px-3 text-sm">
        <div className="flex justify-between font-bold">
          <div>Shooting Stars</div>
          <div>3</div>
        </div>
        <div className="flex justify-between">
          <div>Eyimba</div>
          <div>1</div>
        </div>
      </div>
      <div className="flex items-center px-6">
        <div className="flex items-center justify-center lg:px-11">
          <div
            className={`font-inter flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white capitalize ${status === "w" ? "bg-[#68D100]" : status === "l" ? "bg-[#EC1C24]" : "bg-[#FFC501]"}`}
          >
            {status}
          </div>
        </div>
      </div>
    </li>
  );
};

const Pitch = () => {
  return (
    <section className="relative mb-7 h-[207.05px] rounded-lg bg-[#29A96B] lg:h-[550.69px]">
      {/* Line */}
      <div className="absolute left-1/2 h-full -translate-x-1/2 border-x border-white" />

      <Post />

      <div className="relative top-1/2 right-0 -translate-y-1/2 -rotate-180">
        <Post />
      </div>

      {/* Main */}
      <section className="absolute top-1/2 left-1/2 flex h-fit w-[60%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-y-2 bg-white px-1.5 py-5 lg:w-[70%] lg:px-5 lg:py-16">
        <div className="text-center lg:mb-8">
          <h3 className="font-montserrat leading-[38px mb-0.5 text-xs font-bold tracking-[0.42px] text-[#303030] lg:mb-2 lg:text-xl">
            MATCH ENDED
          </h3>

          <div className="flex items-center justify-center gap-x-1 lg:gap-x-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#852221] text-[10px] font-bold text-[#F3F3F3] lg:h-[49px] lg:w-[51.28px] lg:rounded-lg lg:text-sm">
              3
            </div>
            <span className="font-lato text-[10px] font-bold tracking-[0.2px] text-[#5A5A5A] lg:text-sm">
              :
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#852221] text-[10px] font-bold text-[#F3F3F3] lg:h-[49px] lg:w-[51.28px] lg:rounded-lg lg:text-sm">
              1
            </div>
          </div>

          <p className="font-lato mt-0.5 text-center text-[10px] leading-[1.125rem] tracking-[0.2px] text-[#5A5A5A] lg:mt-2 lg:text-sm">
            HT 2 : 0
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-1 border-y border-y-[#D9D9D9] py-3 tracking-[0.2px] lg:gap-y-2.5 lg:py-8">
          <p className="text-[8px] leading-[1.125rem] font-bold text-[#303030] lg:text-sm">
            Adnan Deniz Kayatepe (Turkiye)
          </p>
          <div className="flex items-center gap-x-1 text-[8px] text-[#5A5A5A] lg:text-sm">
            <Image
              src="/whistle-2.svg"
              alt=""
              width={24}
              height={24}
              className="hidden lg:block"
            />
            <Image
              src="/whistle-2.svg"
              alt=""
              width={14}
              height={14}
              className="lg:hidden"
            />
            REFEREE
          </div>
        </div>
      </section>
    </section>
  );
};

const Post = () => {
  return (
    <div>
      <div className="absolute top-1/2 z-20 h-[55.53px] w-[14.49px] -translate-y-1/2 border-y-2 border-r-2 border-white lg:h-[148.34px] lg:w-[38.7px]" />
      <div className="absolute top-1/2 z-10 h-[111.05px] w-[38.63px] -translate-y-1/2 border-y-2 border-r-2 border-white bg-[#29A96B] lg:h-[296.69px] lg:w-[103.2px]" />

      <svg
        width="30"
        height="58"
        viewBox="0 0 30 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-6 h-[55.53px] w-[27.76px] -translate-y-1/2 lg:left-[58.05px] lg:h-[148.34px] lg:w-[74.17px]"
      >
        <ellipse
          cx="27.7633"
          cy="13.8817"
          rx="27.7633"
          ry="13.8817"
          transform="matrix(0 -1 -1 0 28.4922 56.6895)"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
