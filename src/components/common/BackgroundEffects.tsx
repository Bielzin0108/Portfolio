const particles = [
  ["12%", "24%", "6s"],
  ["22%", "64%", "8s"],
  ["34%", "18%", "7s"],
  ["47%", "76%", "9s"],
  ["58%", "32%", "6.5s"],
  ["68%", "58%", "8.5s"],
  ["79%", "22%", "7.5s"],
  ["88%", "68%", "9.5s"]
] as const;

export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 cyber-grid animate-grid-pan" />
      <div className="absolute inset-0 noise-layer" />
      <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-lusa-red/16 blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-72 w-72 rounded-full bg-primary/14 blur-3xl" />
      <div className="absolute bottom-[7%] left-[36%] h-56 w-56 rounded-full bg-ice/8 blur-3xl" />
      {particles.map(([left, top, duration]) => (
        <span
          key={`${left}-${top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/50 shadow-[0_0_16px_rgba(45,242,140,0.75)]"
          style={{ left, top, animation: `float ${duration} ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}
