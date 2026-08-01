import Card from "@/components/Card";
import StatReadout from "@/components/StatReadout";
import { VITALS } from "@/data";
import { useResponsive } from "@/hooks/useResponsive";
import "./Pages.css";

export default function HealthReport() {
  const maxHR = Math.max(...VITALS.map((v) => v.heartRate));
  const { isDesktop } = useResponsive();

  const BarChart = ({ dataKey, color }: { dataKey: "heartRate" | "spo2"; color: string }) => {
    const max = dataKey === "heartRate" ? maxHR : 100;
    return (
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 120 }}>
        {VITALS.map((v) => (
          <div key={v.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 14, height: (v[dataKey] / max) * 100, background: color, borderRadius: 8 }} />
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-muted)", fontSize: 10, marginTop: 6 }}>{v.day}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Weekly Summary</h2>

      <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 8 }}>
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

      <Card style={{ marginTop: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
          Heart Rate (bpm) — Last 7 days
        </div>
        <BarChart dataKey="heartRate" color="var(--primary)" />
      </Card>

      <Card style={{ marginTop: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>SpO2 (%) — Last 7 days</div>
        <BarChart dataKey="spo2" color="var(--accent)" />
      </Card>
    </div>
  );
}
