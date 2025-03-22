import { motion } from "motion/react";
import { useState } from "react";

export function AnimatedHeading({ heading }: { heading: string }) {
  const words = heading.split(" ");
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div
      className="flex min-h-20 w-full cursor-default items-center justify-center text-center text-4xl font-extrabold"
      onClick={() => setAnimationKey((prev) => prev + 1)}
      onMouseEnter={() => setAnimationKey((prev) => prev + 1)}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute flex gap-x-2">
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
                        transform: [
                          "translateY(0px) rotateX(0deg)",
                          "translateY(-10px) rotateX(90deg)",
                        ],
                        filter: [
                          "blur(0px) brightness(1)",
                          "blur(1px)",
                          "blur(3px) brightness(0)",
                        ],
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

        <div className="absolute flex gap-x-2">
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
                        filter: [
                          "blur(3px) brightness(0)",
                          "blur(1px)",
                          "blur(0.2px) brightness(1)",
                        ],
                      }}
                      transition={{
                        delay: (beforeWordsLength + (lIndex + 1)) * 0.05,
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
