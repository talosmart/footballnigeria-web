export default function SubTitle({ title }: { title: string }) {
  return (
    <h2 className="border-b-primary text-primary font-lato inline-block w-fit border-b-[3px] pb-2 text-xl font-bold lg:text-2xl">
      {title}
    </h2>
  );
}
