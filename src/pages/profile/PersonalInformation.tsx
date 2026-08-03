import { useState } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "../Pages.css";

export default function PersonalInformation() {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "Mahnoor Fatima Mustafa Ahmad",
    email: user?.email || "mf0488789@gmail.com",
    phone: "+92 300 1234567",
    location: "Mandi Bahauddin, Pakistan"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000); // Hide success message after 4 seconds
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", paddingBottom: "50px", animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Personal Information 👤
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            View and securely manage your verified account details and clinical profile identity.
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
          🔒 Secure & Encrypted
        </div>
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
          <span>✅</span> Your personal profile information has been successfully updated!
        </div>
      )}

      {/* Profile Banner Card */}
      <Card style={{ 
        marginTop: "16px", 
        padding: "28px", 
        borderRadius: "var(--radius-lg, 20px)", 
        border: "1.5px solid var(--border)", 
        boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)",
        background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)"
      }}>
        {/* User Avatar Header inside Card */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ 
            width: "70px", 
            height: "70px", 
            borderRadius: "50%", 
            background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", 
            color: "#fff", 
            fontSize: "28px", 
            fontWeight: 700, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(43, 110, 94, 0.25)"
          }}>
            {formData.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
              {formData.name}
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--ink-muted)", marginTop: "2px" }}>
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* Full Name */}
          <div style={{ background: "var(--surface)", padding: "16px 18px", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
              Full Name
            </label>
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            ) : (
              <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                {formData.name}
              </div>
            )}
          </div>

          {/* Email Address */}
          <div style={{ background: "var(--surface)", padding: "16px 18px", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
              Email Address
            </label>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            ) : (
              <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                {formData.email}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div style={{ background: "var(--surface)", padding: "16px 18px", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
              Phone Number
            </label>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            ) : (
              <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                {formData.phone}
              </div>
            )}
          </div>

          {/* Location */}
          <div style={{ background: "var(--surface)", padding: "16px 18px", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
              Location
            </label>
            {isEditing ? (
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "14.5px", fontFamily: "var(--font-display)", outline: "none", background: "var(--surface)" }}
              />
            ) : (
              <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                {formData.location} 📍
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "28px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          {isEditing ? (
            <>
              <PrimaryButton 
                variant="outline"
                onClick={() => setIsEditing(false)}
                style={{ padding: "12px 20px", fontSize: "14px", borderRadius: "12px" }}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton 
                onClick={handleSave}
                style={{ padding: "12px 24px", fontSize: "14px", borderRadius: "12px", boxShadow: "0 6px 20px rgba(43, 110, 94, 0.2)" }}
              >
                Save Changes
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton 
              variant="outline"
              onClick={() => setIsEditing(true)}
              style={{ padding: "12px 22px", fontSize: "14px", borderRadius: "12px", border: "1.5px solid var(--primary)", color: "var(--primary)" }}
            >
              ✏️ Edit Profile Details
            </PrimaryButton>
          )}
        </div>
      </Card>
    </div>
  );
}