import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import StatReadout from "@/components/StatReadout";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuth } from "@/auth/AuthContext";
import "./Home.css";

const FEATURES = [
  { icon: "❤️‍🩹", title: "Symptom Checker", desc: "Select symptoms & get insights", to: "/symptom-checker" },
  { icon: "📍", title: "Nearby Hospitals", desc: "Find hospitals, clinics & labs", to: "/hospitals" },
  { icon: "⏰", title: "Medicine Reminder", desc: "Never miss a dose", to: "/reminders" },
  { icon: "📈", title: "Health Report", desc: "Track your vitals over time", to: "/health-report" },
  { icon: "⚖️", title: "BMI Calculator", desc: "Check your body mass index", to: "/bmi-calculator" },
];

export default function Home() {
  const navigate = useNavigate();
  const { gridColumns } = useResponsive();
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div>
      <h1 className="pageTitle">Good afternoon, {firstName}</h1>
      <p className="pageSubtitle">Here's your health snapshot for today</p>

      <Card style={{ marginTop: 20 }}>
        <div className="vitalsStrip">
          <StatReadout label="Heart Rate" value="73" unit="bpm" tone="danger" />
          <div className="vitalsStrip__divider" />
          <StatReadout label="SpO2" value="98" unit="%" tone="primary" />
          <div className="vitalsStrip__divider" />
          <StatReadout label="BMI" value="22.4" tone="success" />
          <div className="vitalsStrip__divider" />
          <StatReadout label="Blood Pressure" value="118/78" tone="neutral" />
        </div>
      </Card>

      <Card style={{ marginTop: 16, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }}>Not feeling well?</p>
          <p style={{ color: "#DDEEE8", fontSize: 13, marginTop: 4, maxWidth: 320 }}>
            Check your symptoms and get an instant AI-based prediction.
          </p>
        </div>
        <button className="bannerBtn" onClick={() => navigate("/symptom-checker")} aria-label="Go to symptom checker">
          →
        </button>
      </Card>

      <h2 className="sectionTitle">Quick Access</h2>

      <div className="featureGrid" style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
        {FEATURES.map((f) => (
          <button key={f.title} className="featureCard" onClick={() => navigate(f.to)}>
            <div className="featureCard__icon">{f.icon}</div>
            <div className="featureCard__title">{f.title}</div>
            <div className="featureCard__desc">{f.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}