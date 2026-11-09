import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useMeQuery,
  useTodayMenuQuery,
  useListAnnouncementsQuery,
  useUpcomingMenusQuery,
  useRunningBillQuery,
  useGroundFloorInfoQuery
} from "../../app/api.js";
import {
  Megaphone,
  Clock,
  Calendar,
  ArrowRight,
  Building2,
  Check,
  IndianRupee,
  UtensilsCrossed,
  ShieldCheck,
  Egg,
  Utensils,
  Cookie,
  Moon,
  Sparkles,
  Leaf,
  Flame,
  ChevronLeft,
  ChevronRight,
  Bell
} from "lucide-react";

const VISUALS = {
  breakfast: { bg: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)", color: "#78350f", Icon: Egg },
  lunch: { bg: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)", color: "#065f46", Icon: Utensils },
  snacks: { bg: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)", color: "#1e3a8a", Icon: Cookie },
  dinner: { bg: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)", color: "#4c1d95", Icon: Moon }
};

const MEAL_LABELS = { breakfast: "Breakfast", lunch: "Lunch", snacks: "Snacks", dinner: "Dinner" };

function getGreeting(name) {
  const hr = new Date().getHours();
  const firstName = name ? name.split(" ")[0] : "there";
  if (hr < 12) return `Good morning, ${firstName} ☀️`;
  if (hr < 17) return `Good afternoon, ${firstName} ⛅`;
  return `Good evening, ${firstName} 🌙`;
}

