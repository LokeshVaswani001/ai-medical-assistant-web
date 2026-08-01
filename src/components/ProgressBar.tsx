export default function ProgressBar({
  percent,
  color = "var(--primary)",
  height = 8,
}: {
  percent: number;
  color?: string;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div style={{ width: "100%", height, background: "var(--surface-sunken)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
      <div style={{ width: `${clamped}%`, height, background: color, borderRadius: "var(--radius-full)", transition: "width 0.3s ease" }} />
    </div>
  );
}
