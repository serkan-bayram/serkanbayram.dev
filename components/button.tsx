import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "danger";
};

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-primary hover:bg-primary-light text-background flex w-fit cursor-pointer items-center gap-x-2 rounded-lg px-5 py-2",
        {
          "bg-red-500 text-white hover:bg-red-400": variant === "danger",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
