import { cn } from "@/lib/cn";
import { Await, useLoaderData } from "@tanstack/react-router";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useState } from "react";

export function ActiveStatus() {
  const { statusPromise } = useLoaderData({ from: "/_app/" });

  // TODO: Why can't we use use hook here?
  return (
    <Await promise={statusPromise} fallback={<div></div>}>
      {(data) => {
        return <Status status={data} />;
      }}
    </Await>
  );
}

function Status({ status }: { status: string }) {
  const isActive = status.toLowerCase() === "active";

  const [hover, setHover] = useState(false);

  const text = isActive ? "I'm on the computer" : status;

  const [scope, animate] = useAnimate();

  const tipboxVariants = {
    hidden: {
      width: 0,
      height: 0,
      top: 0,
      opacity: 0,
    },
    visible: {
      width: text.length * 8,
      height: 24,
      top: -36,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={scope}
      className={cn(
        "relative flex h-2 w-2 items-center justify-center rounded-full bg-red-600",
        {
          "bg-green-600": isActive,
        },
      )}
    >
      <div
        onClick={() => setHover(true)}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        className="absolute z-50 h-10 w-10 rounded-full bg-red-200 opacity-0"
      ></div>

      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 7, opacity: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          repeat: Infinity,
          delay: 1.6,
        }}
        className={cn("absolute h-1 w-1 rounded-full bg-green-600/70", {
          "opacity-0": !isActive,
        })}
      ></motion.div>

      <AnimatePresence>
        {hover && (
          <motion.div
            variants={tipboxVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            onAnimationComplete={() => animate("#status-text", { opacity: 1 })}
            className="bg-background-light absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-md px-2 py-1 text-sm font-normal text-nowrap"
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              id="status-text"
            >
              {text}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
