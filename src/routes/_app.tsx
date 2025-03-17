import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { Button } from "../../components/button";
import { client } from "../../lib/api/mutations";
import { useAuth } from "../../components/auth-provider";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();

  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-full p-2 px-4 pt-12 sm:w-2/3 sm:px-0 md:w-1/2">
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

          {isAuthenticated && (
            <Button
              onClick={async () => {
                await client.POST("/api/Auth/logout");
                await queryClient.invalidateQueries({ queryKey: ["auth"] });
                router.invalidate();
              }}
              variant="link"
            >
              Logout
            </Button>
          )}
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