export default function DashboardPage() {
  const [upcomingPage, setUpcomingPage] = useState(1);
  const { data: me } = useMeQuery();
  const { data: today, isLoading } = useTodayMenuQuery();
  const { data: annData } = useListAnnouncementsQuery();
  const { data: upcomingData } = useUpcomingMenusQuery({ page: upcomingPage, limit: 3, days: 30 });
  const isStudent = me?.data?.user?.role === "student";
  const isGroundFloor = me?.data?.user?.messSystem === "ground_floor";
  const { data: runningData } = useRunningBillQuery(undefined, { skip: !isStudent || isGroundFloor });
  const { data: gfData } = useGroundFloorInfoQuery(undefined, { skip: !isGroundFloor });

  const user = me?.data?.user;
  const ctx = user?.context || {};
  const sessions = today?.data?.sessions || [];
  const announcements = (annData?.data?.announcements || []).slice(0, 3);
  const upcoming = upcomingData?.data?.menus || [];
  const runningBill = runningData?.data?.bill;
  const groundFloor = gfData?.data;

  return (
    <div className="page">
      {/* Personalized Hero Header Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #0b1f3a 0%, #0e7c66 100%)",
          color: "white",
          borderRadius: 20,
          padding: "28px 30px",
          marginBottom: 24,
          boxShadow: "0 12px 30px rgba(11,31,58,0.12)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>
              <Sparkles size={13} color="#f5b942" />
              IIIT Bhubaneswar Mess Portal
            </div>
            <h1 style={{ margin: "0 0 6px", fontSize: "clamp(22px, 3.5vw, 30px)", color: "white", fontWeight: 800 }}>
              {getGreeting(user?.name)}
            </h1>
            <p style={{ margin: 0, opacity: 0.85, fontSize: 13.5 }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {user?.hostel && <> • <strong>{user.hostel.name}</strong> • Room {user.roomNumber}</>}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              to="/menu"
              className="btn-primary"
              style={{
                background: "white",
                color: "#0b1f3a",
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 16px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <Utensils size={15} /> View Menu
            </Link>
            <Link
              to="/society"
              className="btn-small"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: 13,
                padding: "8px 16px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <ShieldCheck size={15} color="#f5b942" /> Mess Society
            </Link>
          </div>
        </div>
      </div>

      {/* Ground floor enrollment card */}
      {isGroundFloor && groundFloor && (
        <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid #a06800", background: "linear-gradient(180deg, #ffffff 0%, rgba(245,185,66,0.06) 100%)", padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Building2 size={20} color="#a06800" />
                <strong style={{ fontSize: 16, color: "#a06800" }}>Ground Floor Semester Plan</strong>
                <span className="pill pill-amber" style={{ fontSize: 10 }}>Prepaid Active</span>
              </div>
              {groundFloor.enrollment ? (
                <div style={{ display: "grid", gap: 4, fontSize: 13.5, color: "#475569" }}>
                  <div>
                    <strong>Included Meals:</strong> {groundFloor.enrollment.meals.map((m) => MEAL_LABELS[m]).join(", ")}
                  </div>
                  <div>
                    <strong>Semester Period:</strong> {new Date(groundFloor.enrollment.semesterStart).toLocaleDateString("en-IN")} to {new Date(groundFloor.enrollment.semesterEnd).toLocaleDateString("en-IN")}
                  </div>
                  <div>
                    <strong>Fee Paid:</strong> <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontWeight: 700, color: "#0b1f3a" }}><IndianRupee size={12} /> {groundFloor.enrollment.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                    Enrolled on {new Date(groundFloor.enrollment.paidAt).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: 13, color: "#dc2626" }}>No active enrollment found. Contact admin.</p>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to="/ground-floor/enroll" className="btn-primary" style={{ textDecoration: "none", background: "#a06800", padding: "8px 16px", fontSize: 13 }}>
                View Digital Pass
              </Link>
              <Link to="/menu" className="btn-small" style={{ textDecoration: "none", background: "#64748b" }}>
                View Menu
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Stats - 1st floor shows bill, ground floor shows enrollment */}
      {isStudent && !isGroundFloor && (
        <section className="stat-grid">
          <div className="stat-card" style={{ borderLeft: "4px solid #0e7c66" }}>
            <span>This month (live bill)</span>
            <strong>Rs. {runningBill?.total ?? 0}</strong>
            <small style={{ color: "#0e7c66", fontWeight: 600 }}>Updates on registration</small>
          </div>
          <div className="stat-card">
            <span>Meals this month</span>
            <strong>{ctx.attendanceThisMonth ?? 0}</strong>
            <small>Attended meals</small>
          </div>
          <div className="stat-card">
            <span>Current bill status</span>
            <strong>Rs. {ctx.currentBill?.total ?? 0}</strong>
            <small style={{ textTransform: "capitalize" }}>{ctx.currentBill?.status || "Running month"}</small>
          </div>
          <div className="stat-card">
            <span>Unread notices</span>
            <strong>{ctx.unreadNotifications ?? 0}</strong>
            <small>Check notification bell</small>
          </div>
        </section>
      )}

      {/* Quick Community / WhatsApp Alert Card */}
      <div
        style={{
          background: "linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%)",
          border: "1px solid #bbf7d0",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#25D366", color: "white", display: "grid", placeItems: "center" }}>
            <UtensilsCrossed size={18} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#166534" }}>
              Swain Catters (1st Floor) WhatsApp & Mess Society (@fete.iiit)
            </div>
            <div style={{ fontSize: 12, color: "#475569" }}>
              Join the official broadcast channel for daily food updates, counter crowd timings, and inspection reports.
            </div>
          </div>
        </div>
        <Link
          to="/society"
          className="btn-small"
          style={{
            background: "#128C7E",
            color: "white",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12.5
          }}
        >
          View Channels <ArrowRight size={13} />
        </Link>
      </div>

      {/* Today's menu / 1st floor registration panel */}
      {!isGroundFloor && (
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18, color: "#0b1f3a" }}>
              {isStudent ? "Today's Meals" : "Today's Menu"}
            </h2>
            <Link to="/menu" style={{ fontSize: 13, color: "#0e7c66", fontWeight: 600 }}>
              Full Weekly Menu →
            </Link>
          </div>

          {isLoading ? (
            <p>Loading today's menu...</p>
          ) : sessions.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: 32 }}>
              <p className="muted" style={{ margin: 0 }}>No menu published for today yet.</p>
            </div>
          ) : (
            <div className="meal-grid">
              {sessions.map((s) => {
                const visual = VISUALS[s.category] || VISUALS.lunch;
                const Icon = visual.Icon;
                const isReg = s.myRegistration?.status === "registered";
                const isAttended = s.myRegistration?.status === "attended";

                return (
                  <div key={s._id} className="meal-card" style={{ padding: 0, overflow: "hidden", border: "1px solid #e2e8e6", transition: "transform 0.15s" }}>
                    <div className="meal-card-visual" style={{ background: visual.bg, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Icon size={24} color={visual.color} />
                        <span style={{ fontWeight: 800, textTransform: "capitalize", color: visual.color, fontSize: 15 }}>
                          {s.category}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: visual.color }}>
                        {s.startTime} - {s.endTime}
                      </span>
                    </div>

                    <div style={{ padding: 16 }}>
                      {s.items && s.items.length > 0 ? (
                        <ul className="meal-items" style={{ margin: "0 0 12px" }}>
                          {s.items.slice(0, 3).map((item, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                              {item.dietary === "veg" && <Leaf size={12} color="#0e7c66" />}
                              {item.dietary === "non_veg" && <Flame size={12} color="#dc2626" />}
                              {item.name}
                            </li>
                          ))}
                          {s.items.length > 3 && <li className="muted" style={{ fontSize: 12 }}>+{s.items.length - 3} more items</li>}
                        </ul>
                      ) : (
                        <p className="muted" style={{ fontSize: 12, margin: "0 0 12px" }}>Menu items being prepared.</p>
                      )}

                      {isStudent && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                          <span className={"pill " + (isAttended ? "pill-green" : isReg ? "pill-green" : "pill-muted")}>
                            {isAttended ? "Attended" : isReg ? "Registered" : "Not registered"}
                          </span>
                          {!isReg && !isAttended && (
                            <Link to="/menu" style={{ fontSize: 12, color: "#0e7c66", fontWeight: 700 }}>
                              Register →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Upcoming menus - only for 1st floor students */}
      {isStudent && !isGroundFloor && upcoming.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, color: "#0b1f3a" }}>
                <Calendar size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                Upcoming Menus
              </h2>
              <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                Register for future meals in advance before cutoff
              </p>
            </div>
            <Link to="/menu" className="btn-small" style={{ textDecoration: "none" }}>
              Go to Menu Page
            </Link>
          </div>

          <div className="list">
            {upcoming.map((m) => {
              const totalItems = (m.meals || []).reduce((sum, meal) => sum + (meal.items?.length || 0), 0);
              return (
                <div key={m._id} className="card" style={{ marginBottom: 10, padding: "14px 18px", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: 15, color: "#0b1f3a" }}>
                        {new Date(m.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                      </h3>
                      <p className="muted" style={{ margin: "4px 0 0", fontSize: 12.5 }}>
                        {(m.sessions || []).map((s) => s.category).join(" • ")} • {totalItems} items
                      </p>
                    </div>
                    <Link to="/menu" className="btn-small" style={{ textDecoration: "none" }}>
                      View & Book
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {upcomingData?.meta?.pages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 16 }}>
              <button className="btn-small" disabled={upcomingPage <= 1} onClick={() => setUpcomingPage(upcomingPage - 1)}>
                <ChevronLeft size={14} style={{ verticalAlign: "middle" }} /> Previous
              </button>
              <span style={{ fontSize: 13, color: "#64748b" }}>{upcomingData.meta.page} / {upcomingData.meta.pages}</span>
              <button className="btn-small" disabled={upcomingPage >= upcomingData.meta.pages} onClick={() => setUpcomingPage(upcomingPage + 1)}>
                Next <ChevronRight size={14} style={{ verticalAlign: "middle" }} />
              </button>
            </div>
          )}
        </section>
      )}

      {/* Announcements */}
      {announcements.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, margin: "0 0 12px", color: "#0b1f3a" }}>
            <Megaphone size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            Campus Mess Announcements
          </h2>
          <div className="list">
            {announcements.map((a) => (
              <div key={a._id} className="card" style={{ marginBottom: 10, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 15, color: "#0b1f3a" }}>{a.title}</h3>
                  <span className={"pill " + (a.priority === "urgent" || a.priority === "high" ? "pill-amber" : "pill-muted")}>
                    {a.priority || "normal"}
                  </span>
                </div>
                <p style={{ margin: "6px 0", fontSize: 13.5, color: "#475569" }}>{a.body}</p>
                <p className="muted" style={{ margin: 0, fontSize: 11.5 }}>{new Date(a.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
