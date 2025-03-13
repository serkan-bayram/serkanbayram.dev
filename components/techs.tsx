import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

export type Tech = {
  tech: string;
  bg: string;
  textColor: string;
};

export function Techs({ techs, text }: { techs: Tech[]; text: string }) {
  const [mouseOver, setMouseOver] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!mouseOver) {
      setShow(false);
      return;
    }

    const timeout = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [mouseOver]);

  return (
    <span
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      className="text-accent-light relative cursor-default"
    >
      {text}
      <AnimatePresence>
        {show && (
          <motion.div
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
        )}
      </AnimatePresence>
    </span>
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
