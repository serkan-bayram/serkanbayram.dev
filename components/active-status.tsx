import { cn } from "@/lib/cn";
import { Await, useLoaderData } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
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

  return (
    <motion.div
      className={cn(
        "relative flex h-2 w-2 items-center justify-center rounded-full bg-red-600",
        {
          "bg-green-600": isActive,
        },
      )}
    >
      <div
        onClick={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
        }}
        className="absolute z-50 h-10 w-10 rounded-full bg-red-200 opacity-0"
      ></div>

      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            repeat: Infinity,
            delay: 1.6,
          }}
          className="absolute h-full w-full rounded-full bg-green-600/70"
        ></motion.div>
      )}

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{
              width: 0,
              height: 0,
              top: 0,
              opacity: 0,
            }}
            animate={{
              width: text.length * 8,
              height: 24,
              top: -36,
              opacity: 1,
            }}
            exit={{
              width: 0,
              height: 0,
              top: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              bounce: 0.2,
            }}
            className="bg-background-light absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-md px-2 py-1 text-sm font-normal text-nowrap"
          >
            <motion.div>{text}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
