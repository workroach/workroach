// ── QUADRANTS ─────────────────────────────────────────────────────────────────
export const QUADRANTS = [
  { id: 1, range: [1, 1.69], label: "Extermination Zone", emoji: "💀", color: "#c0392b", bg: "#2d0a08", tagline: "This isn't a job. This is a crime scene.", desc: "Every signal is red. Your labour, time, mental health and future are being systematically consumed. This is not normal. This is exploitation.", badge: "CRITICAL" },
  { id: 2, range: [1.7, 2.49], label: "Toxic Environment", emoji: "☠️", color: "#e67e22", bg: "#2d1200", tagline: "They're draining you. Slowly. Deliberately.", desc: "Death by a thousand micro-exploitations. You feel it but couldn't name it. Now you can.", badge: "SEVERE" },
  { id: 3, range: [2.5, 3.29], label: "Surviving. Barely.", emoji: "🐜", color: "#d4820a", bg: "#1f1500", tagline: "Built to endure. But for how long?", desc: "You're not broken yet — but you're being worn down. The gap between what was promised and what exists is quietly growing.", badge: "WARNING" },
  { id: 4, range: [3.3, 4.19], label: "Liveable", emoji: "🌿", color: "#16a34a", bg: "#0a1f0f", tagline: "Not bad. But don't confuse tolerable with good.", desc: "Respect mostly exists. But watch the areas pulling your score down — they rarely stay static.", badge: "STABLE" },
  { id: 5, range: [4.2, 5], label: "Clean House", emoji: "🌟", color: "#22c55e", bg: "#052010", tagline: "You found one. They actually exist.", desc: "Your employer treats you like a human being. Growth is real, voice matters, time is respected.", badge: "THRIVING" },
];

// ── PERCEPTION QUESTIONS ──────────────────────────────────────────────────────
export const QUESTIONS = [
  { id: "compensation", cat: "Pay & Rewards", emoji: "💰", q: "How fairly are you compensated for the work you actually do?", opts: [{ l: "Above market, bonuses consistent", s: 5 }, { l: "Fair salary, occasional recognition", s: 4 }, { l: "Okay pay, no real growth", s: 3 }, { l: "Underpaid and rarely acknowledged", s: 2 }, { l: "Doing three jobs for one salary", s: 1 }] },
  { id: "workload", cat: "Workload", emoji: "⏱️", q: "How does your actual workload compare to what was described when you joined?", opts: [{ l: "Matches expectations perfectly", s: 5 }, { l: "A bit more, but fair", s: 4 }, { l: "Scope keeps creeping quietly", s: 3 }, { l: "Significantly more, no extra pay", s: 2 }, { l: "I am basically an entire department", s: 1 }] },
  { id: "boundaries", cat: "Boundaries & Time", emoji: "🚪", q: "How respected are your personal time and off-hours?", opts: [{ l: "Clear separation, no after-hours pings", s: 5 }, { l: "Mostly fine, occasional urgents", s: 4 }, { l: "Weekend messages are now routine", s: 3 }, { l: "Always available is unwritten law", s: 2 }, { l: "What is a weekend?", s: 1 }] },
  { id: "growth", cat: "Growth & Opportunity", emoji: "📈", q: "How much real career growth do you see in your current role?", opts: [{ l: "Clear path, mentorship, promotions happen", s: 5 }, { l: "Slow but real learning happening", s: 4 }, { l: "Plateau — same role, same loop", s: 3 }, { l: "Skills used but never developed", s: 2 }, { l: "Being parked here indefinitely", s: 1 }] },
  { id: "voice", cat: "Voice & Respect", emoji: "🎙️", q: "How much does your input actually influence decisions?", opts: [{ l: "Ideas taken seriously and acted on", s: 5 }, { l: "Sometimes heard, sometimes not", s: 4 }, { l: "Consulted but rarely considered", s: 3 }, { l: "Feedback into the void", s: 2 }, { l: "Decisions happen to me, not with me", s: 1 }] },
  { id: "recognition", cat: "Recognition", emoji: "🏆", q: "When you do great work, what actually happens?", opts: [{ l: "Recognised publicly and rewarded", s: 5 }, { l: "Acknowledged verbally at least", s: 4 }, { l: "Silence is the standard response", s: 3 }, { l: "Work praised, credited to others", s: 2 }, { l: "Good work just means more work", s: 1 }] },
  { id: "psychological", cat: "Psychological Safety", emoji: "🧠", q: "How safe do you feel speaking up, making mistakes, or saying no?", opts: [{ l: "Fully safe — no is valid, mistakes are lessons", s: 5 }, { l: "Mostly safe, some navigation needed", s: 4 }, { l: "I pick my battles carefully", s: 3 }, { l: "Fear is part of daily decisions", s: 2 }, { l: "Eggshells. All the way down.", s: 1 }] },
  { id: "manager", cat: "Manager Quality", emoji: "👤", q: "How would you rate your direct manager?", opts: [{ l: "Advocates for me, real feedback", s: 5 }, { l: "Decent, mostly supportive", s: 4 }, { l: "Indifferent — neither helps nor hurts", s: 3 }, { l: "Takes credit, gives blame", s: 2 }, { l: "Actively makes work life worse", s: 1 }] },
  { id: "dei", cat: "Inclusion & Fairness", emoji: "⚖️", q: "How genuine is your company's approach to diversity and inclusion?", opts: [{ l: "Lived reality, not just posters", s: 5 }, { l: "Mostly real, some gaps", s: 4 }, { l: "Performative but harmless", s: 3 }, { l: "Selective inclusion for optics", s: 2 }, { l: "D&I is a joke here", s: 1 }] },
];

