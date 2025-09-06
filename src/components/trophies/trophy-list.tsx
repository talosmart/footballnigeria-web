import { format, parseISO } from "date-fns";
import Image from "next/image";
import { getFlagUrl } from "../methods";

export default function Trophy({data}) {
  const formattedStartDate = data?.tournamentCalendarStartDate ? format(parseISO(data?.tournamentCalendarStartDate), "dd/MM/yyyy") : ''
  const formattedEndDate = data?.tournamentCalendarEndDate ? format(parseISO(data?.tournamentCalendarEndDate), "dd/MM/yyyy") : ''
  return (
    <li className="grid grid-cols-7 items-center lg:grid-cols-3">
      <div className="col-span-2 flex items-center gap-x-2.5 text-neutral-200 lg:col-span-1">
         <Image
          src={getFlagUrl(data?.winnerContestantCountry)}
          alt={data?.winnerContestantCountry}
          width={24}
          height={16}
        />
        {data?.winnerContestantCountry}
      </div>
      <p className="col-span-2 font-semibold lg:col-span-1">{data?.runnerUpContestantCountry}</p>
      <p className="col-span-3 font-bold lg:col-span-1">
        {`(${formattedStartDate} - ${formattedEndDate})`}
      </p>
    </li>
  );
}

