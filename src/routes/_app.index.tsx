import { createFileRoute } from "@tanstack/react-router";
import { GithubSvg } from "../../components/svg/github-svg";
import { LinkedinSvg } from "../../components/svg/linkedin-svg";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <div className="bg-text mr-4 h-36 w-36 flex-shrink-0 rounded-full"></div>

      <div className="flex flex-col justify-between">
        <div>
          <div className="font-default font-bold">Serkan Bayram</div>
          <p className="font-default">
            Hello there! I like creating websites using several technologies. I
            built this website to try and write about some of the cool stuff I
            see on the internet.
          </p>
        </div>
        <div className="flex items-center gap-x-2 self-end">
          <a href="https://github.com/serkan-bayram" target="_blank">
            <GithubSvg width={32} height={32} fill="white" />
          </a>
          <a href="https://www.linkedin.com/in/serkanbayram1" target="_blank">
            <LinkedinSvg width={32} height={32} fill="white" />
          </a>
        </div>
      </div>
    </div>
  );
}
