import { cn } from "@/lib/cn";
import { Await, useLoaderData } from "@tanstack/react-router";

export function ActiveStatus() {
  const { statusPromise } = useLoaderData({ from: "/_app/" });

  // TODO: Why can't we use use hook here?
  return (
    <Await promise={statusPromise} fallback={<div></div>}>
      {(data) => {
        return <Status status={data} />;
      }}
    </Await>
  );
}

function Status({ status }: { status: string }) {
  const isActive = status.toLowerCase() === "active";
  const text = isActive ? "I'm on the computer" : status;

  return (
    <div
      role="status"
      aria-label={text}
      className={cn("bg-danger relative h-2 w-2 rounded-full", {
        "bg-green-600": isActive,
      })}
    >
      {isActive && (
        <div className="status-indicator__pulse absolute top-0 left-0 h-full w-full rounded-full bg-inherit"></div>
      )}

      <div className="group absolute top-1/2 left-1/2 h-6 w-12 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-background-light pointer-events-none absolute -top-7 left-1/2 flex w-fit -translate-x-1/2 items-center justify-center rounded-md px-2 py-1 text-sm font-normal text-nowrap opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
          {text}
        </div>
      </div>
    </div>
  );
}
