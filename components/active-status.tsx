import { cn } from "@/lib/cn";
import { Await, useLoaderData } from "@tanstack/react-router";
import { motion } from "motion/react";

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

  return (
    <motion.div
      title={status}
      className={cn(
        "relative flex h-2 w-2 items-center justify-center rounded-full bg-red-600",
        {
          "bg-green-600": isActive,
        },
      )}
    >
      {isActive && (
        <motion.div
          initial={{ width: 8, height: 8, opacity: 1 }}
          animate={{ width: 24, height: 24, opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            repeat: Infinity,
            delay: 1.6,
          }}
          className="absolute rounded-full bg-green-600/70"
        ></motion.div>
      )}
    </motion.div>
  );
}
