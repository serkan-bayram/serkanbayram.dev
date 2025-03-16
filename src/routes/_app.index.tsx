import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { GithubSvg } from "../../components/svg/github-svg";
import { LinkedinSvg } from "../../components/svg/linkedin-svg";
import { OpeningText } from "../../components/opening-text";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "Home",
        content: "Information about serkanbayram.dev",
      },
      {
        title: "Home - Serkan Bayram",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex">
      <HeadContent />
      <div className="flex flex-col justify-between">
        <div>
          <div className="font-default font-bold">Serkan Bayram</div>
          <OpeningText />
        </div>
        <div className="flex items-center gap-x-2 self-end">
          <a href="https://github.com/serkan-bayram" target="_blank">
            <GithubSvg width={32} height={32} />
          </a>
          <a href="https://www.linkedin.com/in/serkanbayram1" target="_blank">
            <LinkedinSvg width={32} height={32} />
          </a>
        </div>
      </div>
    </div>
  );
}
