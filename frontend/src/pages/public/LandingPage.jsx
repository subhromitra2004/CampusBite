import { Link } from "react-router-dom";
import {
  Utensils, QrCode, Receipt, MessageSquare, BarChart3, ShieldCheck, Package,
  ArrowRight, Check, Lock, Zap, Star, GraduationCap, Building2, UserCog,
  Sparkles, ArrowUpRight, UtensilsCrossed, ExternalLink
} from "lucide-react";

const features = [
  { icon: Utensils, title: "Dynamic menus", desc: "Real-time updates with dietary labels, allergens, and special meal flags across all four daily meals." },
  { icon: QrCode, title: "QR check-in", desc: "Signed, short-lived meal passes with duplicate prevention and manual fallback for staff." },
  { icon: Receipt, title: "Transparent billing", desc: "Itemized bills with immutable snapshots, payment history, and downloadable invoices." },
  { icon: MessageSquare, title: "Complaint tracking", desc: "Categorized grievances with priorities, image attachments, and full resolution timelines." },
  { icon: Package, title: "Inventory and wastage", desc: "Stock ledger with low-stock alerts, supplier tracking, and sustainability analytics." },
  { icon: BarChart3, title: "Institutional analytics", desc: "Warden dashboards covering attendance, feedback, financial performance, and food waste." }
];

const steps = [
  { n: "01", title: "Admin publishes menu", desc: "Mess administrator creates today's menu with items for each meal and publishes it." },
  { n: "02", title: "Students register", desc: "Students browse the menu and lock in their seat before the cutoff time." },
  { n: "03", title: "QR check-in at counter", desc: "Show your signed pass. One scan, one meal. Duplicates rejected automatically." }
];

const roles = [
  { icon: GraduationCap, name: "Students", points: ["View menus and register", "QR meal passes", "Bills and payments", "Complaints and leave"] },
  { icon: ShieldCheck, name: "Mess Admins", points: ["Menu management", "Billing and payments", "Complaint resolution", "Inventory control"] },
  { icon: Building2, name: "Wardens", points: ["Institutional oversight", "Policy configuration", "Financial reports", "Audit history"] },
  { icon: UserCog, name: "Kitchen Staff", points: ["Daily meal schedule", "QR verification", "Consumption tracking", "Wastage recording"] }
];

