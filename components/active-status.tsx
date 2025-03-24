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
  return (
    <div
      title={status}
      className={cn("h-2 w-2 rounded-full bg-red-600", {
        "bg-green-600": status.toLowerCase() === "active",
      })}
    ></div>
  );
}
