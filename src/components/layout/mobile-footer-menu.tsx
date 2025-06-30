import Link from "next/link";
import SearchIcon, { LogoutIcon, UserIcon } from "../svgs";

export default function MobileFooterMenu() {
  return (
    <footer className="bg-primary font-bai-jamjuree fixed bottom-0 left-0 z-50 grid w-full grid-cols-3 px-3.5 py-3 text-sm font-medium tracking-[0.2px] text-white lg:hidden">
      <Link href="/" className="flex flex-col items-center">
        <SearchIcon className="h-6 w-6" />
        Search
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <UserIcon className="h-6 w-6" />
        Profile
      </Link>
      <div className="flex flex-col items-center">
        <LogoutIcon className="h-6 w-6" />
        Logout
      </div>
    </footer>
  );
}
