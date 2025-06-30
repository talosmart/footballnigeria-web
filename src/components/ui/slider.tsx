"use client";

import Image from "next/image";

export default function Slider() {
  return (
    <div className="relative">
      {/* image(s) to slide */}
      <div className="relative h-[234px] overflow-hidden rounded lg:h-[323px]">
        <Image
          src="/image.jpg"
          alt=""
          fill
          className="h-full w-full object-cover"
        />
      </div>

      {/* Prev button */}

      <button className="border-border-default absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-4">
        <Image src="/arrow.svg" alt="" width={18.94} height={14.14} />
      </button>

      {/* Next button */}

      <button className="border-text-secondary bg-text-secondary absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-4">
        <Image
          src="/arrow.svg"
          alt=""
          width={18.94}
          height={14.14}
          className="rotate-180"
        />
      </button>

      {/* indicator buttons */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-x-1">
        {/* active  */}
        <div className="h-2 w-7 rounded-full bg-white" />
        {/* non-active */}
        <div className="h-2 w-2 rounded-full bg-[#FFFFFF7A]" />
        <div className="h-2 w-2 rounded-full bg-[#FFFFFF7A]" />
        <div className="h-2 w-2 rounded-full bg-[#FFFFFF7A]" />
      </div>
    </div>
  );
}
