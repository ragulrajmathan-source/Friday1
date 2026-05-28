import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#060B14", surface: "#0D1523", surfaceLight: "#131E30", border: "#1E2D45",
  neonBlue: "#00D4FF", neonPurple: "#9D4EDD", neonGreen: "#00FF88",
  neonPink: "#FF0080", neonOrange: "#FF8C00",
  textPrimary: "#FFFFFF", textSecondary: "#7A8FA8", textMuted: "#3D5068",
};

const FOODS = [
  { name: "Idli (1 piece)", cal: 58, p: 2, c: 11, f: 0.5, cat: "Breakfast" },
  { name: "Dosa (medium)", cal: 168, p: 3.5, c: 28, f: 5, cat: "Breakfast" },
  { name: "Masala Dosa", cal: 260, p: 5, c: 42, f: 8, cat: "Breakfast" },
  { name: "Upma (1 bowl)", cal: 180, p: 4, c: 32, f: 5, cat: "Breakfast" },
  { name: "Poha (1 bowl)", cal: 158, p: 3, c: 28, f: 4, cat: "Breakfast" },
  { name: "Paratha (1 medium)", cal: 126, p: 3, c: 18, f: 5, cat: "Breakfast" },
  { name: "Aloo Paratha", cal: 180, p: 3.5, c: 25, f: 8, cat: "Breakfast" },
  { name: "Oats (1 bowl)", cal: 150, p: 5, c: 27, f: 3, cat: "Breakfast" },
  { name: "Rice (1 cup cooked)", cal: 205, p: 4.3, c: 44.5, f: 0.4, cat: "Main Course" },
  { name: "Chapati (1 medium)", cal: 71, p: 2.5, c: 12, f: 1.5, cat: "Main Course" },
  { name: "Roti (1 medium)", cal: 70, p: 2.4, c: 12, f: 1.2, cat: "Main Course" },
  { name: "Naan (medium)", cal: 262, p: 7, c: 45, f: 6, cat: "Main Course" },
  { name: "Biryani (1 plate)", cal: 450, p: 15, c: 65, f: 15, cat: "Main Course" },
  { name: "Chicken Biryani (1 plate)", cal: 550, p: 25, c: 65, f: 20, cat: "Main Course" },
  { name: "Sweet Potato (medium)", cal: 130, p: 2, c: 30, f: 0.1, cat: "Main Course" },
  { name: "Chicken Curry (1 cup)", cal: 220, p: 22, c: 8, f: 12, cat: "Curry" },
  { name: "Butter Chicken (1 cup)", cal: 320, p: 20, c: 12, f: 22, cat: "Curry" },
  { name: "Paneer Curry (1 cup)", cal: 280, p: 18, c: 10, f: 20, cat: "Curry" },
  { name: "Palak Paneer (1 cup)", cal: 240, p: 15, c: 8, f: 18, cat: "Curry" },
  { name: "Dal Tadka (1 cup)", cal: 140, p: 8, c: 20, f: 4, cat: "Curry" },
  { name: "Dal Makhani (1 cup)", cal: 220, p: 10, c: 22, f: 10, cat: "Curry" },
  { name: "Sambar (1 cup)", cal: 85, p: 4, c: 15, f: 2, cat: "Curry" },
  { name: "Rajma (1 cup)", cal: 180, p: 12, c: 28, f: 4, cat: "Curry" },
  { name: "Chole (1 cup)", cal: 200, p: 14, c: 30, f: 5, cat: "Curry" },
  { name: "Milk (1 cup, 240ml)", cal: 150, p: 8, c: 12, f: 8, cat: "Dairy" },
  { name: "Curd/Yogurt (1 cup)", cal: 150, p: 8.5, c: 11, f: 8, cat: "Dairy" },
  { name: "Paneer (100g)", cal: 265, p: 18, c: 2, f: 20, cat: "Dairy" },
  { name: "Egg (1 large)", cal: 78, p: 6, c: 0.6, f: 5, cat: "Protein" },
  { name: "Egg White (1 large)", cal: 17, p: 3.6, c: 0.2, f: 0.1, cat: "Protein" },
  { name: "Boiled Egg (2 pieces)", cal: 156, p: 12, c: 1.2, f: 10, cat: "Protein" },
  { name: "Whey Protein (1 scoop)", cal: 120, p: 24, c: 3, f: 1.5, cat: "Supplements" },
  { name: "Peanuts (30g)", cal: 170, p: 7, c: 6, f: 14, cat: "Snacks" },
  { name: "Peanut Butter (2 tbsp)", cal: 190, p: 8, c: 7, f: 16, cat: "Snacks" },
  { name: "Sprouts (1 cup)", cal: 82, p: 8, c: 12, f: 0.5, cat: "Snacks" },
  { name: "Banana (medium)", cal: 105, p: 1.3, c: 27, f: 0.3, cat: "Fruits" },
  { name: "Apple (medium)", cal: 95, p: 0.5, c: 25, f: 0.3, cat: "Fruits" },
  { name: "Boiled Chicken Breast (100g)", cal: 165, p: 31, c: 0, f: 3.6, cat: "Protein" },
  { name: "Grilled Fish (100g)", cal: 206, p: 22, c: 0, f: 12, cat: "Protein" },
];

const WORKOUTS = {
  Beginner: [
    { name: "Push-Up", sets: 3, reps: "10-12", muscle: "Chest", rest: "60s" },
    { name: "Bodyweight Squat", sets: 3, reps: "15", muscle: "Legs", rest: "60s" },
    { name: "Plank", sets: 3, reps: "30s hold", muscle: "Core", rest: "45s" },
    { name: "Dumbbell Curl", sets: 3, reps: "12", muscle: "Biceps", rest: "60s" },
    { name: "Lat Pulldown", sets: 3, reps: "12", muscle: "Back", rest: "60s" },
    { name: "Lunges", sets: 3, reps: "10 each", muscle: "Legs", rest: "60s" },
  ],
  Intermediate: [
    { name: "Bench Press", sets: 4, reps: "8-10", muscle: "Chest", rest: "90s" },
    { name: "Deadlift", sets: 4, reps: "6-8", muscle: "Back", rest: "120s" },
    { name: "Barbell Squat", sets: 4, reps: "8-10", muscle: "Legs", rest: "120s" },
    { name: "Overhead Press", sets: 3, reps: "8-10", muscle: "Shoulders", rest: "90s" },
    { name: "Pull-Up", sets: 3, reps: "6-8", muscle: "Back", rest: "90s" },
    { name: "Barbell Row", sets: 4, reps: "8-10", muscle: "Back", rest: "90s" },
  ],
  Advanced: [
    { name: "Barbell Squat", sets: 5, reps: "5", muscle: "Legs", rest: "180s" },
    { name: "Deadlift", sets: 5, reps: "3-5", muscle: "Back", rest: "180s" },
    { name: "Weighted Pull-Up", sets: 4, reps: "6-8", muscle: "Back", rest: "120s" },
    { name: "Incline Bench Press", sets: 4, reps: "6-8", muscle: "Chest", rest: "120s" },
    { name: "Romanian Deadlift", sets: 4, reps: "8", muscle: "Hamstrings", rest: "120s" },
    { name: "Cable Flye", sets: 3, reps: "12-15", muscle: "Chest", rest: "60s" },
  ],
};

// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────────────────────
function lsSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.warn(e); }
}
function lsLoad(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}
function lsDel(key) {
  try { localStorage.removeItem(key); } catch (e) { console.warn(e); }
}

// ─── CALCULATIONS ─────────────────────────────────────────────────────────────
function calcBMI(w, h) { return w / ((h / 100) ** 2); }
function calcBMICategory(b) {
  if (b < 18.5) return "Underweight";
  if (b < 25) return "Normal";
  if (b < 30) return "Overweight";
  return "Obese";
}
function calcCalories(p) {
  let bmr = p.gender === "Male"
    ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
    : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161;
  const mult = { Sedentary: 1.2, "Lightly Active": 1.375, "Moderately Active": 1.55, "Very Active": 1.725, "Extremely Active": 1.9 };
  const tdee = bmr * (mult[p.activityLevel] || 1.375);
  const bonus = { "Build Muscle": 300, "Lose Fat": -400, "Gain Weight": 500, "Maintain Health": 0 };
  return Math.round(tdee + (bonus[p.goal] || 0));
}
function calcProtein(p) {
  const r = p.goal === "Build Muscle" || p.goal === "Gain Weight" ? 2.0 : p.goal === "Lose Fat" ? 1.8 : 1.2;
  return Math.round(p.weight * r);
}
function calcWater(p) {
  return Math.round(p.weight * 35 + (["Very Active", "Extremely Active"].includes(p.activityLevel) ? 500 : 0));
}
function todayKey() { return "friday_log_" + new Date().toISOString().slice(0, 10); }

// ─── MINI COMPONENTS ──────────────────────────────────────────────────────────
function Ring({ pct, color, size = 80, stroke = 8, label, value }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(pct || 0, 100) / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={${dash} ${circ}} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease" }} />
      </svg>
      {label && <div style={{ color: C.textSecondary, fontSize: 11 }}>{label}</div>}
      {value && <div style={{ color: C.textPrimary, fontSize: 12, fontWeight: 700, textAlign: "center" }}>{value}</div>}
    </div>
  );
}

function Btn({ children, onClick, color = C.neonBlue, outline = false, small = false, style = {}, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.border : outline ? "transparent" : color,
      color: outline ? color : disabled ? C.textMuted : "#000",
      border: 1.5px solid ${disabled ? C.border : color},
      borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 700,
      padding: small ? "6px 14px" : "11px 22px",
      fontSize: small ? 12 : 14,
      boxShadow: (!outline && !disabled) ? 0 0 14px ${color}44 : "none",
      transition: "all 0.2s", fontFamily: "inherit", ...style
    }}>{children}</button>
  );
}

function Card({ children, style = {}, glow }) {
  return (
    <div style={{
      background: C.surface, border: 1px solid ${C.border}, borderRadius: 16, padding: 18,
      boxShadow: glow ? 0 0 20px ${glow}1A : "none", ...style
    }}>{children}</div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      background: color + "22", color, border: 1px solid ${color}44,
      borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap"
    }}>{children}</span>
  );
}

function StatRow({ label, val, color = C.textPrimary }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: 1px solid ${C.border} }}>
      <span style={{ color: C.textSecondary, fontSize: 13 }}>{label}</span>
      <span style={{ color, fontWeight: 700, fontSize: 13 }}>{val}</span>
    </div>
  );
}

const labelStyle = { color: C.textSecondary, fontSize: 12, fontWeight: 600 };

function FInput({ label, value, onChange, type = "text", placeholder, style = {} }) {
  return (
    <div style={style}>
      {label && <label style={labelStyle}>{label}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: C.surfaceLight, border: 1.5px solid ${C.border},
          borderRadius: 10, padding: "10px 13px", color: C.textPrimary,
          fontSize: 14, fontFamily: "inherit", marginTop: label ? 5 : 0,
          outline: "none", boxSizing: "border-box",
        }} />
    </div>
  );
}

function FSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", background: C.surfaceLight, border: 1.5px solid ${C.border},
        borderRadius: 10, padding: "10px 13px", color: C.textPrimary,
        fontSize: 13, fontFamily: "inherit", marginTop: 5, outline: "none"
      }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── SETUP WIZARD ─────────────────────────────────────────────────────────────
function SetupWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", age: 22, gender: "Male", height: 170, weight: 65,
    targetWeight: 70, goal: "Build Muscle", activityLevel: "Moderately Active",
    workoutExperience: "Beginner", foodPreference: "Non-Vegetarian", sleepHours: 7,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const steps = [
    {
      title: "Personal Info", icon: "👤",
      fields: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FInput label="Your Name" value={form.name} onChange={v => set("name", v)} placeholder="e.g. Ragul" />
          <div style={{ display: "flex", gap: 10 }}>
            <FInput label="Age" value={form.age} onChange={v => set("age", Number(v))} type="number" style={{ flex: 1 }} />
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Gender</label>
              <FSelect value={form.gender} onChange={v => set("gender", v)} options={["Male", "Female"]} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <FInput label="Height (cm)" value={form.height} onChange={v => set("height", Number(v))} type="number" style={{ flex: 1 }} />
            <FInput label="Weight (kg)" value={form.weight} onChange={v => set("weight", Number(v))} type="number" style={{ flex: 1 }} />
          </div>
        </div>
      )
    },
    {
      title: "Your Goal", icon: "🎯",
      fields: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Fitness Goal</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              {[["Build Muscle", "💪"], ["Lose Fat", "🔥"], ["Gain Weight", "⬆️"], ["Maintain Health", "❤️"]].map(([g, ic]) => (
                <div key={g} onClick={() => set("goal", g)} style={{
                  padding: "12px 8px", borderRadius: 12, textAlign: "center",
                  border: 2px solid ${form.goal === g ? C.neonBlue : C.border},
                  background: form.goal === g ? C.neonBlue + "22" : C.surfaceLight,
                  cursor: "pointer", color: form.goal === g ? C.neonBlue : C.textSecondary,
                  fontWeight: 600, fontSize: 12, transition: "all 0.2s"
                }}><div style={{ fontSize: 22, marginBottom: 4 }}>{ic}</div>{g}</div>
              ))}
            </div>
          </div>
          <FInput label="Target Weight (kg)" value={form.targetWeight} onChange={v => set("targetWeight", Number(v))} type="number" />
        </div>
      )
    },
    {
      title: "Activity Level", icon: "⚡",
      fields: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={labelStyle}>How active are you?</label>
          {[["Sedentary", "Desk job, little exercise"], ["Lightly Active", "Light exercise 1-3 days/week"], ["Moderately Active", "Moderate exercise 3-5 days/week"], ["Very Active", "Hard exercise 6-7 days/week"], ["Extremely Active", "Very hard exercise + physical job"]].map(([a, desc]) => (
            <div key={a} onClick={() => set("activityLevel", a)} style={{
              padding: "11px 13px", borderRadius: 10, cursor: "pointer",
              border: 2px solid ${form.activityLevel === a ? C.neonGreen : C.border},
              background: form.activityLevel === a ? C.neonGreen + "22" : C.surfaceLight,
              transition: "all 0.2s"
            }}>
              <div style={{ color: form.activityLevel === a ? C.neonGreen : C.textPrimary, fontWeight: 600, fontSize: 13 }}>{a}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Workout & Diet", icon: "🏋️",
      fields: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Experience Level</label>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[["Beginner", "🌱"], ["Intermediate", "🔥"], ["Advanced", "⚡"]].map(([e, ic]) => (
                <div key={e} onClick={() => set("workoutExperience", e)} style={{
                  flex: 1, padding: "12px 4px", borderRadius: 10, textAlign: "center",
                  border: 2px solid ${form.workoutExperience === e ? C.neonPurple : C.border},
                  background: form.workoutExperience === e ? C.neonPurple + "22" : C.surfaceLight,
                  cursor: "pointer", color: form.workoutExperience === e ? C.neonPurple : C.textSecondary,
                  fontWeight: 600, fontSize: 12, transition: "all 0.2s"
                }}><div style={{ fontSize: 20, marginBottom: 3 }}>{ic}</div>{e}</div>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Food Preference</label>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[["Vegetarian", "🥗"], ["Non-Veg", "🍗"], ["Vegan", "🌿"]].map(([fp, ic]) => (
                <div key={fp} onClick={() => set("foodPreference", fp)} style={{
                  flex: 1, padding: "12px 4px", borderRadius: 10, textAlign: "center",
                  border: 2px solid ${form.foodPreference === fp ? C.neonOrange : C.border},
                  background: form.foodPreference === fp ? C.neonOrange + "22" : C.surfaceLight,
                  cursor: "pointer", color: form.foodPreference === fp ? C.neonOrange : C.textSecondary,
                  fontWeight: 600, fontSize: 12, transition: "all 0.2s"
                }}><div style={{ fontSize: 20, marginBottom: 3 }}>{ic}</div>{fp}</div>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Sleep Goal: {form.sleepHours} hours</label>
            <input type="range" min={4} max={12} value={form.sleepHours}
              onChange={e => set("sleepHours", Number(e.target.value))}
              style={{ width: "100%", accentColor: C.neonBlue, marginTop: 8 }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: C.textMuted, fontSize: 11 }}>
              <span>4h</span><span>12h</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const isLast = step === steps.length - 1;

  const finish = () => {
    const cals = calcCalories(form);
    const prot = calcProtein(form);
    const water = calcWater(form);
    const bmi = calcBMI(form.weight, form.height);
    const profile = {
      ...form,
      bmi: +bmi.toFixed(1), bmiCategory: calcBMICategory(bmi),
      dailyCalorieGoal: cals, proteinGoal: prot,
      carbsGoal: Math.round((cals - prot * 4) * 0.45 / 4),
      fatsGoal: Math.round((cals - prot * 4 - Math.round((cals - prot * 4) * 0.45)) / 9),
      waterGoal: water,
    };
    lsSave("friday_profile", profile);
    onComplete(profile);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 44 }}>⚡</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: C.neonBlue, letterSpacing: 6, textShadow: 0 0 28px ${C.neonBlue} }}>FRIDAY</div>
          <div style={{ color: C.textSecondary, fontSize: 13, marginTop: 4 }}>One-time setup — your data saves forever! 💾</div>
        </div>
        <div style={{ display: "flex", gap: 5, marginBottom: 22 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? C.neonBlue : C.border, transition: "background 0.3s" }} />
          ))}
        </div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 26 }}>{steps[step].icon}</span>
            <div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>Step {step + 1} of {steps.length}</div>
              <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: 18 }}>{steps[step].title}</div>
            </div>
          </div>
          {steps[step].fields}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 0 && <Btn outline color={C.textSecondary} onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>← Back</Btn>}
            <Btn onClick={isLast ? finish : () => setStep(s => s + 1)} style={{ flex: 1 }}>
              {isLast ? "🚀 Launch FRIDAY!" : "Next →"}
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [booted, setBooted] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [todayLog, setTodayLog] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [chatMsgs, setChatMsgs] = useState([
    { role: "assistant", text: "Hey! I'm FRIDAY, your AI fitness partner 💪 Ask me anything about workouts, nutrition, or your goals!" }
  ]);

  // ── Boot: load everything from localStorage
  useEffect(() => {
    const prof = lsLoad("friday_profile");
    if (prof) {
      setProfile(prof);
      const log = lsLoad(todayKey()) || { calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, meals: [], workoutDone: false, completedSets: {} };
      setTodayLog(log);
      const savedTasks = lsLoad("friday_tasks") || [];
      setTasks(savedTasks);
      const savedChat = lsLoad("friday_chat");
      if (savedChat?.length) setChatMsgs(savedChat);
    }
    setBooted(true);
  }, []);

  // ── Auto-save log
  useEffect(() => {
    if (todayLog && profile) lsSave(todayKey(), todayLog);
  }, [todayLog]);

  // ── Auto-save tasks
  useEffect(() => {
    if (booted) lsSave("friday_tasks", tasks);
  }, [tasks]);

  // ── Auto-save chat (last 30 msgs)
  useEffect(() => {
    if (booted) lsSave("friday_chat", chatMsgs.slice(-30));
  }, [chatMsgs]);

  const updateProfile = (p) => { setProfile(p); lsSave("friday_profile", p); };

  const resetAll = () => {
    if (!window.confirm("Reset everything? This cannot be undone.")) return;
    ["friday_profile", "friday_tasks", "friday_chat"].forEach(lsDel);
    lsDel(todayKey());
    setProfile(null); setTodayLog(null); setTasks([]); setBooted(false);
    setTimeout(() => setBooted(true), 100);
  };

  if (!booted) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 44 }}>⚡</div>
      <div style={{ fontSize: 26, fontWeight: 900, color: C.neonBlue, letterSpacing: 5 }}>FRIDAY</div>
      <div style={{ width: 36, height: 36, border: 3px solid ${C.border}, borderTop: 3px solid ${C.neonBlue}, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{@keyframes spin{to{transform:rotate(360deg)}}}</style>
    </div>
  );

  if (!profile) return (
    <SetupWizard onComplete={p => {
      setProfile(p);
      const log = { calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, meals: [], workoutDone: false, completedSets: {} };
      setTodayLog(log);
      lsSave(todayKey(), log);
    }} />
  );

  if (!todayLog) return null;

  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "workout", icon: "🏋️", label: "Workout" },
    { id: "calories", icon: "🍽️", label: "Diet" },
    { id: "tasks", icon: "✅", label: "Tasks" },
    { id: "progress", icon: "📊", label: "Progress" },
    { id: "ai", icon: "🤖", label: "AI" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.textPrimary }}>
      <style>{*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}}</style>

      {/* Top Bar */}
      <div style={{ background: C.surface, borderBottom: 1px solid ${C.border}, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: C.neonBlue, letterSpacing: 3, textShadow: 0 0 16px ${C.neonBlue}66 }}>⚡ FRIDAY</div>
          <div style={{ color: C.textMuted, fontSize: 11 }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: 14 }}>{profile.name}</div>
            <Tag color={C.neonGreen}>{profile.goal}</Tag>
          </div>
          <button onClick={resetAll} style={{ background: "none", border: 1px solid ${C.border}, borderRadius: 8, color: C.textMuted, fontSize: 10, padding: "4px 7px", cursor: "pointer", fontFamily: "inherit" }}>Reset</button>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: "16px", maxWidth: 680, margin: "0 auto", paddingBottom: 88 }}>
        {tab === "dashboard" && <Dashboard profile={profile} log={todayLog} setLog={setTodayLog} tasks={tasks} setTab={setTab} />}
        {tab === "workout" && <WorkoutScreen profile={profile} log={todayLog} setLog={setTodayLog} />}
        {tab === "calories" && <CaloriesScreen profile={profile} log={todayLog} setLog={setTodayLog} />}
        {tab === "tasks" && <TasksScreen tasks={tasks} setTasks={setTasks} />}
        {tab === "progress" && <ProgressScreen profile={profile} updateProfile={updateProfile} log={todayLog} />}
        {tab === "ai" && <AIChat profile={profile} msgs={chatMsgs} setMsgs={setChatMsgs} log={todayLog} />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.surface, borderTop: 1px solid ${C.border}, display: "flex", padding: "6px 0 10px", zIndex: 100 }}>
        {tabs.map(t => {
          const active = tab === t.id;
          const badge = t.id === "tasks" ? tasks.filter(tk => !tk.done).length : 0;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              padding: "5px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              color: active ? C.neonBlue : C.textMuted, fontFamily: "inherit", transition: "color 0.2s", position: "relative"
            }}>
              {badge > 0 && <div style={{ position: "absolute", top: 0, right: "calc(50% - 16px)", background: C.neonPink, color: "#fff", fontSize: 9, fontWeight: 900, borderRadius: 10, padding: "1px 5px" }}>{badge}</div>}
              <span style={{ fontSize: 19, filter: active ? drop-shadow(0 0 6px ${C.neonBlue}) : "none" }}>{t.icon}</span>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ profile, log, setLog, tasks, setTab }) {
  const calPct = (log.calories / profile.dailyCalorieGoal) * 100;
  const protPct = (log.protein / profile.proteinGoal) * 100;
  const waterPct = (log.water / profile.waterGoal) * 100;
  const pending = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);
  const taskPct = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;
  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card glow={C.neonBlue}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: C.textMuted, fontSize: 12 }}>{greeting},</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.textPrimary, marginTop: 2 }}>{profile.name} 💪</div>
            <div style={{ color: C.neonGreen, fontSize: 12, marginTop: 4 }}>🎯 {profile.goal}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: C.textMuted, fontSize: 11 }}>BMI</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: (profile.bmi < 18.5 || profile.bmi >= 25) ? C.neonOrange : C.neonGreen }}>{profile.bmi}</div>
            <Tag color={(profile.bmi < 18.5 || profile.bmi >= 25) ? C.neonOrange : C.neonGreen}>{profile.bmiCategory}</Tag>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Today's Nutrition</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Ring pct={calPct} color={C.neonBlue} size={85} label="Calories" value={${log.calories}/${profile.dailyCalorieGoal}} />
          <Ring pct={protPct} color={C.neonPurple} size={85} label="Protein" value={${log.protein}g/${profile.proteinGoal}g} />
          <Ring pct={waterPct} color={C.neonGreen} size={85} label="Water" value={${log.water}ml} />
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {[150, 250, 350, 500].map(ml => (
            <button key={ml} onClick={() => setLog(l => ({ ...l, water: Math.min(l.water + ml, profile.waterGoal * 1.5) }))}
              style={{ flex: 1, padding: "8px 2px", background: C.neonGreen + "22", border: 1px solid ${C.neonGreen}44, borderRadius: 8, color: C.neonGreen, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>
              +{ml}ml
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { icon: "🔥", val: ${Math.max(0, profile.dailyCalorieGoal - log.calories)}, label: "kcal left", color: C.neonBlue },
          { icon: "🏋️", val: log.workoutDone ? "Done ✓" : "Pending", label: "Workout", color: log.workoutDone ? C.neonGreen : C.neonOrange },
          { icon: "✅", val: ${done.length}/${tasks.length}, label: "Tasks done", color: C.neonPurple },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ color: s.color, fontWeight: 800, fontSize: 14 }}>{s.val}</div>
            <div style={{ color: C.textMuted, fontSize: 10 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {tasks.length > 0 ? (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>📋 Today's Tasks</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: C.neonPurple, fontWeight: 700, fontSize: 13 }}>{taskPct}%</span>
              <button onClick={() => setTab("tasks")} style={{ background: "none", border: 1px solid ${C.border}, borderRadius: 8, color: C.textSecondary, fontSize: 11, padding: "3px 10px", cursor: "pointer", fontFamily: "inherit" }}>See all</button>
            </div>
          </div>
          <div style={{ background: C.border, borderRadius: 4, height: 4, marginBottom: 12 }}>
            <div style={{ height: "100%", width: ${taskPct}%, background: C.neonPurple, borderRadius: 4, transition: "width 0.4s" }} />
          </div>
          {pending.slice(0, 3).map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: 1px solid ${C.border} }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.priority === "High" ? C.neonPink : t.priority === "Medium" ? C.neonOrange : C.neonGreen, flexShrink: 0 }} />
              <span style={{ color: C.textSecondary, fontSize: 13, flex: 1 }}>{t.text}</span>
              {t.date && <span style={{ color: C.textMuted, fontSize: 11 }}>{t.date}</span>}
            </div>
          ))}
          {pending.length === 0 && <div style={{ color: C.neonGreen, textAlign: "center", fontSize: 13, padding: "8px 0" }}>🎉 All tasks done!</div>}
        </Card>
      ) : (
        <Card style={{ textAlign: "center", padding: 22 }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>✅</div>
          <div style={{ color: C.textSecondary, fontSize: 13, marginBottom: 12 }}>No tasks yet! Add your daily plans</div>
          <button onClick={() => setTab("tasks")} style={{ background: C.neonPurple + "22", border: 1px solid ${C.neonPurple}, borderRadius: 10, color: C.neonPurple, padding: "9px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>+ Add Tasks</button>
        </Card>
      )}

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🎯 Daily Targets</div>
        <StatRow label="Calories" val={${profile.dailyCalorieGoal} kcal} color={C.neonBlue} />
        <StatRow label="Protein" val={${profile.proteinGoal}g} color={C.neonPurple} />
        <StatRow label="Carbs" val={${profile.carbsGoal}g} color={C.neonOrange} />
        <StatRow label="Fats" val={${profile.fatsGoal}g} color={C.neonPink} />
        <StatRow label="Water" val={${profile.waterGoal}ml} color={C.neonGreen} />
      </Card>
    </div>
  );
}

// ─── TASKS SCREEN ─────────────────────────────────────────────────────────────
function TasksScreen({ tasks, setTasks }) {
  const [newText, setNewText] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Fitness");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const cats = ["Fitness", "Diet", "Sleep", "Work", "Personal", "Other"];
  const priorityColor = { High: C.neonPink, Medium: C.neonOrange, Low: C.neonGreen };
  const catEmoji = { Fitness: "🏋️", Diet: "🍽️", Sleep: "😴", Work: "💼", Personal: "👤", Other: "📌" };

  const addTask = () => {
    if (!newText.trim()) return;
    setTasks(t => [{ id: Date.now(), text: newText.trim(), done: false, date: newDate, priority: newPriority, category: newCategory, createdAt: new Date().toISOString() }, ...t]);
    setNewText(""); setNewDate(""); setShowAdd(false);
  };

  const toggleDone = id => setTasks(t => t.map(tk => tk.id === id ? { ...tk, done: !tk.done } : tk));
  const deleteTask = id => setTasks(t => t.filter(tk => tk.id !== id));
  const saveEdit = id => { setTasks(t => t.map(tk => tk.id === id ? { ...tk, text: editText } : tk)); setEditId(null); };

  const filtered = filter === "All" ? tasks : filter === "Done" ? tasks.filter(t => t.done) : filter === "Pending" ? tasks.filter(t => !t.done) : tasks.filter(t => t.category === filter);
  const donePct = tasks.length ? Math.round((tasks.filter(t => t.done).length / tasks.length) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card glow={C.neonPurple}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>📋 My Tasks</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>{tasks.filter(t => !t.done).length} pending · {tasks.filter(t => t.done).length} done</div>
          </div>
          <Ring pct={donePct} color={C.neonPurple} size={68} label="Done" value={${donePct}%} />
        </div>
        <Btn onClick={() => setShowAdd(s => !s)} color={C.neonPurple} style={{ width: "100%" }}>
          {showAdd ? "✕ Cancel" : "+ Add New Task"}
        </Btn>
      </Card>

      {showAdd && (
        <Card style={{ border: 1px solid ${C.neonPurple}44 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: C.neonPurple }}>✏️ New Task</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FInput label="What do you want to do?" value={newText} onChange={setNewText} placeholder="e.g. Morning workout, Drink 3L water…" />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Due Date (optional)</label>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                  style={{ width: "100%", background: C.surfaceLight, border: 1.5px solid ${C.border}, borderRadius: 10, padding: "10px 13px", color: C.textPrimary, fontSize: 13, fontFamily: "inherit", marginTop: 5, outline: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Priority</label>
                <FSelect value={newPriority} onChange={setNewPriority} options={["High", "Medium", "Low"]} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {cats.map(cat => (
                  <div key={cat} onClick={() => setNewCategory(cat)} style={{
                    padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                    border: 1.5px solid ${newCategory === cat ? C.neonPurple : C.border},
                    background: newCategory === cat ? C.neonPurple + "22" : C.surfaceLight,
                    color: newCategory === cat ? C.neonPurple : C.textSecondary, transition: "all 0.2s"
                  }}>{catEmoji[cat]} {cat}</div>
                ))}
              </div>
            </div>
            <Btn onClick={addTask} color={C.neonPurple} style={{ width: "100%" }}>✓ Add Task</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
        {["All", "Pending", "Done", ...cats].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 13px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 600,
            border: 1.5px solid ${filter === f ? C.neonPurple : C.border},
            background: filter === f ? C.neonPurple + "22" : C.surfaceLight,
            color: filter === f ? C.neonPurple : C.textSecondary,
            fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s"
          }}>{f}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✨</div>
          <div style={{ color: C.textSecondary, fontSize: 14 }}>No tasks here!</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(task => (
            <Card key={task.id} style={{ padding: 13, opacity: task.done ? 0.65 : 1, border: 1px solid ${task.done ? C.border : priorityColor[task.priority] + "33"} }}>
              {editId === task.id ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={editText} onChange={e => setEditText(e.target.value)} onKeyDown={e => e.key === "Enter" && saveEdit(task.id)}
                    style={{ flex: 1, background: C.surfaceLight, border: 1.5px solid ${C.neonPurple}, borderRadius: 8, padding: "8px 12px", color: C.textPrimary, fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                  <Btn small onClick={() => saveEdit(task.id)} color={C.neonGreen}>Save</Btn>
                  <Btn small outline onClick={() => setEditId(null)} color={C.textSecondary}>✕</Btn>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div onClick={() => toggleDone(task.id)} style={{
                    width: 22, height: 22, borderRadius: 6, border: 2px solid ${task.done ? C.neonGreen : priorityColor[task.priority]},
                    background: task.done ? C.neonGreen + "33" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0, marginTop: 1, transition: "all 0.2s"
                  }}>
                    {task.done && <span style={{ color: C.neonGreen, fontSize: 13, fontWeight: 900 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: task.done ? C.textMuted : C.textPrimary, fontSize: 14, fontWeight: 600, textDecoration: task.done ? "line-through" : "none", wordBreak: "break-word" }}>{task.text}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
                      <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
                      <Tag color={C.neonBlue}>{catEmoji[task.category]} {task.category}</Tag>
                      {task.date && <Tag color={C.textSecondary}>📅 {task.date}</Tag>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                    <button onClick={() => { setEditId(task.id); setEditText(task.text); }} style={{ background: "none", border: 1px solid ${C.border}, borderRadius: 6, color: C.textMuted, fontSize: 13, padding: "4px 7px", cursor: "pointer" }}>✏️</button>
                    <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: 1px solid ${C.border}, borderRadius: 6, color: C.neonPink, fontSize: 13, padding: "4px 7px", cursor: "pointer" }}>🗑️</button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      {tasks.filter(t => t.done).length > 0 && (
        <button onClick={() => setTasks(t => t.filter(tk => !tk.done))}
          style={{ background: "none", border: 1px solid ${C.border}, borderRadius: 10, color: C.textMuted, padding: "10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", width: "100%" }}>
          🗑️ Clear all completed tasks
        </button>
      )}
    </div>
  );
}

// ─── WORKOUT SCREEN ───────────────────────────────────────────────────────────
function WorkoutScreen({ profile, log, setLog }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [completedSets, setCompletedSets] = useState(log.completedSets || {});
  const ref = useRef(null);

  useEffect(() => {
    if (running) ref.current = setInterval(() => setElapsed(e => e + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);

  useEffect(() => { setLog(l => ({ ...l, completedSets })); }, [completedSets]);

  const workouts = WORKOUTS[profile.workoutExperience] || WORKOUTS.Beginner;
  const totalSets = workouts.reduce((a, w) => a + w.sets, 0);
  const doneSets = Object.values(completedSets).filter(Boolean).length;
  const fmt = s => ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")};
  const mColor = { Chest: C.neonBlue, Legs: C.neonGreen, Core: C.neonOrange, Biceps: C.neonPurple, Back: C.neonPink, Shoulders: "#00FFCC", Hamstrings: C.neonOrange };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card glow={C.neonPurple}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>{profile.workoutExperience} Plan</div>
            <div style={{ color: C.textSecondary, fontSize: 13, marginTop: 3 }}>{workouts.length} exercises · {totalSets} sets</div>
          </div>
          <Ring pct={Math.round((doneSets / totalSets) * 100)} color={C.neonPurple} size={72} label="Sets" value={${doneSets}/${totalSets}} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: running ? C.neonGreen : C.textMuted, fontVariantNumeric: "tabular-nums" }}>{fmt(elapsed)}</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
            <Btn onClick={() => setRunning(r => !r)} color={running ? C.neonOrange : C.neonGreen} small>{running ? "⏸️ Pause" : "▶️ Start"}</Btn>
            <Btn onClick={() => { setRunning(false); setElapsed(0); }} outline color={C.textSecondary} small>↺ Reset</Btn>
            {!log.workoutDone
              ? <Btn onClick={() => { setRunning(false); setLog(l => ({ ...l, workoutDone: true })); alert("🎉 Workout done! You crushed it!"); }} color={C.neonPink} small>Finish 💪</Btn>
              : <Tag color={C.neonGreen}>✓ Done Today!</Tag>}
          </div>
        </div>
      </Card>
      {workouts.map((w, wi) => (
        <Card key={wi}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{w.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
              <Tag color={mColor[w.muscle] || C.neonBlue}>{w.muscle}</Tag>
              <Tag color={C.neonBlue}>{w.sets} × {w.reps}</Tag>
              <Tag color={C.textMuted}>⏱️ {w.rest}</Tag>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: w.sets }, (_, si) => {
              const key = ${wi}-${si};
              const done = completedSets[key];
              return (
                <button key={si} onClick={() => setCompletedSets(cs => ({ ...cs, [key]: !cs[key] }))} style={{
                  flex: 1, padding: "11px 4px", borderRadius: 8,
                  background: done ? C.neonGreen + "33" : C.surfaceLight,
                  border: 2px solid ${done ? C.neonGreen : C.border},
                  color: done ? C.neonGreen : C.textSecondary,
                  cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "inherit", transition: "all 0.2s"
                }}>{done ? "✓" : Set ${si + 1}}</button>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── CALORIES SCREEN ──────────────────────────────────────────────────────────
function CaloriesScreen({ profile, log, setLog }) {
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState(null);
  const results = search.length >= 2 ? FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase())) : [];
  const remaining = profile.dailyCalorieGoal - log.calories;
  const calPct = (log.calories / profile.dailyCalorieGoal) * 100;

  const addFood = () => {
    if (!selected) return;
    const meal = { name: selected.name, cal: Math.round(selected.cal * qty), protein: +(selected.p * qty).toFixed(1), carbs: +(selected.c * qty).toFixed(1), fats: +(selected.f * qty).toFixed(1) };
    setLog(l => ({ ...l, calories: l.calories + meal.cal, protein: +(l.protein + meal.protein).toFixed(1), carbs: +(l.carbs + meal.carbs).toFixed(1), fats: +(l.fats + meal.fats).toFixed(1), meals: [...l.meals, meal] }));
    setSearch(""); setSelected(null); setQty(1);
  };

  const removeFood = idx => {
    const meal = log.meals[idx];
    setLog(l => ({ ...l, calories: l.calories - meal.cal, protein: +(l.protein - meal.protein).toFixed(1), carbs: +(l.carbs - meal.carbs).toFixed(1), fats: +(l.fats - meal.fats).toFixed(1), meals: l.meals.filter((_, i) => i !== idx) }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card glow={C.neonBlue}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 38, fontWeight: 900, color: remaining >= 0 ? C.neonBlue : C.neonPink }}>{Math.abs(remaining)}</div>
          <div style={{ color: C.textSecondary, fontSize: 13 }}>{remaining >= 0 ? "calories remaining" : "calories over goal ⚠️"}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 12 }}>
          {[{ l: "Eaten", v: log.calories, c: C.neonBlue }, { l: "Protein", v: ${log.protein}g, c: C.neonPurple }, { l: "Carbs", v: ${log.carbs}g, c: C.neonOrange }, { l: "Fats", v: ${log.fats}g, c: C.neonPink }].map(m => (
            <div key={m.l} style={{ textAlign: "center" }}>
              <div style={{ color: m.c, fontWeight: 800, fontSize: 15 }}>{m.v}</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.border, borderRadius: 8, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: ${Math.min(calPct, 100)}%, background: calPct > 100 ? C.neonPink : C.neonBlue, borderRadius: 8, transition: "width 0.4s" }} />
        </div>
        <div style={{ textAlign: "right", color: C.textMuted, fontSize: 11, marginTop: 4 }}>{Math.round(calPct)}% of {profile.dailyCalorieGoal} kcal</div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🔍 Add Food</div>
        <input value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }} placeholder="Search Indian foods… (Idli, Dal, Chicken…)"
          style={{ width: "100%", background: C.surfaceLight, border: 1.5px solid ${C.border}, borderRadius: 10, padding: "10px 13px", color: C.textPrimary, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
        {results.length > 0 && !selected && (
          <div style={{ marginTop: 8, maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
            {results.map((f, i) => (
              <div key={i} onClick={() => { setSelected(f); setSearch(f.name); }}
                style={{ padding: "9px 12px", borderRadius: 8, cursor: "pointer", background: C.surfaceLight, border: 1px solid ${C.border}, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ color: C.textMuted, fontSize: 11 }}>P:{f.p}g C:{f.c}g F:{f.f}g</div>
                </div>
                <Tag color={C.neonBlue}>{f.cal} kcal</Tag>
              </div>
            ))}
          </div>
        )}
        {selected && (
          <div style={{ marginTop: 12, background: C.neonBlue + "11", border: 1px solid ${C.neonBlue}44, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, color: C.neonBlue, marginBottom: 10 }}>{selected.name}</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: C.textSecondary, fontSize: 13 }}>Qty:</span>
              <input type="number" min={0.5} step={0.5} value={qty} onChange={e => setQty(Number(e.target.value))}
                style={{ width: 65, background: C.surfaceLight, border: 1px solid ${C.border}, borderRadius: 8, padding: "6px 10px", color: C.textPrimary, fontFamily: "inherit", fontSize: 15 }} />
              <span style={{ color: C.textMuted, fontSize: 12 }}>→ {Math.round(selected.cal * qty)} kcal</span>
            </div>
            <Btn onClick={addFood} style={{ width: "100%" }}>+ Add to Today</Btn>
          </div>
        )}
      </Card>

      {log.meals.length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📋 Food Log</div>
          {log.meals.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < log.meals.length - 1 ? 1px solid ${C.border} : "none" }}>
              <div>
                <div style={{ color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>P:{m.protein}g C:{m.carbs}g F:{m.fats}g</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.neonBlue, fontWeight: 800, fontSize: 14 }}>{m.cal} kcal</span>
                <button onClick={() => removeFood(i)} style={{ background: "none", border: "none", color: C.neonPink, cursor: "pointer", fontSize: 14, padding: "2px" }}>🗑️</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: 1px solid ${C.border}, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: C.textSecondary, fontWeight: 600, fontSize: 13 }}>Total</span>
            <span style={{ color: C.neonBlue, fontWeight: 800, fontSize: 16 }}>{log.calories} kcal</span>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── PROGRESS SCREEN ──────────────────────────────────────────────────────────
function ProgressScreen({ profile, updateProfile, log }) {
  const [newWeight, setNewWeight] = useState(profile.weight);
  const [history, setHistory] = useState(() => {
    const saved = lsLoad("friday_weight_history");
    if (saved) return saved;
    const b = profile.weight;
    return [
      { d: "4 wks", w: +(b - 1.8).toFixed(1) }, { d: "3 wks", w: +(b - 1.2).toFixed(1) },
      { d: "2 wks", w: +(b - 0.6).toFixed(1) }, { d: "Last wk", w: +(b - 0.2).toFixed(1) },
      { d: "Today", w: b },
    ];
  });

  const logWeight = () => {
    const w = Number(newWeight);
    const bmi = +calcBMI(w, profile.height).toFixed(1);
    updateProfile({ ...profile, weight: w, bmi, bmiCategory: calcBMICategory(bmi) });
    const newH = [...history.slice(-7), { d: "Now", w }];
    setHistory(newH);
    lsSave("friday_weight_history", newH);
  };

  const bodyFat = +(1.20 * profile.bmi + 0.23 * profile.age - (profile.gender === "Male" ? 16.2 : 5.4)).toFixed(1);
  const muscleMass = +((profile.weight * (1 - Math.max(5, bodyFat) / 100)) * 0.75).toFixed(1);
  const minW = Math.min(...history.map(h => h.w)) - 1;
  const maxW = Math.max(...history.map(h => h.w)) + 1;
  const svgW = 280, svgH = 90;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card glow={C.neonGreen}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 14 }}>📊 Body Stats</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { l: "Weight", v: ${profile.weight} kg, c: C.neonBlue },
            { l: "Target", v: ${profile.targetWeight} kg, c: C.neonGreen },
            { l: "BMI", v: profile.bmi, c: (profile.bmi < 18.5 || profile.bmi >= 25) ? C.neonOrange : C.neonGreen },
            { l: "Category", v: profile.bmiCategory, c: C.textSecondary },
            { l: "Est. Body Fat", v: ${Math.max(5, bodyFat)}%, c: C.neonPink },
            { l: "Muscle Mass", v: ${muscleMass} kg, c: C.neonPurple },
          ].map(s => (
            <div key={s.l} style={{ background: C.surfaceLight, borderRadius: 10, padding: "11px 13px" }}>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{s.l}</div>
              <div style={{ color: s.c, fontWeight: 800, fontSize: 17, marginTop: 3 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📈 Weight Trend</div>
        <svg width="100%" viewBox={0 0 ${svgW} ${svgH + 10}}>
          {history.map((h, i) => {
            if (i === 0) return null;
            const x1 = ((i - 1) / (history.length - 1)) * (svgW - 20) + 10;
            const y1 = svgH - ((history[i - 1].w - minW) / (maxW - minW)) * (svgH - 20) - 10;
            const x2 = (i / (history.length - 1)) * (svgW - 20) + 10;
            const y2 = svgH - ((h.w - minW) / (maxW - minW)) * (svgH - 20) - 10;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.neonBlue} strokeWidth="2.5" strokeLinecap="round" />;
          })}
          {history.map((h, i) => {
            const x = (i / (history.length - 1)) * (svgW - 20) + 10;
            const y = svgH - ((h.w - minW) / (maxW - minW)) * (svgH - 20) - 10;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={C.neonBlue} stroke={C.bg} strokeWidth="2" />
                <text x={x} y={y - 9} textAnchor="middle" fill={C.neonBlue} fontSize="9" fontWeight="700">{h.w}</text>
              </g>
            );
          })}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {history.map((h, i) => <div key={i} style={{ color: C.textMuted, fontSize: 10, textAlign: "center" }}>{h.d}</div>)}
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>⚖️ Log Today's Weight</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(e.target.value)}
            style={{ flex: 1, background: C.surfaceLight, border: 1.5px solid ${C.neonBlue}, borderRadius: 10, padding: "11px 14px", color: C.textPrimary, fontSize: 20, fontFamily: "inherit", outline: "none", fontWeight: 700 }} />
          <span style={{ color: C.textSecondary }}>kg</span>
          <Btn onClick={logWeight} color={C.neonGreen}>Log</Btn>
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🎯 Nutrition Targets</div>
        <StatRow label="Daily Calories" val={${profile.dailyCalorieGoal} kcal} color={C.neonBlue} />
        <StatRow label="Protein" val={${profile.proteinGoal}g} color={C.neonPurple} />
        <StatRow label="Carbs" val={${profile.carbsGoal}g} color={C.neonOrange} />
        <StatRow label="Fats" val={${profile.fatsGoal}g} color={C.neonPink} />
        <StatRow label="Water" val={${profile.waterGoal}ml} color={C.neonGreen} />
        <StatRow label="Activity" val={profile.activityLevel} />
        <StatRow label="Experience" val={profile.workoutExperience} color={C.neonPurple} />
      </Card>
    </div>
  );
}

// ─── AI CHAT ──────────────────────────────────────────────────────────────────
function AIChat({ profile, msgs, setMsgs, log }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text: msg }]);
    setLoading(true);
    const sys = You are FRIDAY, an expert AI fitness & nutrition coach. User: ${profile.name}, ${profile.age}y, ${profile.gender}, ${profile.weight}kg, ${profile.height}cm, Goal: ${profile.goal}, Activity: ${profile.activityLevel}, Experience: ${profile.workoutExperience}, Food: ${profile.foodPreference}, BMI: ${profile.bmi} (${profile.bmiCategory}). Targets: ${profile.dailyCalorieGoal} kcal, ${profile.proteinGoal}g protein, ${profile.waterGoal}ml water. Today: ${log.calories} kcal eaten, ${log.protein}g protein, ${log.water}ml water, workout ${log.workoutDone ? "done ✓" : "not done"}. Be specific, warm, motivating, use Indian food context. Under 120 words.;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: msgs.slice(-10).map(m => ({ role: m.role, content: m.text })).concat([{ role: "user", content: msg }]) })
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "assistant", text: data.content?.[0]?.text || "Sorry, try again!" }]);
    } catch {
      setMsgs(m => [...m, { role: "assistant", text: "Connection issue 😅 Please try again!" }]);
    } finally { setLoading(false); }
  };

  const suggestions = ["What should I eat today?", "Workout tip 💪", "How much protein?", "Motivate me! 🔥", "Review my progress"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 180px)", minHeight: 400 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
            {m.role === "assistant" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.neonBlue + "33", border: 1.5px solid ${C.neonBlue}, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2 }}>⚡</div>}
            <div style={{ maxWidth: "78%", padding: "10px 13px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? C.neonBlue : C.surface, border: 1px solid ${m.role === "user" ? C.neonBlue : C.border}, color: m.role === "user" ? "#000" : C.textPrimary, fontSize: 13, lineHeight: 1.55, fontWeight: m.role === "user" ? 600 : 400 }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.neonBlue + "33", border: 1.5px solid ${C.neonBlue}, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚡</div>
            <div style={{ background: C.surface, border: 1px solid ${C.border}, borderRadius: "16px 16px 16px 4px", padding: "10px 13px" }}>
              <span style={{ color: C.neonBlue, animation: "pulse 1s infinite" }}>FRIDAY is thinking…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8 }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => send(s)} style={{ background: C.surfaceLight, border: 1px solid ${C.border}, borderRadius: 20, color: C.textSecondary, padding: "5px 12px", cursor: "pointer", whiteSpace: "nowrap", fontSize: 11, fontFamily: "inherit" }}>{s}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask FRIDAY anything…"
          style={{ flex: 1, background: C.surface, border: 1.5px solid ${C.border}, borderRadius: 12, padding: "11px 14px", color: C.textPrimary, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{ background: (loading || !input.trim()) ? C.border : C.neonBlue, border: "none", borderRadius: 12, padding: "11px 16px", cursor: (loading || !input.trim()) ? "not-allowed" : "pointer", color: "#000", fontWeight: 700, fontSize: 15, fontFamily: "inherit", transition: "all 0.2s" }}>➤</button>
      </div>
    </div>
  );
}
