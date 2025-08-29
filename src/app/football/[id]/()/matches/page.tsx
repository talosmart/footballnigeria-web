"use client";

import { fifaToIso2, normalizeLiveData } from "@/components/methods";
import GreenHeader from "@/components/ui/green-header";
import { LeagueTableWithForm } from "@/components/ui/league-table";
import SwitchView from "@/components/ui/tab-switch-view";
import { useFootballStore } from "@/store/footballStore";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { getBasicMatchStats, getMatchPreview, getSquads } from "@/constant/api.config";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function Page1() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
   const params = useParams();
    const searchParams = useSearchParams(); // ✅ get query params
     const fixtureId = searchParams.get("fixture"); // ✅ read ?fixture=...

      const { setMatchPreview, setBasicStats, setSquads } = useFootballStore.getState();

      useEffect(() => {
         const getPreviewData = async () => {
           try {
             if (fixtureId) {
              setLoading(true)
               const data = await getMatchPreview(fixtureId);
               const basicStat = await getBasicMatchStats(fixtureId);
               setBasicStats(basicStat);
               setMatchPreview(data);
               setLoading(false)
             }
           } catch (error) {
             console.error("Error fetching match preview:", error);
             setError(true)
           }
         };
     
         getPreviewData();
       }, []);

      

  const [activeMatchTab, setActiveMatchTab] = useState("info");
  const { categories, fixtures, standings, matchPreview, basicStats, squads } = useFootballStore();

  const country = params.id as string;

  console.log(basicStats, 'basicStats')
  console.log(matchPreview, 'matchPreview')
const tournamentId = matchPreview?.matchInfo?.tournamentCalendar?.id

 useEffect(() => {
    const getSquadsData = async () => {
      try {
        if (tournamentId) {
          const squad = await getSquads(tournamentId);
          setSquads(squad.squad)
        }
      } catch (error) {
        console.error("Error fetching match preview:", error);
      }
    };

    getSquadsData();
  }, [tournamentId, setSquads]);

  if (loading) {
           return (
             <main className="py-20 flex justify-center items-center text-neutral-500">
              <SpinnerLoader width='md:w-10' height='md:h-10' borderThickness='border-5' borderTBg = 'border-t-green-500' borderT = 'border-t-5' />
             </main>
           );
         }
       
         if (error ) {
           return (
             <main className="py-20 text-center text-red-500">
               {error || 'Post not found'}
             </main>
           );
         }
 const tournamentName = matchPreview?.matchInfo?.competition?.name 
  const filteredStandings = standings.filter(
    (standing) => standing?.competition?.name === tournamentName
  );

  console.log(filteredStandings, 'filteredStandings')
  const getCountryCode = matchPreview?.matchInfo?.contestant?.filter(team => team.name === country)
  const getHomeTeam = matchPreview?.matchInfo?.contestant?.filter(team => team.position === 'home')
  const getAwayTeam = matchPreview?.matchInfo?.contestant?.filter(team => team.position === 'away')
  const head2HeadData = matchPreview?.previousMeetingsAnyComp?.match

  const homeId = getHomeTeam?.[0]?.id
  const awayId = getAwayTeam?.[0]?.id

 
  

  const homeCountryTeam = squads.filter(squad => squad.contestantId === homeId).map(team => team.person)
  const awayCountryTeam = squads.filter(squad => squad.contestantId === awayId).map(team => team.person)

  console.log(awayId, 'awayId')
  console.log(squads, 'squads')

  const countryCode = fifaToIso2[getCountryCode?.[0]?.code];
  const homeCountryCode = fifaToIso2[getHomeTeam?.[0]?.code];
  const awayCountryCode = fifaToIso2[getAwayTeam?.[0]?.code];

    const homeFormData = matchPreview?.form?.filter(team => team.contestantId === getHomeTeam?.[0].id)
    const awayFormData = matchPreview?.form?.filter(team => team.contestantId === getAwayTeam?.[0].id)

    console.log(homeFormData, 'homeFormData')

  const countryFlag = getCountryCode?.length > 0 ? `https://flagcdn.com/w40/${countryCode}.png` : null;
  const homeCountryFlag = getHomeTeam?.length > 0 ? `https://flagcdn.com/w40/${homeCountryCode}.png` : null;
  const awayCountryFlag = getAwayTeam?.length > 0 ? `https://flagcdn.com/w40/${awayCountryCode}.png` : null;

   const matchScore = basicStats?.liveData?.matchDetails?.scores
   const venue = basicStats?.matchInfo?.venue?.longName
     const referee = basicStats?.liveData?.matchDetailsExtra?.matchOfficial?.filter(official => official.type === 'Main')

   const homeCountryForm = homeFormData?.[0].lastSix?.split("").map((char, index) => ({
  key: index,
  stat: char,
}));
   const awayCountryForm = awayFormData?.[0].lastSix?.split("").map((char, index) => ({
  key: index,
  stat: char,
}));

