import { useMemo, useState } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import StatReadout from "@/components/StatReadout";
import "./Pages.css";
import "./AuthPages.css";

function getCategory(bmi: number): { label: string; tone: "primary" | "danger" | "warning" | "success"; color: string } {
  if (bmi < 18.5) return { label: "Underweight", tone: "primary", color: "var(--primary)" };
  if (bmi < 25) return { label: "Normal", tone: "success", color: "var(--success)" };
  if (bmi < 30) return { label: "Overweight", tone: "warning", color: "var(--warning)" };
  return { label: "Obese", tone: "danger", color: "var(--danger)" };
}

export default function BmiCalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [submitted, setSubmitted] = useState(false);

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return 0;
    return w / (h * h);
  }, [height, weight]);

  const category = getCategory(bmi);
  const gaugePercent = Math.min(100, (bmi / 40) * 100);

  return (
    <div>
      <h1 className="pageTitle">BMI Calculator</h1>
      <p className="pageSubtitle">Enter your height and weight</p>

      <Card style={{ maxWidth: 440 }}>
        <label className="authCard__label" style={{ marginTop: 0 }}>
          HEIGHT (CM)
        </label>
        <input className="authCard__input" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="numeric" />

        <label className="authCard__label">WEIGHT (KG)</label>
        <input className="authCard__input" value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="numeric" />

        <PrimaryButton style={{ marginTop: 16, width: "100%" }} onClick={() => setSubmitted(true)}>
          Calculate BMI
        </PrimaryButton>
      </Card>

      {submitted && bmi > 0 && (
        <Card style={{ marginTop: 16, maxWidth: 440 }}>
          <StatReadout label={category.label} value={bmi.toFixed(1)} tone={category.tone} size="lg" />

          <div style={{ width: "100%", height: 8, background: "var(--surface-sunken)", borderRadius: "var(--radius-full)", marginTop: 24, overflow: "hidden" }}>
            <div style={{ width: `${gaugePercent}%`, height: 8, background: category.color, borderRadius: "var(--radius-full)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--ink-muted)" }}>
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </Card>
      )}
    </div>
  );
}
