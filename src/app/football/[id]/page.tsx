"use client";

import { useFootballStore } from "@/store/footballStore";
import { fetchFootballData, getCountryNavLists, getTournamentNavLists } from "@/components/methods";
import SpinnerLoader from "@/components/SpinnerLoader";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import LeagueTable from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
import { useUserStore } from "@/store/userStore";
import { useParams, useSearchParams } from "next/navigation"; // ✅ import useSearchParams
import { useEffect } from "react";
import TrendyPost from "@/components/ui/TrendyPost";
import MoreButton from "@/components/ui/MoreButton";
import { getBasicMatchStats, getMatchPreview, getSquads } from "@/constant/api.config";

export default function SuperEagles() {
  const params = useParams();
  const searchParams = useSearchParams(); // ✅ get query params
  const fixtureId = searchParams.get("fixture"); // ✅ read ?fixture=...

  const { hydrated } = useUserStore();
  const tournament = params.id as string;
  
  const { setMatchPreview, setBasicStats, setSquads } = useFootballStore.getState();
  
  const { categories, fixtures, standings, matchPreview, loading, error } = useFootballStore();
  const tournamentName = fixtureId ? matchPreview?.matchInfo?.competition?.name : tournament.replace(/-/g, " ");
  const tournamentTitle =tournament.replace(/-/g, " ");

  const tournamentId = matchPreview?.matchInfo?.tournamentCalendar?.id

  // ✅ only fetch preview if fixture param exists
  useEffect(() => {
    const getPreviewData = async () => {
      try {
        if (fixtureId) {
          const data = await getMatchPreview(fixtureId);
          const basicStat = await getBasicMatchStats(fixtureId);
          const squad = await getSquads(tournamentId);
          setBasicStats(basicStat);
          setMatchPreview(data);
          setSquads(squad.squad)
        }
      } catch (error) {
        console.error("Error fetching match preview:", error);
      }
    };

    getPreviewData();
  }, [fixtureId, setMatchPreview]);

  // ✅ fetch football data once hydrated
  useEffect(() => {
    if (hydrated) {
      fetchFootballData();
    }
  }, [hydrated]);

  const liveFixturesData = fixtures?.filter(
    (fixture) => fixture?.liveData?.matchDetails?.matchStatus === "Fixture"
  );

  const resultData = fixtures?.filter(
    (fixture) => fixture?.liveData?.matchDetails?.matchStatus === "Played"
  );

  const filteredStandings = standings.filter(
    (standing) => standing?.competition?.name === tournamentName
  );
  const filteredCategories = categories.filter(
    (category) => category?.name === tournamentName
  );
  const filteredResultData = resultData.filter(
    (fixture) => fixture?.matchInfo?.competition.name === tournamentName
  );
  const filteredLivefixtures = liveFixturesData.filter(
    (fixture) => fixture?.matchInfo?.competition.name === tournamentName
  );

  const standingsData = filteredStandings?.[0]?.stage?.[0]?.division.filter(
    (div) => div?.type === "total"
  );

  if (loading) {
    return (
      <main className="py-20 flex justify-center items-center text-neutral-500">
        <SpinnerLoader
          width="md:w-10"
          height="md:h-10"
          borderThickness="border-5"
          borderTBg="border-t-green-500"
          borderT="border-t-5"
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-20 text-center text-red-500">
        {error || "Post not found"}
      </main>
    );
  }

  const id =fixtureId ? fixtureId : null

  const lists = getTournamentNavLists(tournament);
  const countryLists = getCountryNavLists(tournament, id);

  const moreScoresPathBase =
    filteredLivefixtures.length > 0
      ? filteredLivefixtures
      : filteredResultData.length > 0
      ? filteredResultData
      : null;

  return (
    <main className="pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-5 px-2.5 lg:px-0">
        <BreadCrumb />
        <aside className="mt-5 mb-5 flex h-[50.44px] items-center justify-center bg-[#d9d9d9] lg:mt-7 lg:h-[139.7px]">
          Ads
        </aside>
      </div>

      <section className="mb-5 bg-white px-2.5 lg:px-5">
        <h1 className="border-b-border-default font-lato border-b px-2 py-4 text-2xl font-semibold">
          {tournamentTitle}
        </h1>
        <NavLinkList lists={fixtureId ? countryLists : lists} />
      </section>

      <TrendyPost categories={filteredCategories} />

      <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
        <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
          {filteredLivefixtures.length > 0 && (
            <MatchPreviewCard
              detail={false}
              type="Fixture"
              title="Today's Matches / Next Match"
              filteredfixtures={filteredLivefixtures}
            />
          )}
          {filteredResultData.length > 0 && (
            <MatchPreviewCard
              detail={false}
              type="Played"
              title="Latest Scores"
              filteredfixtures={filteredResultData}
            />
          )}

          {(filteredLivefixtures.length > 0 ||
            filteredResultData.length > 0) && (
            <MoreButton
              path={`/football/${moreScoresPathBase?.[0]?.matchInfo?.competition.name.replace(
                /\s+/g,
                "-"
              )}/scores-fixtures`}
              title={`More Scores & Fixtures`}
            />
          )}

          <Ads />

          <div className="p-4">
            <SubTitle title="Table" />
          </div>
          {standingsData?.slice(0, 2).map((data) => (
            <div key={data.groupId}>
              <LeagueTable tournamentName={tournamentName} data={data} />
            </div>
          ))}
          <div className="my-5">
            <MoreButton
              path={`/football/${tournamentName.replace(/\s+/g, "-")}/table`}
              title={`More ${tournamentName} table`}
            />
          </div>
        </aside>
      </section>
    </main>
  );
}
