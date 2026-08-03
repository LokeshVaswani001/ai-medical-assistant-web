import Card from "@/components/Card";
import StatReadout from "@/components/StatReadout";
import { VITALS } from "@/data";
import { useResponsive } from "@/hooks/useResponsive";
// @ts-ignore: CSS imports are handled by the build toolchain
import "./Pages.css";

export default function HealthReport() {
  const maxHR = Math.max(...VITALS.map((v) => v.heartRate));
  const { isDesktop } = useResponsive();

  const BarChart = ({ dataKey, color }: { dataKey: "heartRate" | "spo2"; color: string }) => {
    const max = dataKey === "heartRate" ? maxHR : 100;
    return (
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 120, paddingTop: 16 }}>
        {VITALS.map((v) => {
          const heightPercent = Math.max(12, (v[dataKey] / max) * 100);
          return (
            <div key={v.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div 
                style={{ 
                  width: 14, 
                  height: `${heightPercent}%`, 
                  background: color, 
                  borderRadius: "var(--radius-full, 9999px)",
                  boxShadow: `0 0 12px ${color}40`,
                  transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }} 
              />
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-muted)", fontSize: 11, fontWeight: 500 }}>
                {v.day}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-lg, 20px)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.5px" }}>
        Weekly Summary
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 12 }}>
        <Card>
          <StatReadout label="Heart Rate" value="73" unit="bpm" tone="danger" size="sm" />
        </Card>
        <Card>
          <StatReadout label="SpO2" value="98" unit="%" tone="primary" size="sm" />
        </Card>
        <Card>
          <StatReadout label="Temperature" value="98.4" unit="°F" tone="warning" size="sm" />
        </Card>
        <Card>
          <StatReadout label="Blood Pressure" value="118/78" tone="neutral" size="sm" />
        </Card>
      </div>

      <Card>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 12 }}>
          Heart Rate (bpm) — Last 7 days
        </div>
        <BarChart dataKey="heartRate" color="var(--primary)" />
      </Card>

      <Card>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 12 }}>
          SpO2 (%) — Last 7 days
        </div>
        <BarChart dataKey="spo2" color="var(--accent, var(--primary-dark))" />
      </Card>
    </div>
  );
}