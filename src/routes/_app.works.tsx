import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { fetchWorks } from "../../lib/api/fetch";
import { WorkItem } from "../../components/works/work-item";
import { WorkDialog } from "../../components/works/work-action-dialog";
import { useState } from "react";
import { Button } from "../../components/button";
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "../../components/auth-provider";
import { Error, Info } from "../../components/info";

export const Route = createFileRoute("/_app/works")({
  loader: () => fetchWorks(),
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "Works",
        content: "Projects that built by Serkan Bayram",
      },
      {
        title: "Works - Serkan Bayram",
      },
    ],
  }),
});

function RouteComponent() {
  const { data: works, error } = Route.useLoaderData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  return (
    <div className="mb-16 flex flex-col gap-y-14">
      <HeadContent />
      <h1 className="mx-auto p-12 pb-4 text-4xl font-extrabold">
        Things I Built
      </h1>

      <WorkDialog open={isDialogOpen} setOpen={setIsDialogOpen} />

      {isAuthenticated && (
        <div className="mx-auto">
          <Button Icon={PlusCircleIcon} onClick={() => setIsDialogOpen(true)}>
            Add Work
          </Button>
        </div>
      )}

      {works && works.map((work) => <WorkItem key={work.id} workItem={work} />)}

      {!works?.length && <Info className="mx-auto" text="No works found" />}

      {error && <Error className="mx-auto" text={error} />}
    </div>
  );
}
