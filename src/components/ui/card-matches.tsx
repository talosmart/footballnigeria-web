import Image from "next/image";

export default function FeaturedMatchCard() {
  return (
    <article
      className="font-lato w-full max-w-[293px] shrink-0 rounded-2xl bg-white p-3.5 lg:max-w-[503px]"
      style={{ boxShadow: "0 1px 8.3px 0 #0000001F" }}
    >
      <div className="border-b-border-default mb-3 border-b pb-4">
        <h3 className="text-neutral mb-1 font-bold">MEN&apos;S SENIOR</h3>
        <p className="text-xs font-semibold text-neutral-300">
          MEN’S SENIOR CAF
        </p>
      </div>
      <div>
        <div className="text-text-secondary mb-4 flex justify-between">
          <p className="font-bold">18:00</p>
          <p className="font-medium">TUESDAY 11TH FEB</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1 font-bold">
            <Image
              src="/club1.png"
              alt=""
              className=""
              width={24}
              height={24}
            />
            <p>Nigeria</p>
          </div>
          <p className="text-xs">VS</p>
          <div className="flex items-center gap-x-1 font-bold">
            <p>Ghana</p>
            <Image
              src="/club2.png"
              alt=""
              className=""
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedMatchSliderControl() {
  return (
    <div className="flex items-center justify-center gap-x-7">
      <button>
        <div className="border-border-default flex h-9 w-9 items-center justify-center rounded-full border-4">
          <Image src="/arrow.svg" alt="" width={18.94} height={14.14} />
        </div>
      </button>
      <div className="flex gap-x-1">
        <div className="h-2 w-2 rounded-full border-[3px]" />
        <div className="border-border-default h-2 w-2 rounded-full border-[3px]" />
        <div className="h-2 w-2 rounded-full border-[3px]" />
      </div>
      <button>
        <div className="border-text-secondary bg-text-secondary flex h-9 w-9 items-center justify-center rounded-full border-4">
          <Image
            src="/arrow.svg"
            alt=""
            width={18.94}
            height={14.14}
            className="rotate-180"
          />
        </div>
      </button>
    </div>
  );
}
