import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Users,
  Search,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  QrCode,
  Sparkles,
  ArrowLeft,
  UtensilsCrossed,
  CheckCircle2,
  Leaf,
  Info,
  Calendar,
  Building2,
  HelpCircle,
  X
} from "lucide-react";

// Official links
const WHATSAPP_CHANNEL_URL = "https://chat.whatsapp.com/LP5pZalXQIk6IEk11wgUNx";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/fete.iiit?igsh=MWZrNDJ1M29ka3duZw==";

// Inspection Team Roster Data
const SECOND_YEAR_INSPECTORS = [
  { name: "Puneet Pawar", id: "B525044", year: "2nd Year" },
  { name: "Preyamshubra Dolai", id: "B325031", year: "2nd Year" },
  { name: "Babar Mohiudin Mir", id: "B125160", year: "2nd Year" },
  { name: "Ashish Singh", id: "B225047", year: "2nd Year" },
  { name: "Om Gupta", id: "B425036", year: "2nd Year" },
  { name: "Samyabrata Jana", id: "B425046", year: "2nd Year" },
  { name: "Ranjan Kumar Nandi", id: "B125095", year: "2nd Year" },
  { name: "Md Rehan Fazal", id: "B225028", year: "2nd Year" },
  { name: "Pawan Sharma", id: "B225033", year: "2nd Year" },
  { name: "Jagadish Nayak", id: "B125053", year: "2nd Year" },
  { name: "Sarthak Kumar Rout", id: "B425048", year: "2nd Year" },
  { name: "Aditya Maurya", id: "B325005", year: "2nd Year" },
  { name: "Sajid Hameed", id: "B325080", year: "2nd Year" },
  { name: "Omm Prasad Sahani", id: "B225031", year: "2nd Year" },
  { name: "Aniket Behera", id: "B225003", year: "2nd Year" },
  { name: "Naitik Pandey", id: "B125072", year: "2nd Year" }
];

const FIRST_YEAR_INSPECTORS = [
  { name: "Swati Pragyna", id: "B126208", year: "1st Year" },
  { name: "Yash Hisaria", id: "B126233", year: "1st Year" },
  { name: "Samprita Mishra", id: "B126164", year: "1st Year" },
  { name: "Vedant Patidar", id: "B126226", year: "1st Year" },
  { name: "Senona Satapathy", id: "B126174", year: "1st Year" },
  { name: "Shreyan Sinha", id: "B126179", year: "1st Year" },
  { name: "Subhangshu Sekhar Pati", id: "B226065", year: "1st Year" },
  { name: "Bokara Dinesh", id: "B326026", year: "1st Year" },
  { name: "Pragyansh Mohanty", id: "B226040", year: "1st Year" },
  { name: "Pratyush Kumar Rout", id: "B226042", year: "1st Year" },
  { name: "Sashikanta Mohanty", id: "B426058", year: "1st Year" },
  { name: "Spandan Pattanayak", id: "B226063", year: "1st Year" },
  { name: "Swayam Sahoo", id: "B226070", year: "1st Year" },
  { name: "Ved Kapoor", id: "B226077", year: "1st Year" },
  { name: "Nilabh Shivam", id: "B226035", year: "1st Year" },
  { name: "Vikas Sihag", id: "B226078", year: "1st Year" },
  { name: "Jyoti Prakash Samal", id: "B126098", year: "1st Year" },
  { name: "Rohan Kumar Ghadái", id: "B126154", year: "1st Year" },
  { name: "Piyush Kumar Pradhan", id: "B126129", year: "1st Year" },
  { name: "Pragyan Parimita Behera", id: "B126133", year: "1st Year" },
  { name: "Pradhumn Pratap Singh", id: "B126132", year: "1st Year" },
  { name: "Ommkar Dash", id: "B126122", year: "1st Year" },
  { name: "Pratyusha Kindo", id: "B126136", year: "1st Year" },
  { name: "Hansika Aarya", id: "B326031", year: "1st Year" },
  { name: "Om Prava Sahoo", id: "B126120", year: "1st Year" },
  { name: "Gourav Kumar Sahoo", id: "B126089", year: "1st Year" },
  { name: "F.S. Yameen", id: "B126085", year: "1st Year" },
  { name: "Kirtikabya Mahapatra", id: "B326035", year: "1st Year" }
];

const ALL_INSPECTORS = [...SECOND_YEAR_INSPECTORS, ...FIRST_YEAR_INSPECTORS];

