import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
// @ts-ignore
import "./AuthPages.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signup(name, email, password);
    setLoading(false);
    
    if (result.ok) {
      navigate("/home");
    } else {
      setError(result.error ?? "Sign up nahi ho saka.");
    }
  };

  return (
    <div className="authScreen">
      <form className="authCard" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "left" }}>Create Account</h1>
        <p style={{ color: "var(--ink-muted)", marginTop: 4, marginBottom: 8 }}>Start tracking your health with AI</p>

        <label className="authCard__label">Full Name</label>
        <input className="authCard__input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="authCard__label">Email</label>
        <input
          className="authCard__input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="authCard__label">Password</label>
        <input
          className="authCard__input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="authCard__error">{error}</p>}

        <PrimaryButton type="submit" loading={loading} style={{ marginTop: 16, width: "100%" }}>
          Sign Up
        </PrimaryButton>

        <p className="authCard__footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}