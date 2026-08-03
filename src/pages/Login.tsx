import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);
    
    if (result.ok) {
      navigate("/home");
    } else {
      setError(result.error ?? "Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f7f4 0%, #e1ede8 100%)",
        padding: "20px"
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "440px",
          animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        <form 
          className="authCard" 
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(43, 110, 94, 0.15)",
            borderRadius: "28px",
            padding: "36px 32px",
            boxShadow: "0 20px 45px rgba(22, 36, 31, 0.08), 0 10px 20px rgba(0, 0, 0, 0.03)"
          }}
        >
          {/* Logo & Brand Header */}
          <div className="authCard__logo" style={{ textAlign: "center", marginBottom: "28px" }}>
            <div 
              className="authCard__mark"
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                color: "#fff",
                fontSize: "28px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                boxShadow: "0 8px 20px rgba(43, 110, 94, 0.25)"
              }}
            >
              +
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "24px", color: "var(--ink)", letterSpacing: "-0.5px" }}>
              AI Medical Assistant
            </h1>
            <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px" }}>
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div 
              style={{
                background: "#fdf2f2",
                border: "1px solid #f8d7da",
                color: "#b02a37",
                padding: "12px 16px",
                borderRadius: "14px",
                fontSize: "13px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "shake 0.4s ease-in-out"
              }}
            >
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Email Field */}
          <div style={{ marginBottom: "18px" }}>
            <label className="authCard__label" style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              className="authCard__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "14px",
                border: "1.5px solid var(--border)",
                background: "#fff",
                fontSize: "14.5px",
                color: "var(--ink)",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div style={{ marginBottom: "24px", position: "relative" }}>
            <label className="authCard__label" style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="authCard__input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 45px 12px 16px",
                  borderRadius: "14px",
                  border: "1.5px solid var(--border)",
                  background: "#fff",
                  fontSize: "14.5px",
                  color: "var(--ink)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--ink-muted)",
                  padding: "4px"
                }}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <PrimaryButton 
            type="submit" 
            loading={loading} 
            style={{ 
              width: "100%", 
              padding: "14px", 
              borderRadius: "14px", 
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0 8px 20px rgba(43, 110, 94, 0.25)"
            }}
          >
            Log In
          </PrimaryButton>

          {/* Footer Link */}
          <p className="authCard__footer" style={{ textAlign: "center", marginTop: "24px", fontSize: "13.5px", color: "var(--ink-muted)" }}>
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}