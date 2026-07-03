// Maps scroll progress (0–1) to a color along the same green → indigo → amber → coral
// ramp used everywhere else in the site (timeline line, menu hover states).
const STOPS: { p: number; c: [number, number, number] }[] = [
  { p: 0, c: [31, 138, 95] }, // green
  { p: 0.33, c: [91, 91, 214] }, // indigo
  { p: 0.66, c: [201, 138, 0] }, // amber
  { p: 1, c: [224, 86, 124] }, // coral
];

export function lerpColor(progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p);
      const r = Math.round(a.c[0] + (b.c[0] - a.c[0]) * t);
      const g = Math.round(a.c[1] + (b.c[1] - a.c[1]) * t);
      const bl = Math.round(a.c[2] + (b.c[2] - a.c[2]) * t);
      return `rgb(${r}, ${g}, ${bl})`;
    }
  }
  const last = STOPS[STOPS.length - 1].c;
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}