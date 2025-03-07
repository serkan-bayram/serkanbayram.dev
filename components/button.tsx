import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-primary hover:bg-primary-light text-background flex cursor-pointer items-center gap-x-2 rounded-lg px-5 py-2",
        className,
      )}
    >
      {children}
    </button>
  );
}
