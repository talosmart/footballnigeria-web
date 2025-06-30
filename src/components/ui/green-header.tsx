import { cn } from "@/utils/cn";

export default function GreenHeader({
  heading,
  className,
}: {
  heading: string;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "bg-primary mb-1 rounded-t-lg px-3 py-2 text-sm font-extrabold text-[#F3F3F3] uppercase",
        className,
      )}
    >
      {heading}
    </h3>
  );
}
