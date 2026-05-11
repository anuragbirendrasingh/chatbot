import { STATIC_DB, UNIVERSITY_KEYS, PROGRAM_KEYS } from "./eduBotData";

// ─────────────────────────────────────────────
// INTENT MATCHER — pure string logic, 0 tokens
// ─────────────────────────────────────────────
export function matchIntent(input) {
  const q = input.toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|hlo|namaste|sup|yo|hii)\b/.test(q))
    return { type: "greeting" };

  // MBA comparison
  if ((q.includes("compare") || q.includes("vs") || q.includes("better") || q.includes("difference")) && q.includes("mba"))
    return { type: "mba_compare" };

  // General comparison
  if (q.includes("vs") || q.includes("compare") || q.includes("better"))
    return { type: "compare" };

  // University intent — check all keys
  for (const [key, keywords] of Object.entries(UNIVERSITY_KEYS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      // Sub-intent: specific section
      if (q.includes("fee") || q.includes("cost") || q.includes("price") || q.includes("how much"))
        return { type: "university_fees", key };
      if (q.includes("special") || q.includes("stream") || q.includes("domain"))
        return { type: "university_specializations", key };
      if (q.includes("curriculum") || q.includes("syllabus") || q.includes("subject") || q.includes("semester"))
        return { type: "university_curriculum", key };
      if (q.includes("admission") || q.includes("apply") || q.includes("eligib") || q.includes("how to join"))
        return { type: "university_admission", key };
      if (q.includes("placement") || q.includes("job") || q.includes("career") || q.includes("recruiter"))
        return { type: "university_placement", key };
      if (q.includes("accredit") || q.includes("rank") || q.includes("ugc") || q.includes("naac"))
        return { type: "university_accreditation", key };
      // Default: full overview
      return { type: "university", key };
    }
  }

  // MBA-specific without university name
  if (PROGRAM_KEYS.mba.some((kw) => q.includes(kw))) {
    if (q.includes("fee") || q.includes("cost"))   return { type: "fees_mba" };
    if (q.includes("special") || q.includes("stream")) return { type: "mba_specializations" };
    if (q.includes("eligib") || q.includes("qualify")) return { type: "mba_eligibility" };
    if (q.includes("online"))                       return { type: "mba_online" };
    return { type: "mba_generic" };
  }

  // Exam intents
  if (q.includes("neet"))                               return { type: "exam", key: "neet" };
  if (q.includes("mat") || q.includes("mba entrance"))  return { type: "exam", key: "mat" };

  // Generic sub-intents
  if (q.includes("fee") || q.includes("cost") || q.includes("price"))
    return { type: "fees_generic" };
  if (q.includes("course") || q.includes("program"))
    return { type: "courses_generic" };
  if (q.includes("placement") || q.includes("salary") || q.includes("package"))
    return { type: "placement_generic" };
  if (q.includes("admission") || q.includes("apply") || q.includes("eligib"))
    return { type: "admission_generic" };
  if (q.includes("counsel") || q.includes("help me") || q.includes("suggest") || q.includes("guide"))
    return { type: "counselling" };

  return { type: "ai_needed" };
}

