import { useState, useEffect } from "react";
import PrimaryButton from "@/components/PrimaryButton";
// @ts-ignore
import "./Pages.css";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

const INITIAL_MEDICINES: Medicine[] = [
  { id: "1", name: "Paracetamol", dosage: "500mg", time: "09:00 AM", taken: false },
  { id: "2", name: "Vitamin D3", dosage: "1000 IU", time: "02:00 PM", taken: true },
  { id: "3", name: "Amoxicillin", dosage: "250mg", time: "08:00 PM", taken: false }
];

export default function Reminders() {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem("med_reminders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing local storage", e);
      }
    }
    return INITIAL_MEDICINES;
  });

  const [filter, setFilter] = useState<"all" | "pending" | "taken">("all");

  useEffect(() => {
    localStorage.setItem("med_reminders", JSON.stringify(medicines));
  }, [medicines]);

  const toggleTaken = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  const handleDelete = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMedicine = () => {
    const name = prompt("Enter medicine name:");
    if (!name) return;
    const dosage = prompt("Enter dosage (e.g., 500mg):") || "1 tablet";
    const time = prompt("Enter time (e.g., 08:00 AM):") || "10:00 AM";

    const newMed: Medicine = {
      id: Date.now().toString(),
      name,
      dosage,
      time,
      taken: false,
    };

    setMedicines((prev) => [...prev, newMed]);
  };

  const takenCount = medicines.filter((m) => m.taken).length;
  const pendingCount = medicines.length - takenCount;
  const progressPercent = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 0;

  const filteredMedicines = medicines.filter((m) => {
    if (filter === "pending") return !m.taken;
    if (filter === "taken") return m.taken;
    return true;
  });

  return (
    <div style={{ animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", paddingBottom: "40px" }}>
      {/* Header & Add Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Medicine Reminder
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            Track your daily doses & stay healthy <span style={{ color: "var(--primary)", fontWeight: 600 }}>(LocalStorage Synced)</span>
          </p>
        </div>
        <PrimaryButton onClick={handleAddMedicine} style={{ padding: "10px 18px", fontSize: "13.5px", borderRadius: "var(--radius-full)", boxShadow: "0 4px 14px rgba(43, 110, 94, 0.2)" }}>
          + Add Medicine
        </PrimaryButton>
      </div>

      {/* Stats Cards Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-md, 12px)", padding: "14px", textAlign: "center", boxShadow: "0 4px 12px rgba(22, 36, 31, 0.02)" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{medicines.length}</div>
          <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>Total Doses</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-md, 12px)", padding: "14px", textAlign: "center", boxShadow: "0 4px 12px rgba(22, 36, 31, 0.02)" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--warning)", fontFamily: "var(--font-display)" }}>{pendingCount}</div>
          <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>Pending</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-md, 12px)", padding: "14px", textAlign: "center", boxShadow: "0 4px 12px rgba(22, 36, 31, 0.02)" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--success)", fontFamily: "var(--font-display)" }}>{takenCount}</div>
          <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>Taken</div>
        </div>
      </div>

      {/* Progress Bar Card */}
      {medicines.length > 0 && (
        <div style={{
          background: "linear-gradient(135deg, var(--surface) 0%, rgba(240, 238, 232, 0.8) 100%)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-lg, 16px)",
          padding: "16px 20px",
          marginBottom: "20px",
          boxShadow: "0 4px 16px rgba(22, 36, 31, 0.03)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", fontSize: "13px", fontFamily: "var(--font-display)", fontWeight: 600 }}>
            <span style={{ color: "var(--ink)" }}>Daily Completion Rate</span>
            <span style={{ color: "var(--primary)" }}>{progressPercent}% Done</span>
          </div>
          <div style={{ width: "100%", height: "8px", background: "var(--border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "linear-gradient(90deg, var(--primary), var(--primary-dark))", transition: "width 0.4s ease", borderRadius: "var(--radius-full)" }} />
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(["all", "pending", "taken"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "1.5px solid",
              borderColor: filter === tab ? "var(--primary)" : "var(--border)",
              background: filter === tab ? "var(--primary-tint)" : "var(--surface)",
              color: filter === tab ? "var(--primary)" : "var(--ink-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "12px",
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.2s ease"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Medicines List Stack */}
      {filteredMedicines.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "var(--ink-muted)", 
          fontFamily: "var(--font-display)", 
          fontSize: "14px",
          background: "linear-gradient(135deg, var(--surface) 0%, rgba(240, 238, 232, 0.5) 100%)",
          borderRadius: "var(--radius-lg, 18px)",
          border: "1.5px solid var(--border)"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>💊</div>
          No reminders found in this category.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
          {filteredMedicines.map((m) => (
            <div
              key={m.id}
              style={{
                background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.75) 100%)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-lg, 18px)",
                padding: "18px 22px",
                boxShadow: "0 6px 20px rgba(22, 36, 31, 0.03)",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: m.taken ? 0.75 : 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(43, 110, 94, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 36, 31, 0.03)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md, 14px)",
                      background: m.taken ? "var(--success-tint)" : "var(--primary-tint)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(43, 110, 94, 0.08)"
                    }}
                  >
                    💊
                  </div>
                  <div>
                    <div style={{ 
                      fontFamily: "var(--font-display)", 
                      fontWeight: 700, 
                      fontSize: "16px", 
                      color: "var(--ink)",
                      textDecoration: m.taken ? "line-through" : "none",
                      letterSpacing: "-0.2px"
                    }}>
                      {m.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, color: "var(--ink-muted)", fontSize: "13.5px" }}>
                      <span style={{ fontWeight: 600, color: "var(--primary)", background: "var(--primary-tint)", padding: "1px 8px", borderRadius: "6px" }}>{m.dosage}</span>
                      <span>·</span>
                      <span>⏰ {m.time}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => toggleTaken(m.id)}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "12.5px",
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      background: m.taken ? "var(--success-tint)" : "var(--warning-tint)",
                      color: m.taken ? "var(--success)" : "var(--warning)",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                  >
                    {m.taken ? "✓ Taken" : "Pending"}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    title="Delete Reminder"
                    style={{
                      border: "none",
                      background: "rgba(220, 53, 69, 0.08)",
                      color: "#dc3545",
                      cursor: "pointer",
                      width: 34,
                      height: 34,
                      borderRadius: "var(--radius-full)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#dc3545";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(220, 53, 69, 0.08)";
                      e.currentTarget.style.color = "#dc3545";
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}