const homeCountryId = basicStats?.matchInfo?.contestant.filter(data => data.name === getHomeTeam?.[0]?.name)


// parse ISO string into a Date
const parsedDate = basicStats?.matchInfo?.localDate ? parseISO(basicStats?.matchInfo?.localDate) : null

// format into desired output
const formattedDate = parsedDate ? format(parsedDate, "d MMM yyyy") : '-'



   const homePlayers = homeCountryTeam?.[0]?.filter((p) => p.type === "player" && p.active === "yes");
const homeCoaches = homeCountryTeam?.[0]?.filter(
  (p) => p.type === "coach" || p.type === "assistant coach"
);

const homeStartingXI = homePlayers?.slice(0, 11);   
const homeSubstitutes = homePlayers?.slice(11);
   const awayPlayers = awayCountryTeam?.[0]?.filter((p) => p.type === "player" && p.active === "yes");
const awayCoaches = awayCountryTeam?.[0]?.filter(
  (p) => p.type === "coach" || p.type === "assistant coach"
);

const awayStartingXI = awayPlayers?.slice(0, 11);   
const awaySubstitutes = awayPlayers?.slice(11);

const homeLineUp = {
  startingXI : homeStartingXI,
  substitute: homeSubstitutes,
  coaches: homeCoaches
}

console.log(homeLineUp, 'homeLineUp')
console.log(homeCountryTeam, 'homeCountryTeam')

const awayLineUp = {
  startingXI : awayStartingXI,
  substitute: awaySubstitutes,
  coaches: awayCoaches
}




  return (
    <section className="font-lato rounded-lg bg-white">
      <header className="item-center flex justify-between py-4 leading-[21.64px]">
        <div className="flex grow items-center gap-x-2.5">
              {countryFlag && <Image
          src={countryFlag}
          alt={`${country} flag`}
          width={30} height={41.11}
        />}
          <div>
            <p className="font-semibold text-[#1E1E1E]">
              {`${matchPreview?.matchInfo?.competition.name}: ${matchPreview?.matchInfo?.series?.name}`}
             
            </p>
            <p className="text-sm text-[#757575]">{matchPreview?.matchInfo?.competition?.competitionCode}</p>
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

      <Pitch matchScore={matchScore} referee={referee} />

      <section className="mb-7 flex items-center rounded-lg bg-[#F5F5F5] py-5">
        <article className="flex grow flex-col items-center justify-center">
          <div className="relative mb-1 w-[86.47px] lg:w-[115.3px]">
               {homeCountryFlag && <img
          src={homeCountryFlag}
          alt={`flag`}
           className="object-cover w-full "
        />}
          
          </div>
          <h3 className="font-montserrat mb-2 text-[10.5px] font-bold text-[#333333] uppercase">
            {getHomeTeam?.[0]?.name}
          </h3>
          <div className="flex gap-x-1">
            {homeCountryForm.map((data, index) => {
              return  <TeamStat key={index} status={data.stat} />
            })
           }
          </div>
        </article>
        <section className="shrink-0 text-center">
          <p className="font-bai-jamjuree mb-2 text-xl font-semibold text-[#1E1E1E]">
            <span> {matchScore?.ft?.home}</span> - <span> {matchScore?.ft?.away}</span>
          </p>
          <p className="font-montserrat rounded bg-[#E6E6E6] px-1.5 py-1 text-[9px] font-medium text-[#303030]">
            Full Time
          </p>
        </section>
        <article className="flex grow flex-col items-center justify-center">
          <div className="relative mb-1 w-[86.47px] lg:w-[115.3px]">
               {awayCountryFlag && <img
          src={awayCountryFlag}
          alt={`flag`}
           className="object-cover w-full "
        />}
          </div>
          <h3 className="font-montserrat mb-2 text-[10.5px] font-bold text-[#333333]">
            {getAwayTeam?.[0]?.name}
          </h3>
          <div className="flex gap-x-1">
            {awayCountryForm.map((data, index) => {
              return  <TeamStat key={index} status={data.stat} />
            })
           }
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

      {activeMatchTab === "info" && <Info formattedDate={formattedDate} referee={referee} venue={venue} />}
      {activeMatchTab === "summary" && <ExcitementIndex liveData={basicStats?.liveData} homeCountryId={homeCountryId}/>}
      {activeMatchTab === "line-ups" && <LinesUps homeLineUp={homeLineUp} awayLineUp={awayLineUp} />}
      {activeMatchTab === "table" && <LeagueTableWithForm tournamentName={tournamentName} filteredStandings={filteredStandings} />}
      {activeMatchTab === "h2h" && <H2H homeH2H={homeFormData} awayH2H={awayFormData} head2HeadData={head2HeadData}/>}
    </section>
  );
}

