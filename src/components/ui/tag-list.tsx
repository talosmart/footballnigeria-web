import { cn } from "@/utils/cn";

export default function TagList({
  tags,
  className,
  handleTagClicked
}: {
  tags: { id: string | number; name: string }[];
  className?: string;
  handleTagClicked: (id: string | number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags?.map((tag, index) => (
        <div key={index} className="cursor-pointer" onClick={() => handleTagClicked(tag.id)}>
          <Tag text={tag.name} className={className} />
        </div>
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
