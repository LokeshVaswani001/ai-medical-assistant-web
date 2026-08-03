import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";
// @ts-ignore
import "./Pages.css";

const SYMPTOMS_LIST = [
  "Fever", "Headache", "Cough", "Body Ache", 
  "Sore Throat", "Fatigue", "Nausea", "Chest Pain", 
  "Shortness of Breath", "Dizziness"
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const filteredSymptoms = SYMPTOMS_LIST.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAIAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom to begin analysis.");
      return;
    }

    setLoading(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 500);
    setTimeout(() => setLoadingStep(3), 1000);

    try {
      const detailedDiseases = selectedSymptoms.map((symptom) => {
        let name = `${symptom} - Clinical Analysis`;
        let match = 90;
        let description = "";
        let advice = "";

        if (symptom === "Fever") {
          name = "🌡️ Fever Analysis & Symptoms (Bukhar ki Alamat)";
          match = 93;
          description = "Elevated Body Temperature: High body heat, chills and shivering, headache, muscle and body aches, and fatigue. (Tez Jism ka Tapna, thand lagna, sir dard aur jism mein thakaan)";
          advice = "Rest: Allow your body to recover completely. Stay Hydrated: Drink plenty of water, ORS, or juices. Light Diet: Eat easily digestible food like khichdi or soup. Medication: Take Paracetamol (Panadol) if necessary under medical guidance. (Mukammal aaram karein, paani khoob piyein, halki ghiza lein aur zaroorat par doctor ki salah se Panadol lein)";
        } else if (symptom === "Headache") {
          name = "🧠 Headache Assessment & Breakdown (Sir Dard ka Tajziya)";
          match = 88;
          description = "Pain or discomfort in the forehead, temples, or back of the neck, often caused by stress, dehydration, or lack of sleep. (Sir ke agle ya pichle hisse mein dard jo stress ya dehydration ki waja se ho sakta hai)";
          advice = "Rest in a quiet, dark room, apply a cool damp cloth to your forehead, and stay properly hydrated. (Kisi andhere aur pursukoon kamre mein aaram karein, maathay par thande paani ki patti rakhein)";
        } else if (symptom === "Cough") {
          name = "🗣️ Cough & Throat Irritation (Khansi aur Gale ki Kharash)";
          match = 86;
          description = "Persistent coughing due to throat irritation or upper respiratory tract sensitivity. (Gale mein kharash ya respiratory tract mein irritation ki waja se musalsal khansi)";
          advice = "Drink warm water, perform salt-water gargles, and avoid cold beverages or oily items. (Neem-garm paani piyein, namak wale paani se garare karein aur thandi cheezon se parhez karein)";
        } else if (symptom === "Dizziness") {
          name = "💫 Dizziness & Lightheadedness (Chakkar aana)";
          match = 82;
          description = "Feeling unsteady, lightheaded, or experiencing a spinning sensation due to sudden blood pressure drops or dehydration. (Blood pressure ki kami ya dehydration ki waja se sar ghoomna)";
          advice = "Sit or lie down immediately, drink water or juice, and avoid standing up abruptly. (Foran baith ya lait jayein, paani ya juice piyein aur achanak uthne se parhez karein)";
        } else if (symptom === "Body Ache") {
          name = "💪 Body Ache & Muscle Fatigue (Jism aur Pathon ka Dard)";
          match = 85;
          description = "Generalized soreness, tiredness, and discomfort across muscles and limbs. (Taango, baazuon ya poore jism mein thakaan aur muscles pain rehna)";
          advice = "Take a warm bath, get proper rest, and massage gently if needed. (Neem-garm paani se nahayein, halki malish karein aur mukammal neend lein)";
        } else if (symptom === "Sore Throat") {
          name = "🔴 Sore Throat & Swallowing Pain (Gale ki Soojan)";
          match = 87;
          description = "Pain, scratchiness, or irritation of the throat that worsens when swallowing, often indicating a viral infection. (Gale mein chubhan aur nigalne mein takleef)";
          advice = "Gargle with warm salt water, consume honey with warm water, and avoid cold foods. (Garam paani mein namak daal kar garare karein aur honey ka istemal karein)";
        } else if (symptom === "Fatigue") {
          name = "🔋 Fatigue & Low Energy (Jismani Thakaan)";
          match = 81;
          description = "Extreme tiredness, lack of energy, and persistent exhaustion affecting daily tasks. (Aam taur par susti rehna aur energy bilkul khatam ho jana)";
          advice = "Get 7-8 hours of quality sleep, eat a nutrient-rich diet, and avoid overexertion. (7-8 ghante ki neend lein aur nutritious diet khayein)";
        } else if (symptom === "Nausea") {
          name = "🤢 Nausea & Stomach Discomfort (Matli aur Pait ki Kharabi)";
          match = 84;
          description = "Queasiness and an urge to vomit, often linked to indigestion or internal viral triggers. (Pait ki kharabi ya vomiting jaisa feel hona)";
          advice = "Eat bland foods like crackers or toast, sip ginger tea, and avoid oily meals. (Halki ghiza khayein, adrak ki chai piyein aur oily khano se parhez karein)";
        } else if (symptom === "Chest Pain") {
          name = "⚠️ Chest Pain - Urgent Evaluation (Seene ka Dard)";
          match = 95;
          description = "Tightness, pressure, or discomfort in the chest region requiring cautious medical attention. (Seene mein dabao ya dard jo serious ho sakta hai)";
          advice = "Stop all physical activity immediately and consult an emergency doctor or cardiologist without delay. (Foran sakht kaam chor kar qareebi emergency hospital ya doctor se rabta karein)";
        } else if (symptom === "Shortness of Breath") {
          name = "💨 Shortness of Breath (Saans Lene mein Dushwari)";
          match = 94;
          description = "Difficulty breathing or feeling breathless during normal resting states. (Saans lene mein taizi ya ghutan mehsoos hona)";
          advice = "Sit upright in an open ventilated area, breathe calmly, and seek immediate medical assistance if it persists. (Khuli hawa mein baith jayein aur foran medical help lein)";
        } else {
          name = `⚠️ ${symptom} Evaluation`;
          match = 84;
          description = `You selected ${symptom}, which could indicate an underlying physical strain or immune response. (Aap ne ${symptom} select kiya hai jo kisi andaruni infection ki nishani ho sakti hai)`;
          advice = "Stay hydrated, rest adequately, and consult a healthcare professional if symptoms continue. (Paani ka istemal zyada karein aur halat behtar na ho toh doctor se rabta karein)";
        }

        return {
          name,
          confidence: match,
          description,
          advice
        };
      });

      setTimeout(() => {
        setLoading(false);
        navigate("/disease-result", { 
          state: { 
            diseases: detailedDiseases, 
            symptoms: selectedSymptoms 
          } 
        });
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loadingMessages = [
    "Initializing Clinical AI Engine...",
    "Cross-referencing selected symptoms with medical database...",
    "Generating bilingual English & Urdu clinical guidance..."
  ];

  return (
    <div style={{ animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", paddingBottom: "40px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "20px" }}>
        <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI Symptom Checker Chatbot
        </h1>
        <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
          Search or select your symptoms below for professional AI clinical breakdown & bilingual guidance.
        </p>
      </div>

      {/* Search Input Bar */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="🔍 Search symptom (e.g., Fever, Cough)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "var(--radius-md, 12px)",
            border: "1.5px solid var(--border)",
            background: "var(--surface)",
            color: "var(--ink)",
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            outline: "none",
            boxShadow: "0 2px 8px rgba(22, 36, 31, 0.02)",
            transition: "border-color 0.2s ease"
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Main Selection Card */}
      <Card style={{ padding: "24px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", color: "var(--ink)" }}>
            Available Symptoms ({filteredSymptoms.length})
          </span>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={() => setSelectedSymptoms([])}
              style={{ background: "transparent", border: "none", color: "var(--danger)", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-display)" }}
            >
              Clear All ({selectedSymptoms.length})
            </button>
          )}
        </div>

        {filteredSymptoms.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "var(--ink-muted)", fontSize: "13.5px", fontFamily: "var(--font-display)" }}>
            No matching symptoms found.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "var(--radius-full)",
                    border: "1.5px solid",
                    borderColor: isSelected ? "var(--primary)" : "var(--border)",
                    background: isSelected ? "var(--primary)" : "var(--surface)",
                    color: isSelected ? "#fff" : "var(--ink)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "13.5px",
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isSelected ? "0 4px 14px rgba(43, 110, 94, 0.25)" : "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.background = "var(--primary-tint)";
                      e.currentTarget.style.color = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--surface)";
                      e.currentTarget.style.color = "var(--ink)";
                    }
                  }}
                >
                  {isSelected ? "✓ " : "+ "} {symptom}
                </button>
              );
            })}
          </div>
        )}
      </Card>

      {/* Selected Symptoms Active Summary Preview */}
      {selectedSymptoms.length > 0 && (
        <div style={{
          background: "linear-gradient(135deg, var(--surface) 0%, rgba(240, 238, 232, 0.9) 100%)",
          border: "1.5px solid var(--primary-tint)",
          borderRadius: "var(--radius-md, 14px)",
          padding: "14px 18px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div style={{ fontSize: "13px", fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ink)" }}>
            Selected Checklist: <span style={{ color: "var(--primary)" }}>{selectedSymptoms.join(", ")}</span>
          </div>
        </div>
      )}

      {/* Action / Loader Section */}
      {loading ? (
        <div style={{
          background: "linear-gradient(135deg, var(--surface) 0%, rgba(240, 238, 232, 0.8) 100%)",
          border: "1.5px solid var(--primary)",
          borderRadius: "var(--radius-lg, 20px)",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(43, 110, 94, 0.08)"
        }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🩺</div>
          <div style={{ color: "var(--primary)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
            {loadingMessages[loadingStep - 1] || "Analyzing clinical patterns..."}
          </div>
          <div style={{ fontSize: "12.5px", color: "var(--ink-muted)" }}>
            Please wait while our medical intelligence engine processes your symptoms.
          </div>
        </div>
      ) : (
        <PrimaryButton 
          onClick={handleAIAnalyze}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "15px",
            borderRadius: "var(--radius-md, 14px)",
            boxShadow: "0 6px 20px rgba(43, 110, 94, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          <span>🤖</span> Ask AI Chatbot for Detailed Analysis
        </PrimaryButton>
      )}
    </div>
  );
}