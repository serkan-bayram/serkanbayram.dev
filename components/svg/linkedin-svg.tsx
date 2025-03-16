export type Svg = {
  width: number;
  height: number;
};

export function LinkedinSvg({ width, height }: Svg) {
  return (
    <img loading="lazy" src="/linkedin.svg" width={width} height={height} />
  );
}
