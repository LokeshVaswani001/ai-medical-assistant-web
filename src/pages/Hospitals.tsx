import Card from "@/components/Card";
import { HOSPITALS } from "@/data";
import { useResponsive } from "@/hooks/useResponsive";
import "./Pages.css";

export default function Hospitals() {
  const { isDesktop } = useResponsive();

  return (
    <div>
      <h1 className="pageTitle">Nearby Hospitals</h1>
      <p className="pageSubtitle">Based on your current location</p>

      <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 12 }}>
        {HOSPITALS.map((h) => (
          <Card key={h.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 11, color: "var(--primary)", marginTop: 3, letterSpacing: 0.4 }}>
                  {h.type.toUpperCase()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, color: "var(--ink-muted)", fontSize: 12.5 }}>
                  📍 {h.address}
                </div>
              </div>
              <span
                style={{
                  background: "var(--primary-tint)",
                  color: "var(--primary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  whiteSpace: "nowrap",
                }}
              >
                {h.distanceKm} km
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
