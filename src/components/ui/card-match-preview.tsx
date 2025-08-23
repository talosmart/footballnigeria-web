"use client";

import Image from "next/image";
import SubTitle from "./subtitle";
import { fifaToIso2 } from "../methods";
import { addMinutes, format, parseISO } from "date-fns";

// ----------------------
// Types
// ----------------------
interface Contestant {
  code: string;
  name: string;
}

interface MatchInfo {
  id: string;
  contestant: Contestant[];
  time: string; // e.g., "19:00:00Z"
}

interface Fixture {
  matchInfo: MatchInfo;
}

interface MatchPreviewCardProps {
  filteredfixtures: Fixture[];
}

// ----------------------
// Main Card Component
// ----------------------
export default function MatchPreviewCard({ filteredfixtures }: MatchPreviewCardProps) {
  return (
    <section className="font-lato rounded-md bg-white px-3 py-5 shadow-sm">
      <SubTitle title="Today's Matches / Next Match" />

      <ul className="mt-3 divide-y divide-gray-100">
        {filteredfixtures?.map((fixture) => (
          <MatchPreview
            key={fixture.matchInfo.id}
            contestants={fixture.matchInfo.contestant}
            time={fixture.matchInfo.time}
          />
        ))}
      </ul>
    </section>
  );
}

// ----------------------
// Match Preview Row
// ----------------------
interface MatchPreviewProps {
  contestants: Contestant[];
  time: string;
}

const MatchPreview = ({ contestants, time }: MatchPreviewProps) => {
  const [home, away] = contestants ?? [];

  // Safe fallback codes
  const homeCode = home?.code ?? "xx";
  const awayCode = away?.code ?? "xx";

  // Map FIFA code → ISO2 for flagcdn
   const homeCountryCode = fifaToIso2[homeCode];
  const awayCountryCode = fifaToIso2[awayCode];

  const homeFlag = homeCountryCode ? `https://flagcdn.com/w40/${homeCountryCode}.png` : null;
  const awayFlag = awayCountryCode ? `https://flagcdn.com/w40/${awayCountryCode}.png` : null;

  // ----------------------
  // Time Formatting
  // ----------------------
  let formattedTime = "TBD";
  try {
    // Parse as ISO date (force a valid date string)
    const parsedDate = parseISO(`1970-01-01T${time}`);
    // Adjust timezone (e.g., IST = +330 min) — can make dynamic later
    const adjustedDate = addMinutes(parsedDate, 330);
    formattedTime = format(adjustedDate, "h:mm a");
  } catch {
    // fallback handled by formattedTime = "TBD"
  }

  return (
    <li className="flex items-center justify-center py-2 text-xs even:bg-gray-50">
      {/* Home */}
      <div className="flex flex-1 items-center justify-end gap-x-2 pr-2">
        <span className="truncate font-medium text-gray-800">{home?.name ?? "Unknown"}</span>
       {homeFlag &&  <Image
          src={homeFlag}
          alt={`${home?.name ?? "Unknown"} flag`}
          width={24}
          height={24}
          className="rounded"
        />}
      </div>

      {/* Time */}
      <div className="mx-2 shrink-0 rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
        {formattedTime}
      </div>

      {/* Away */}
      <div className="flex flex-1 items-center gap-x-2 pl-2">
        {awayFlag && <Image
          src={awayFlag}
          alt={`${away?.name ?? "Unknown"} flag`}
          width={24}
          height={24}
          className="rounded"
        />}
        <span className="truncate font-medium text-gray-800">{away?.name ?? "Unknown"}</span>
      </div>
    </li>
  );
};
