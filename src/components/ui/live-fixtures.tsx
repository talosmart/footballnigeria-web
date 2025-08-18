import Image from "next/image";
import Link from "next/link";
import { fifaToIso2 } from "../methods";
import { parseISO, format, addMinutes } from "date-fns";

export const LiveFixtures = ({ fixture, path = "/" }) => {
   const [home, away] = fixture?.contestant ?? [];

  const homeCode = home?.code ?? "xx";
  const awayCode = away?.code ?? "xx";

  const homeCountryCode = fifaToIso2[homeCode] ?? homeCode.toLowerCase();
  const awayCountryCode = fifaToIso2[awayCode] ?? awayCode.toLowerCase();

  const homeFlag = `https://flagcdn.com/w40/${homeCountryCode}.png`;
  const awayFlag = `https://flagcdn.com/w40/${awayCountryCode}.png`;

  const timeString = fixture?.time ?? "00:00";

// Parse the ISO-like string (needs full date for parseISO)
const parsedDate = parseISO(`1970-01-01T${timeString}`);

// If you need to adjust for your local timezone offset (e.g., IST = +5:30)
const adjustedDate = addMinutes(parsedDate, 330); // adjust offset in minutes

// Format to 12-hour time with AM/PM
const formatted = format(adjustedDate, "h:mm a");

  return (
    <article
      className="font-lato relative flex flex-col w-full lg:w-88 p-5 overflow-hidden rounded-lg bg-white"
      style={{ boxShadow: "0 1px 7.7px 0 #00000026" }}
    >
      <h3 className="text-[13px] font-semibold text-[#303030] mb-2">Live Football</h3>

      <section className="flex gap-x-4 mb-3 max-h-6" aria-label="Teams">
        <Image
          src={homeFlag}
          alt={homeCountryCode !== "xx" ? `${homeCountryCode} flag` : "Unknown flag"}
          width={32}
          height={24}
          className="rounded"
        />
        <Image
          src={awayFlag}
          alt={awayCountryCode !== "xx" ? `${awayCountryCode} flag` : "Unknown flag"}
          width={32}
          height={24}
          className="rounded"
        />
      </section>

      <h3 className="font-bold text-black text-[18px] w-max">{fixture?.description ?? "Match Info"}</h3>
      <p className="font-semibold text-xs text-[#303030] my-2">{formatted ?? "TBD"}</p>

      <Link
        href={path}
        className="text-primary border-border-default mt-4 flex items-center gap-x-2 py-1.5 text-[13.75px] leading-6 font-medium"
      >
        View More
      </Link>
    </article>
  );
};
