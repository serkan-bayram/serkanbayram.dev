import { TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { useFieldContext } from "../lib/form";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  containerClassName?: string;
};

export function Textarea({
  label,
  containerClassName,
  className,
  ...props
}: TextareaProps) {
  const field = useFieldContext<string>();

  return (
    <label className={cn("flex flex-col gap-y-1", containerClassName)}>
      <div>{label}</div>

      <textarea
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
