import { useState } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "../Pages.css";

export default function PrivacySecurity() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Password strength calculate karne ke liye helper function
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "transparent", width: "0%" };
    if (pass.length < 6) return { label: "Weak 🔴", color: "#e74c3c", width: "33%" };
    if (pass.length < 10) return { label: "Medium 🟡", color: "#f39c12", width: "66%" };
    return { label: "Strong 🟢", color: "var(--primary)", width: "100%" };
  };

  const strength = getPasswordStrength(newPassword);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const storageKey = `user_password_${user?.email || "default"}`;
    localStorage.setItem(storageKey, newPassword);

    setSuccessMsg("Password successfully updated! You can now log in using your new credentials.");
    setNewPassword("");
    setShowForm(false);
    
    setTimeout(() => setSuccessMsg(""), 6000);
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", paddingBottom: "50px", animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Privacy & Security 🔒
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            Manage your account security, credentials, and authentication preferences.
          </p>
        </div>
        <div style={{ 
          background: "var(--primary-tint)", 
          padding: "8px 14px", 
          borderRadius: "var(--radius-full)", 
          fontSize: "12.5px", 
          fontFamily: "var(--font-display)", 
          fontWeight: 700, 
          color: "var(--primary)",
          border: "1px solid rgba(43, 110, 94, 0.15)",
          boxShadow: "0 2px 8px rgba(43, 110, 94, 0.04)"
        }}>
          🛡️ End-to-End Secure
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
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
          <span>✨</span> {successMsg}
        </div>
      )}

      {/* Main Settings Card */}
      <Card style={{ padding: "28px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Password Item Row */}
          <div 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", flexWrap: "wrap", gap: "16px", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ fontSize: "22px", background: "var(--primary-tint)", width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                🔑
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>Password Management</div>
                <div style={{ color: "var(--ink-muted)", fontSize: "13px", marginTop: "2px" }}>Protect your medical record history with a strong secure key.</div>
              </div>
            </div>

            {!showForm && (
              <PrimaryButton variant="outline" onClick={() => setShowForm(true)} style={{ padding: "10px 20px", fontSize: "13px", borderRadius: "10px" }}>
                Change Password
              </PrimaryButton>
            )}
          </div>

          {/* Form Section when triggered */}
          {showForm && (
            <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "16px", background: "var(--surface)", padding: "24px", borderRadius: "16px", border: "1.5px solid var(--primary)", animation: "fadeInUp 0.3s ease forwards" }}>
              <div>
                <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                  Enter New Password
                </label>
                
                {/* Input Container with Show/Hide icon */}
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ 
                      width: "100%", 
                      padding: "12px 45px 12px 16px", 
                      borderRadius: "12px", 
                      border: "1.5px solid var(--border)", 
                      fontSize: "14px",
                      outline: "none",
                      background: "var(--surface-subtle, #fff)",
                      color: "var(--ink)"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "var(--ink-muted)"
                    }}
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", fontWeight: 600, color: "var(--ink-muted)" }}>
                      <span>Security Level:</span>
                      <span style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: strength.width, height: "100%", background: strength.color, transition: "width 0.3s ease, background 0.3s ease" }} />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "4px" }}>
                <PrimaryButton variant="outline" type="button" onClick={() => { setShowForm(false); setNewPassword(""); }} style={{ padding: "10px 20px", fontSize: "13px", borderRadius: "10px" }}>
                  Cancel
                </PrimaryButton>
                <PrimaryButton variant="primary" type="submit" style={{ padding: "10px 22px", fontSize: "13px", borderRadius: "10px", boxShadow: "0 4px 14px rgba(43, 110, 94, 0.2)" }}>
                  Save Password
                </PrimaryButton>
              </div>
            </form>
          )}

        </div>
      </Card>
    </div>
  );
}