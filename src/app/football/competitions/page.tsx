import FeaturedMatchCard, {
  FeaturedMatchSliderControl,
} from "@/components/ui/card-matches";
import { CompetitionsTable } from "@/components/ui/league-table";
import SubTitle from "@/components/ui/subtitle";

export default function News() {
  return (
    <>
      <section className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="grid grow gap-y-5 rounded-lg bg-white p-2.5 lg:p-5">
          <section className="grid gap-2.5">
            {/* <NewsCardLandscape />
            <NewsCardLandscape />
            <NewsCardLandscape />
            <NewsCardLandscape />
            <NewsCardLandscape /> */}
          </section>
        </div>
        <aside className="container grid w-full gap-y-5 px-2.5 lg:max-w-[371px] lg:px-0">
          <CompetitionsTable />
        </aside>
      </section>

      <section className="px-2.5 lg:px-0">
        <SubTitle title="Featured Matches" />

        <div className="no-scrollbar -mx-2.5 mt-2.5 mb-7 flex w-screen gap-5 overflow-x-auto px-2.5 lg:mx-0 lg:mt-5 lg:w-auto lg:px-1 lg:py-1">
          <FeaturedMatchCard />
          <FeaturedMatchCard />
          <FeaturedMatchCard />
        </div>

        <FeaturedMatchSliderControl />
      </section>
    </>
  );
}
