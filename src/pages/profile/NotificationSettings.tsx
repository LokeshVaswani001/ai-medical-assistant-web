import { useState, useEffect } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
import emailjs from "emailjs-com";
// @ts-ignore
import "../Pages.css";

export default function NotificationSettings() {
  const { user } = useAuth();
  
  const [reminders, setReminders] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`notif_settings_${user.email}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setReminders(parsed.reminders ?? true);
          setEmailAlerts(parsed.emailAlerts ?? false);
          setPushAlerts(parsed.pushAlerts ?? true);
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
    }
  }, [user?.email]);

  const handleSave = () => {
    if (user?.email) {
      const settings = { reminders, emailAlerts, pushAlerts };
      localStorage.setItem(`notif_settings_${user.email}`, JSON.stringify(settings));
    }

    // Agar email alerts active hain, toh EmailJS ke zariye real email bhejein
    if (emailAlerts) {
      const templateParams = {
        to_name: user?.name || "Valued User",
        to_email: user?.email || "mf0488789@gmail.com",
        message: "Aapki Notification Settings mein Email Alerts successfully activate ho gaye hain! Ab aapko yahan se clinical reports aur updates milti rahengi."
      };

      emailjs.send(
        'service_us307z8', 
        'YOUR_TEMPLATE_ID', // Yahan apna EmailJS Template ID likh dein
        templateParams, 
        'YOUR_PUBLIC_KEY'   // Yahan apni EmailJS Public Key likh dein
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setEmailStatus(" ✉️ Email sent to your inbox!");
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setEmailStatus(" (⚠️ Email failed, check Template ID/Public Key)");
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEmailStatus("");
    }, 5000);
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", paddingBottom: "50px", animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Notification Settings 🔔
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            Manage how and when you receive clinical alerts, reminders, and health summaries.
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
          ⚡ Live Sync Active
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
          <span>✅</span> Your preferences have been successfully updated and saved!{emailStatus}
        </div>
      )}

      {/* Main Settings Card */}
      <Card style={{ padding: "28px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Option 1: Medicine Reminders */}
          <div 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ fontSize: "22px", background: "var(--primary-tint)", width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                💊
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>Medicine Reminders</div>
                <div style={{ color: "var(--ink-muted)", fontSize: "13px", marginTop: "2px" }}>Get instant audio & visual alerts when it's time for pills.</div>
              </div>
            </div>
            
            {/* Custom Switch Toggle */}
            <label style={{ position: "relative", display: "inline-block", width: "52px", height: "28px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={reminders} 
                onChange={() => setReminders(!reminders)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{ 
                position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: reminders ? "var(--primary)" : "#ccc", 
                transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
                borderRadius: "28px",
                boxShadow: reminders ? "0 4px 12px rgba(43, 110, 94, 0.3)" : "none"
              }}>
                <span style={{ 
                  position: "absolute", content: "''", height: "22px", width: "22px", left: reminders ? "27px" : "3px", bottom: "3px", 
                  backgroundColor: "white", transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }} />
              </span>
            </label>
          </div>

          {/* Option 2: Email Notifications */}
          <div 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ fontSize: "22px", background: "var(--primary-tint)", width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✉️
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>Email Notifications</div>
                <div style={{ color: "var(--ink-muted)", fontSize: "13px", marginTop: "2px" }}>Receive automated confirmation & weekly health reports via email.</div>
              </div>
            </div>

            <label style={{ position: "relative", display: "inline-block", width: "52px", height: "28px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={() => setEmailAlerts(!emailAlerts)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{ 
                position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: emailAlerts ? "var(--primary)" : "#ccc", 
                transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
                borderRadius: "28px",
                boxShadow: emailAlerts ? "0 4px 12px rgba(43, 110, 94, 0.3)" : "none"
              }}>
                <span style={{ 
                  position: "absolute", content: "''", height: "22px", width: "22px", left: emailAlerts ? "27px" : "3px", bottom: "3px", 
                  backgroundColor: "white", transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }} />
              </span>
            </label>
          </div>

          {/* Option 3: Push Alerts */}
          <div 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderRadius: "16px", background: "var(--surface)", border: "1.5px solid var(--border)", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ fontSize: "22px", background: "var(--primary-tint)", width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                🔔
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>Emergency Push Alerts</div>
                <div style={{ color: "var(--ink-muted)", fontSize: "13px", marginTop: "2px" }}>Receive critical health warnings and symptom advice updates.</div>
              </div>
            </div>

            <label style={{ position: "relative", display: "inline-block", width: "52px", height: "28px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={pushAlerts} 
                onChange={() => setPushAlerts(!pushAlerts)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{ 
                position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: pushAlerts ? "var(--primary)" : "#ccc", 
                transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
                borderRadius: "28px",
                boxShadow: pushAlerts ? "0 4px 12px rgba(43, 110, 94, 0.3)" : "none"
              }}>
                <span style={{ 
                  position: "absolute", content: "''", height: "22px", width: "22px", left: pushAlerts ? "27px" : "3px", bottom: "3px", 
                  backgroundColor: "white", transition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)", borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }} />
              </span>
            </label>
          </div>

        </div>

        {/* Save Button Footer */}
        <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
          <PrimaryButton 
            onClick={handleSave} 
            style={{ padding: "12px 26px", fontSize: "14px", borderRadius: "12px", boxShadow: "0 6px 20px rgba(43, 110, 94, 0.2)" }}
          >
            Save Preferences
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}