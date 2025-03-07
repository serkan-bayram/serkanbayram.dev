import { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { useFieldContext } from "../lib/form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClassName?: string;
};

export function TextInput({
  label,
  containerClassName,
  className,
  ...props
}: InputProps) {
  const field = useFieldContext<string>();

  return (
    <label className={cn("flex flex-col gap-y-1", containerClassName)}>
      <div>{label}</div>

      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          "bg-background text-text min-w-64 rounded-lg p-2",
          className,
        )}
        {...props}
      />
    </label>
  );
}