// SVG Icon for WhatsApp
function WhatsAppIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.101-.477-.15-.678.15-.2.3-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.055 1.03-1.055 2.511 1.08 2.912 1.23 3.113c.15.2 2.126 3.246 5.15 4.554.72.31 1.282.496 1.72.635.723.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.9.53 3.68 1.45 5.21L2 22l4.98-1.49a9.92 9.92 0 0 0 5.06 1.39h.01c5.5 0 9.96-4.46 9.96-9.95 0-2.66-1.03-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2zm0 18.25h-.01a8.27 8.27 0 0 1-4.22-1.16l-.3-.18-3.13.94.96-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.53c0-4.56 3.71-8.27 8.28-8.27 2.21 0 4.29.86 5.85 2.42a8.23 8.23 0 0 1 2.42 5.85c0 4.57-3.71 8.28-8.28 8.28z" />
    </svg>
  );
}

// Resilient Logo Image that attempts multiple common image formats (.png, .jpg, .jpeg, .svg)
// before gracefully displaying a fallback institute / society badge
function LogoImage({ filenames = [], alt, fallbackLabel, fallbackSub, badgeColor = "#0e7c66" }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const currentSrc = filenames[srcIndex];

  const handleError = () => {
    if (srcIndex + 1 < filenames.length) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed || !currentSrc) {
    return (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `linear-gradient(135deg, #0b1f3a 0%, ${badgeColor} 100%)`,
          display: "grid",
          placeItems: "center",
          color: "white",
          boxShadow: "0 6px 16px rgba(11,31,58,0.15)",
          border: "2px solid rgba(255,255,255,0.8)",
          flexShrink: 0
        }}
        title={alt}
      >
        <div style={{ textAlign: "center", padding: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1 }}>{fallbackLabel}</div>
          <div style={{ fontSize: 8, opacity: 0.85, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>{fallbackSub}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      style={{
        width: 64,
        height: 64,
        objectFit: "contain",
        borderRadius: 16,
        background: "white",
        padding: 4,
        boxShadow: "0 4px 12px rgba(11,31,58,0.08)",
        border: "1px solid #e2e8e6",
        flexShrink: 0
      }}
    />
  );
}

export default function MessSocietyPage({ isPublic = false }) {
  const user = useSelector((s) => s.auth?.user);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showQrModal, setShowQrModal] = useState(null); // 'whatsapp' | 'instagram' | null
  const [copiedLink, setCopiedLink] = useState(null);

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(label);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedLink(null), 2500);
    } catch {
      toast.info(`Link: ${text}`);
    }
  };

  const filteredInspectors = useMemo(() => {
    let list = ALL_INSPECTORS;
    if (activeTab === "2nd") {
      list = SECOND_YEAR_INSPECTORS;
    } else if (activeTab === "1st") {
      list = FIRST_YEAR_INSPECTORS;
    }

    if (!search.trim()) return list;

    const q = search.trim().toLowerCase();
    return list.filter(
      (m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
    );
  }, [activeTab, search]);

  return (
    <div className={isPublic ? "landing" : "page"} style={isPublic ? { minHeight: "100vh", paddingBottom: 60 } : {}}>
      {/* Standalone navigation header for public visitors */}
      {isPublic && (
        <header className="landing-nav" style={{ borderBottom: "1px solid rgba(226, 232, 230, 0.8)", background: "rgba(246, 248, 247, 0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
          <Link to="/" className="landing-brand">
            <img src="/favicon.svg" alt="" width="32" height="32" />
            <span>CampusBite</span>
          </Link>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to="/" className="landing-btn landing-btn-ghost" style={{ fontSize: 13 }}>
              <ArrowLeft size={15} /> Back to Home
            </Link>
            <Link to="/login" className="landing-btn landing-btn-solid" style={{ fontSize: 13 }}>
              Sign In
            </Link>
          </div>
        </header>
      )}

      <div style={{ maxWidth: 1100, margin: isPublic ? "32px auto 0" : "0 auto", padding: isPublic ? "0 20px" : 0 }}>
        {/* ================= HERO HEADER ================= */}
        <div
          style={{
            background: "linear-gradient(135deg, #0b1f3a 0%, #0e7c66 100%)",
            color: "white",
            borderRadius: 20,
            padding: "36px 32px",
            marginBottom: 28,
            boxShadow: "0 16px 40px rgba(11,31,58,0.18)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle geometric background motif */}
          <div
            style={{
              position: "absolute",
              right: -30,
              top: -30,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: "1 1 500px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.14)",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  marginBottom: 14,
                  backdropFilter: "blur(6px)"
                }}
              >
                <ShieldCheck size={14} color="#f5b942" />
                IIIT Bhubaneswar • Official Student Body
              </div>
              <h1 style={{ margin: "0 0 10px", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "white", fontWeight: 800, letterSpacing: -0.5 }}>
                Mess Society & Inspection Team
              </h1>
              <p style={{ margin: 0, fontSize: 15, opacity: 0.9, lineHeight: 1.6, maxWidth: 620 }}>
                Dedicated to maintaining food hygiene, raw material freshness, nutritional standards, and resolving all student mess grievances across campus dining halls for tenure <strong>2026–2027</strong>.
              </p>
            </div>

            {/* Institution & Society Twin Logos */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(255,255,255,0.1)",
                padding: "14px 20px",
                borderRadius: 18,
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <LogoImage
                  filenames={[
                    "/logos/iiit-logo.png",
                    "/logos/iiit-logo.jpg",
                    "/logos/iiit-logo.jpeg",
                    "/logos/iiit-logo.svg",
                    "/iiit-logo.png"
                  ]}
                  alt="IIIT Bhubaneswar Logo"
                  fallbackLabel="IIIT-BH"
                  fallbackSub="Institute"
                  badgeColor="#0b1f3a"
                />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>IIIT-BH</span>
              </div>

              <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.25)" }} />

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <LogoImage
                  filenames={[
                    "/logos/mess-society-logo.png",
                    "/logos/mess-society-logo.jpg",
                    "/logos/mess-society-logo.jpeg",
                    "/logos/mess-society-logo.svg",
                    "/mess-society-logo.png"
                  ]}
                  alt="Mess Society Logo"
                  fallbackLabel="FETE"
                  fallbackSub="Mess Soc."
                  badgeColor="#a06800"
                />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>Mess Society</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SOCIAL CHANNELS SECTION ================= */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 20, margin: "0 0 4px", color: "#0b1f3a" }}>
              Official Community & Channels
            </h2>
            <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
              Connect with 1st Floor mess operators and follow the official Mess Society channel for instantaneous updates.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {/* WHATSAPP CARD */}
            <div
              className="card"
              style={{
                padding: 24,
                border: "2px solid #25D36630",
                background: "linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "#25D366",
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 6px 14px rgba(37, 211, 102, 0.3)"
                    }}
                  >
                    <WhatsAppIcon size={26} color="white" />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                      background: "rgba(37, 211, 102, 0.15)",
                      color: "#166534",
                      padding: "4px 10px",
                      borderRadius: 20
                    }}
                  >
                    1st Floor Mess • Scatters
                  </span>
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: 18, color: "#0b1f3a" }}>
                  Swain Catters (Scatters) WhatsApp Channel
                </h3>
                <p style={{ color: "#475569", fontSize: 13.5, margin: "0 0 16px", lineHeight: 1.55 }}>
                  Official announcement channel for <strong>Swain Catters (1st Floor Mess)</strong>. Get daily special meal broadcasts, live counter timings, menu changes, and instant notifications.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                  <a
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      background: "#128C7E",
                      flex: "1 1 auto",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      fontSize: 13.5,
                      textDecoration: "none"
                    }}
                  >
                    <WhatsAppIcon size={18} color="white" />
                    Join WhatsApp Channel <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => copyToClipboard(WHATSAPP_CHANNEL_URL, "WhatsApp Invite Link")}
                    className="btn-small"
                    style={{
                      background: "white",
                      color: "#166534",
                      border: "1px solid #bbf7d0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5
                    }}
                    title="Copy Link"
                  >
                    {copiedLink === "WhatsApp Invite Link" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedLink === "WhatsApp Invite Link" ? "Copied" : "Copy"}
                  </button>

                  <button
                    onClick={() => setShowQrModal("whatsapp")}
                    className="btn-small"
                    style={{
                      background: "white",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5
                    }}
                    title="Show QR Code"
                  >
                    <QrCode size={14} /> QR
                  </button>
                </div>

                <div style={{ fontSize: 11.5, color: "#166534", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={13} /> Recommended for all 1st Floor diners
                </div>
              </div>
            </div>

            {/* INSTAGRAM CARD */}
            <div
              className="card"
              style={{
                padding: 24,
                border: "2px solid rgba(225, 48, 108, 0.25)",
                background: "linear-gradient(180deg, #ffffff 0%, #fff1f2 100%)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 6px 14px rgba(225, 48, 108, 0.3)"
                    }}
                  >
                    <Instagram size={26} color="white" />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                      background: "rgba(225, 48, 108, 0.12)",
                      color: "#9f1239",
                      padding: "4px 10px",
                      borderRadius: 20
                    }}
                  >
                    Official Handle
                  </span>
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: 18, color: "#0b1f3a" }}>
                  Mess Society (@fete.iiit)
                </h3>
                <p style={{ color: "#475569", fontSize: 13.5, margin: "0 0 16px", lineHeight: 1.55 }}>
                  Official Instagram handle of the <strong>Mess Society of IIIT Bhubaneswar</strong>. Follow for festival feasts, menu redesign polls, food committee activities, and kitchen hygiene highlights.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      background: "linear-gradient(90deg, #c13584 0%, #e1306c 100%)",
                      flex: "1 1 auto",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      fontSize: 13.5,
                      textDecoration: "none"
                    }}
                  >
                    <Instagram size={17} color="white" />
                    Follow @fete.iiit <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => copyToClipboard(INSTAGRAM_PROFILE_URL, "Instagram Profile Link")}
                    className="btn-small"
                    style={{
                      background: "white",
                      color: "#9f1239",
                      border: "1px solid #fecdd3",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5
                    }}
                    title="Copy Link"
                  >
                    {copiedLink === "Instagram Profile Link" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedLink === "Instagram Profile Link" ? "Copied" : "Copy"}
                  </button>

                  <button
                    onClick={() => setShowQrModal("instagram")}
                    className="btn-small"
                    style={{
                      background: "white",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5
                    }}
                    title="Show QR Code"
                  >
                    <QrCode size={14} /> QR
                  </button>
                </div>

                <div style={{ fontSize: 11.5, color: "#9f1239", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <Sparkles size={13} /> Official updates, festival celebrations & stories
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OFFICIAL MANDATE STATEMENT ================= */}
        <section style={{ marginBottom: 32 }}>
          <div
            className="card"
            style={{
              padding: 24,
              borderLeft: "4px solid #0e7c66",
              background: "white",
              boxShadow: "0 4px 16px rgba(11,31,58,0.06)"
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(14,124,102,0.12)",
                  color: "#0e7c66",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, color: "#0b1f3a", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  Official Directive — Mess Inspection Team (2026–27)
                  <span className="pill pill-green" style={{ fontSize: 11 }}>Active Mandate</span>
                </h3>

                <p style={{ margin: "0 0 12px", fontSize: 14, color: "#334155", lineHeight: 1.65, fontWeight: 500 }}>
                  “The team will conduct rotational inspections across messes to monitor food quality, ingredient freshness, hygiene, and cleanliness. They will also help collect menu suggestions and address student concerns.”
                </p>

                <p style={{ margin: 0, fontSize: 13.5, color: "#0e7c66", fontWeight: 600, background: "rgba(14,124,102,0.06)", padding: "10px 14px", borderRadius: 8, border: "1px dashed rgba(14,124,102,0.3)" }}>
                  💡 <strong>Student Advisory:</strong> We request all students to cooperate with the inspection team and approach them whenever they face any mess-related concerns.
                </p>
              </div>
            </div>

            {/* 4 Pillars of Inspection */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid #e2e8e6"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f1f5f9", display: "grid", placeItems: "center", color: "#0e7c66" }}>
                  <UtensilsCrossed size={15} />
                </div>
                <span><strong>Food Quality</strong> & Taste sampling</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f1f5f9", display: "grid", placeItems: "center", color: "#0e7c66" }}>
                  <Leaf size={15} />
                </div>
                <span><strong>Ingredient Freshness</strong> verification</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f1f5f9", display: "grid", placeItems: "center", color: "#0e7c66" }}>
                  <Sparkles size={15} />
                </div>
                <span><strong>Hygiene & Cleanliness</strong> audits</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f1f5f9", display: "grid", placeItems: "center", color: "#0e7c66" }}>
                  <Users size={15} />
                </div>
                <span><strong>Student Grievance</strong> assistance</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INSPECTION TEAM ROSTER ================= */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, margin: "0 0 4px", color: "#0b1f3a" }}>
                Mess Inspection Team (2026–27)
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
                Official rotational student inspectors representing 2nd Year & 1st Year batches.
              </p>
            </div>

            {/* Live Search Bar */}
            <div style={{ position: "relative", minWidth: 260 }}>
              <Search size={16} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search inspector or ID..."
                style={{
                  padding: "9px 12px 9px 36px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 13.5,
                  width: "100%",
                  outline: "none",
                  background: "white"
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                    color: "#94a3b8"
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("all")}
              className={`chip ${activeTab === "all" ? "chip-active" : ""}`}
              style={{ fontSize: 13 }}
            >
              All Inspectors ({ALL_INSPECTORS.length})
            </button>
            <button
              onClick={() => setActiveTab("2nd")}
              className={`chip ${activeTab === "2nd" ? "chip-active" : ""}`}
              style={{ fontSize: 13 }}
            >
              2nd Year Inspectors ({SECOND_YEAR_INSPECTORS.length})
            </button>
            <button
              onClick={() => setActiveTab("1st")}
              className={`chip ${activeTab === "1st" ? "chip-active" : ""}`}
              style={{ fontSize: 13 }}
            >
              1st Year Inspectors ({FIRST_YEAR_INSPECTORS.length})
            </button>
          </div>

          {/* Inspectors Grid */}
          {filteredInspectors.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
              <HelpCircle size={36} color="#94a3b8" style={{ margin: "0 auto 10px" }} />
              <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>No inspectors match "{search}"</h3>
              <p className="muted" style={{ margin: "0 0 14px", fontSize: 13 }}>Try searching with a different name or roll number (e.g. B125 or B126).</p>
              <button className="btn-small" onClick={() => setSearch("")}>Clear Search</button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 14
              }}
            >
              {filteredInspectors.map((inspector, index) => {
                const isSecondYear = inspector.year === "2nd Year";
                const initials = inspector.name
                  .split(" ")
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("");

                return (
                  <div
                    key={inspector.id + "-" + index}
                    className="card"
                    style={{
                      padding: "16px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "transform 0.15s, box-shadow 0.15s",
                      border: "1px solid #e2e8e6",
                      background: "white"
                    }}
                  >
                    {/* Avatar Badge */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: isSecondYear
                          ? "linear-gradient(135deg, #0b1f3a 0%, #1e3a8a 100%)"
                          : "linear-gradient(135deg, #0e7c66 0%, #10a37f 100%)",
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: 0.5,
                        flexShrink: 0
                      }}
                    >
                      {initials}
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 10,
                            background: isSecondYear ? "rgba(30, 58, 138, 0.1)" : "rgba(14, 124, 102, 0.1)",
                            color: isSecondYear ? "#1e3a8a" : "#0e7c66"
                          }}
                        >
                          {inspector.year}
                        </span>
                        <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", fontWeight: 600 }}>
                          {inspector.id}
                        </span>
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#0f172a",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        title={inspector.name}
                      >
                        {inspector.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= LOGO STORAGE HELPER NOTE ================= */}
        <section>
          <div
            style={{
              padding: "16px 20px",
              background: "#f8fafc",
              borderRadius: 14,
              border: "1px solid #e2e8e6",
              fontSize: 12.5,
              color: "#64748b",
              display: "flex",
              alignItems: "flex-start",
              gap: 12
            }}
          >
            <Info size={18} color="#0e7c66" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ color: "#0f172a" }}>Image Logo Storage Note:</strong> To display your personal logo files on this page, copy:
              <br />
              1. <code>iiit-logo.png</code> (IIIT Bhubaneswar logo)
              <br />
              2. <code>mess-society-logo.png</code> (Mess Society logo)
              <br />
              Into your project folder at: <code>frontend/public/logos/</code>. The page automatically detects and renders them in high resolution!
            </div>
          </div>
        </section>
      </div>

      {/* ================= QR CODE MODAL ================= */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
            zIndex: 99999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 28,
              borderRadius: 20,
              maxWidth: 360,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 17, color: "#0b1f3a" }}>
                {showQrModal === "whatsapp" ? "Scan to Join WhatsApp" : "Scan to Follow Instagram"}
              </h3>
              <button
                onClick={() => setShowQrModal(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b", padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            <p className="muted" style={{ fontSize: 13, margin: "0 0 16px" }}>
              {showQrModal === "whatsapp"
                ? "Scan with your phone camera to join Swain Catters (1st Floor) WhatsApp Channel."
                : "Scan with your phone camera to follow @fete.iiit on Instagram."}
            </p>

            <div
              style={{
                display: "inline-block",
                padding: 16,
                background: "white",
                borderRadius: 14,
                border: "1px solid #e2e8e6",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                marginBottom: 16
              }}
            >
              <QRCodeSVG
                value={showQrModal === "whatsapp" ? WHATSAPP_CHANNEL_URL : INSTAGRAM_PROFILE_URL}
                size={200}
                level="M"
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  const url = showQrModal === "whatsapp" ? WHATSAPP_CHANNEL_URL : INSTAGRAM_PROFILE_URL;
                  const label = showQrModal === "whatsapp" ? "WhatsApp Invite" : "Instagram Profile";
                  copyToClipboard(url, label);
                }}
                className="btn-primary"
                style={{ flex: 1, fontSize: 13 }}
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowQrModal(null)}
                className="btn-small"
                style={{ background: "#64748b" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
