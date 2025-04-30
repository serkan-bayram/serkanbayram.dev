import { cn } from "../lib/cn";

export type Tech = {
  tech: string;
  bg: string;
  textColor: string;
};

export function Techs({ techs, text }: { techs: Tech[]; text: string }) {
  return (
    <span className="text-accent-light relative cursor-default text-nowrap">
      {text}

      <div
        className="group absolute top-1/2 left-1/2 h-[110%] w-[110%] -translate-1/2"
        aria-hidden="true"
      >
        <div
          role="tooltip"
          className="bg-background-light pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 flex-col gap-4 rounded-2xl p-4 px-3 opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 sm:left-1/2 sm:w-64 sm:-translate-x-1/2"
        >
          <div className="text-text">techs i use</div>
          <ul className="flex flex-wrap gap-3">
            {techs.map((tech, i) => (
              <Tech key={i} tech={tech} />
            ))}
          </ul>
        </div>
      </div>
    </span>
  );
}

function Tech({ tech }: { tech: Tech }) {
  return (
    <li
      className={cn(
        "text-text w-fit rounded-md bg-black px-2 text-sm",
        tech.bg,
        tech.textColor,
      )}
    >
      {tech.tech}
    </li>
  );
}
