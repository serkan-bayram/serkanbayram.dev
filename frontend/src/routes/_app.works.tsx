import { createFileRoute } from "@tanstack/react-router";
import { WorkItem } from "../../components/work-item";

export const Route = createFileRoute("/_app/works")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col gap-y-14">
        <h1 className="mx-auto p-12 pb-4 text-4xl font-extrabold">
          Things I Built
        </h1>

        <WorkItem
          name="TypeRace"
          description="A web application that you can create rooms and race with your
        friends to see who types faster. ⌨️"
          link="https://typerace.serkanbayram.dev"
          imageSource="/works/typerace.png"
        />

        <WorkItem
          name="Editor"
          description="Simple video editing should be simple: In this project, I tried to achive this. No backend required, thanks to FFmpeg WASM. ✏️"
          link="https://editor.serkanbayram.dev"
          imageSource="/works/editor.png"
          status="in-progress"
        />

        <WorkItem
          name="KVDB"
          description="You can search and find any quotes from Kurtlar Vadisi through this website. 🎞️"
          link="https://kvdb.serkanbayram.dev"
          imageSource="/works/kvdb.png"
        />
      </div>
    </>
  );
}
