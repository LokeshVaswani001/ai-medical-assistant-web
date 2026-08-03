import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import StatReadout from "@/components/StatReadout";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
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
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  // Dynamic time-based greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div 
      style={{ 
        position: "relative",
        minHeight: "100vh",
        padding: "10px 20px 40px 20px",
        overflow: "hidden",
        animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" 
      }}
    >
      {/* 3D Animated Background Glow & Depth Elements */}
      <div 
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(43, 110, 94, 0.15) 0%, rgba(43, 110, 94, 0) 70%)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
          animation: "floatOrb 8s ease-in-out infinite alternate"
        }}
      />
      <div 
        style={{
          position: "absolute",
          top: "40%",
          right: "-80px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(74, 144, 226, 0.12) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
          animation: "floatOrbReverse 10s ease-in-out infinite alternate"
        }}
      />

      {/* Main Content Wrapper (Above 3D Background) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header Section with Dynamic Greeting */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <div>
            <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {greeting}, {firstName} 👋
            </h1>
            <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
              Here is your live health snapshot and clinical command center for today.
            </p>
          </div>
          <div style={{ 
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            padding: "8px 14px", 
            borderRadius: "var(--radius-full)", 
            fontSize: "12.5px", 
            fontFamily: "var(--font-display)", 
            fontWeight: 700, 
            color: "var(--primary)",
            border: "1px solid rgba(43, 110, 94, 0.15)",
            boxShadow: "0 4px 12px rgba(43, 110, 94, 0.06)"
          }}>
            🟢 System Status: Active
          </div>
        </div>

        {/* Vitals Summary Strip Card */}
        <Card style={{ padding: "20px 24px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 12px 35px rgba(22, 36, 31, 0.04)", background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)" }}>
          <div className="vitalsStrip" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <StatReadout label="Heart Rate" value="73" unit="bpm" tone="danger" />
            <div className="vitalsStrip__divider" style={{ width: "1px", height: "35px", background: "var(--border)" }} />
            <StatReadout label="SpO2" value="98" unit="%" tone="primary" />
            <div className="vitalsStrip__divider" style={{ width: "1px", height: "35px", background: "var(--border)" }} />
            <StatReadout label="BMI" value="22.4" tone="success" />
            <div className="vitalsStrip__divider" style={{ width: "1px", height: "35px", background: "var(--border)" }} />
            <StatReadout label="Blood Pressure" value="118/78" tone="neutral" />
          </div>
        </Card>

        {/* Interactive AI Symptom Checker Banner */}
        <div 
          onClick={() => navigate("/symptom-checker")}
          style={{ 
            marginTop: "20px", 
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)", 
            borderRadius: "var(--radius-lg, 20px)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            padding: "24px 28px",
            boxShadow: "0 14px 40px rgba(43, 110, 94, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 18px 45px rgba(43, 110, 94, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(43, 110, 94, 0.3)";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ fontSize: "36px", background: "rgba(255,255,255,0.15)", width: "60px", height: "60px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              🤖
            </div>
            <div>
              <p style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.3px" }}>
                Not feeling well today?
              </p>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "13.5px", marginTop: "4px", maxWidth: "380px", lineHeight: "1.5" }}>
                Launch our AI Symptom Checker for an instant clinical breakdown and bilingual guidance.
              </p>
            </div>
          </div>
          <button 
            className="bannerBtn" 
            onClick={(e) => {
              e.stopPropagation();
              navigate("/symptom-checker");
            }} 
            aria-label="Go to symptom checker"
            style={{ 
              background: "#fff", 
              color: "var(--primary)", 
              border: "none", 
              borderRadius: "50%", 
              width: "48px", 
              height: "48px", 
              cursor: "pointer", 
              fontSize: "20px", 
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            →
          </button>
        </div>

        {/* Quick Access Grid Section */}
        <div style={{ marginTop: "28px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="sectionTitle" style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
            Quick Access Hub
          </h2>
          <span style={{ fontSize: "12.5px", color: "var(--ink-muted)", fontFamily: "var(--font-display)" }}>
            {FEATURES.length} Modules Available
          </span>
        </div>

        <div className="featureGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px" }}>
          {FEATURES.map((f) => (
            <button 
              key={f.title} 
              className="featureCard" 
              onClick={() => navigate(f.to)}
              style={{ 
                background: "rgba(255, 255, 255, 0.85)", 
                backdropFilter: "blur(12px)",
                border: "1.5px solid var(--border, #eaeaea)", 
                padding: "20px", 
                borderRadius: "var(--radius-lg, 18px)", 
                textAlign: "left", 
                cursor: "pointer", 
                display: "flex", 
                flexDirection: "column", 
                gap: "10px",
                boxShadow: "0 6px 20px rgba(22, 36, 31, 0.03)",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(43, 110, 94, 0.1)";
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, var(--primary-tint) 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border, #eaeaea)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 36, 31, 0.03)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
              }}
            >
              <div className="featureCard__icon" style={{ 
                fontSize: "24px", 
                background: "var(--primary-tint)", 
                width: "44px", 
                height: "44px", 
                borderRadius: "12px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}>
                {f.icon}
              </div>
              <div className="featureCard__title" style={{ fontWeight: 700, fontSize: "15px", color: "var(--ink, #333)", fontFamily: "var(--font-display)" }}>
                {f.title}
              </div>
              <div className="featureCard__desc" style={{ fontSize: "12.5px", color: "var(--ink-muted, #666)", lineHeight: "1.4" }}>
                {f.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CSS Keyframes for 3D Floating Orbs (Aap ise apne Home.css mein bhi dal sakti hain) */}
      <style>{`
        @keyframes floatOrb {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(30px) scale(1.08); }
        }
        @keyframes floatOrbReverse {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-35px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}