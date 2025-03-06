import { ArrowUpRightIcon } from "lucide-react";
import { WorkStatus } from "./work-status";

export type WorkStatus = "in-progress";

type WorkItem = {
  name: string;
  link?: string;
  description: string;
  imageSource: string;
  status?: WorkStatus; // We can add more options later maybe
};

export function WorkItem({
  name,
  link,
  description,
  imageSource,
  status,
}: WorkItem) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-1">
          <WorkHeader name={name} link={link} />

          <p className="max-w-prose">{description}</p>
        </div>

        <img
          src={imageSource}
          className="border-background-light mx-auto mt-8 rounded-lg border"
        />

        {status && (
          <div className="mt-3 ml-auto">
            <WorkStatus status={status} />
          </div>
        )}
      </div>
    </div>
  );
}

function WorkHeader({ name, link }: { name: string; link?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{name}</h2>

      {link && (
        <a
          target="_blank"
          className="text-accent hover:text-accent-light flex items-center transition-colors ease-in-out"
          href={link}
        >
          Try Out
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
