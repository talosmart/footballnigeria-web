import Image from "next/image";

export function MatchList({ status }: { status: "lose" | "draw" | "win" }) {
  return (
    <li className="border-b-border-default flex items-center border-b py-1.5 lg:gap-x-2">
      <div className="shrink-0 px-2.5 text-center text-xs font-semibold lg:px-7 lg:text-sm">
        <span className="text-text-secondary font-medium">29.011.</span> 14:00
      </div>
      <div className="border-x-border-default grow border-x px-3.5 text-sm leading-[18px] font-bold tracking-[0.2px] lg:px-11">
        <div className="mb-1 flex gap-x-2.5">
          <p className="grow">Shooting Stars</p>
          <p className="shrink-0">3</p>
        </div>
        <div className="flex gap-x-2.5">
          <p className="grow font-normal">Eyimba</p>
          <p className="shrink-0">1</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-2.5 px-2.5 lg:gap-x-9 lg:px-7">
        <div className="lg:px-[6.25rem]">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${status === "win" ? "bg-[#68D100]" : status === "lose" ? "bg-[#EC1C24]" : "bg-[#FFC501]"} font-bold text-white`}
          >
            {status === "win" ? "W" : status === "draw" ? "D" : "L"}
          </div>
        </div>

        <Image src="/chevron-stroke-black.svg" alt="" width={12} height={6} />
      </div>
    </li>
  );
}
