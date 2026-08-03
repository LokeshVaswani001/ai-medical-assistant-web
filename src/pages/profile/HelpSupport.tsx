import { useState } from "react";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "../Pages.css";

const FAQS = [
  {
    q: "How do I check my symptoms?",
    a: "Navigate to the home screen or symptom checker section, select your symptoms, and our AI assistant will provide instant clinical insights.",
    icon: "🩺"
  },
  {
    q: "Is my medical data secure?",
    a: "Yes, all your health records and personal details are securely stored locally on your device or through your authenticated profile.",
    icon: "🛡️"
  },
  {
    q: "How can I update my password?",
    a: "Go to Profile > Privacy & Security to update and save your new account password securely.",
    icon: "🔑"
  },
];

export default function HelpSupport() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default for better UX
  
  // Support form states
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xykrredk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user?.email ?? "mf0488789@gmail.com",
          name: user?.name ?? "User",
          message: message 
        }),
      });

      if (response.ok) {
        const tickets = JSON.parse(localStorage.getItem(`support_tickets_${user?.email}`) || "[]");
        tickets.push({ message, date: new Date().toLocaleString() });
        localStorage.setItem(`support_tickets_${user?.email}`, JSON.stringify(tickets));

        setSubmitted(true);
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Message send nahi ho saka. Dobara koshish karein!");
      }
    } catch (err) {
      setError("Network error. Internet connection check karein!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", paddingBottom: "50px", animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 className="pageTitle" style={{ fontSize: "28px", letterSpacing: "-0.5px", background: "linear-gradient(135deg, var(--ink), var(--primary-dark))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Help & Support 💡
          </h1>
          <p className="pageSubtitle" style={{ fontSize: "14px", marginTop: "4px" }}>
            Find answers to common questions or reach out to our assistance team directly.
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
          💬 24/7 Assistance
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* FAQ Section */}
        <Card style={{ padding: "28px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)" }}>
          <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: "16px", color: "var(--ink)", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>📖</span> Frequently Asked Questions
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  style={{ 
                    background: "var(--surface)", 
                    border: `1.5px solid ${isOpen ? "var(--primary)" : "var(--border)"}`, 
                    borderRadius: "14px", 
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    boxShadow: isOpen ? "0 4px 16px rgba(43, 110, 94, 0.06)" : "none"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontWeight: 600,
                      fontSize: "14.5px",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "16px 20px",
                      color: "var(--ink)",
                      fontFamily: "var(--font-display)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "18px", background: "var(--primary-tint)", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {faq.icon}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <span style={{ 
                      background: isOpen ? "var(--primary)" : "var(--primary-tint)", 
                      color: isOpen ? "#fff" : "var(--primary)", 
                      width: "26px", 
                      height: "26px", 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: 700,
                      transition: "all 0.2s ease"
                    }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div style={{ color: "var(--ink-muted)", fontSize: "13.5px", padding: "0 20px 18px 64px", lineHeight: 1.6, animation: "fadeInUp 0.3s ease forwards" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Contact Support Form Card */}
        <Card style={{ padding: "28px", borderRadius: "var(--radius-lg, 20px)", border: "1.5px solid var(--border)", boxShadow: "0 10px 30px rgba(22, 36, 31, 0.03)", background: "linear-gradient(135deg, var(--surface) 0%, rgba(247, 245, 240, 0.8) 100%)" }}>
          <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: "6px", color: "var(--ink)", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>✉️</span> Need direct assistance?
          </div>
          <div style={{ color: "var(--ink-muted)", fontSize: "13.5px", marginBottom: "20px" }}>
            Send us a message below or reach out directly via email at <span style={{ color: "var(--primary)", fontWeight: 600 }}>mf0488789@gmail.com</span>.
          </div>

          {submitted && (
            <div style={{ 
              background: "rgba(43, 110, 94, 0.1)", 
              border: "1.5px solid var(--primary)", 
              padding: "14px 18px", 
              borderRadius: "var(--radius-md, 14px)", 
              marginBottom: "16px", 
              color: "var(--primary)", 
              fontFamily: "var(--font-display)", 
              fontWeight: 600,
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "fadeInUp 0.3s ease forwards"
            }}>
              <span>✨</span> Your message has been sent successfully! Our support team will get back to you shortly.
            </div>
          )}

          {error && (
            <div style={{ 
              background: "rgba(231, 76, 60, 0.1)", 
              border: "1.5px solid #e74c3c", 
              padding: "14px 18px", 
              borderRadius: "var(--radius-md, 14px)", 
              marginBottom: "16px", 
              color: "#c0392b", 
              fontFamily: "var(--font-display)", 
              fontWeight: 600,
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSupportSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                Your Message / Query
              </label>
              <textarea
                rows={4}
                placeholder="Describe your issue or question in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "14px 16px", 
                  borderRadius: "12px", 
                  border: "1.5px solid var(--border)", 
                  fontSize: "14px", 
                  resize: "vertical",
                  outline: "none",
                  background: "var(--surface-subtle, #fff)",
                  color: "var(--ink)",
                  transition: "border-color 0.2s ease"
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <PrimaryButton 
                variant="primary" 
                type="submit" 
                loading={loading} 
                style={{ padding: "12px 26px", fontSize: "14px", borderRadius: "12px", boxShadow: "0 4px 14px rgba(43, 110, 94, 0.2)" }}
              >
                Submit Message
              </PrimaryButton>
            </div>
          </form>
        </Card>

      </div>
    </div>
  );
}