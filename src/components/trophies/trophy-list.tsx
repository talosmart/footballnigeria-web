import Image from "next/image";

export default function Trophy() {
  return (
    <li className="grid grid-cols-7 items-center lg:grid-cols-3">
      <div className="col-span-2 flex items-center gap-x-2.5 text-neutral-200 lg:col-span-1">
        <Image src="/club1.png" alt="" width={16} height={24.63} />
        Napoli
      </div>
      <p className="col-span-2 font-semibold lg:col-span-1">RUNNER-UP 2X</p>
      <p className="col-span-3 font-bold lg:col-span-1">
        (04/09/2024 - 30/06/2025)
      </p>
    </li>
  );
}

