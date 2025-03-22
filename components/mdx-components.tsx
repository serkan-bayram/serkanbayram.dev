export function Heading({ level, text }: { level: "h1"; text: string }) {
  return <h1 className="mt-16 text-center text-3xl font-extrabold">{text}</h1>;
}
