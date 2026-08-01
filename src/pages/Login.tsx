import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/auth/AuthContext";
import "./AuthPages.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // small delay so it still feels like a real network call
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) {
        navigate("/home");
      } else {
        setError(result.error ?? "Login nahi ho saka.");
      }
    }, 400);
  };

  return (
    <div className="authScreen">
      <form className="authCard" onSubmit={handleSubmit}>
        <div className="authCard__logo">
          <div className="authCard__mark">+</div>
          <h1>AI Medical Assistant</h1>
          <p>Your intelligent health companion</p>
        </div>

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
          Log In
        </PrimaryButton>

        <p className="authCard__footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}