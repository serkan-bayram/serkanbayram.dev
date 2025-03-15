import { createFileRoute, HeadContent, Outlet } from "@tanstack/react-router";
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

{
  /* <WorkItem
name="TypeRace"
description="A web application that you can create rooms and race with your
friends to see who types faster. ⌨️"
link="https://typerace.serkanbayram.dev"
imageSource="/works/typerace.png"
repoLinks={[
  "https://github.com/serkan-bayram/type-race-frontend",
  "https://github.com/serkan-bayram/type-race-backend",
]}
/>

<WorkItem
name="Editor"
description="Simple video editing should be simple: In this project, I tried to achive this. No backend required, thanks to FFmpeg WASM. ✏️"
link="https://editor.serkanbayram.dev"
imageSource="/works/editor.png"
status="in-progress"
repoLinks={["https://github.com/serkan-bayram/editor"]}
/>

<WorkItem
name="KVDB"
description="You can search and find any quotes from Kurtlar Vadisi through this website. 🎞️"
link="https://kvdb.serkanbayram.dev"
imageSource="/works/kvdb.png"
repoLinks={["https://github.com/serkan-bayram/kvdb"]}
/> */
}
