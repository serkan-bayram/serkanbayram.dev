import { SkullIcon } from "lucide-react";
import { cn } from "../lib/cn";

export function Info({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <div className={cn("", className)}>{text}</div>;
}

export function Error({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-danger-light/30 border-danger text-text flex items-center gap-x-2 rounded-lg border px-6 py-2",
        className,
      )}
    >
      <SkullIcon /> {text}
    </div>
  );
}
