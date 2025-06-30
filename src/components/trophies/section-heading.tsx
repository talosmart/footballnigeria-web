export default function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-neutral border-b-border-default mb-3 border-b py-1.5 font-bold uppercase">
      {title}
    </h3>
  );
}
