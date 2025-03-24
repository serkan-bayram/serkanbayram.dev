import { Link, useRouter } from "@tanstack/react-router";

type List = {
  path: string;
  title: string;
  date: string;
};

const list: List[] = [];

export function WritingsList() {
  useWarnings();

  if (list.length === 0) return;

  return (
    <div className="flex flex-col gap-y-1">
      <h2 className="font-semibold">Writings</h2>

      <ul className="flex flex-col gap-y-3">
        {list.map((writing, index) => {
          return (
            <li
              className="flex flex-col items-start justify-between sm:flex-row"
              key={index}
            >
              <Link
                className="mr-6 max-w-full overflow-x-hidden text-nowrap"
                to={writing.path}
              >
                {writing.title}
              </Link>

              <span className="text-text/70 text-sm">{writing.date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function useWarnings() {
  const { routesByPath } = useRouter();

  if (import.meta.env.MODE === "production") return;

  const writingRoutes = Object.keys(routesByPath).filter((route) =>
    route.includes("writings"),
  );

  const listByPath = list.map((l) => l.path);

  const forgettenRoutes = writingRoutes.filter((r) => !listByPath.includes(r));
  const whereIsTheRoute = listByPath.filter((l) => !writingRoutes.includes(l));

  if (forgettenRoutes.length > 0) {
    console.log(`You forgot to add some routes to list object.`);
    console.log(forgettenRoutes);
  }

  if (whereIsTheRoute.length > 0) {
    console.log(
      `You added some routes to your list object but it's not defined as a route.`,
    );
    console.log(whereIsTheRoute);
  }
}
