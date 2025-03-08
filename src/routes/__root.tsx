import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <>
      <div className="bg-background min-h-[100dvh]">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

console.warn(
  "DO NOT FORGET: You need to change npm get-openapi %BASE_URL% to $BASE_URL to make it work in Linux. Also you need to set BASE_URL as variable in terminal.",
);
