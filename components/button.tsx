import { ButtonHTMLAttributes, ElementType, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { Loader2Icon } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "danger" | "ghost" | "link";
  Icon?: ElementType;
};

export function Button({
  children,
  className,
  variant,
  Icon,
  ...props
}: ButtonProps) {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (props.disabled) {
      timeout = setTimeout(() => {
        setIsPending(true);
      }, 300);
    } else {
      setIsPending(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [props.disabled]);

  return (
    <button
      className={cn(
        "bg-primary hover:bg-primary-light text-background flex w-fit cursor-pointer items-center gap-x-2 rounded-lg px-5 py-2 disabled:cursor-default",
        {
          "text-text bg-danger hover:bg-danger-light": variant === "danger",
          "hover:bg-primary/20 text-text bg-transparent": variant === "ghost",
          "text-text bg-transparent px-0 hover:bg-transparent hover:underline hover:underline-offset-3":
            variant === "link",
          "opacity-60 hover:no-underline": isPending,
        },
        className,
      )}
      {...props}
    >
      {!isPending && Icon && <Icon />}
      {isPending && <Loader2Icon className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
}
