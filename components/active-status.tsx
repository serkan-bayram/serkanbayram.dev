import { useLoaderData } from "@tanstack/react-router";

export function ActiveStatus() {
  const status = useLoaderData({ from: "/_app/" });

  return <div>{status}</div>;
}
