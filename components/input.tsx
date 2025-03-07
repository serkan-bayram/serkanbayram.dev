import { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn("bg-background text-text w-64 rounded-lg p-2", className)}
      {...props}
    />
  );
}
