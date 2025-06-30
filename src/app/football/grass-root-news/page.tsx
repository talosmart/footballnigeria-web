import BreadCrumb from "@/components/ui/bread-crumb";
import SubTitle from "@/components/ui/subtitle";

export default function GrassRoot() {
  return (
    <main className="grid gap-y-10 px-2.5 pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <BreadCrumb />

      {/* <NewsCard /> */}

      <section>
        <SubTitle title="Transfers" />
        <div className="mt-2.5 grid gap-5 lg:mt-5 lg:grid-cols-3">
          {/* <NewsCard />
          <NewsCard />
          <NewsCard /> */}
        </div>
      </section>
    </main>
  );
}
