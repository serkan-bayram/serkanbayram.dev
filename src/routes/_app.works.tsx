import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { WorkItem } from "../../components/works/work-item";
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
  component: RouteComponent,
});

function RouteComponent() {
  const works: WorkItem[] = [];

  return (
    <div className="mb-16 flex flex-col items-center gap-y-14">
      <HeadContent />

      <AnimatedHeading heading="Things I Built" />

      {works.map((work) => (
        <WorkItem key={work.id} workItem={work} />
      ))}
    </div>
  );
}
