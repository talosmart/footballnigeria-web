import BreadCrumb from "@/components/ui/bread-crumb";
import NavLinkList from "@/components/ui/navlink-list";
import { lists } from "@/constants/data";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-lato pt-5 pb-5 lg:px-48 lg:pt-12 lg:pb-[6.25rem]">
      <div className="mb-5 px-2.5 lg:px-0">
        <BreadCrumb />

        <aside className="mt-5 mb-5 flex h-[50.44px] items-center justify-center bg-[#d9d9d9] lg:mt-7 lg:h-[139.7px]">
          Ads
        </aside>
      </div>

      <section className="rounded-lg bg-white px-2.5 pb-6 lg:px-5">
        <h1 className="border-b-border-default border-b px-2 py-4 text-2xl font-semibold">
          Super Eagles
        </h1>
        <div className="border-b-border-default border-b">
          <NavLinkList lists={lists} />
        </div>

        {children}
      </section>
    </main>
  );
}
