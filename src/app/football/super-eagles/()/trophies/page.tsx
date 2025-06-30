import SectionHeading from "@/components/trophies/section-heading";
import Trophy from "@/components/trophies/trophy-list";

export default function Trophies() {
  return (
    <section className="mt-6 overflow-hidden rounded-lg text-sm">
      <h2 className="bg-primary mb-1 px-3 py-2 font-extrabold text-[#f3f3f3]">
        TROPHIES
      </h2>

      <div className="bg-[#f5f5f5] p-2.5">
        <section className="mb-6 tracking-[0.2px]">
          <SectionHeading title="  CLUB DOMESTIC" />
          <ul className="grid gap-y-3 text-[11px] lg:text-[13px]">
            <Trophy />
            <Trophy />
          </ul>
        </section>

        <section className="mb-6 tracking-[0.2px]">
          <SectionHeading title="National" />
          <ul className="grid gap-y-3 text-[11px] lg:text-[13px]">
            <Trophy />
            <Trophy />
          </ul>
        </section>
      </div>
    </section>
  );
}
