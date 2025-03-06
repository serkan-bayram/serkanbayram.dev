import type { WorkStatus } from "./work-item";

export function WorkStatus({ status }: { status: WorkStatus }) {
  switch (status) {
    case "in-progress":
      return (
        <div className="bg-background-light w-fit rounded-md px-3 py-1 text-xs">
          in progress
        </div>
      );
    default:
      return <div></div>;
  }
}
