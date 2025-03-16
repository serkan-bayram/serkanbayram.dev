import { Svg } from "./linkedin-svg";

export function GithubSvg({ width, height }: Svg) {
  return (
    <img
      alt="Github Icon"
      loading="lazy"
      src="/github.svg"
      width={width}
      height={height}
    />
  );
}
