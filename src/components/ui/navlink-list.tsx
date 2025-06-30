import NavLink from "./navlink";

export default function NavLinkList({
  lists,
}: {
  lists: { title: string; path: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-x-3.5">
      {lists.map((tab, i) => (
        <NavLink
          key={i}
          href={tab.path}
          className="text-neutral p-2.5 text-sm font-semibold uppercase"
          activeClassName="text-primary border-b-[3px]"
        >
          {tab.title}
        </NavLink>
      ))}
    </div>
  );
}
