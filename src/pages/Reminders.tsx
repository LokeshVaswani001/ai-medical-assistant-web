import { useState } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { MEDICINES, Medicine } from "@/data";
import "./Pages.css";

export default function Reminders() {
  const [medicines, setMedicines] = useState<Medicine[]>(MEDICINES);

  const toggleTaken = (id: string) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  return (
    <div>
      <h1 className="pageTitle">Medicine Reminder</h1>
      <p className="pageSubtitle">Today's schedule</p>

      {medicines.map((m) => (
        <Card key={m.id} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "var(--radius-md)",
                  background: m.taken ? "var(--success-tint)" : "var(--primary-tint)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                💊
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                <div style={{ color: "var(--ink-muted)", fontSize: 12.5, marginTop: 2 }}>
                  {m.dosage} · {m.time}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTaken(m.id)}
              style={{
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: "var(--radius-full)",
                background: m.taken ? "var(--success-tint)" : "var(--warning-tint)",
                color: m.taken ? "var(--success)" : "var(--warning)",
              }}
            >
              {m.taken ? "Taken" : "Pending"}
            </button>
          </div>
        </Card>
      ))}

      <PrimaryButton variant="outline" onClick={() => {}}>
        + Add Medicine
      </PrimaryButton>
    </div>
  );
}
