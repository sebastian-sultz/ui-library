import { cn } from "@/lib/utils";

interface CalendarCardProps {
  date: string;
  isActive?: boolean;
  variant?: "default" | "timeline";
  onClick?: () => void;
}

export function CalendarCard({
  date,
  isActive = false,
  variant = "default",
  onClick,
}: CalendarCardProps) {
  const parsedDate = new Date(date);

  const month = parsedDate
    .toLocaleString("en-US", {
      month: "short",
    })
    .toUpperCase();

  const day = parsedDate.getDate();

  // Ensure double-digit day string formatting
  const formattedDay = day < 10 ? `0${day}` : day;

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "overflow-hidden rounded-xl border transition-all w-14 shrink-0",
        variant === "timeline"
          ? "border-divider-main cursor-default"
          : isActive
          ? "border-main-primary"
          : "border-divider-main",
      )}
    >
      <div
        className={cn(
          "px-[0.62rem] py-[0.44rem] text-[10px] font-bold tracking-wider text-center",
          variant === "timeline"
            ? "bg-divider-main text-text-secondary uppercase"
            : isActive
            ? "bg-main-primary text-white"
            : "bg-divider-main text-main-primary",
        )}
      >
        {month}
      </div>

      <div
        className={cn(
          "px-[0.62rem] py-[0.44rem] text-xs font-bold border-t text-center",
          variant === "timeline"
            ? "bg-white text-main-secondary border-divider-main"
            : isActive
            ? " text-main-secondary border-main-primary"
            : "bg-white text-main-primary border-divider-main",
        )}
      >
        {formattedDay}
      </div>
    </button>
  );
}

