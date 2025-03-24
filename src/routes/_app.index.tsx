import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { GithubSvg } from "../../components/svg/github-svg";
import { LinkedinSvg } from "../../components/svg/linkedin-svg";
import { OpeningText } from "../../components/opening-text";
import { WritingsList } from "@/components/writings-list";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Hi, I'm Serkan Bayram! I love building websites with various technologies and experimenting with cool ideas from the internet. Explore my projects and connect with me on GitHub and LinkedIn!",
      },
      {
        title: "Home - Serkan Bayram",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-16">
      <HeadContent />
      <div className="flex flex-col justify-between">
        <div>
          <div className="font-default font-bold">Serkan Bayram</div>
          <OpeningText />
        </div>
        <div className="mt-4 flex items-center gap-x-2 self-end">
          <a
            aria-label="See my GitHub account"
            href="https://github.com/serkan-bayram"
            target="_blank"
          >
            <GithubSvg width={32} height={32} />
          </a>
          <a
            aria-label="See my LinkedIn account"
            href="https://www.linkedin.com/in/serkanbayram1"
            target="_blank"
          >
            <LinkedinSvg width={32} height={32} />
          </a>
        </div>
      </div>

      <WritingsList />
    </div>
  );
}
