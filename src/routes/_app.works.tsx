import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { fetchWorks } from "../../lib/api/fetch";
import { WorkItem } from "../../components/works/work-item";
import { WorkDialog } from "../../components/works/work-action-dialog";
import { ReactNode, useState } from "react";
import { Button } from "../../components/button";
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "../../components/auth-provider";
import { Error, Info } from "../../components/info";
import { Spinner } from "../../components/spinner";

export const Route = createFileRoute("/_app/works")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Projects that built by Serkan Bayram",
      },
      {
        title: "Works - Serkan Bayram",
      },
    ],
  }),
  loader: fetchWorks,
  component: RouteComponent,
  pendingComponent: () => (
    <Layout>
      <Spinner />
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <Error className="mx-auto" text={error.message} />
    </Layout>
  ),
});

function RouteComponent() {
  const works = Route.useLoaderData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  if (!works?.length) {
    return (
      <Layout>
        {isAuthenticated && (
          <div className="mx-auto">
            <Button Icon={PlusCircleIcon} onClick={() => setIsDialogOpen(true)}>
              Add Work
            </Button>
          </div>
        )}

        <Info className="mx-auto" text="No works found" />
      </Layout>
    );
  }

  return (
    <Layout>
      <WorkDialog open={isDialogOpen} setOpen={setIsDialogOpen} />

      {isAuthenticated && (
        <div className="mx-auto">
          <Button Icon={PlusCircleIcon} onClick={() => setIsDialogOpen(true)}>
            Add Work
          </Button>
        </div>
      )}

      {works.map((work) => (
        <WorkItem key={work.id} workItem={work} />
      ))}
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-16 flex flex-col items-center gap-y-14">
      <HeadContent />
      <h1 className="mx-auto pt-4 pb-4 text-center text-4xl font-extrabold sm:p-12">
        Things I Built
      </h1>

      {children}
    </div>
  );
}
