import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpcomingMenusQuery, useRegisterMealMutation, useCancelRegistrationMutation, useMyRegistrationsQuery } from "../../app/api.js";
import { toast } from "sonner";
import {
  Clock, Leaf, Flame, ChevronLeft, ChevronRight, Egg, Utensils, Cookie, Moon,
  CheckCircle2, Building2, Calendar, AlertCircle, Sparkles, Filter
} from "lucide-react";

const VISUALS = {
  breakfast: { bg: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)", color: "#78350f", Icon: Egg },
  lunch: { bg: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)", color: "#065f46", Icon: Utensils },
  snacks: { bg: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)", color: "#1e3a8a", Icon: Cookie },
  dinner: { bg: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)", color: "#4c1d95", Icon: Moon }
};

const MEAL_LABELS = { breakfast: "Breakfast", lunch: "Lunch", snacks: "Snacks", dinner: "Dinner" };

export default function MenuPage() {
  const user = useSelector((s) => s.auth.user);
  const isGroundFloor = user?.messSystem === "ground_floor";
  const [page, setPage] = useState(1);
  const [dietFilter, setDietFilter] = useState("all"); // 'all' | 'veg' | 'non_veg'
  const { data, isLoading, refetch } = useUpcomingMenusQuery({ page, limit: 3, days: 30 });
  const { data: regData, refetch: refetchRegs } = useMyRegistrationsQuery();
  const [register] = useRegisterMealMutation();
  const [cancel] = useCancelRegistrationMutation();
  const [busy, setBusy] = useState(null);

  const menus = data?.data?.menus || [];
  const meta = data?.meta || { page: 1, pages: 0, total: 0 };
  const allRegs = regData?.data?.registrations || [];

  // Extract meals included in GF plan from any myRegistration that has isGroundFloor
  const gfMeals = (() => {
    if (!isGroundFloor) return [];
    const meals = new Set();
    for (const menu of menus) {
      for (const s of menu.sessions || []) {
        if (s.myRegistration?.isGroundFloor && s.myRegistration?.status === "registered") {
          meals.add(s.category);
        }
      }
    }
    return [...meals];
  })();

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcomingRegistered = allRegs.filter((r) => {
    const sessionDate = r.session?.date ? new Date(r.session.date) : new Date(r.date);
    sessionDate.setHours(0, 0, 0, 0);
    return r.status === "registered" && sessionDate >= today;
  });

  const handleRegister = async (sessionId) => {
    setBusy(sessionId);
    try {
      await register({ sessionId }).unwrap();
      toast.success("Registered. Amount added to running bill.");
      await Promise.all([refetch(), refetchRegs()]);
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    } finally { setBusy(null); }
  };

  const handleCancel = async (registrationId) => {
    if (!confirm("Cancel this meal registration?")) return;
    setBusy(registrationId);
    try {
      await cancel(registrationId).unwrap();
      toast.success("Cancelled successfully");
      await Promise.all([refetch(), refetchRegs()]);
    } catch (err) {
      toast.error(err?.data?.message || "Cancellation failed");
    } finally { setBusy(null); }
  };

  const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();
  const isTomorrow = (date) => {
    const t = new Date(); t.setDate(t.getDate() + 1);
    return new Date(date).toDateString() === t.toDateString();
  };

  return (
    <div className="page">
      <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: "clamp(20px, 3vw, 26px)", color: "#0b1f3a" }}>
            {isGroundFloor ? "Menu — Semester Plan" : "Daily Menu & Meal Booking"}
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            {isGroundFloor
              ? "Your meals are pre-registered as part of your semester plan. Just show up to eat."
              : "Register before cutoff window. Cancel anytime before cancellation cutoff to avoid charges."}
          </p>
        </div>

        {/* Dietary preference filter pills */}
        <div style={{ display: "flex", gap: 6, background: "white", padding: 4, borderRadius: 10, border: "1px solid #e2e8e6" }}>
          <button
            onClick={() => setDietFilter("all")}
            className={`chip ${dietFilter === "all" ? "chip-active" : ""}`}
            style={{ fontSize: 12, padding: "4px 10px", border: "none" }}
          >
            All Items
          </button>
          <button
            onClick={() => setDietFilter("veg")}
            className={`chip ${dietFilter === "veg" ? "chip-active" : ""}`}
            style={{ fontSize: 12, padding: "4px 10px", border: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <Leaf size={12} color={dietFilter === "veg" ? "white" : "#0e7c66"} /> Veg Only
          </button>
          <button
            onClick={() => setDietFilter("non_veg")}
            className={`chip ${dietFilter === "non_veg" ? "chip-active" : ""}`}
            style={{ fontSize: 12, padding: "4px 10px", border: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <Flame size={12} color={dietFilter === "non_veg" ? "white" : "#dc2626"} /> Non-Veg
          </button>
        </div>
      </header>

      {/* Ground Floor Plan Banner */}
      {isGroundFloor && gfMeals.length > 0 && (
        <div className="card" style={{ marginBottom: 20, borderLeft: "4px solid #a06800", background: "linear-gradient(90deg, rgba(245,185,66,0.08) 0%, #ffffff 100%)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Building2 size={18} color="#a06800" />
            <strong style={{ fontSize: 15, color: "#a06800" }}>Ground Floor Semester Plan Active</strong>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: "#475569" }}>
            You are pre-registered for: <strong>{gfMeals.map((m) => MEAL_LABELS[m] || m).join(", ")}</strong> — every day of the semester. No daily booking required!
          </p>
        </div>
      )}

      {/* 1st Floor Registered Meals Drawer */}
      {!isGroundFloor && upcomingRegistered.length > 0 && (
        <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid #0e7c66", background: "linear-gradient(90deg, rgba(14,124,102,0.04) 0%, #ffffff 100%)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle2 size={18} color="#0e7c66" />
              <h3 style={{ margin: 0, fontSize: 15, color: "#0b1f3a" }}>Your Booked Meals ({upcomingRegistered.length})</h3>
            </div>
            <span style={{ fontSize: 11.5, color: "#0e7c66", fontWeight: 700 }}>Active Registrations</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
            {upcomingRegistered.map((r) => {
              const sessionDate = r.session?.date ? new Date(r.session.date) : new Date(r.date);
              return (
                <div key={r._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "white", borderRadius: 8, border: "1px solid #e2e8e6", fontSize: 13, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div>
                    <strong style={{ textTransform: "capitalize", color: "#0b1f3a" }}>{r.session?.category || "meal"}</strong>
                    <div style={{ color: "#64748b", fontSize: 11.5, marginTop: 1 }}>
                      {sessionDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </div>
                  </div>
                  <span style={{ fontSize: 11.5, color: "#0e7c66", fontWeight: 700, background: "rgba(14,124,102,0.1)", padding: "3px 8px", borderRadius: 6 }}>
                    {r.session?.startTime && r.session?.endTime ? `${r.session.startTime} - ${r.session.endTime}` : "Booked"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Loading menus...</p>
      ) : menus.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <Calendar size={36} color="#94a3b8" style={{ margin: "0 auto 12px" }} />
          <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>No upcoming menus published</h3>
          <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>The mess committee will publish menus for the upcoming days shortly.</p>
        </div>
      ) : (
        <>
          {menus.map((menu) => (
            <section key={menu._id} style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <h2 style={{ margin: 0, fontSize: 19, color: "#0b1f3a", fontWeight: 800 }}>
                  {new Date(menu.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                </h2>
                {isToday(menu.date) && <span className="pill pill-green">Today</span>}
                {isTomorrow(menu.date) && <span className="pill pill-amber">Tomorrow</span>}
              </div>

              <div className="meal-grid">
                {menu.sessions.map((s) => {
                  const isGfReg = s.myRegistration?.isGroundFloor === true && s.myRegistration?.status === "registered";
                  const isReg = s.myRegistration?.status === "registered";
                  const isAttended = s.myRegistration?.status === "attended";
                  const isEnrolledMeal = isGroundFloor && (isGfReg || isAttended);
                  const visual = VISUALS[s.category] || VISUALS.lunch;
                  const Icon = visual.Icon;

                  // Filter items based on dietFilter
                  const filteredItems = (s.items || []).filter((item) => {
                    if (dietFilter === "veg") return item.dietary === "veg";
                    if (dietFilter === "non_veg") return item.dietary === "non_veg";
                    return true;
                  });

                  return (
                    <div key={s._id} className="meal-card" style={{ padding: 0, overflow: "hidden", border: "1px solid #e2e8e6", transition: "transform 0.15s, box-shadow 0.15s" }}>
                      {/* Top Visual Banner */}
                      <div className="meal-card-visual" style={{ background: visual.bg, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Icon size={24} color={visual.color} />
                          <h3 style={{ textTransform: "capitalize", margin: 0, color: visual.color, fontSize: 16, fontWeight: 800 }}>
                            {s.category}
                          </h3>
                        </div>
                        {!isGroundFloor && (
                          <span style={{ fontSize: 16, fontWeight: 800, color: visual.color }}>
                            Rs. {s.unitPrice}
                          </span>
                        )}
                        {isGroundFloor && (
                          <span style={{ fontSize: 11, fontWeight: 800, color: visual.color, background: "rgba(255,255,255,0.4)", padding: "2px 8px", borderRadius: 10 }}>
                            IN PLAN
                          </span>
                        )}
                      </div>

                      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
                        <p className="muted meal-time" style={{ margin: "0 0 12px", fontSize: 12.5 }}>
                          <Clock size={13} /> {s.startTime} – {s.endTime}
                        </p>

                        {/* Dish items */}
                        {filteredItems.length > 0 ? (
                          <ul className="meal-items" style={{ margin: "0 0 16px" }}>
                            {filteredItems.map((item, i) => (
                              <li key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#334155" }}>
                                {item.dietary === "veg" && <Leaf size={13} color="#0e7c66" />}
                                {item.dietary === "non_veg" && <Flame size={13} color="#dc2626" />}
                                <span>{item.name}</span>
                              </li>
                            ))}
                          </ul>
                        ) : s.items && s.items.length > 0 ? (
                          <p className="muted" style={{ fontSize: 12.5, margin: "0 0 16px", fontStyle: "italic" }}>
                            No {dietFilter === "veg" ? "veg" : "non-veg"} items in this slot.
                          </p>
                        ) : (
                          <p className="muted" style={{ fontSize: 12.5, margin: "0 0 16px" }}>Menu items being prepared.</p>
                        )}

                        <div className="meal-status-row" style={{ marginTop: "auto", marginBottom: 12 }}>
                          {isAttended ? (
                            <span className="pill pill-green">Attended</span>
                          ) : isGfReg ? (
                            <span className="pill pill-green">Registered (Semester Plan)</span>
                          ) : isReg ? (
                            <span className="pill pill-green">Registered</span>
                          ) : s.registrationOpen ? (
                            <span className="pill pill-muted">Booking Open</span>
                          ) : (
                            <span className="pill pill-amber">Booking Closed</span>
                          )}
                        </div>

                        {/* 1st floor actions */}
                        {!isGroundFloor && isReg && !isAttended && s.cancellationOpen && (
                          <button
                            className="btn"
                            style={{ background: "#dc2626", fontSize: 13 }}
                            disabled={busy === s.myRegistration._id}
                            onClick={() => handleCancel(s.myRegistration._id)}
                          >
                            {busy === s.myRegistration._id ? "Cancelling..." : "Cancel Booking"}
                          </button>
                        )}

                        {!isGroundFloor && !isReg && !isAttended && s.registrationOpen && (
                          <button
                            className="btn"
                            disabled={busy === s._id}
                            onClick={() => handleRegister(s._id)}
                            style={{ fontSize: 13 }}
                          >
                            {busy === s._id ? "Registering..." : `Register (Rs. ${s.unitPrice})`}
                          </button>
                        )}

                        {!isGroundFloor && !isReg && !isAttended && !s.registrationOpen && (
                          <p className="meal-cutoff-note" style={{ color: "#64748b" }}>
                            Registration window passed
                          </p>
                        )}

                        {/* Ground floor notes */}
                        {isGroundFloor && !isEnrolledMeal && (
                          <p className="meal-cutoff-note" style={{ color: "#a06800" }}>
                            Not selected in your semester plan
                          </p>
                        )}

                        {isGroundFloor && isEnrolledMeal && !isAttended && (
                          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#0e7c66", fontStyle: "italic", fontWeight: 600 }}>
                            Prepaid — Show up to eat!
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {meta.pages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <button
                className="btn-small"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 14px" }}
              >
                <ChevronLeft size={15} /> Previous Days
              </button>
              <span style={{ fontSize: 13.5, color: "#64748b", fontWeight: 600 }}>
                Page {meta.page} of {meta.pages} ({meta.total} days)
              </span>
              <button
                className="btn-small"
                disabled={page >= meta.pages}
                onClick={() => setPage(page + 1)}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 14px" }}
              >
                Next Days <ChevronRight size={15} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
