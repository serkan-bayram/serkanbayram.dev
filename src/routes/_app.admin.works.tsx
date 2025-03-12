import { createFileRoute } from "@tanstack/react-router";
import { AddWork } from "../../components/add-work";
import { fetchWorks } from "../../lib/api/fetch";
import { WorkItem } from "../../components/work-item";

export const Route = createFileRoute("/_app/admin/works")({
  loader: () => fetchWorks(),
  component: RouteComponent,
});

function RouteComponent() {
  const works = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-y-14">
      <h1 className="mx-auto p-12 pb-4">
        <AddWork />
      </h1>

      {works.map((work) => (
        <WorkItem key={work.id} {...work} />
      ))}
    </div>
  );
}
