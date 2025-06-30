import BreadCrumb from "@/components/ui/bread-crumb";
import NavLinkList from "@/components/ui/navlink-list";

const lists = [
  { title: "news", path: "/football/competitions/news" },
  {
    title: "Score & fixtures",
    path: "/football/competitions/scores-and-fixtures",
  },
  { title: "table", path: "/football/competitions/table" },
  { title: "teams", path: "/football/competitions/teams" },
  { title: "statistics", path: "/football/competitions/statistics" },
  { title: "transfer", path: "/football/competitions/transfer" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-lato pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-5 px-2.5 lg:px-0">
        <BreadCrumb />

        <aside className="mt-5 mb-5 flex h-[50.44px] items-center justify-center bg-[#d9d9d9] lg:mt-7 lg:h-[139.7px]">
          Ads
        </aside>
      </div>
      <section className="mb-5 bg-white px-2.5 lg:px-5">
        <h1 className="border-b-border-default border-b px-2 py-4 text-2xl font-semibold">
          Africa Cup of Nations Qualifying (AFCON)
        </h1>
        <div className="border-b-border-default border-b">
          <NavLinkList lists={lists} />
        </div>
      </section>

      {children}
    </main>
  );
}
