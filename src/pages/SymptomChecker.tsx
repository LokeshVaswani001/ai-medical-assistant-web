import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SymptomChip from "@/components/SymptomChip";
import PrimaryButton from "@/components/PrimaryButton";
import { SYMPTOMS } from "@/data";
import "./Pages.css";

export default function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  return (
    <div>
      <h1 className="pageTitle">Symptom Checker</h1>
      <p className="pageSubtitle">Select all symptoms you're currently experiencing</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {SYMPTOMS.map((s) => (
          <SymptomChip key={s.id} label={s.label} selected={selected.includes(s.id)} onToggle={() => toggle(s.id)} />
        ))}
      </div>

      <p style={{ color: "var(--ink-muted)", fontSize: 12.5, marginTop: 8 }}>{selected.length} symptom(s) selected</p>

      <PrimaryButton
        disabled={selected.length === 0}
        style={{ marginTop: 24 }}
        onClick={() => navigate(`/disease-result?symptoms=${selected.join(",")}`)}
      >
        Analyze Symptoms
      </PrimaryButton>
    </div>
  );
}
