import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "../lib/cn";

export function OpeningText() {
  const [showTechs, setShowTechs] = useState(false);

  return (
    <p className="font-default">
      Hello there! I like creating websites using{" "}
      <span
        onMouseOver={() => setShowTechs(true)}
        className="text-accent-light relative cursor-default"
      >
        several technologies
        <AnimatePresence>
          {showTechs && <Techs setShowTechs={setShowTechs} />}
        </AnimatePresence>
      </span>
      . I built this website to try some of the cool stuff I see on the
      internet.
    </p>
  );
}

type Tech = {
  tech: string;
  bg: string;
  textColor: string;
};

const techs: Tech[] = [
  { tech: "React", bg: "bg-blue-600", textColor: "text-text" },
  { tech: "TypeScript", bg: "bg-blue-800", textColor: "text-text" },
  { tech: ".NET Core", bg: "bg-green-800", textColor: "text-text" },
  { tech: "Node.js", bg: "bg-green-600", textColor: "text-text" },
  { tech: "Next.js", bg: "bg-black", textColor: "text-text" },
];

function Techs({
  setShowTechs,
}: {
  setShowTechs: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      onMouseLeave={() => setShowTechs(false)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="bg-background-light absolute top-1/2 left-1/2 flex w-64 -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-2xl p-4 px-3"
    >
      <motion.div
        className="text-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        techs i use
      </motion.div>

      <motion.ul className="flex flex-wrap gap-3">
        {techs.map((tech, i) => (
          <Tech key={i} index={i} tech={tech} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

function Tech({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 + index / 10 }}
      className={cn(
        "text-text w-fit rounded-md bg-black px-2 text-sm",
        tech.bg,
        tech.textColor,
      )}
    >
      {tech.tech}
    </motion.li>
  );
}
