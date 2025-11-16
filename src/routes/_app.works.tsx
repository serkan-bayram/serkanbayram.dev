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
   const works: WorkItem[] = [
    {
      name: "StajDefteri",
      description:
        "A website to manage my internship report. All the data is saved locally and Backend is used for PDF Generation only.",
      link: "https://stajdefteri.serkanbayram.dev",
      imageSource: "stajdefteri.webp",
      status: undefined,
      repoLinks: ["https://github.com/serkan-bayram/stajdefteri"],
    },
    {
      name: "TypeRace",
      description:
        "A web application that you can create rooms and race with your friends to see who types faster. ⌨️",
      link: "https://typerace.serkanbayram.dev",
      imageSource: "typerace.webp",
      status: undefined,
      repoLinks: [
        "https://github.com/serkan-bayram/type-race-frontend",
        "https://github.com/serkan-bayram/type-race-backend",
      ],
    },
    {
      name: "Editor",
      description:
        "Simple video editing should be simple: In this project, I tried to achive this. No backend required, thanks to FFmpeg WASM. ✏️",
      link: "https://editor.serkanbayram.dev",
      imageSource: "editor.webp",
      status: "in progress",
      repoLinks: ["https://github.com/serkan-bayram/editor"],
    },
    {
      name: "KVDB",
      description:
        "You can search and find any quotes from Kurtlar Vadisi through this website. 🎞️",
      link: "https://kvdb.serkanbayram.dev",
      imageSource: "kvdb.webp",
      status: undefined,
      repoLinks: ["https://github.com/serkan-bayram/kvdb"],
    },
  ];

  return (
    <div className="mb-16 flex flex-col items-center gap-y-14">
      <HeadContent />

      <AnimatedHeading heading="Things I Built" />

      {works.map((work) => (
        <WorkItem key={work.name} workItem={work} />
      ))}
    </div>
  );
}
