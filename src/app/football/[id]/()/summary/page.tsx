import Image from "next/image";
import Link from "next/link";
import ClientSummaryPage from "./client-page";

export default function Summary() {
  return (
    <section className="font-lato">
      <div className="flex flex-col gap-4 gap-x-11 px-2.5 py-5 lg:grid-cols-2 lg:flex-row">
        <section className="flex items-start gap-x-4">
          <div className="shrink-0">
            <Image src="/club-1.svg" alt="" width={56.81} height={56.81} />
          </div>
          <div className="grow lg:w-[336px]">
            <h3 className="mb-2.5 flex items-center gap-x-3 font-bold">
              Official Website
              <Link href="">
                <Image src="/link.svg" alt="" width={12} height={12} />
              </Link>
            </h3>
            <dl className="grid gap-y-0.5 text-[13px] leading-[18px] tracking-[0.2px]">
              <LabelValue label="Founded" value="1945" />
              <LabelValue label="Address" value="Olusegun Obasanjo Way Abuja" />
              <LabelValue label="Country" value="Nigeria" />
              <LabelValue label="Phone" value="+234908 001 0168" />
              <LabelValue
                label="Email Address"
                value="becomingadev@gmail.com"
              />
            </dl>
          </div>
        </section>
        <section className="flex grow gap-x-3.5">
          <div className="relative w-[136px] overflow-hidden rounded-lg lg:w-[283px]">
            <Image src="/stadium.png" alt="" fill className="object-cover" />
          </div>
          <div>
            <h3 className="mb-2.5 font-bold">Stadium Info</h3>
            <dl className="text-[13px]">
              <LabelValue
                label="Name"
                value="Abuja National Stadium"
                width="60px"
              />
              <LabelValue label="City" value="Abuja" width="60px" />
              <LabelValue label="Capacity" value="60291" width="60px" />
            </dl>
          </div>
        </section>
      </div>
      <ClientSummaryPage />
    </section>
  );
}

const LabelValue = ({
  label,
  value,
  width = "91px",
}: {
  label: string;
  value: string;
  width?: string;
}) => {
  return (
    <div className="flex">
      <dt className="shrink-0" style={{ width }}>
        {label}:
      </dt>
      <dd className="grow font-semibold break-all">{value}</dd>
    </div>
  );
};
