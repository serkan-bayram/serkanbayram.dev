import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { fetchWorks } from "../../lib/api/fetch";
import { WorkItem } from "../../components/works/work-item";
import { WorkDialog } from "../../components/works/work-action-dialog";
import { ReactNode, useState } from "react";
import { Button } from "../../components/button";
import { PlusCircleIcon } from "lucide-react";
import { Error, Info } from "../../components/info";
import { Spinner } from "../../components/spinner";
import { useAuth } from "../../lib/use-auth";
import { AnimatedHeading } from "../../components/animated-heading";

export const Route = createFileRoute("/_app/works")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "A collection of projects I’ve built, including web applications, experiments, and open-source contributions.",
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

  if (!works?.length) {
    return (
      <Layout>
        <Info className="mx-auto" text="No works found" />
      </Layout>
    );
  }

  return (
    <Layout>
      {works.map((work) => (
        <WorkItem key={work.id} workItem={work} />
      ))}
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  return (
    <div className="mb-16 flex flex-col items-center gap-y-14">
      <HeadContent />

      <AnimatedHeading heading="Things I Built" />

      <WorkDialog open={isDialogOpen} setOpen={setIsDialogOpen} />

      {isAuthenticated && (
        <div className="mx-auto">
          <Button Icon={PlusCircleIcon} onClick={() => setIsDialogOpen(true)}>
            Add Work
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}
