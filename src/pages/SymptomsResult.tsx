import { useLocation, useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";

export default function SymptomsResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Receive evaluated diseases from state, or show default if accessed directly
  const diseases = location.state?.diseases || [
    {
      name: "General Assessment",
      confidence: 80,
      description: "No specific symptoms were passed. Please go back and select your symptoms for a precise live analysis.",
      advice: "Select your active symptoms from the checker tool."
    }
  ];

  const symptoms = location.state?.symptoms || [];

  return (
    <div>
      <h1 className="pageTitle">Analysis Results</h1>
      <p className="pageSubtitle">
        {symptoms.length > 0 
          ? `Analysis based on your selected symptoms: ${symptoms.join(", ")}` 
          : "Here is the preliminary assessment based on your symptoms"}
      </p>

      {/* Warning Notice */}
      <div style={{ 
        background: "var(--primary-tint)", 
        padding: "12px 16px", 
        borderRadius: "var(--radius-md)", 
        marginBottom: "20px",
        fontSize: "13px",
        color: "var(--primary)",
        fontFamily: "var(--font-display)",
        fontWeight: 500
      }}>
        ℹ️ This is an AI-generated preliminary suggestion, not a medical diagnosis.
      </div>

      {/* Disease Results List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        {diseases.map((disease: any, index: number) => (
          <Card key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>
                {disease.name}
              </h3>
              <span style={{ 
                background: "var(--primary)", 
                color: "white", 
                padding: "2px 10px", 
                borderRadius: "var(--radius-full)", 
                fontSize: "12px",
                fontWeight: 600
              }}>
                {disease.confidence}% Match
              </span>
            </div>

            <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginBottom: "12px", lineHeight: 1.5 }}>
              {disease.description}
            </p>

            <div style={{ background: "rgba(0,0,0,0.02)", padding: "10px 14px", borderRadius: "var(--radius-sm)" }}>
              <strong style={{ fontSize: "12.5px", color: "var(--ink)", display: "block", marginBottom: 4 }}>💡 Recommended Advice:</strong>
              <span style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{disease.advice}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryButton onClick={() => navigate("/hospitals")}>
          Find Nearby Hospitals
        </PrimaryButton>
        <PrimaryButton variant="outline" onClick={() => navigate("/symptoms")}>
          Check Different Symptoms
        </PrimaryButton>
      </div>
    </div>
  );
}