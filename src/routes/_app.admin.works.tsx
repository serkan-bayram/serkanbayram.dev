import { createFileRoute } from "@tanstack/react-router";
import { AddWork } from "../../components/add-work";

export const Route = createFileRoute("/_app/admin/works")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AddWork />
    </div>
  );
}
