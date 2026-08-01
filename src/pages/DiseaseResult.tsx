import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import PrimaryButton from "@/components/PrimaryButton";
import StatReadout from "@/components/StatReadout";
import { predictDiseases } from "@/data";
import "./Pages.css";

export default function DiseaseResult() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const selected = useMemo(() => (params.get("symptoms") ? params.get("symptoms")!.split(",") : []), [params]);
  const results = useMemo(() => predictDiseases(selected), [selected]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--warning-tint)",
          color: "var(--warning)",
          padding: 10,
          borderRadius: "var(--radius-sm)",
          fontSize: 12.5,
        }}
      >
        ℹ️ This is an AI-generated preliminary suggestion, not a medical diagnosis.
      </div>

      {results.map((d, i) => (
        <Card key={d.name} style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17 }}>{d.name}</div>
            {i === 0 && (
              <span
                style={{
                  background: "var(--primary-tint)",
                  color: "var(--primary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 10.5,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                TOP MATCH
              </span>
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            <StatReadout label="Confidence" value={d.confidence} unit="%" size="sm" tone={i === 0 ? "primary" : "neutral"} />
            <div style={{ marginTop: 8 }}>
              <ProgressBar percent={d.confidence} color={i === 0 ? "var(--primary)" : "var(--ink-faint)"} />
            </div>
          </div>

          <p style={{ marginTop: 16 }}>{d.description}</p>

          <div
            style={{
              display: "flex",
              gap: 8,
              background: "var(--primary-tint)",
              padding: 10,
              borderRadius: "var(--radius-sm)",
              marginTop: 12,
              color: "var(--primary-dark)",
              fontSize: 13,
            }}
          >
            💡 {d.advice}
          </div>
        </Card>
      ))}

      <PrimaryButton style={{ marginTop: 24, width: "100%" }} onClick={() => navigate("/hospitals")}>
        Find Nearby Hospitals
      </PrimaryButton>
      <PrimaryButton variant="outline" style={{ marginTop: 8, width: "100%" }} onClick={() => navigate(-1)}>
        Check Different Symptoms
      </PrimaryButton>
    </div>
  );
}
