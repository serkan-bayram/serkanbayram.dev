export type Svg = {
  width: number;
  height: number;
};

export function LinkedinSvg({ width, height }: Svg) {
  return (
    <img
      alt="LinkedIn Icon"
      loading="lazy"
      src="/linkedin.svg"
      width={width}
      height={height}
    />
  );
}
