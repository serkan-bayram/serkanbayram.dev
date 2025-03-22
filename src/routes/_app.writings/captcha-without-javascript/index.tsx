import { createFileRoute } from "@tanstack/react-router";
import Content from "./content.mdx";

export const Route = createFileRoute(
  "/_app/writings/captcha-without-javascript/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <Content />;
}
