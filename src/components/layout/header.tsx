"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "../ui/navlink";
import SearchIcon, { CloseIcon } from "../svgs";
import { headerNavLinks, mobileHeaderNavLinks } from "@/constants/data";

export default function Header() {
  return (
    <>
      <header className="bg-primary relative items-center justify-between px-3.5 pb-5 lg:flex lg:pb-0 xl:px-[6.25rem]">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-between pt-12 lg:pt-0">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Nigeria football.com logo"
              width={158.18}
              height={62}
            />
          </Link>

          <button>
            <Image
              src="/hamburger.svg"
              alt="hamburger menu"
              width={32}
              height={32}
              className="block md:hidden"
            />
          </button>
        </div>

        {/* Navigation links desktop */}
        <nav className="font-mulish hidden lg:block lg:h-[102px]">
          <ul className="flex h-full text-xs font-semibold text-white xl:text-sm">
            {headerNavLinks.map(({ path, title, id, exact, dropdownLinks }) => (
              <li
                key={id}
                className="group hover:bg-primary-light/10 transition-color flex h-full items-center duration-300 ease-in-out"
              >
                {!path && dropdownLinks ? (
                  <>
                    <button className="flex h-full cursor-pointer items-center gap-x-2.5 px-3 capitalize transition-opacity duration-300 ease-in-out group-hover:opacity-100 xl:px-5">
                      {title}
                      <Image
                        src="/chevron.svg"
                        alt="chevron"
                        width={12}
                        height={6}
                        className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                      />
                    </button>

                    {true && (
                      <div className="invisible absolute top-full left-1/2 z-50 flex w-full -translate-x-1/2 translate-y-10 transform justify-between bg-white px-48 py-6 text-black opacity-0 shadow-md transition-all delay-150 duration-500 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {dropdownLinks.map(({ title, links }) => (
                          <DropdownSection
                            key={title}
                            title={title}
                            links={links}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    href={path}
                    exact={exact}
                    className="px-3 opacity-90 transition-all duration-300 ease-in-out hover:opacity-100 xl:px-5"
                  >
                    {title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Open search dropdown */}
        <label
          htmlFor="openSearchModal"
          className="group peer hidden w-full cursor-pointer items-center rounded-full border border-[#FFFFFF4F] px-5 py-2.5 transition-all duration-300 ease-in-out hover:bg-white lg:flex lg:h-11 lg:w-11 lg:justify-center lg:px-0 lg:py-0"
        >
          <input
            type="radio"
            id="openSearchModal"
            name="searchModal"
            className="peer hidden"
          />
          <SearchIcon className="group-hover:text-primary transition-color h-[1.125rem] w-[1.125rem] text-white delay-200 duration-300 ease-in-out" />
        </label>
        {/* Close search dropdown */}
        <label
          htmlFor="closeSearchModal"
          className="absolute top-14 right-3.5 z-50 hidden cursor-pointer peer-has-checked:block lg:right-32"
        >
          <input
            type="radio"
            name="searchModal"
            id="closeSearchModal"
            className="hidden"
            defaultChecked
          />
          <CloseIcon />
        </label>

        {/* Search dropdown */}
        <div className="fixed top-0 left-0 z-40 hidden h-dvh w-full bg-white/85 px-3.5 py-24 backdrop-blur-[6.3px] peer-has-checked:block">
          <section className="mx-auto max-w-[671px]">
            <div className="mb-4 flex w-full items-center gap-x-6 rounded-full border border-[#d9d9d9] bg-white px-6">
              <input
                type="text"
                className="grow bg-transparent py-4 focus:outline-none"
                id="search"
                placeholder="Search match or team/players"
              />
              <SearchIcon className="h-[1.125rem] w-[1.125rem] text-neutral-200" />
            </div>

            <div className="border-b-primary font-lato border-b-2 py-2.5 text-sm font-bold text-[#1e1e1e]">
              NO RESULTS
            </div>
          </section>
        </div>
      </header>

      {/* Mobile Navigation Links */}
      <nav className="bg-primary-dark p-2.5 lg:hidden">
        <ul className="no-scrollbar flex items-center gap-y-1 overflow-x-auto">
          {mobileHeaderNavLinks.map(({ path, title, id, icon }) => (
            <li key={id} className="shrink-0">
              <Link
                href={path}
                className="font-mulish flex flex-col items-center px-3.5 text-xs leading-5 font-semibold text-white"
              >
                {icon}
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function DropdownSection({
  title,
  links,
}: {
  title: string;
  links: { path: string; title: string; id: number }[];
}) {
  return (
    <section className="w-full text-[#1E1E1E] lg:max-w-[198px]">
      <h3 className="border-b-primary mb-5 border-b-2 pb-2.5 font-bold uppercase">
        {title}
      </h3>
      <ul className="grid gap-y-5">
        {links.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className="group flex text-sm font-semibold capitalize"
            >
              <div className="flex shrink-0 items-center border-b border-b-[#E6F3EE] pr-3">
                <Image src="/whistle.svg" alt="" width={18.04} height={9.85} />
              </div>
              <span className="border-b-primary-light hover:border-b-primary inline-block grow border-b-2 py-1 transition-all duration-300 ease-in-out hover:pl-4">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
