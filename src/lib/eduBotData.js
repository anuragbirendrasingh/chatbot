// ─────────────────────────────────────────────
// STATIC DATA — Extracted from real brochures
// Source: Amity University Online, Uttaranchal University Online,
//         NMIMS CDOE — all MBA brochures
// Website: https://edukyu.com/
// ─────────────────────────────────────────────

export const STATIC_DB = {
  universities: {

    // ── AMITY UNIVERSITY ONLINE ──────────────────────────────────────────
    amity: {
      name: "Amity University Online",
      shortName: "Amity",
      location: "Noida, UP (14 National + 12 Global Campuses)",
      established: 1994,
      ugc: true,
      naac: "A+",
      accreditations: ["UGC Entitled", "WASC (USA)", "QAA (UK)", "WES (Canada)", "AICTE", "NIRF Rank 32"],
      tagline: "India's Only Online MBA Ranked Asia Pacific Top 10 (QS 2024)",
      stats: {
        learners: "1.60 Lac+",
        programs: "60+",
        yearsOfExcellence: "30+",
        faculty: "6,000+",
        globalCampuses: 12,
        nationalCampuses: 14,
      },
      fees: { min: "₹75,000/yr", max: "₹1,25,000/yr" },
      mode: "Online (Mobile-First Platform)",
      cutoff: "Graduation with any stream (3 or 4 year degree)",
      programs: {
        mba: {
          name: "MBA (Master of Business Administration)",
          duration: "2 Years",
          credits: 102,
          learningEffort: "12–15 hrs/week",
          eligibility: "Any graduation (3 or 4 yr degree) with 10th & 12th certificates",
          specializations: [
            "Finance & Accounting Management",
            "Global Finance Market",
            "Insurance Management",
            "International Finance (ACCA)",
            "Human Resource Management",
            "Human Resources Analytics",
            "Marketing & Sales Management",
            "International Business Management",
            "Retail Management",
            "Entrepreneurship & Leadership Management",
            "Information Technology Management",
            "Digital Marketing Management",
            "Digital Entrepreneurship",
            "Production & Operations Management",
            "General Management",
            "Data Science",
            "Business Analytics",
            "Hospitality Management",
          ],
          highlights: [
            "AI-Powered Learning Tools (Prof. AMI)",
            "Gamified Assignments & Business Simulations",
            "Live Industry Projects with Certifications",
            "Certification in Basics of AI",
            "Inclusive & Flexible Learning (UDL)",
            "24x7 Academic Support",
            "Placement Drives every fortnight",
          ],
          curriculum: {
            sem1: ["Accounting for Managers", "Marketing Management", "Managerial Economics", "Statistics for Management", "Professional Communication"],
            sem2: ["Business Research Methods", "Financial Management", "Human Resource Management", "Conflict Resolution & Management", "Legal Aspects of Business"],
            sem3: ["Strategic Management", "Specialization Electives 1–4", "Professional Ethics", "Minor Project"],
            sem4: ["Specialization Electives 5–6", "AI Tools and Applications", "Digital Marketing", "Management in Action – Social Economic & Ethical Issues", "Major Project"],
          },
          careerServices: [
            "1:1 Industry Mentorship",
            "Resume Building Workshops",
            "Interview Preparation",
            "Master Classes with Industry Experts",
            "Skill Development Programs",
            "Placement Drives on Campus & Online every Fortnight",
          ],
          topRecruiters: ["Google", "Apple", "PwC", "Reliance", "EY", "Samsung", "Amazon", "HCLTech", "Wipro", "KPMG", "Aditya Birla", "Dell", "HUL", "J.P. Morgan", "Barclays"],
        },
        other: ["BCA", "BBA", "BA", "BAJMC", "B.Com", "MCA", "M.Com", "MAJMC", "MA"],
      },
      placements: { avg: "N/A (Online)", highest: "N/A", companies: 500 },
      contact: { toll_free: "1800-102-3434", website: "amityonline.com" },
      links: [
        { label: "Amity Online MBA 2026", href: "https://edukyu.com/amity-online" },
        { label: "Amity MBA Specializations", href: "https://edukyu.com/amity-online" },
        { label: "Amity Fee Structure", href: "https://edukyu.com/amity-online" },
        { label: "Amity Accreditations", href: "https://edukyu.com/amity-online" },
      ],
    },

    // ── UTTARANCHAL UNIVERSITY ONLINE ────────────────────────────────────
    uttaranchal: {
      name: "Uttaranchal University Online (Online UU)",
      shortName: "Uttaranchal",
      location: "Premnagar, Dehradun, Uttarakhand",
      established: 2013,
      ugc: true,
      naac: "A+",
      accreditations: ["UGC Entitled", "NAAC Grade A+", "AICTE", "AIU", "WURI", "Academic Impact", "QCI", "ISO 9001:2015"],
      tagline: "Rise high to the world of analytical business with 'Online UU'",
      stats: {
        learners: "Growing",
        programs: "Online MBA + UG",
        yearsOfExcellence: "10+",
      },
      fees: { min: "Contact for details", max: "Refer onlineuu.in" },
      mode: "Online (U-CODE – Uttaranchal College of Online & Distance Education)",
      cutoff: "Bachelor's degree in any stream from recognized university",
      programs: {
        mba: {
          name: "MBA (Master of Business Administration)",
          duration: "Minimum 2 Years",
          semesters: 4,
          eligibility: "Bachelor's degree (any stream) from a recognized university",
          specializations: [
            "Marketing Management",
            "Financial Management",
            "Human Resource Management",
            "Business Analytics",
            "Information Technology",
            "Digital Marketing",
            "International Business",
            "Logistics & Supply Chain Management",
          ],
          highlights: [
            "Research-intensive curriculum by industry leaders",
            "User-friendly LMS with rich interactive features",
            "Live & interactive lectures by expert faculty",
            "Well-designed e-Self Learning Materials (e-SLMs)",
            "Mentorship for personalized learning",
            "Globally accepted course curriculum",
            "Affordable education with recognized degree",
          ],
          curriculum: {
            sem1: ["Principles and Practices of Management", "Accounting for Managerial Decisions", "Economics for Managers", "Business Environment", "E-Commerce", "Emerging Business Law"],
            sem2: ["Business Research Methods", "Marketing Management", "Business Analytics", "Operations Management"],
            sem3: ["Strategic Management", "Supply Chain Management", "Financial Statement Analysis", "Specialization Papers 1 & 2", "Entrepreneurship Development"],
            sem4: ["Corporate Governance", "Specialization Papers 1 & 2", "Project Work"],
          },
          specializationDetails: {
            marketing: ["Sales and Distribution Management", "Integrated Marketing Communication & Brand Management", "Consumer Buying Behavior", "Marketing Research"],
            finance: ["Corporate Financial Management", "Security Analysis, Portfolio and Risk Management", "Wealth Management & Investment Environment", "Risk Management"],
            hr: ["Training & Development Practices", "Performance & Compensation Management", "Industrial Relations & Labour Laws", "HRM Planning, Bargaining & Negotiation Process"],
            businessAnalytics: ["Big Data Analytics in Business", "R Programming for Business", "Marketing & Social Media Analytics", "Python Programming & Data Visualization"],
            it: ["Fundamentals of Information Technology", "Business Intelligence and Analytics", "Enterprise Resource Planning", "Web Designing and Content Management"],
            digitalMarketing: ["Fundamentals of Digital Marketing", "Digital Business Design", "Digital Technologies and Analytics", "Digital Strategies for Business"],
            internationalBusiness: ["Global Business Environment", "Import Export Procedures and Documentation", "Cross Cultural Business Challenges", "Global Strategic Management"],
            logistics: ["International Logistics", "Supply Chain Modelling Design & Simulation", "Supply Chain Analytics", "Sustainability in Logistics & Supply Chain"],
          },
          admissionProcess: [
            "Visit www.onlineuu.in & click 'Apply Now'",
            "Fill details: Name, Email ID, Mobile, Nationality, State, Program",
            "Login with User ID & Password sent via SMS/Email",
            "Fill Application Form, pay Program Fee online",
            "Upload documents & passport photo → Submit",
          ],
        },
      },
      placements: { avg: "N/A (Online)", highest: "N/A", companies: 100 },
      contact: { toll_free: "18002124454", website: "onlineuu.in", email: "admissions@onlineuu.in" },
      links: [
        { label: "UU Online MBA 2026", href: "https://edukyu.com/niu-online" },
        { label: "UU MBA Specializations", href: "https://edukyu.com/niu-online" },
        { label: "UU Admission Process", href: "https://edukyu.com/niu-online" },
        { label: "Apply to Online UU", href: "https://edukyu.com/niu-online" },
      ],
    },

    // ── NMIMS CDOE ───────────────────────────────────────────────────────
    nmims: {
      name: "NMIMS CDOE (Centre for Distance and Online Education)",
      shortName: "NMIMS",
      location: "Vile Parle West, Mumbai – 400056",
      established: 2013,
      ugc: true,
      naac: "A++",
      accreditations: ["NAAC Grade A++", "NIRF Top 100", "UGC Entitled", "Deemed University (UGC Act 1956)"],
      tagline: "Create Outcomes. Get Recognised. Lead.",
      stats: {
        learners: "8,000+",
        faculty: "140+ Renowned Faculty",
        facultyPhDs: "90+",
        teachingExperience: "400+ combined years",
        industryExperience: "800+ combined years",
        hiringPartners: "500+",
        alumniNetwork: "8,000+ corporate firms",
        csatRate: "85%+",
      },
      fees: {
        annual: "₹1,05,000/yr",
        semester: "₹55,000/sem",
        total: "₹1,96,000 (full program)",
        processingFee: "₹1,200",
        examFee: "₹800/subject/attempt",
        note: "EMI available via HDFC, ICICI, Axis, Citi, SCB, HSBC, Kotak (3/6/9/12 months)",
        scholarships: "20% concession for Armed Forces / Defence Personnel & family",
      },
      mode: "Online (24x7 live & recorded lectures)",
      cutoff: "Graduation (any stream) min 50% marks (45% for SC/ST/OBC/PwD)",
      programs: {
        mba: {
          name: "MBA (Master of Business Administration)",
          duration: "2 Years",
          semesters: 4,
          programValidity: "4 Years",
          totalCredits: 102,
          eligibility: "Bachelor's in any discipline with min 50% (45% SC/ST/OBC/PwD) + ABC ID + DEB ID",
          specializations: [
            "Business Management",
            "Finance",
            "Marketing",
            "Human Resource",
            "Operations & Data Sciences",
          ],
          highlights: [
            "500+ Hiring Partners (MNCs, Corporations, Start-ups)",
            "Global Alumni network in 8,000+ firms",
            "4-Quadrant Learning (Videos, Live, Digital Materials, Quizzes)",
            "Career Services with Mentoring & Technical Skill Building",
            "Digital Library Access",
            "Case-based & Application-oriented Assessments",
            "CSAT Rate > 85% (above industry avg)",
            "Masterclasses from global experts",
          ],
          curriculum: {
            sem1: ["Business Communication", "Financial Accounting", "Micro & Macro Economics", "Organizational Behavior", "Marketing Management", "Quantitative Methods – I"],
            sem2: ["Cost & Management Accounting", "Human Resource Management", "Strategic Management", "Business Analytics", "Legal Aspect of Business", "Operations Management"],
            sem3: ["Corporate Finance", "Research Methodology", "Elective 1–4"],
            sem4: ["Indian Ethos & Ethics", "Corporate Sustainability", "International Business", "Project", "Elective 5–7"],
          },
          specializationElectives: {
            finance: ["Capital Market & Portfolio Management", "Business Valuation", "Financial Derivatives", "Strategic Cost Management", "Corporate Tax Planning", "Investment Banking", "International Finance"],
            hr: ["Compensation & Benefits", "Industrial Relations & Labour Laws", "Manpower Planning, Recruitment & Selection", "Organizational Development & Change", "Performance Management System", "Learning & Development", "Emotional Intelligence"],
            marketing: ["Brand Management", "Consumer Behaviour", "Integrated Marketing Communications", "Sales Management", "International Marketing", "Services Marketing", "Digital Marketing"],
            operations: ["Operation Analytics", "Project Management", "Total Quality Management", "Supply Chain Management", "EDA & Data Visualisation", "Strategic Sourcing & E-procurement", "IoT and Big Data"],
            business: ["Information Systems for Management", "Consumer Behaviour", "Organisational Theory", "Supply Chain Management", "Digital Marketing", "Entrepreneurship & Venture Capital Management", "Project Management"],
          },
          admissionProcess: [
            "Register online at online.nmims.edu",
            "A student counsellor will contact you",
            "Upload gazette-attested academic & KYC documents",
            "Pay fee online or via Demand Draft (SVKM's NMIMS, Mumbai)",
            "Admission confirmed; Student Number issued",
          ],
        },
      },
      placements: { avg: "N/A (Online)", highest: "N/A", companies: 500 },
      contact: { website: "online.nmims.edu" },
      links: [
        { label: "NMIMS MBA 2026", href: "https://edukyu.com/" },
        { label: "NMIMS Specializations", href: "https://edukyu.com/" },
        { label: "NMIMS Fee & Admission", href: "https://edukyu.com/" },
        { label: "NMIMS Hiring Partners", href: "https://edukyu.com/" },
      ],
    },

    // ── NIU (keep for comparison, edukyu partner) ────────────────────────
    niu: {
      name: "Noida International University (NIU)",
      shortName: "NIU",
      location: "Greater Noida, UP",
      established: 2010,
      ugc: true,
      fees: { min: "₹30,000/yr", max: "₹1,20,000/yr" },
      courses: ["MBA (Finance, HR, Marketing, IT)", "MCA", "BCA", "B.Com", "MA", "M.Sc"],
      cutoff: "50% in qualifying exam",
      mode: "Online & On-campus",
      placements: { avg: "₹4.5 LPA", highest: "₹12 LPA", companies: 120 },
      links: [
        { label: "NIU Admission 2026", href: "https://edukyu.com/niu-online" },
        { label: "NIU Fee Structure", href: "https://edukyu.com/niu-online" },
        { label: "NIU Courses", href: "https://edukyu.com/niu-online" },
      ],
    },
  },

  // ── EXAMS ──────────────────────────────────────────────────────────────
  exams: {
    neet: {
      name: "NEET UG 2026",
      conducting: "NTA",
      pattern: "180 Questions | 720 Marks | 3 Hours 20 Min",
      dates: { exam: "May 2026", result: "Jun 2026" },
      eligibility: "10+2 with PCB, min 50%",
      syllabus: ["Physics", "Chemistry", "Biology"],
      links: [
        { label: "NEET Answer Key 2026", href: "https://edukyu.com/" },
        { label: "NEET Cutoff 2026", href: "https://edukyu.com/" },
        { label: "NEET Counselling", href: "https://edukyu.com/" },
      ],
    },
    mat: {
      name: "MAT 2026 (MBA Entrance)",
      conducting: "AIMA",
      pattern: "200 Questions | 200 Marks | 2.5 Hours",
      dates: { exam: "Feb, May, Sep, Dec 2026" },
      eligibility: "Any graduation (any stream)",
      syllabus: ["Language Comprehension", "Mathematical Skills", "Data Analysis", "Intelligence & Critical Reasoning", "Indian & Global Environment"],
      links: [
        { label: "MAT Exam Pattern", href: "https://edukyu.com/" },
        { label: "MAT Accepting Colleges", href: "https://edukyu.com/" },
      ],
    },
  },

  // ── MBA-SPECIFIC COMPARISON DATA ───────────────────────────────────────
  mbaComparison: {
    headers: ["University", "Duration", "Fee/yr", "NAAC", "Mode", "Specializations"],
    rows: [
      ["Amity Online", "2 Years", "~₹75k–1.25L", "A+ (QS Top 10 Asia)", "Online", "18 specs"],
      ["NMIMS CDOE", "2 Years", "~₹1.05L", "A++ (NIRF Top 100)", "Online", "5 specs"],
      ["Uttaranchal Online", "Min 2 Years", "Refer site", "A+", "Online", "8 specs"],
      ["NIU Online", "2 Years", "~₹30k–1.2L", "UGC Entitled", "Online+Campus", "4 specs"],
    ],
  },
};

// ── INTENT KEYWORDS (extend as needed) ──────────────────────────────────
export const UNIVERSITY_KEYS = {
  amity: ["amity", "amity university", "amity online", "amityonline"],
  uttaranchal: ["uttaranchal", "uttarakhand university", "online uu", "onlineuu", "u-code", "uu online"],
  nmims: ["nmims", "narsee monjee", "nmims cdoe", "svkm"],
  niu: ["niu", "noida international"],
};

export const PROGRAM_KEYS = {
  mba: ["mba", "master of business", "management degree", "business administration"],
  btech: ["b.tech", "btech", "engineering", "b tech"],
  bca: ["bca", "bachelor of computer"],
  mca: ["mca", "master of computer"],
  bba: ["bba", "bachelor of business"],
};

// ── SUGGESTION CHIPS ────────────────────────────────────────────────────
export const DEFAULT_SUGGESTIONS = [
  "Amity Online MBA",
  "NMIMS MBA Fees",
  "Compare MBA Colleges",
  "Uttaranchal MBA",
  "MAT 2026",
  "Get Free Counselling",
];
