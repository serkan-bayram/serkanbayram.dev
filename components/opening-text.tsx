import { Tech, Techs } from "./techs";

const techs: Tech[] = [
  { tech: "React", bg: "bg-blue-600", textColor: "text-text" },
  { tech: "TypeScript", bg: "bg-blue-800", textColor: "text-text" },
  { tech: ".NET Core", bg: "bg-green-800", textColor: "text-text" },
  { tech: "Node.js", bg: "bg-green-600", textColor: "text-text" },
  { tech: "Next.js", bg: "bg-black", textColor: "text-text" },
];

export function OpeningText() {
  return (
    <p className="font-default">
      Hello there! I like creating websites using{" "}
      <Techs text="several technologies." techs={techs} /> I built this website
      to try some of the cool stuff I see on the internet.
    </p>
  );
}
