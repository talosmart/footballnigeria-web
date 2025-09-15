"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BreadCrumbContent() {
  const pathname = usePathname();
        const searchParams = useSearchParams(); // ✅ get query params
        const fixtureId = searchParams.get("fixture");

  const segments = pathname.split("/").filter((path) => path !== "");

  const breadCrumbs = segments.map((crumb, i) => {
    const displayText = crumb.split("-").join(" ");
    const path = i === 0 ? "/" : "/" + segments.slice(0, i + 1).join("/"); // 👈 first always "/"

    return {
      displayText,
      path,
    };
  });

  return (
    <div className="flex gap-x-2">
      {breadCrumbs.map((crumb, i) => (
        <p
          key={i}
          className="last:text-primary flex items-center gap-x-2 text-sm font-medium text-[#B3B3B3] capitalize"
        >
          <Link href={fixtureId ? `${crumb.path}?fixture=${fixtureId}` : crumb.path}>{crumb.displayText}</Link>
          {i < segments.length - 1 && (
            <Image
              src="/chevron-stroke.png"
              alt=""
              width={7.78}
              height={12.73}
            />
          )}
        </p>
      ))}
    </div>
  );
}


export default function BreadCrumb() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreadCrumbContent />
    </Suspense>
  );
}