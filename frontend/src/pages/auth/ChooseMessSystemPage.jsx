import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMyProfileMutation } from "../../app/api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice.js";
import { toast } from "sonner";
import { Building2, UtensilsCrossed, Check, ArrowRight } from "lucide-react";

export default function ChooseMessSystemPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [update] = useUpdateMyProfileMutation();
  const [busy, setBusy] = useState(null);

  const pickFirstFloor = async () => {
    setBusy("1st_floor");
    try {
      const res = await update({ messSystem: "1st_floor" }).unwrap();
      dispatch(setUser(res.data.user));
      toast.success("Welcome to 1st Floor mess");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
      setBusy(null);
    }
  };

  const pickGroundFloor = () => {
    navigate("/ground-floor/enroll", { replace: true });
  };

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: "0 20px" }}>
      <header style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 14px",
          background: "rgba(14, 124, 102, 0.1)",
          border: "1px solid rgba(14, 124, 102, 0.2)",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#0e7c66",
          textTransform: "uppercase",
          marginBottom: 14
        }}>
          Dining Preference
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10, color: "#0b1f3a", letterSpacing: "-0.03em" }}>Choose your mess system</h1>
        <p style={{ color: "#64748b", maxWidth: 560, margin: "0 auto", fontSize: 15, lineHeight: 1.6 }}>
          Both messes serve fresh, verified campus meals. Pick how you prefer to register and pay.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        <div className="card" style={{
          padding: 32,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(14, 124, 102, 0.25)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #0e7c66, #10a37f)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div style={{ width: 52, height: 52, background: "rgba(14,124,102,0.12)", color: "#0e7c66", borderRadius: 14, display: "grid", placeItems: "center" }}>
              <UtensilsCrossed size={26} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0e7c66", background: "rgba(14,124,102,0.1)", padding: "4px 10px", borderRadius: 999 }}>
              Flexible Daily
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#0b1f3a" }}>1st Floor Mess (Swain Catters)</h2>
          <p style={{ color: "#64748b", marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
            Pay per meal. Register meal-by-meal daily. Cancel anytime before cutoff without paying.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10, fontSize: 13.5, color: "#334155", flex: 1 }}>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#0e7c66" /> Register meal-by-meal on demand</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#0e7c66" /> Cancel before cutoff with zero penalty</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#0e7c66" /> Monthly consolidated billing</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#0e7c66" /> Swain Catters official WhatsApp community</li>
          </ul>
          <button className="btn-primary" onClick={pickFirstFloor} disabled={busy === "1st_floor"} style={{ width: "100%", padding: 13, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {busy === "1st_floor" ? "Saving..." : <>Select 1st Floor <ArrowRight size={16} /></>}
          </button>
        </div>

        <div className="card" style={{
          padding: 32,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(245, 185, 66, 0.4)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #f5b942, #ffc857)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div style={{ width: 52, height: 52, background: "rgba(245,185,66,0.18)", color: "#a06800", borderRadius: 14, display: "grid", placeItems: "center" }}>
              <Building2 size={26} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a06800", background: "rgba(245,185,66,0.18)", padding: "4px 10px", borderRadius: 999 }}>
              Semester Pass
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#0b1f3a" }}>Ground Floor Mess</h2>
          <p style={{ color: "#64748b", marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
            One-time semester fee of <strong style={{ color: "#a06800" }}>Rs. 25,000</strong>. Choose 3 to 4 meals and eat freely all semester.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10, fontSize: 13.5, color: "#334155", flex: 1 }}>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#a06800" /> Pay once for whole 120-day semester</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#a06800" /> Pick 3-4 meals of your choice</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#a06800" /> No daily registration or tokens required</li>
            <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={16} color="#a06800" /> Printable verified semester pass</li>
          </ul>
          <button className="btn-primary" onClick={pickGroundFloor} disabled={!!busy} style={{ width: "100%", padding: 13, fontSize: 15, background: "#a06800", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Continue to Enroll <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}