import { motion } from "motion/react";
import { useState } from "react";

export function AnimatedHeading({ heading }: { heading: string }) {
  const words = heading.split(" ");
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div
      className="mx-auto cursor-default pt-4 pb-4 text-center text-4xl font-extrabold sm:p-12"
      onMouseEnter={() => setAnimationKey((prev) => prev + 1)}
    >
      <h1 className="opacity-0 select-none">{heading}</h1>

      <div className="relative">
        <div className="absolute top-0 left-0 flex gap-x-2">
          {words.map((word, wIndex) => {
            const letters = word.split("");

            return (
              <div key={wIndex} className="flex">
                {letters.map((letter, lIndex) => {
                  let beforeWordsLength = 0;

                  words.forEach((word, index) => {
                    if (wIndex === 0) return;

                    if (index < wIndex) {
                      beforeWordsLength += word.length;
                    }
                  });

                  return (
                    <motion.div
                      key={`top-${animationKey}-${wIndex}-${lIndex}`}
                      className="top origin-top"
                      animate={{
                        transform: ["rotateX(0deg)", "rotateX(90deg)"],
                      }}
                      transition={{
                        delay: (beforeWordsLength + (lIndex + 1)) * 0.04,
                      }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 left-0 flex gap-x-2">
          {words.map((word, wIndex) => {
            const letters = word.split("");

            return (
              <div key={wIndex} className="flex">
                {letters.map((letter, lIndex) => {
                  let beforeWordsLength = 0;

                  words.forEach((word, index) => {
                    if (wIndex === 0) return;

                    if (index < wIndex) {
                      beforeWordsLength += word.length;
                    }
                  });

                  return (
                    <motion.div
                      key={`bottom-${animationKey}-${wIndex}-${lIndex}`}
                      className="bottom origin-bottom"
                      animate={{
                        transform: ["rotateX(90deg)", "rotateX(0deg)"],
                        filter: ["blur(3px)", "blur(1px)", "blur(0.2px)"],
                      }}
                      transition={{
                        delay: (beforeWordsLength + (lIndex + 1)) * 0.09,
                      }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
