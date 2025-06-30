import Image from "next/image";

export default function MatchPreviewCard() {
  return (
    <section className="font-lato rounded-md bg-white px-2.5 py-5">
      <div className="mb-2.5 leading-[18px] font-medium">
        <p className="text-xl">Saturday</p>
        <p className="text-text-secondary text-sm tracking-[0.2px]">
          Last updated: 26 November, 3:01pm
        </p>
      </div>

      <h3 className="bg-primary font-bai-jamjuree px-6 py-2 font-bold text-white uppercase">
        Match Preview
      </h3>

      <ul className="font-inter">
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
        <MatchPreview />
      </ul>
    </section>
  );
}

const MatchPreview = () => {
  return (
    <li className="flex even:bg-[#FAFAFA]">
      <div className="border-r-border-default flex shrink-0 flex-col items-center justify-center border-r px-3.5 py-1.5">
        <Image src="/epl.svg" alt="" width={13.87} height={17} />
        <span className="text-text-secondary text-[10px] leading-[18px] font-semibold tracking-[0.2px]">
          ENG
        </span>
      </div>
      <div className="flex grow items-center justify-center text-xs tracking-[0.2px]">
        <div className="flex grow items-center justify-end gap-x-1 px-1">
          <span className="font-lato">Man United</span>
          <Image src="/club-1.svg" alt="" width={24} height={24.32} />
        </div>
        <div className="text-neutral shrink-0 rounded-[2px] bg-[#D9EDE5] px-1 text-xs leading-[18px] font-semibold tracking-[0.2px]">
          3 - 4
        </div>
        <div className="flex grow items-center gap-x-1 px-1">
          <Image src="/club-2.svg" alt="" width={24} height={24.32} />
          <span className="font-lato">Chelsea</span>
        </div>
      </div>
    </li>
  );
};
