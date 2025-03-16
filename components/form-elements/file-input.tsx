import { UploadIcon } from "lucide-react";
import { useFieldContext } from "./form-hook";
import { InputHTMLAttributes, useState } from "react";
import { cn } from "../../lib/cn";
import { toBase64 } from "../../lib/toBase64";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export function FileInput({
  containerClassName,
  className,
  ...props
}: InputProps) {
  const field = useFieldContext<string>();

  const [fileName, setFileName] = useState("");

  return (
    <label
      className={cn(
        "bg-background outline-background/70 flex h-36 w-full items-center justify-center rounded-lg outline-3 outline-dashed file:hidden",
        containerClassName,
      )}
    >
      <input
        className={cn("hidden", className)}
        type="file"
        onChange={async (e) => {
          const file = e.target.files && e.target.files[0];

          if (file) {
            setFileName(file.name);

            const base64 = await toBase64(file);

            field.handleChange(base64);
          }
        }}
        value={""}
        {...props}
      />
      <div className="flex w-full flex-col items-center gap-y-2">
        <UploadIcon />
        {fileName.length > 0 ? (
          <div className="flex w-full justify-center">
            <div className="max-w-[60%] overflow-x-hidden text-nowrap">
              {fileName}
            </div>
          </div>
        ) : (
          "Upload an Image"
        )}
      </div>
    </label>
  );
}
