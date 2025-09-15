"use client";

import Image from "next/image";
import SwitchView from "./tab-switch-view";
import { useEffect, useState } from "react";
import GreenHeader from "./green-header";
import { fifaToIso2 } from "../methods";

export default function LeagueTable({tournamentName, data, detail = false}) {
  const rankings = tournamentName === 'NPFL' && !detail ? data?.ranking?.slice(0,5) : data?.ranking
  return (
    <section className="font-lato overflow-hidden rounded-t-2xl bg-white">
     
      {!detail && <GreenHeader heading={tournamentName} className="mb-0 text-center" />}
      <LeagueTableHeader title={data?.groupName} />
      <ul>
        {rankings?.map((rank, i) => (
          <LeagueTableRow key={rank?.rankId} i={i} rank={rank} active={[4, 7]} tournamentName={tournamentName} />
        ))}
      </ul>
    </section>
  );
}

export function LeagueTableWithForm({tournamentName, filteredStandings}) {
  const [activeTab, setActiveTab] = useState("all");
  const [activeTable, setActiveTable] = useState([])

  useEffect(() => {
setActiveTable(allStandings)
  },[])


  const allStandings = filteredStandings?.[0]?.stage?.[0]?.division.filter(standing => standing.type === 'total')
  const homeStandings = filteredStandings?.[0]?.stage?.[0]?.division.filter(standing => standing.type === 'home')
  const awayStandings = filteredStandings?.[0]?.stage?.[0]?.division.filter(standing => standing.type === 'away')
   
   useEffect(() => {
    switch (activeTab) {
      case "home":
        setActiveTable(homeStandings);
        break;
      case "away":
        setActiveTable(awayStandings);
        break;
      case "all":
         setActiveTable(allStandings);
      default:
        setActiveTable(allStandings);
        break;
    }
  }, [activeTab]);

  return (
    <section className="font-lato overflow-hidden rounded-t-2xl bg-white">
      <h2 className="bg-primary py-2.5 text-center text-sm font-extrabold text-[#f3f3f3] uppercase">
        {tournamentName}
      </h2>

      <SwitchView
        tabs={["All", "Home", "Away"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

     {activeTable.map(table => (
<>
      <div key={table.groupId} className="text-neutral flex items-center justify-between bg-[#D9EDE5] px-3.5 py-[7.5px] text-xs font-bold lg:text-sm">
        <h4 className="px-2.5 text-base">{table.groupName}</h4>
        <div className="flex gap-x-1 lg:gap-x-5">
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>PL</h4>
          </div>
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>W</h4>
          </div>
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>D</h4>
          </div>
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>L</h4>
          </div>
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>GD</h4>
          </div>
          <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
            <h4>Pts</h4>
          </div>
          {/* <div className="hidden h-5 w-40 items-center justify-center lg:flex lg:h-8">
            <h4>FORM</h4>
          </div> */}
        </div>
      </div>
      <ul>
        {table.ranking.map((rank, i) => (
          <LeagueTableRowWithForm key={i} i={i} rank={rank} />
        ))}
      </ul>
      </>
     ))
      }
    </section>
  );
}

interface Ranking {
  contestantCode: string;
  contestantClubName: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  matchesLost: number;
  goaldifference: number;
  points: number;
}

const LeagueTableRowWithForm = ({
  i,
  rank
}: {
  i: number;
  rank: Ranking;
}) => {
    const countryCode = fifaToIso2[rank.contestantCode];
    const countryFlag = `https://flagcdn.com/w40/${countryCode}.png`;
  return (
    <li
      className={`border-b-border-default font-lato hover:bg-[#E6E6E6] flex items-center justify-between border-b px-1 py-2.5 text-sm text-black`}
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <p className="font-bold">{i + 1}</p>
      </div>
      <div className="flex grow items-center gap-x-2.5 px-2.5">
        {countryFlag && <Image src={countryFlag} alt="flag" width={24} height={24.32} />}
        <span>{rank.contestantClubName}</span>
      </div>
      <div className="flex gap-x-1 px-3 lg:gap-x-5">
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank.matchesPlayed}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank.matchesWon}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank.matchesDrawn}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank.matchesLost}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank.goaldifference}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center font-semibold lg:h-8 lg:w-8">
          <p>{rank.points}</p>
        </div>
        {/* <div className="hidden w-40 justify-center gap-x-0.5 lg:flex">
          <TeamStat status="w" />
          <TeamStat status="w" />
          <TeamStat status="d" />
          <TeamStat status="w" />
          <TeamStat status="l" />
          <TeamStat status="l" />
        </div> */}
      </div>
    </li>
  );
};

export function NPFLLeagueTable({tournamentName, filteredStandings}) {
  return (
    <section className="font-lato overflow-hidden rounded-t-2xl bg-white">
      <h3 className="bg-primary py-2.5 text-center text-sm font-extrabold text-[#f3f3f3]">
        {`${tournamentName} TABLE`}
      </h3>
      <div className="text-neutral flex items-center justify-between bg-[#D9EDE5] px-3.5 py-[7.5px] font-bold">
        <h4 className="px-2.5">Team</h4>
        <div className="flex gap-x-[7.5px]">
          <div className="flex h-8 w-8 items-center justify-center">
            <h4>PL</h4>
          </div>
          <div className="flex h-8 w-8 items-center justify-center">
            <h4>GD</h4>
          </div>
          <div className="flex h-8 w-8 items-center justify-center">
            <h4>Pts</h4>
          </div>
        </div>
      </div>
      <ul>
        {new Array(11).fill("").map((_, i) => (
          <NPFLLeagueTableRow key={i} i={i} active={[4, 7]} />
        ))}
      </ul>
    </section>
  );
}

