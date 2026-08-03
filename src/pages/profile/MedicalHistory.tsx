import { useState, useEffect } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "../Pages.css";

export default function MedicalHistory() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const [allergies, setAllergies] = useState("None recorded");
  const [conditions, setConditions] = useState("None");
  const [treatments, setTreatments] = useState("Routine health checkups");

  useEffect(() => {
    if (user?.email) {
      const savedData = localStorage.getItem(`medical_history_${user.email}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setAllergies(parsed.allergies || "None recorded");
        setConditions(parsed.conditions || "None");
        setTreatments(parsed.treatments || "Routine health checkups");
      }
    }
  }, [user?.email]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.email) {
      const dataToSave = { allergies, conditions, treatments };
      localStorage.setItem(`medical_history_${user.email}`, JSON.stringify(dataToSave));
    }
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to reset your medical history records?")) {
      setAllergies("None recorded");
      setConditions("None");
      setTreatments("Routine health checkups");
      if (user?.email) {
        localStorage.removeItem(`medical_history_${user.email}`);
      }
      setIsEditing(false);
    }
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", paddingBottom: "50px", animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Medical History 📋
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            Review and securely manage your clinical records, allergies, and ongoing treatments.
          </p>
        </div>

        {!isEditing && (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "9px 18px",
                borderRadius: "12px",
                border: "1.5px solid var(--primary)",
                background: "var(--surface)",
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 2px 8px rgba(43, 110, 94, 0.04)",
                fontFamily: "var(--font-display)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--surface)";
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ✏️ Edit Records
            </button>

            {/* Reset Button */}
            <button
              onClick={handleDelete}
              style={{
                padding: "9px 18px",
                borderRadius: "12px",
                border: "1.5px solid #d93025",
                background: "var(--surface)",
                color: "#d93025",
                fontWeight: 600,
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 2px 8px rgba(217, 48, 37, 0.04)",
                fontFamily: "var(--font-display)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d93025";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--surface)";
                e.currentTarget.style.color = "#d93025";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🗑️ Reset
            </button>
          </div>
        )}
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div style={{ 
          background: "rgba(43, 110, 94, 0.1)", 
          border: "1.5px solid var(--primary)", 
          padding: "14px 18px", 
          borderRadius: "var(--radius-md, 14px)", 
          marginBottom: "20px", 
          color: "var(--primary)", 
          fontFamily: "var(--font-display)", 
          fontWeight: 600,
          fontSize: "13.5px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          animation: "fadeInUp 0.3s ease forwards"
        }}>
          <span>✅</span> Your medical history has been successfully updated and saved securely!
        </div>
      )}

      {/* Main Card Container */}
      <Card style={{ padding: "28px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)" }}>
        {!isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Allergies Card Item */}
            <div 
              style={{ padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px" }}>⚠️</span>
                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Allergies</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: "15.5px", color: "var(--ink)", fontFamily: "var(--font-display)", paddingLeft: "24px" }}>
                {allergies}
              </div>
            </div>

            {/* Chronic Conditions Card Item */}
            <div 
              style={{ padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px" }}>🩺</span>
                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Chronic Conditions</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: "15.5px", color: "var(--ink)", fontFamily: "var(--font-display)", paddingLeft: "24px" }}>
                {conditions}
              </div>
            </div>

            {/* Previous Treatments Card Item */}
            <div 
              style={{ padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px" }}>💊</span>
                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Previous Treatments</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: "15.5px", color: "var(--ink)", fontFamily: "var(--font-display)", paddingLeft: "24px" }}>
                {treatments}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                ⚠️ Allergies
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                🩺 Chronic Conditions
              </label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 700, fontSize: "12px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                💊 Previous Treatments
              </label>
              <input
                type="text"
                value={treatments}
                onChange={(e) => setTreatments(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
              <PrimaryButton variant="outline" type="button" onClick={() => setIsEditing(false)} style={{ padding: "12px 20px", fontSize: "14px", borderRadius: "12px" }}>
                Cancel
              </PrimaryButton>
              <PrimaryButton variant="primary" type="submit" style={{ padding: "12px 24px", fontSize: "14px", borderRadius: "12px", boxShadow: "0 6px 20px rgba(43, 110, 94, 0.2)" }}>
                Save Changes
              </PrimaryButton>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}