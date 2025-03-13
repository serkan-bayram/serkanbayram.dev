import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "../../components/auth-provider";

const TanStackRouterDevtools =
  import.meta.env.MODE === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="bg-background min-h-[100dvh]">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

console.warn(
  "DO NOT FORGET: You need to change npm get-openapi %BASE_URL% to $BASE_URL to make it work in Linux. Also you need to set BASE_URL as variable in terminal.",
);
