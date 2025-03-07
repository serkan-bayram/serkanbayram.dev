import { ReactElement, useEffect, useRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Dialog({
  open,
  children,
  className,
}: {
  open: boolean;
  className?: string;
  children: [
    ReactElement<typeof DialogClose>,
    ReactElement<typeof DialogContent>,
  ];
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
        "bg-background-light fixed inset-0 m-auto h-1/3 w-1/2 rounded-lg p-4",
        className,
      )}
      ref={ref}
    >
      <div className="flex h-full w-full flex-col">{children}</div>
    </dialog>
  );
}

export function DialogClose({ children }: { children: ReactNode }) {
  return children;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return children;
}
