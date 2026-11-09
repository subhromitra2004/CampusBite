import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/api.js";
import { toast } from "sonner";
import {
  ArrowRight, Lock, AlertCircle, Users, ShieldCheck, ChefHat, GraduationCap,
  Eye, EyeOff, Sparkles, CheckCircle2, Shield
} from "lucide-react";

const DEMO_ACCOUNTS = [
  { label: "Student", email: "rahul.sharma@iiit-bh.ac.in", pass: "Student@123", icon: GraduationCap, badge: "1st Floor" },
  { label: "Super Admin", email: "admin@gmail.com", pass: "admin@123", icon: Shield, badge: "Full Access" },
  { label: "Mess Secretary", email: "mess.secretary@gmail.com", pass: "secretary@123", icon: ShieldCheck, badge: "Committee" },
  { label: "Kitchen Staff", email: "staff@gmail.com", pass: "staff@123", icon: ChefHat, badge: "Counter & Ops" }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedDemo, setSelectedDemo] = useState(null);

  const setDemoCredentials = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setSelectedDemo(acc.label);
    setError("");
    toast.info(`Filled credentials for ${acc.label}`);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password }).unwrap();
      toast.success("Welcome to CampusBite");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = err?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="auth-brand">
          <img src="/favicon.svg" alt="" width="36" height="36" />
          <span>CampusBite</span>
        </Link>
        <div className="auth-side-content">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,0.1)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 16 }}>
            <Sparkles size={13} color="#f5b942" /> IIIT Bhubaneswar Mess Ecosystem
          </span>
          <h2>Smarter meals.<br />Better campus living.</h2>
          <p>Sign in to register for meals, track itemized running bills, check food quality ratings, and connect with the mess inspection committee.</p>
          <div className="auth-side-points">
            <div><Lock size={16} /> Server-side role authorization</div>
            <div><Lock size={16} /> HttpOnly secure cookies</div>
            <div><Lock size={16} /> Refresh-token rotation</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, opacity: 0.7 }}>
          <span>IIIT Bhubaneswar - 2026</span>
          <Link to="/society" style={{ color: "#f5b942", fontWeight: 600, textDecoration: "underline" }}>
            Inspection Team & Society
          </Link>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-card" style={{ maxWidth: 460 }}>
          <div className="auth-card-head">
            <h1>Sign in</h1>
            <p>Enter your credentials or choose a quick demo account</p>
          </div>

          {/* Quick Demo Selector */}
          <div style={{ marginBottom: 18, background: "#f8fafc", padding: 12, borderRadius: 12, border: "1px solid #e2e8e6" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={12} color="#0e7c66" /> Quick Demo Login (Click to fill)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const isSelected = selectedDemo === acc.label;
                return (
                  <button
                    key={acc.label}
                    type="button"
                    onClick={() => setDemoCredentials(acc)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      background: isSelected ? "rgba(14,124,102,0.12)" : "white",
                      border: isSelected ? "1.5px solid #0e7c66" : "1px solid #cbd5e1",
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: 12,
                      color: isSelected ? "#0e7c66" : "#0f172a",
                      transition: "all 0.15s"
                    }}
                  >
                    <Icon size={16} color={isSelected ? "#0e7c66" : "#64748b"} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ display: "block", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{acc.label}</strong>
                      <span style={{ fontSize: 10, color: "#64748b" }}>{acc.badge}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} /> <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={submit}>
            <label>
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@iiit-bh.ac.in"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </label>

            <label>
              <span>Password</span>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 4
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="auth-info" style={{ marginTop: 20 }}>
            <p className="auth-info-note" style={{ margin: 0, textAlign: "center" }}>
              <strong>New student?</strong> <Link to="/register" style={{ fontWeight: 700, color: "#0e7c66" }}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
