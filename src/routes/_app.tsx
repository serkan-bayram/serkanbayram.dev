import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context }) => {
    // if (!context.auth.isAuthenticated) {
    //   throw redirect({ to: "/admin/works" });
    // }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-full w-1/2 p-2 pt-12">
        <div className="mb-8 flex gap-x-3">
          <Link
            className="hover:text-accent transition-colors ease-in-out"
            to="/"
          >
            home
          </Link>
          <Link
            className="hover:text-accent transition-colors ease-in-out"
            to="/works"
          >
            works
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
