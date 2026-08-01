import "./StatReadout.css";

const TONE_VARS: Record<string, string> = {
  primary: "var(--primary)",
  danger: "var(--danger)",
  warning: "var(--warning)",
  success: "var(--success)",
  neutral: "var(--ink)",
};

export default function StatReadout({
  value,
  unit,
  label,
  tone = "primary",
  size = "md",
}: {
  value: string | number;
  unit?: string;
  label: string;
  tone?: "primary" | "danger" | "warning" | "success" | "neutral";
  size?: "sm" | "md" | "lg";
}) {
  const color = TONE_VARS[tone];
  return (
    <div className="readout">
      <div className="readout__tick" style={{ background: color }} />
      <div>
        <div className="readout__valueRow">
          <span className={`readout__value readout__value--${size}`} style={{ color }}>
            {value}
          </span>
          {unit && (
            <span className="readout__unit" style={{ color }}>
              {" "}
              {unit}
            </span>
          )}
        </div>
        <div className="readout__label">{label.toUpperCase()}</div>
      </div>
    </div>
  );
}
