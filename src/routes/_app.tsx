import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-full w-full p-2 px-4 pt-12 sm:w-2/3 sm:px-0 md:w-1/2">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex gap-x-3">
            <Link
              className="data-[status=active]:text-accent hover:text-accent-light data-[status=active]:hover:text-accent-light relative transition-colors ease-in-out"
              to="/"
              viewTransition
            >
              home
            </Link>
            <Link
              className="hover:text-accent-light data-[status=active]:text-accent data-[status=active]:hover:text-accent-light relative transition-colors ease-in-out"
              to="/works"
              viewTransition
              preload="intent"
            >
              works
            </Link>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
