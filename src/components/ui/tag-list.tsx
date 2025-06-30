import { cn } from "@/utils/cn";

export default function TagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <Tag key={tag} text={tag} className={className} />
      ))}
    </div>
  );
}

const Tag = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span
      className={cn(
        "font-lato rounded-full bg-[#E6E6E6] px-5 py-2 text-sm",
        className,
      )}
    >
      {text}
    </span>
  );
};