const testimonials = [
  { name: "Aarav Mehta", role: "3rd year, CSE", text: "I used to forget if I'd registered for lunch. Now my QR is on my phone and the whole thing takes 5 seconds." },
  { name: "Sneha Patel", role: "2nd year, ECE", text: "The bill is actually itemized - I can see exactly how many dinners I've had. Way better than the old mess portal." },
  { name: "Rohan Reddy", role: "4th year, IT", text: "Complaints get resolved in hours now. The mess team actually responds because the workflow is visible." }
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Top Announcement Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #0b1f3a 0%, #0e7c66 100%)",
          color: "white",
          padding: "8px 16px",
          textAlign: "center",
          fontSize: 12.5,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Sparkles size={14} color="#f5b942" />
          Mess Inspection Team (2026–27) is active!
        </span>
        <Link
          to="/society"
          style={{
            color: "#f5b942",
            textDecoration: "underline",
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            fontWeight: 700
          }}
        >
          View Team & Join Scatters WhatsApp <ArrowUpRight size={13} />
        </Link>
      </div>

      <header className="landing-nav" style={{ backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100, background: "rgba(246, 248, 247, 0.92)", borderBottom: "1px solid rgba(226, 232, 230, 0.8)" }}>
        <Link to="/" className="landing-brand">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          <span>CampusBite</span>
        </Link>
        <nav className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#dual-system">Dual Mess</a>
          <a href="#how">How it works</a>
          <a href="#roles">Roles</a>
          <Link
            to="/society"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              background: "rgba(14,124,102,0.1)",
              borderRadius: 20,
              color: "#0e7c66",
              fontWeight: 700
            }}
          >
            <ShieldCheck size={14} /> Mess Society
          </Link>
        </nav>
        <div className="landing-nav-cta">
          <Link to="/login" className="landing-btn landing-btn-ghost">Sign in</Link>
          <Link to="/register" className="landing-btn landing-btn-solid">Get started <ArrowRight size={16} /></Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-copy">
            <span className="landing-eyebrow">
              <span className="landing-eyebrow-dot" /> IIIT BHUBANESWAR • LIVE MESS PORTAL
            </span>
            <h1>
              Smarter meals.<br />
              <span className="hero-accent">Better campus living.</span>
            </h1>
            <p className="landing-hero-sub">
              One unified platform connecting students, mess committees, wardens, and kitchen staff.
              Register meals, get instant QR passes, pay itemized bills, and raise complaints — in real time.
            </p>
            <div className="landing-hero-actions">
              <Link to="/login" className="landing-btn landing-btn-solid landing-btn-lg" style={{ boxShadow: "0 10px 25px rgba(16, 163, 127, 0.3)" }}>
                Open portal <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="landing-btn landing-btn-ghost-light landing-btn-lg">
                Create student account
              </Link>
            </div>
            <div className="landing-trust">
              <span><Lock size={14} /> Role-based access</span>
              <span><Zap size={14} /> Real-time updates</span>
              <span><Check size={14} /> Duplicate-proof</span>
            </div>
          </div>

          <div className="landing-hero-visual">
            <div className="hero-float hero-float-1" style={{ border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
              <div className="hero-mini-head"><span className="hero-pulse" /> Today lunch</div>
              <h4 style={{ fontWeight: 800 }}>Lunch • 12:00 – 14:00</h4>
              <ul className="hero-mini-list">
                <li>• Basmati Rice</li>
                <li>• Dal Fry & Roti</li>
                <li>• Paneer Butter Masala</li>
              </ul>
              <span className="pill pill-green">Registered</span>
            </div>
            <div className="hero-float hero-float-2" style={{ border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
              <QrCode size={36} color="#10a37f" />
              <div>
                <strong>Cryptographic Pass</strong>
                <p>Verified, 2s ago</p>
              </div>
            </div>
            <div className="hero-float hero-float-3" style={{ border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
              <div className="hero-mini-head">Current bill</div>
              <strong className="hero-amount">Rs. 2,340</strong>
              <span className="pill pill-amber">Due Nov 15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="landing-stats">
        <div><strong>4</strong><span>User roles</span></div>
        <div><strong>26</strong><span>Data models</span></div>
        <div><strong>4</strong><span>Daily meals</span></div>
        <div><strong>100%</strong><span>Server-side auth</span></div>
      </section>

      {/* Dual Mess System Breakdown */}
      <section id="dual-system" className="landing-section" style={{ background: "white", borderTop: "1px solid #e2e8e6", borderBottom: "1px solid #e2e8e6" }}>
        <div className="landing-section-head">
          <span className="landing-eyebrow">Campus Dining Model</span>
          <h2>Two Mess Systems. One Seamless Platform.</h2>
          <p>Choose the payment and dining model that matches your lifestyle.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, maxWidth: 960, margin: "0 auto" }}>
          {/* 1st Floor Card */}
          <div className="card" style={{ padding: 28, border: "2px solid #e2e8e6", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,124,102,0.12)", color: "#0e7c66", display: "grid", placeItems: "center" }}>
                  <UtensilsCrossed size={24} />
                </div>
                <span className="pill pill-green">Pay Per Meal</span>
              </div>
              <h3 style={{ fontSize: 20, margin: "0 0 6px", color: "#0b1f3a" }}>1st Floor Mess (Swain Catters)</h3>
              <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 18px", lineHeight: 1.55 }}>
                Maximum flexibility for students who dine irregularly or go home on weekends.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 10, fontSize: 13.5, color: "#334155" }}>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#0e7c66" /> Register meal-by-meal before cutoff</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#0e7c66" /> Cancel anytime within cancellation window</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#0e7c66" /> Live monthly running bill with UPI/Card payments</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#0e7c66" /> Official Swain Catters WhatsApp Channel</li>
              </ul>
            </div>
            <Link to="/login" className="btn-primary" style={{ width: "100%", textAlign: "center", textDecoration: "none" }}>
              Explore 1st Floor Mess <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>

          {/* Ground Floor Card */}
          <div className="card" style={{ padding: 28, border: "2px solid rgba(245, 185, 66, 0.4)", background: "rgba(245, 185, 66, 0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(245,185,66,0.18)", color: "#a06800", display: "grid", placeItems: "center" }}>
                  <Building2 size={24} />
                </div>
                <span className="pill pill-amber">One-Time Fee</span>
              </div>
              <h3 style={{ fontSize: 20, margin: "0 0 6px", color: "#0b1f3a" }}>Ground Floor Mess</h3>
              <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 18px", lineHeight: 1.55 }}>
                Fixed semester package. Pay once, pick your meals, and eat hassle-free every day.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 10, fontSize: 13.5, color: "#334155" }}>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#a06800" /> One-time semester payment (Rs. 25,000)</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#a06800" /> Choose any 3 to 4 meals daily</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#a06800" /> Automatic pre-registration (No daily booking)</li>
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={15} color="#a06800" /> Printable official Semester Pass with receipt</li>
              </ul>
            </div>
            <Link to="/login" className="btn-primary" style={{ width: "100%", textAlign: "center", textDecoration: "none", background: "#a06800" }}>
              Enroll in Ground Floor <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="features" className="landing-section">
        <div className="landing-section-head">
          <span className="landing-eyebrow">Capabilities</span>
          <h2>Everything the mess needs.<br />Nothing it doesn't.</h2>
          <p>Every button triggers a real API call backed by MongoDB. No mock data, no fake state.</p>
        </div>
        <div className="landing-features">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="landing-feature" style={{ transition: "all 0.2s" }}>
              <div className="landing-feature-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community & Inspection Banner */}
      <section style={{ maxWidth: 1100, margin: "0 auto 60px", padding: "0 20px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0b1f3a 0%, #0e7c66 100%)",
            color: "white",
            borderRadius: 20,
            padding: "32px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            boxShadow: "0 20px 40px rgba(11,31,58,0.15)"
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>
              <ShieldCheck size={14} color="#f5b942" /> IIIT Bhubaneswar Student Body
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 24, color: "white" }}>
              Meet the Mess Inspection Team (2026–27)
            </h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: 14, maxWidth: 540 }}>
              44 dedicated student inspectors monitoring daily hygiene, food quality, and raw ingredients. Join Swain Catters WhatsApp & follow @fete.iiit.
            </p>
          </div>
          <Link
            to="/society"
            className="landing-btn landing-btn-solid"
            style={{
              background: "#f5b942",
              color: "#0b1f3a",
              fontWeight: 700,
              padding: "12px 24px",
              boxShadow: "0 4px 14px rgba(245, 185, 66, 0.4)"
            }}
          >
            View Inspection Team & Channels <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="landing-section landing-section-dark">
        <div className="landing-section-head landing-section-head-light">
          <span className="landing-eyebrow landing-eyebrow-light">How it works</span>
          <h2>Three steps. Zero paperwork.</h2>
        </div>
        <div className="landing-steps">
          {steps.map((s) => (
            <div key={s.n} className="landing-step">
              <span className="landing-step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for Everyone / Roles */}
      <section id="roles" className="landing-section">
        <div className="landing-section-head">
          <span className="landing-eyebrow">Built for everyone</span>
          <h2>Four roles. One source of truth.</h2>
          <p>Each role sees exactly what it needs - and nothing more.</p>
        </div>
        <div className="landing-roles">
          {roles.map(({ icon: Icon, name, points }) => (
            <div key={name} className="landing-role">
              <Icon size={22} className="landing-role-icon" />
              <h3>{name}</h3>
              <ul>{points.map((p) => <li key={p}><Check size={14} /> {p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-section landing-testimonials">
        <div className="landing-section-head">
          <span className="landing-eyebrow">Student voices</span>
          <h2>What IIITians are saying</h2>
        </div>
        <div className="landing-quotes">
          {testimonials.map((t) => (
            <div key={t.name} className="landing-quote">
              <div className="landing-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <p>"{t.text}"</p>
              <div className="landing-quote-author">
                <div className="landing-quote-avatar">{t.name[0]}</div>
                <div><strong>{t.name}</strong><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2>Ready to skip the line?</h2>
          <p>Join hundreds of IIITians already dining smarter on CampusBite.</p>
          <div className="landing-hero-actions" style={{ justifyContent: "center" }}>
            <Link to="/register" className="landing-btn landing-btn-solid landing-btn-lg">Create free account <ArrowRight size={18} /></Link>
            <Link to="/login" className="landing-btn landing-btn-ghost-light landing-btn-lg">Sign in</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <img src="/favicon.svg" alt="" width="28" height="28" />
            <span>CampusBite</span>
            <p>Smarter Meals. Better Campus Living.</p>
          </div>
          <div className="landing-footer-cols">
            <div>
              <strong>Product</strong>
              <a href="#features">Features</a>
              <a href="#dual-system">Dual Mess</a>
              <a href="#how">How it works</a>
              <a href="#roles">Roles</a>
            </div>
            <div>
              <strong>Access</strong>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Register</Link>
              <Link to="/society">Mess Society & Inspection</Link>
            </div>
            <div>
              <strong>Institution</strong>
              <span>IIIT Bhubaneswar</span>
              <span>Gothapatna, Malipada</span>
              <span>Bhubaneswar, Odisha 751003</span>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span>Copyright 2026 CampusBite - IIIT Bhubaneswar</span>
          <span>Built for IIIT Bhubaneswar Mess Ecosystem</span>
        </div>
      </footer>
    </div>
  );
}
