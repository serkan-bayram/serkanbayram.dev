import { ArrowUpRightIcon } from "lucide-react";
import type { WorkItem } from "../../lib/schemas";
import { GithubSvg } from "../svg/github-svg";
import { WorkStatus } from "./work-status";
import { WorkDialog } from "./work-action-dialog";
import { useState } from "react";
import { useAuth } from "../auth-provider";

export function WorkItem({ workItem }: { workItem: WorkItem }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    name,
    link,
    description,
    imageSource,
    status,
    repoLinks = [],
  } = workItem;

  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-1">
        <WorkHeader name={name} link={link} />

        <p className="max-w-prose">{description}</p>
      </div>

      <WorkDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        workItem={workItem}
      />

      {imageSource && (
        <img
          alt={`Screenshot of ${workItem.name}`}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${imageSource}`}
          className="border-background-light mx-auto mt-8 w-[900px] rounded-lg border"
        />
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-x-2">
          {repoLinks.map((repoLink, index) => (
            <a key={index} target="_blank" href={repoLink}>
              <GithubSvg width={30} height={30} />
            </a>
          ))}
        </div>

        {isAuthenticated && (
          <button
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Edit Work
          </button>
        )}

        {status && <WorkStatus status={status} />}
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