const NPFLLeagueTableRow = ({ i, active }: { i: number; active: number[] }) => {
  return (
    <li
      className={`border-b-border-default font-lato flex items-center justify-between border-b px-1 py-2.5 text-sm text-black ${
        active.includes(i) ? "bg-[#E6E6E6]" : ""
      }`}
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <p className="font-bold">{i + 1}</p>
      </div>
      <div className="flex grow items-center gap-x-2.5 px-2.5">
        <Image src="/club-1.svg" alt="" width={24} height={24.32} />
        <span>Man United</span>
      </div>
      <div className="flex gap-x-[7.5px] px-3">
        <div className="flex h-8 w-8 items-center justify-center">
          <p>56</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center">
          <p>26</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center font-semibold">
          <p>89</p>
        </div>
      </div>
    </li>
  );
};

const TeamStat = ({ status }: { status: "w" | "d" | "l" }) => {
  return (
    <div
      className={`font-inter flex h-[17.87px] w-[17.87px] items-center justify-center rounded-full lg:h-[23.83px] lg:w-[23.83px] ${status === "w" ? "bg-[#68D100]" : status === "d" ? "bg-[#FFC501]" : "bg-[#EC1C24]"} text-[10px] font-bold text-white uppercase`}
    >
      {status}
    </div>
  );
};

function LeagueTableHeader({ title }: { title: string }) {
  return (
    <div className="text-neutral flex items-center justify-between bg-[#D9EDE5] px-3.5 py-[7.5px] text-xs font-bold lg:text-sm">
      <h4 className="px-2.5 text-base">{title}</h4>
      <div className="container:lg:gap-x-4 flex gap-x-1 lg:gap-x-10">
        {["PL", "W", "D", "L", "GD", "Pts"].map((text) => (
          <div
            key={text}
            className="container:lg:h-5 container:lg:w-5 flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8"
          >
            <h4>{text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

const LeagueTableRow = ({ i, rank, active, tournamentName }: { i: number; rank: Ranking; active: number[]; tournamentName: string }) => {
    // Safe fallback codes
    const contestantCode = rank?.contestantCode ?? "xx";
  
    // Map FIFA code → ISO2 for flagcdn
     const countryCode = fifaToIso2[contestantCode];
  
    const contestantFlag = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : null;
  return (
    <li
      className={`border-b-border-default hover:bg-[#E6E6E6] font-lato flex items-center justify-between border-b px-1 py-2.5 text-sm text-black`}
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <p className="font-bold">{i + 1}</p>
      </div>
      <div className="flex grow items-center gap-x-2.5 px-2.5">
        {tournamentName !== 'NPFL' && <Image src={contestantFlag} alt="" width={24} height={24.32} />}
        <span>{rank?.contestantClubName}</span>
      </div>
      <div className="flex gap-x-1 px-3 lg:gap-x-10">
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank?.matchesPlayed}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank?.matchesWon}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank?.matchesDrawn}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank?.matchesLost}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center lg:h-8 lg:w-8">
          <p>{rank?.goaldifference}</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center font-semibold lg:h-8 lg:w-8">
          <p>{rank?.points}</p>
        </div>
      </div>
    </li>
  );
};

export function LeagueTableAside() {
  return (
    <section className="font-lato overflow-hidden rounded-t-2xl bg-white">
      <GreenHeader
        heading="AFCON Qualifying Standings"
        className="mb-0 text-center"
      />
      <LeagueTableHeaderAside title="Team" />
      <ul>
        {new Array(11).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
    </section>
  );
}

function LeagueTableHeaderAside({ title }: { title: string }) {
  return (
    <div className="text-neutral flex items-center justify-between bg-[#D9EDE5] px-3.5 py-[7.5px] text-xs font-bold lg:text-sm">
      <h4 className="px-2.5 text-base">{title}</h4>
      <div className="flex gap-x-1">
        {["GP", "W", "D", "L", "GD", "P"].map((text) => (
          <div key={text} className="flex h-5 w-5 items-center justify-center">
            <h4>{text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

const LeagueTableRowAside = ({
  i,
  active,
}: {
  i: number;
  active?: number[];
}) => {
  return (
    <li
      className={`border-b-border-default font-lato flex items-center justify-between border-b px-1 py-2.5 text-sm text-black ${
        active?.includes(i) ? "bg-[#E6E6E6]" : ""
      }`}
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <p className="font-bold">{i + 1}</p>
      </div>
      <div className="flex grow items-center gap-x-2.5 px-2.5">
        <Image src="/club-1.svg" alt="" width={24} height={24.32} />
        <span>Man United</span>
      </div>
      <div className="flex gap-x-1 px-3">
        <div className="flex h-5 w-5 items-center justify-center">
          <p>56</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center">
          <p>6</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center">
          <p>3</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center">
          <p>0</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center">
          <p>26</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center font-semibold">
          <p>89</p>
        </div>
      </div>
    </li>
  );
};

export function CompetitionsTable() {
  return (
    <section className="font-lato overflow-hidden rounded-t-2xl bg-white">
      <GreenHeader
        heading="AFCON Qualifying Standings"
        className="mb-0 text-center"
      />
      <LeagueTableHeaderAside title="Group A" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group B" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group C" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group D" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group E" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group F" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group G" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
      <LeagueTableHeaderAside title="Group H" />
      <ul>
        {new Array(4).fill("").map((_, i) => (
          <LeagueTableRowAside key={i} i={i} />
        ))}
      </ul>
    </section>
  );
}