const TeamStat = ({ status }: { status: "W" | "D" | "L" }) => {
  return (
    <div
      className={`font-inter flex h-[17.87px] w-[17.87px] items-center justify-center rounded-full lg:h-[23.83px] lg:w-[23.83px] ${status === "W" ? "bg-[#68D100]" : status === "D" ? "bg-[#FFC501]" : "bg-[#EC1C24]"} text-[10px] font-bold text-white uppercase`}
    >
      {status}
    </div>
  );
};

const Info = ({formattedDate, referee, venue}) => {
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
            {formattedDate}
          </li>
          <li className="flex items-center justify-center gap-x-2.5">
            <Image
              src="/whistle-2.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
              {`${referee?.[0].firstName} ${referee?.[0].lastName}`}
          </li>
          <li className="flex items-center justify-center gap-x-2.5">
            <Image
              src="/stadium.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            {venue}
          </li>
        </ul>
      </section>
    </>
  );
};

const ExcitementIndex = ({ liveData, homeCountryId }) => {
  const events = normalizeLiveData(liveData);
  return (
    <>
      <GreenHeader heading="EXCITEMENT INDEX" />

      <section className="mt-1 flex flex-col items-center justify-center rounded-lg bg-[#F5F5F5]">
        <ul className="font-inter w-full px-3 text-xs leading-[140%] text-[#5A5A5A]">
          {events.map((event) => {
             const isHome = event.team === homeCountryId[0].id;

            return (
              <li
                key={`${event.type}-${event.id}`}
                className="grid grid-cols-5 items-center gap-x-3 border-b border-b-[#D9D9D9] py-2"
              >
                {/* Time always in the middle */}
                <div className="font-spacegrotesk col-start-3 flex flex-col items-center">
                  <span className="text-sm font-bold text-[#23262D]">
                    {event.minute}&apos;
                  </span>
                  {event.type === "goal" && (
                    <span className="font-spacegrotesk text-xs text-[#64666B]">
                      {event.score}
                    </span>
                  )}
                </div>

                {/* Event detail */}
                {event.type === "card" && (
                  <div
                    className={`col-span-2 flex items-center gap-x-2 ${
                      isHome ? "justify-end text-right order-first" : ""
                    }`}
                  >
                    {/* card icon(s) */}
                    <div className="relative">
                      {event.cardType === "YC" && (
                        <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
                      )}
                      {event.cardType === "RC" && (
                        <div className="h-[16.67px] w-[11.67px] bg-[#D90D2D]" />
                      )}
                      {event.cardType === "2YC" && (
                        <>
                          <div className="h-[16.67px] w-[11.67px] bg-[#F0DC28]" />
                          <div className="absolute right-1 bottom-1 h-[16.67px] w-[11.67px] bg-[#D90D2D]" />
                        </>
                      )}
                    </div>
                    <p className="text-[#23262D]">{event.player}</p>
                  </div>
                )}

                {event.type === "goal" && (
                  <div
                    className={`col-span-2 flex items-center gap-x-2 ${
                      isHome ? "justify-end text-right order-first" : ""
                    }`}
                  >
                    <Image src="/soccer.svg" alt="goal" width={20} height={20} />
                    <div>
                      <p className="text-[#23262D]">{event.player}</p>
                      {event.assist && (
                        <p className="text-[#939598]">{event.assist}</p>
                      )}
                      {event.method && (
                        <p className="text-[#939598]">{event.method}</p>
                      )}
                    </div>
                  </div>
                )}

                {event.type === "substitute" && (
                  <div
                    className={`col-span-2 flex items-center gap-x-2 ${
                      isHome ? "justify-end text-right order-first" : ""
                    }`}
                  >
                    <Image
                      src="/substitue.svg"
                      alt="substitute"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="text-[#23262D]">{event.playerIn}</p>
                      <p className="text-[#939598]">{event.playerOut}</p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};


const LinesUps = ({homeLineUp, awayLineUp}) => {
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
                {homeLineUp?.startingXI?.map((players) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={players.id}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      {players.shirtNumber}
                    </div>
                    <span className="text-[#1E1E1E]">{`${players.firstName} ${players.lastName} (${players.position})`}</span>
                  </div>
                ))}
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
                {awayLineUp?.startingXI?.map((players) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={players.id}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      {players.shirtNumber}
                    </div>
                    <span className="text-[#1E1E1E]">{`${players.firstName} ${players.lastName} (${players.position})`}</span>
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
                {homeLineUp?.substitute?.map((substitute) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={substitute.id}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      {substitute.shirtNumber}
                    </div>
                    <span className="text-[#1E1E1E]">{`${substitute.firstName} ${substitute.lastName} (${substitute.position})`}</span>
                  </div>
                ))}
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
               {awayLineUp?.substitute?.map((substitute) => (
                  <div
                    className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]"
                    key={substitute.id}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#757575] text-[#757575]">
                      {substitute.shirtNumber}
                    </div>
                    <span className="text-[#1E1E1E]">{`${substitute.firstName} ${substitute.lastName} (${substitute.position})`}</span>
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
                {homeLineUp?.coaches?.map((coach) => (
                  <div key={coach.id} className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]">
                    <Image src="/coach.svg" alt="" width={24} height={24} />
                    <span className="text-[#1E1E1E]">{`${coach.firstName} ${coach.lastName} (${coach.type})`}</span>
                  </div>
                ))
                }
              </div>
              {/* Away */}
              <div className="grid gap-y-3">
                {awayLineUp?.coaches?.map((coach) => (
                  <div key={coach.id} className="flex items-center gap-x-2.5 text-xs leading-[1.125rem] font-semibold tracking-[0.2px]">
                    <Image src="/coach.svg" alt="" width={24} height={24} />
                    <span className="text-[#1E1E1E]">{`${coach.firstName} ${coach.lastName} (${coach.type})`}</span>
                  </div>
                ))
                }
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

const H2H = ({homeH2H, awayH2H, head2HeadData}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeTab1, setActiveTab1] = useState("all");
const homeTeamId = homeH2H?.[0]?.contestantId
const awayTeamId = awayH2H?.[0]?.contestantId
  const homeCountryName = homeH2H?.[0]?.match?.filter(team => team?.contestants?.homeContestantId === homeTeamId)
  const awayCountryName = awayH2H?.[0]?.match?.filter(team => team?.contestants?.awayContestantId === awayTeamId)

  return (
    <>
      <section>
        <GreenHeader heading="head to head matches (h2h)" />
        {head2HeadData?.map((data)=>(

        <ul key={data.id} className="mb-8">
          <H2HList data={data} />
          {/* <H2HList status="d" />
          <H2HList status="l" />
          <H2HList status="w" /> */}
        </ul>
        ))}
      </section>

      <div className="grid gap-x-7 lg:grid-cols-2">
        <section>
          <GreenHeader heading={`${homeCountryName?.[0]?.contestants?.homeContestantName} matches`} />

          {/* <SwitchView
            tabs={["All", "Home", "Away"]}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          /> */}
          {homeH2H?.[0]?.match?.map(data => (

          <ul key={data.id} className="mb-8">
            <H2HListNoDropdown data={data} contestantId={homeTeamId}/>
          </ul>
          ))}
        </section>
        <section>
          <GreenHeader heading={`${awayCountryName?.[0]?.contestants?.awayContestantName} matches`}/>
          {/* <SwitchView
            tabs={["All", "Home", "Away"]}
            setActiveTab={setActiveTab1}
            activeTab={activeTab1}
          /> */}
           {awayH2H?.[0]?.match?.map(data => (

          <ul key={data.id} className="mb-8">
            <H2HListNoDropdown data={data} contestantId={awayH2H?.[0]?.contestantId}/>
          </ul>
          ))}
        </section>
      </div>
    </>
  );
};

const H2HList = ({ data }: {data: object }) => {
  const status = data?.country === data?.contestants?.homeContestantName ? (data?.contestants?.homeScore - data?.contestants?.awayScore > 0 ? 'w' : data?.contestants?.homeScore - data?.contestants?.awayScore < 0 ? 'l' : 'd') : (data?.contestants?.awayScore - data?.contestants?.homeScore > 0 ? 'w' : data?.contestants?.awayScore - data?.contestants?.homeScore < 0 ? 'l' : 'd')

// Parse and format with date-fns
const formattedDate = data?.date ? format(parseISO(data?.date), "MMM d, yyyy") : ''
  return (
    <li className="font-lato flex items-center border-b border-b-[#D9D9D9] py-1.5 odd:bg-[#FAFAFA] even:bg-white">
      <div className="flex gap-x-1 px-2.5 text-sm leading-[1.125rem] font-medium lg:px-9">
        <span className="text-[#757575]">{formattedDate}</span>
        {/* <span className="text-[#1E1E1E]">14:00</span> */}
      </div>
      <div className="grid grow gap-y-4 border-x border-x-[#D9D9D9] px-3 text-sm lg:px-12">
        <div className="flex justify-between font-bold">
          <div>{data?.contestants?.homeContestantName}</div>
          <div>{data?.contestants?.homeScore}</div>
        </div>
        <div className="flex justify-between">
          <div>{data?.contestants?.awayContestantName}</div>
          <div>{data?.contestants?.awayScore}</div>
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

const H2HListNoDropdown = ({ data, contestantId }: { data: object; contestantId: string}) => {
    const status = contestantId === data?.contestants?.homeContestantId ? (data?.contestants?.homeScore - data?.contestants?.awayScore > 0 ? 'w' : data?.contestants?.homeScore - data?.contestants?.awayScore < 0 ? 'l' : 'd') : (data?.contestants?.awayScore - data?.contestants?.homeScore > 0 ? 'w' : data?.contestants?.awayScore - data?.contestants?.homeScore < 0 ? 'l' : 'd')

  const formattedDate = data?.date ? format(parseISO(data?.date), "MMM d, yyyy") : ''
  return (
    <li className="font-lato flex items-center border-b border-b-[#D9D9D9] py-1.5 odd:bg-[#FAFAFA] even:bg-white">
      <div className="flex gap-x-1 px-2.5 text-sm leading-[1.125rem] font-medium">
        <span className="text-[#757575]">{formattedDate}</span>
        {/* <span className="text-[#1E1E1E]">14:00</span> */}
      </div>
      <div className="grid grow gap-y-4 border-x border-x-[#D9D9D9] px-3 text-sm">
        <div className="flex justify-between font-bold">
         <div>{data?.contestants?.homeContestantName}</div>
          <div>{data?.contestants?.homeScore}</div>
        </div>
        <div className="flex justify-between">
          <div>{data?.contestants?.awayContestantName}</div>
          <div>{data?.contestants?.awayScore}</div>
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

const Pitch = ({matchScore, referee}) => {


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
              {matchScore?.ft?.home}
            </div>
            <span className="font-lato text-[10px] font-bold tracking-[0.2px] text-[#5A5A5A] lg:text-sm">
              :
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#852221] text-[10px] font-bold text-[#F3F3F3] lg:h-[49px] lg:w-[51.28px] lg:rounded-lg lg:text-sm">
              {matchScore?.ft?.away}
            </div>
          </div>

          <p className="font-lato mt-0.5 text-center text-[10px] leading-[1.125rem] tracking-[0.2px] text-[#5A5A5A] lg:mt-2 lg:text-sm">
            {`HT ${matchScore?.ht?.home} : ${matchScore?.ht?.away}`}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-1 border-y border-y-[#D9D9D9] py-3 tracking-[0.2px] lg:gap-y-2.5 lg:py-8">
          <p className="text-[8px] leading-[1.125rem] font-bold text-[#303030] lg:text-sm">
            
            {`${referee?.[0].firstName} ${referee?.[0].lastName}`}
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
