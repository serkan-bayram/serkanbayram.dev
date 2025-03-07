import { UploadIcon } from "lucide-react";
import { useFieldContext } from "./form-hook";
import { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export function FileInput({
  containerClassName,
  className,
  ...props
}: InputProps) {
  const field = useFieldContext<string>();

  const file = field.state.value;

  return (
    <label
      className={cn(
        "bg-background outline-background/70 flex h-36 w-full items-center justify-center rounded-lg outline-3 outline-dashed file:hidden",
        containerClassName,
      )}
      htmlFor={field.name}
    >
      <input
        id={field.name}
        className={cn("hidden", className)}
        type="file"
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
        {...props}
      />
      <div className="flex w-full flex-col items-center gap-y-2">
        <UploadIcon />
        {file ? (
          <div className="flex w-full justify-center">
            <div className="max-w-[60%] overflow-x-hidden text-nowrap">
              {file}
            </div>
          </div>
        ) : (
          "Upload an Image"
        )}
      </div>
    </label>
  );
}
