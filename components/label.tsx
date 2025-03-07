import { LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn("text-sm", className)} {...props}>
      {children}
    </label>
  );
}
