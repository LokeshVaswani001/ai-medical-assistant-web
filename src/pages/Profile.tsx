import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "./Pages.css";

// ----- Advanced Multi-Stethoscope 3D Animated Background Styles -----
const customStyles = `
  .profile-bg-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #ffffff; /* Pure White Background */
    overflow: hidden;
    z-index: -1;
    perspective: 1200px;
  }

  /* Soft Ambient Blur Green Orbs */
  .blur-orb-1 {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 55vw;
    height: 55vw;
    background: rgba(43, 110, 94, 0.1);
    filter: blur(100px);
    border-radius: 50%;
    animation: floatOrb1 14s infinite alternate ease-in-out;
  }

  .blur-orb-2 {
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 55vw;
    height: 55vw;
    background: rgba(26, 68, 58, 0.08);
    filter: blur(120px);
    border-radius: 50%;
    animation: floatOrb2 16s infinite alternate ease-in-out;
  }

  @keyframes floatOrb1 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50px, 45px) scale(1.12); }
  }

  @keyframes floatOrb2 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-50px, -40px) scale(1.18); }
  }

  /* Multi-Stethoscope 3D Container Layer */
  .stethoscope-3d-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform-style: preserve-3d;
  }

  /* Center Large Main Glowing Stethoscope */
  .stethoscope-main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18vw;
    color: #2b6e5e;
    opacity: 0.28;
    filter: 
      drop-shadow(0 0 20px rgba(43, 110, 94, 0.85)) 
      drop-shadow(0 0 45px rgba(43, 110, 94, 0.5))
      drop-shadow(0 0 80px rgba(43, 110, 94, 0.25));
    animation: rotateCenterStethoscope 22s infinite linear;
    transform-style: preserve-3d;
    user-select: none;
  }

  @keyframes rotateCenterStethoscope {
    0% {
      transform: translate(-50%, -50%) rotate3d(1, 1, 0, 0deg) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) rotate3d(1, 1, 0, 180deg) scale(1.08);
    }
    100% {
      transform: translate(-50%, -50%) rotate3d(1, 1, 0, 360deg) scale(1);
    }
  }

  /* Floating Secondary Stethoscope 1 (Top Left) */
  .stethoscope-float-1 {
    position: absolute;
    top: 15%;
    left: 10%;
    font-size: 9vw;
    color: #1a443a;
    opacity: 0.2;
    filter: drop-shadow(0 0 12px rgba(43, 110, 94, 0.7));
    animation: floatAndSpin1 16s infinite alternate ease-in-out;
    transform-style: preserve-3d;
    user-select: none;
  }

  @keyframes floatAndSpin1 {
    0% { transform: translate3d(0, 0, 0) rotate(0deg); }
    100% { transform: translate3d(35px, 45px, 60px) rotate(360deg); }
  }

  /* Floating Secondary Stethoscope 2 (Bottom Right) */
  .stethoscope-float-2 {
    position: absolute;
    bottom: 12%;
    right: 10%;
    font-size: 10vw;
    color: #2b6e5e;
    opacity: 0.22;
    filter: drop-shadow(0 0 15px rgba(43, 110, 94, 0.75));
    animation: floatAndSpin2 18s infinite alternate ease-in-out;
    transform-style: preserve-3d;
    user-select: none;
  }

  @keyframes floatAndSpin2 {
    0% { transform: translate3d(0, 0, 0) rotate(0deg); }
    100% { transform: translate3d(-40px, -35px, 80px) rotate(-360deg); }
  }

  .profile-main-wrapper {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    padding: 30px 20px 60px;
  }
`;