// ── DROPDOWN DATA ─────────────────────────────────────────────────────────────
export const INDUSTRIES = ["Accounting & Audit","Advertising & PR","Aerospace & Defence","Agriculture & Agritech","AI / Machine Learning","Apparel & Fashion","Architecture & Interior Design","Automotive","Aviation","Beauty & Personal Care","Biotech & Life Sciences","Brand Management","Coaching & Training","Consulting & Strategy","Content & Creator Economy","Cybersecurity","Defence & Armed Forces","Education / EdTech","Energy & Utilities","Environment & Sustainability","Events & Experiences","Film & OTT","Finance & Banking","FMCG / Consumer Goods","Food & Beverage","Gaming","Government / PSU","Healthcare / Hospitals","Hospitality & Travel","Insurance","Investment & Wealth Management","Legal & Compliance","Logistics & Supply Chain","Luxury & Lifestyle","Manufacturing & Industrial","Marketing & Communications","Media & Entertainment","Mental Health & Wellness","Music & Audio","NGO / Non-profit / Social Impact","Pharmaceuticals","Real Estate & Construction","Research & Academia","Retail & E-commerce","Shipping & Maritime","Software / SaaS","Sports & Fitness","Staffing & Recruitment","Technology / IT","Other"];

export const FUNCTIONS = ["Account Management","Administration / Executive Assistance","AI / ML Engineering","Audit & Compliance","Board / Advisory","Broadcasting","Business Analysis","Community Management","Content / Copywriting","Customer Success / Support","Data Science / Analytics","Design / Creative / Art Direction","DevOps / Infrastructure","Engineering / Software Development","Event Management","Facilities","Fashion Design","Finance / Accounts","Growth & Performance","Healthcare / Clinical","Hospitality / Front of House","HR / People & Culture","Investment & Trading","IT Support / Systems","Journalism / Editorial","L&D / Training","Leadership / C-Suite / Founder","Legal / Compliance","Marketing / Brand","Nursing / Allied Health","Operations / Process","Paralegal / Documentation","Pharmacy","Photography & Videography","PR & Communications","Pre-sales / Solutions","Procurement","Product Design / UX","Product Management","Project Management","QA / Testing","Research & Development","Research & Insights","Retail / Store Management","Sales / Business Development","Social Media","Strategy & Consulting","Styling & Merchandising","Supply Chain / Logistics","Talent Acquisition","Teaching / Academics","Visual Merchandising","Other"];

export const SENIORITY = ["Intern / Trainee","Junior (0–2 yrs)","Mid-level (2–5 yrs)","Senior (5–10 yrs)","Lead / Manager","Director / VP","C-Suite / Founder"];
export const CO_SIZES = ["1–10","11–50","51–200","201–1000","1000+"];
export const CITIES = ["Ahmedabad","Bangalore","Chennai","Delhi / NCR","Dubai / UAE","Hyderabad","Kolkata","Mumbai","Pune","Qatar","Saudi Arabia","UK","USA","Other"];

// ── SCORING MAPS ──────────────────────────────────────────────────────────────
export const WORK_MODES = { "Fully Remote / WFH": 5, "Hybrid (mix of home & office)": 4, "Full-time Office": 3 };
export const BONUS_MAP = { "Yes — performance-linked, consistent": 5, "Yes — discretionary/irregular": 4, "Rarely, mostly symbolic": 3, "Only when I fight for it": 2, "Never. Bonuses are mythology here.": 1 };
export const FLEX_MAP = { "Full flexibility — I set my hours": 5, "Core hours, flexibility around them": 4, "Fixed hours, some leeway": 3, "Rigid schedule, zero exceptions": 2, "On-call / no real schedule": 1 };
export const INC_MAP = { "Above 15%": 5, "10–15%": 4, "5–10%": 3, "Below 5% (below inflation)": 2, "No increment / frozen": 1 };
export const NOTICE_MAP = { "Under 1 month": 5, "1 month": 4, "2 months": 3, "3 months": 2, "Over 3 months": 1 };
export const EQ_MAP = { "Full kit provided, maintained": 5, "Most things provided": 4, "Some things provided": 3, "Minimal — mostly my own": 2, "I use my own everything": 1 };
export const LEAVE_SC = (d) => d >= 25 ? 5 : d >= 15 ? 4 : d >= 10 ? 3 : d >= 5 ? 2 : 1;

