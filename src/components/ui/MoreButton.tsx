import Link from "next/link";

export default function MoreButton({ path, title }: { path: string; title: string }) {
  return (
    <div className="text-right">
      <Link
        href={path}
        className="bg-primary font-lato inline-block rounded px-7 py-2.5 text-xs font-semibold text-white lg:text-sm"
      >
        {title}
      </Link>
    </div>
  );}