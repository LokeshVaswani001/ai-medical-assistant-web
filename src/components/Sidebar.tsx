import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import "./Sidebar.css";

const NAV = [
  { to: "/home", label: "Home", icon: "🏠" },
  { to: "/symptom-checker", label: "Symptoms", icon: "❤️‍🩹" },
  { to: "/hospitals", label: "Hospitals", icon: "📍" },
  { to: "/reminders", label: "Reminders", icon: "⏰" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="topbar">
        <div className="brand">
          <div className="brand__mark">+</div>
          <span>MedAssist</span>
        </div>
        <button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="brand brand--desktop">
          <div className="brand__mark">+</div>
          <span>MedAssist</span>
        </div>

        <nav className="nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav__item ${isActive ? "nav__item--active" : ""}`}
            >
              <span className="nav__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="logout" onClick={handleLogout}>
          ↩ Log Out
        </button>
      </aside>
    </>
  );
}