// ── MEDIANS ───────────────────────────────────────────────────────────────────
export const MEDIANS = {
  "Technology / IT": { "Junior (0–2 yrs)": { idx: 2.8, salINR: 600000 }, "Mid-level (2–5 yrs)": { idx: 3.1, salINR: 1200000 }, "Senior (5–10 yrs)": { idx: 3.3, salINR: 2200000 }, "Lead / Manager": { idx: 3.0, salINR: 3200000 }, "Director / VP": { idx: 3.5, salINR: 5000000 } },
  "Finance & Banking": { "Junior (0–2 yrs)": { idx: 2.5, salINR: 500000 }, "Mid-level (2–5 yrs)": { idx: 2.7, salINR: 1000000 }, "Senior (5–10 yrs)": { idx: 2.9, salINR: 1800000 }, "Lead / Manager": { idx: 2.8, salINR: 2800000 }, "Director / VP": { idx: 3.2, salINR: 4500000 } },
  "Marketing & Communications": { "Junior (0–2 yrs)": { idx: 2.4, salINR: 400000 }, "Mid-level (2–5 yrs)": { idx: 2.6, salINR: 800000 }, "Senior (5–10 yrs)": { idx: 2.8, salINR: 1500000 }, "Lead / Manager": { idx: 2.7, salINR: 2200000 }, "Director / VP": { idx: 3.1, salINR: 3800000 } },
  "default": { "Junior (0–2 yrs)": { idx: 2.6, salINR: 450000 }, "Mid-level (2–5 yrs)": { idx: 2.8, salINR: 900000 }, "Senior (5–10 yrs)": { idx: 3.0, salINR: 1600000 }, "Lead / Manager": { idx: 2.9, salINR: 2400000 }, "Director / VP": { idx: 3.3, salINR: 4000000 } },
};

export const getMedian = (ind, sen) => {
  const i = MEDIANS[ind] || MEDIANS["default"];
  return i[sen] || i["Mid-level (2–5 yrs)"] || { idx: 2.8, salINR: 900000 };
};

export const getQuadrant = (avg) => QUADRANTS.find(q => avg >= q.range[0] && avg <= q.range[1]) || QUADRANTS[0];

export const scoreColor = (s) => s >= 4 ? "#22c55e" : s >= 3 ? "var(--amber)" : s >= 2 ? "#e67e22" : "#c0392b";

// ── PROFILE STAGES ────────────────────────────────────────────────────────────
export const PROFILE_STAGES = [
  { pct: 20, label: "Egg", emoji: "🥚" },
  { pct: 40, label: "Nymph", emoji: "🪲" },
  { pct: 60, label: "Survivor", emoji: "🐜" },
  { pct: 80, label: "Veteran Roach", emoji: "💪" },
  { pct: 100, label: "Indestructible", emoji: "🔱" },
];

// ── ROACH STAGES ──────────────────────────────────────────────────────────────
export const ROACH_STAGES = [
  { id: "egg", label: "Egg", emoji: "🥚", desc: "Just hatched. The journey begins.", minAudits: 0 },
  { id: "nymph", label: "Nymph", emoji: "🪲", desc: "Learning the terrain.", minAudits: 1 },
  { id: "survivor", label: "Survivor", emoji: "🐜", desc: "Built to endure.", minAudits: 3 },
  { id: "veteran", label: "Veteran Roach", emoji: "💪", desc: "Seen it all. Still standing.", minAudits: 5 },
  { id: "indestructible", label: "Indestructible", emoji: "🔱", desc: "Cannot be killed.", minAudits: 10 },
];

// ── BADGES ────────────────────────────────────────────────────────────────────
export const BADGES = [
  { id: "founding", label: "Founding Roach", emoji: "🥚", desc: "One of the first 500 members" },
  { id: "whistleblower", label: "Whistleblower", emoji: "🐜", desc: "Named a company scoring below 2.0" },
  { id: "revenger", label: "Revenger", emoji: "⚔️", desc: "Top 15% salary + score above 4.0" },
  { id: "amplifier", label: "Amplifier", emoji: "📣", desc: "Shared their score publicly" },
  { id: "voter", label: "Voter", emoji: "🗳️", desc: "Participated in a cabinet election" },
  { id: "exterminator", label: "Exterminator", emoji: "💀", desc: "Submitted an Extraction Report" },
];

// ── EMAILJS ───────────────────────────────────────────────────────────────────
export const EMAILJS_SERVICE = "service_p2orhes";
export const EMAILJS_TEMPLATE = "template_dittmm6";
export const EMAILJS_KEY = "Fc3_eHgXrl5uf-mTy";
