import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <div className="bg-text mr-4 h-36 w-36 flex-shrink-0 rounded-full"></div>

      <div>
        <div className="font-default font-bold">Serkan Bayram</div>
        <p className="font-default">
          Hello there! I like creating websites using several technologies. I
          built this website to try and write about some of the cool stuff I see
          on the internet.
        </p>
      </div>
    </div>
  );
}
