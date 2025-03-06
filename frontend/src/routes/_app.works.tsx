import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

export const Route = createFileRoute("/_app/works")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col gap-y-8">
        <h1 className="mx-auto p-12 text-4xl font-extrabold">Things I Built</h1>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">TypeRace</h2>
                <a
                  className="text-accent hover:text-accent-light flex items-center transition-colors ease-in-out"
                  href="https://typerace.serkanbayram.dev"
                >
                  Try Out
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </div>
              <p className="max-w-prose">
                A web application that you can create rooms and race with your
                friends to see who types faster. ⌨️
              </p>
            </div>
            <img
              src="/works/typerace.png"
              className="border-background-light mx-auto mt-8 rounded-lg border"
            />
          </div>
        </div>
      </div>
    </>
  );
}
