"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export default function NavLink({
  href,
  children,
  className,
  activeClassName = "",
  exact = false,
}: Props) {
  const pathname = usePathname();

  const isActive = () => {
    if (exact) {
      return pathname === href;
    }

    // Handle root path specially
    if (href === "/") {
      return pathname === "/";
    }

    // Check if pathname starts with href and if the next character is a slash or doesn't exist
    return (
      pathname.startsWith(href) &&
      (pathname.length === href.length ||
        pathname[href.length] === "/" ||
        pathname[href.length] === "?")
    );
  };

  return (
    <Link
      href={href}
      className={cn("block", className, isActive() ? activeClassName : "")}
    >
      {children}
    </Link>
  );
}
