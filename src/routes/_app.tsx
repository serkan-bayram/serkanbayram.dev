import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-full w-1/2 p-2 pt-12">
        <div className="mb-8 flex gap-x-3">
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
          >
            works
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