// ─────────────────────────────────────────────
// RESPONSE BUILDER
// ─────────────────────────────────────────────
export function buildResponse(intent) {
  const unis = Object.values(STATIC_DB.universities);

  switch (intent.type) {

    // ── GREETING ───────────────────────────────────────────────────────
    case "greeting":
      return {
        chip: "Welcome 👋",
        text: "Hi! I'm ChatBot. I can help you explore MBA programs from Amity Online, NMIMS, Uttaranchal University, and more. What would you like to know?",
        suggestions: ["Amity Online MBA", "NMIMS MBA", "Compare MBA Colleges", "Get Free Counselling"],
      };

    // ── UNIVERSITY: FULL OVERVIEW ───────────────────────────────────────
    case "university": {
      const u = STATIC_DB.universities[intent.key];
      const prog = u.programs?.mba;
      return {
        chip: "College Info",
        title: u.name,
        meta: `📍 ${u.location} · Est. ${u.established} · NAAC: ${u.naac || "UGC ✓"} · ${u.mode}`,
        table: [
          ["Mode", u.mode],
          ["Fees", `${u.fees.min}${u.fees.max ? ` – ${u.fees.max}` : ""}`],
          ["Eligibility", u.cutoff],
          ...(prog ? [["MBA Duration", prog.duration], ["MBA Credits", prog.totalCredits || prog.credits || "102"]] : []),
          ...(u.stats?.learners ? [["Total Learners", u.stats.learners]] : []),
          ...(u.accreditations ? [["Accreditations", u.accreditations.slice(0, 3).join(", ")]] : []),
        ],
        list: {
          label: prog ? "MBA Specializations (Top picks)" : "Courses Offered",
          items: prog ? prog.specializations.slice(0, 8) : (u.courses || []),
        },
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: FEES ───────────────────────────────────────────────
    case "university_fees": {
      const u = STATIC_DB.universities[intent.key];
      const nmims = STATIC_DB.universities.nmims;
      const feeRows = intent.key === "nmims"
        ? [
            ["Annual Fee", nmims.fees.annual],
            ["Per Semester", nmims.fees.semester],
            ["Full Program", nmims.fees.total],
            ["Processing Fee", nmims.fees.processingFee],
            ["Exam Fee", nmims.fees.examFee],
            ["EMI Options", "3/6/9/12 months (HDFC, ICICI, Axis & more)"],
            ["Defence Discount", nmims.fees.scholarships],
          ]
        : [
            ["Fee Range", `${u.fees.min}${u.fees.max ? ` – ${u.fees.max}` : ""}`],
            ["Mode", u.mode],
            ["Eligibility", u.cutoff],
          ];
      return {
        chip: "Fee Structure",
        title: `${u.name} — Fee Details`,
        meta: `📍 ${u.location}`,
        table: feeRows,
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: SPECIALIZATIONS ────────────────────────────────────
    case "university_specializations": {
      const u = STATIC_DB.universities[intent.key];
      const prog = u.programs?.mba;
      return {
        chip: "MBA Specializations",
        title: `${u.shortName || u.name} — MBA Streams`,
        text: prog ? `${u.name} offers ${prog.specializations.length} MBA specializations:` : undefined,
        list: {
          label: "Choose your specialization",
          items: prog ? prog.specializations : (u.courses || []),
        },
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: CURRICULUM ──────────────────────────────────────────
    case "university_curriculum": {
      const u = STATIC_DB.universities[intent.key];
      const cur = u.programs?.mba?.curriculum;
      if (!cur) return buildResponse({ type: "university", key: intent.key });
      return {
        chip: "Curriculum",
        title: `${u.shortName || u.name} MBA — Semester-wise Subjects`,
        table: [
          ["Sem 1", cur.sem1.slice(0, 3).join(", ") + "..."],
          ["Sem 2", cur.sem2.slice(0, 3).join(", ") + "..."],
          ["Sem 3", cur.sem3.slice(0, 3).join(", ") + "..."],
          ["Sem 4", cur.sem4.slice(0, 3).join(", ") + "..."],
        ],
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: ADMISSION ───────────────────────────────────────────
    case "university_admission": {
      const u = STATIC_DB.universities[intent.key];
      const steps = u.programs?.mba?.admissionProcess || [
        "Visit official website & fill application form",
        "Upload 10th, 12th & Graduation documents",
        "Pay program fee online",
        "Await confirmation & student ID",
      ];
      return {
        chip: "Admission Process",
        title: `How to Apply — ${u.shortName || u.name}`,
        meta: `Eligibility: ${u.cutoff}`,
        steps,
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: PLACEMENT ───────────────────────────────────────────
    case "university_placement": {
      const u = STATIC_DB.universities[intent.key];
      const prog = u.programs?.mba;
      return {
        chip: "Career & Placements",
        title: `${u.shortName || u.name} — Career Services`,
        list: {
          label: "Career support offered",
          items: prog?.careerServices || prog?.highlights || ["Placement drives", "Resume workshops", "Interview prep", "Industry mentorship"],
        },
        table: intent.key === "nmims"
          ? [
              ["Hiring Partners", "500+"],
              ["Alumni in Firms", "8,000+ companies"],
              ["CSAT Rate", "> 85%"],
            ]
          : intent.key === "amity"
          ? [
              ["Placement Drives", "Every Fortnight"],
              ["Top Recruiters", "Google, Amazon, TCS, Wipro & more"],
              ["Career Services", "AI-driven smart resume + mock interviews"],
            ]
          : [["Career Support", "Industry mentorship + placement drives"]],
        links: u.links,
        cta: true,
      };
    }

    // ── UNIVERSITY: ACCREDITATION ───────────────────────────────────────
    case "university_accreditation": {
      const u = STATIC_DB.universities[intent.key];
      return {
        chip: "Accreditations & Rankings",
        title: `${u.shortName || u.name} — Recognition`,
        meta: u.tagline || "",
        list: {
          label: "Accreditations & Rankings",
          items: u.accreditations || ["UGC Entitled", "NAAC Accredited"],
        },
        links: u.links,
        cta: false,
      };
    }

    // ── MBA COMPARE ─────────────────────────────────────────────────────
    case "mba_compare":
      return {
        chip: "MBA Comparison",
        title: "Online MBA — Side by Side",
        compareTable: STATIC_DB.mbaComparison,
        text: "All 4 universities are UGC-approved for online degrees. Your choice depends on budget, specialization, and brand value.",
        links: [
          { label: "Amity Online MBA", href: "https://edukyu.com/amity-online" },
          { label: "NMIMS MBA", href: "https://edukyu.com/" },
          { label: "Uttaranchal MBA", href: "https://edukyu.com/niu-online" },
          { label: "Full Comparison Tool", href: "https://edukyu.com/" },
        ],
        cta: true,
      };

    // ── GENERAL COMPARE ─────────────────────────────────────────────────
    case "compare":
      return {
        chip: "Comparison",
        title: "Top Colleges at a Glance",
        compareTable: {
          headers: ["College", "NAAC", "Fees/yr", "Mode"],
          rows: [
            ["Amity Online", "A+ (QS Top 10)", "~₹75k–1.25L", "Online"],
            ["NMIMS CDOE", "A++ (NIRF Top 100)", "~₹1.05L", "Online"],
            ["Uttaranchal", "A+", "Refer site", "Online"],
            ["NIU", "UGC ✓", "₹30k–1.2L", "Online+Campus"],
          ],
        },
        links: [
          { label: "Full Comparison", href: "https://edukyu.com/" },
          { label: "College Predictor", href: "https://edukyu.com/" },
        ],
        cta: true,
      };

    // ── MBA GENERIC ─────────────────────────────────────────────────────
    case "mba_generic":
    case "mba_online":
      return {
        chip: "Online MBA",
        title: "Best Online MBA Programs 2026",
        compareTable: STATIC_DB.mbaComparison,
        links: [
          { label: "Amity Online MBA", href: "https://edukyu.com/amity-online" },
          { label: "NMIMS MBA", href: "https://edukyu.com/" },
          { label: "Uttaranchal MBA", href: "https://edukyu.com/niu-online" },
        ],
        cta: true,
      };

    // ── MBA FEES ────────────────────────────────────────────────────────
    case "fees_mba":
      return {
        chip: "MBA Fee Structure",
        title: "Online MBA Fees — All Universities",
        compareTable: {
          headers: ["University", "Annual Fee", "Total (2yr)"],
          rows: [
            ["Amity Online", "~₹75k–1.25L", "~₹1.5L–2.5L"],
            ["NMIMS CDOE", "₹1,05,000", "₹1,96,000"],
            ["Uttaranchal", "Refer site", "—"],
            ["NIU", "₹30k–1.2L", "~₹60k–2.4L"],
          ],
        },
        links: [
          { label: "Fee Calculator", href: "https://edukyu.com/" },
          { label: "Scholarship Info", href: "https://edukyu.com/" },
        ],
        cta: true,
      };

    // ── MBA SPECIALIZATIONS ─────────────────────────────────────────────
    case "mba_specializations":
      return {
        chip: "MBA Specializations",
        title: "Popular MBA Streams 2026",
        list: {
          label: "Most in-demand across universities",
          items: ["Finance", "Marketing", "HR Management", "Business Analytics", "Data Science", "Digital Marketing", "IT Management", "International Business", "Operations Management", "General Management"],
        },
        text: "Amity has 18 specializations, NMIMS has 5 focused tracks, Uttaranchal has 8 including Logistics & Supply Chain.",
        links: [{ label: "Browse All Specializations", href: "https://edukyu.com/" }],
        cta: true,
      };

    // ── MBA ELIGIBILITY ─────────────────────────────────────────────────
    case "mba_eligibility":
      return {
        chip: "MBA Eligibility",
        title: "Who Can Apply for Online MBA?",
        table: [
          ["Amity Online", "Any graduation (50% not mandatory)"],
          ["NMIMS CDOE", "Any graduation, min 50% (45% SC/ST/OBC/PwD)"],
          ["Uttaranchal", "Any graduation from recognized university"],
          ["NIU", "50% in qualifying exam"],
        ],
        text: "All programs also require 10th & 12th certificates. NMIMS additionally needs ABC ID & DEB ID.",
        links: [{ label: "Check Eligibility Now", href: "https://edukyu.com/" }],
        cta: true,
      };

    // ── EXAM ────────────────────────────────────────────────────────────
    case "exam": {
      const e = STATIC_DB.exams[intent.key];
      return {
        chip: "Exam Info",
        title: e.name,
        meta: `Conducted by ${e.conducting}`,
        table: [
          ["Pattern", e.pattern],
          ["Eligibility", e.eligibility],
          ...Object.entries(e.dates).map(([k, v]) => [
            k.charAt(0).toUpperCase() + k.slice(1), v,
          ]),
        ],
        list: { label: "Syllabus Subjects", items: e.syllabus },
        links: e.links,
        cta: false,
      };
    }

    // ── FEES GENERIC ────────────────────────────────────────────────────
    case "fees_generic":
      return {
        chip: "Fee Structure",
        title: "Fee Ranges — Top Online Universities",
        compareTable: {
          headers: ["College", "Fee/yr"],
          rows: [
            ["Amity Online MBA", "~₹75k–1.25L"],
            ["NMIMS CDOE MBA", "₹1,05,000"],
            ["Uttaranchal Online", "Refer site"],
            ["NIU Online", "₹30k–1.2L"],
          ],
        },
        links: [
          { label: "Fee Calculator", href: "https://edukyu.com/" },
          { label: "Scholarship Info", href: "https://edukyu.com/" },
        ],
        cta: true,
      };

    // ── PLACEMENT GENERIC ───────────────────────────────────────────────
    case "placement_generic":
      return {
        chip: "Placements",
        title: "Career Support — Online Universities",
        compareTable: {
          headers: ["University", "Hiring Partners", "Key Feature"],
          rows: [
            ["Amity Online", "500+ companies", "AI-driven career services"],
            ["NMIMS CDOE", "500+ partners", "Global alumni in 8,000+ firms"],
            ["Uttaranchal", "Active drives", "Industry mentorship"],
            ["NIU", "120+ companies", "On-campus + online drives"],
          ],
        },
        links: [{ label: "View Placement Reports", href: "https://edukyu.com/" }],
        cta: true,
      };

    // ── ADMISSION GENERIC ───────────────────────────────────────────────
    case "admission_generic":
      return {
        chip: "Admissions 2026",
        title: "How to Apply",
        text: "General steps for online MBA admission:",
        steps: [
          "Visit the university website & create an account",
          "Fill application form with personal & academic details",
          "Upload documents: 10th, 12th, Graduation marksheets + ID proof",
          "Pay the application/processing fee online",
          "Await confirmation & receive student credentials",
        ],
        links: [
          { label: "Apply to Amity Online", href: "https://edukyu.com/amity-online" },
          { label: "Apply to NMIMS", href: "https://edukyu.com/" },
          { label: "College Predictor", href: "https://edukyu.com/" },
        ],
        cta: true,
      };

    // ── COURSES GENERIC ─────────────────────────────────────────────────
    case "courses_generic":
      return {
        chip: "Programs",
        title: "Popular Online Programs 2026",
        list: {
          label: "Available at top colleges on EduKyu",
          items: ["MBA", "MCA", "BCA", "BBA", "B.Com", "M.Com", "MA", "B.Tech", "Data Science", "Digital Marketing"],
        },
        links: [{ label: "Browse All Courses", href: "https://edukyu.com/" }],
        cta: false,
      };

    // ── COUNSELLING ─────────────────────────────────────────────────────
    case "counselling":
      return {
        chip: "Free Counselling",
        text: "Our expert counsellors at EduKyu can help you pick the right college based on your score, budget, and career goals — completely FREE! 🎓",
        cta: true,
        ctaImmediate: true,
      };

    default:
      return { type: "ai_needed" };
  }
}
