import { useEffect, useRef, ReactNode, SetStateAction, Dispatch } from "react";
import { cn } from "../lib/cn";
import { CrossIcon } from "lucide-react";

export function Dialog({
  open,
  setOpen,
  children,
  className,
  title,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  children: ReactNode;
  title: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      return;
    }

    ref.current?.close();
  }, [open]);

  return (
    <dialog
      className={cn(
        "bg-background-light backdrop:bg-background/70 fixed inset-0 m-auto h-1/3 w-1/2 rounded-lg p-4",
        className,
      )}
      ref={ref}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{title}</div>

          <button className="cursor-pointer" onClick={() => setOpen(false)}>
            <CrossIcon className="rotate-45 text-white" />
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}
