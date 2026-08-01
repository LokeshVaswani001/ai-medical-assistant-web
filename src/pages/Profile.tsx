import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import { useAuth } from "@/auth/AuthContext";
import "./Pages.css";

const MENU = [
  { icon: "👤", label: "Personal Information" },
  { icon: "📄", label: "Medical History" },
  { icon: "🔔", label: "Notification Settings" },
  { icon: "🛡️", label: "Privacy & Security" },
  { icon: "❓", label: "Help & Support" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "var(--primary)",
            color: "#fff",
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          👤
        </div>
        <h2 style={{ marginTop: 12 }}>{user?.name ?? "Guest"}</h2>
        <p style={{ color: "var(--ink-muted)", fontSize: 12.5, marginTop: 2 }}>{user?.email ?? ""}</p>
      </div>

      <Card style={{ marginTop: 24, padding: 0 }}>
        {MENU.map((item, i) => (
          <button
            key={item.label}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              border: "none",
              borderBottom: i === MENU.length - 1 ? "none" : "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>{item.icon}</span>
            <span style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 14 }}>{item.label}</span>
            <span style={{ color: "var(--ink-faint)" }}>›</span>
          </button>
        ))}
      </Card>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          marginTop: 24,
          border: "none",
          background: "transparent",
          color: "var(--danger)",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 15,
          padding: 14,
          cursor: "pointer",
        }}
      >
        ↩ Log Out
      </button>
    </div>
  );
}