const MENU = [
  { icon: "👤", label: "Personal Information", path: "/profile/personal" },
  { icon: "📄", label: "Medical History", path: "/profile/medical-history" },
  { icon: "🔔", label: "Notification Settings", path: "/profile/notifications" },
  { icon: "🛡️", label: "Privacy & Security", path: "/profile/privacy" },
  { icon: "❓", label: "Help & Support", path: "/support" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`user_avatar_${user?.email}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [user?.email]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        if (user?.email) {
          localStorage.setItem(`user_avatar_${user.email}`, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <style>{customStyles}</style>

      {/* Pure White Background with Dynamic Multi-Stethoscope 3D Animation */}
      <div className="profile-bg-container">
        <div className="blur-orb-1"></div>
        <div className="blur-orb-2"></div>
        
        <div className="stethoscope-3d-layer">
          <div className="stethoscope-float-1">🩺</div>
          <div className="stethoscope-main">🩺</div>
          <div className="stethoscope-float-2">🩺</div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="profile-main-wrapper" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Profile Header Card */}
        <div style={{ 
          padding: "36px 24px", 
          textAlign: "center", 
          borderRadius: "24px", 
          border: "1.5px solid rgba(43, 110, 94, 0.15)", 
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 20px 40px rgba(43, 110, 94, 0.08)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2b6e5e, #1a443a)",
              color: "#fff",
              fontSize: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              overflow: "hidden",
              position: "relative",
              border: "4px solid #ffffff",
              boxShadow: "0 10px 25px rgba(43, 110, 94, 0.2)",
              cursor: "pointer",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {avatar ? (
              <img src={avatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span>👤</span>
            )}

            <div 
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.65)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 700,
                padding: "6px 0",
                letterSpacing: "0.5px"
              }}
            >
              EDIT
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>

          <h2 style={{ marginTop: "18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "24px", color: "#11221c" }}>
            {user?.name ?? "Guest User"}
          </h2>
          <p style={{ color: "#556960", fontSize: "14.5px", marginTop: "4px", fontWeight: 500 }}>
            {user?.email ?? "No email connected"}
          </p>
        </div>

        {/* Width-wise Expanded Grid Container for Menu Options & Log Out Button */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "18px", 
          marginTop: "20px" 
        }}>
          {MENU.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                padding: "18px 24px",
                width: "100%",
                border: "1.5px solid rgba(43, 110, 94, 0.12)",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
                boxShadow: "0 10px 25px rgba(43, 110, 94, 0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f7f4";
                e.currentTarget.style.borderColor = "#2b6e5e";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(43, 110, 94, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.92)";
                e.currentTarget.style.borderColor = "rgba(43, 110, 94, 0.12)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(43, 110, 94, 0.05)";
              }}
            >
              <span style={{ fontSize: "24px", width: "46px", height: "46px", borderRadius: "12px", background: "rgba(43, 110, 94, 0.1)", color: "#2b6e5e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.icon}
              </span>
              <div style={{ flex: 1 }}>
                <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#11221c" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "12.5px", color: "#556960", fontWeight: 500 }}>
                  Manage settings
                </span>
              </div>
              <span style={{ color: "#2b6e5e", fontSize: "18px", fontWeight: 700 }}>
                ›
              </span>
            </button>
          ))}

          {/* Log Out Button with Expanded Width matching the grid items */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              padding: "18px 24px",
              width: "100%",
              border: "1.5px solid rgba(231, 76, 60, 0.35)",
              borderRadius: "18px",
              background: "rgba(231, 76, 60, 0.05)",
              color: "#e74c3c",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              textAlign: "left",
              backdropFilter: "blur(12px)",
              transition: "all 0.25s ease",
              boxShadow: "0 10px 25px rgba(231, 76, 60, 0.06)"
            }}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e74c3c";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#e74c3c";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(231, 76, 60, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(231, 76, 60, 0.05)";
              e.currentTarget.style.color = "#e74c3c";
              e.currentTarget.style.borderColor = "rgba(231, 76, 60, 0.35)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(231, 76, 60, 0.06)";
            }}
          >
            <span style={{ fontSize: "20px", width: "46px", height: "46px", borderRadius: "12px", background: "rgba(231, 76, 60, 0.1)", color: "#e74c3c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              ↩
            </span>
            <div style={{ flex: 1 }}>
              <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#e74c3c" }}>
                Secure Log Out
              </span>
              <span style={{ fontSize: "12.5px", color: "#a93226", fontWeight: 500 }}>
                End session securely
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}