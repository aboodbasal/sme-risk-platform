import React, { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const T = {
  en: {
    brand: "Alpha Pro MENA",
    tagline: "Powered by AI · SAMA Compliant",
    credit: "Alpha Pro MENA × Baker Tilly",
    sectionRisk: "SME Risk Intelligence",
    sectionCredit: "Credit Scoring Engine",
    nav: { dashboard: "Dashboard", newAnalysis: "New Analysis", applications: "Applications", settings: "Settings",
           csDashboard: "Credit Dashboard", csNewApp: "New Application", csHistory: "History" },
    /* ── SME Risk translations ── */
    dashboard: {
      title: "Portfolio Overview", newBtn: "New Analysis", totalApps: "Total Applications", avgRisk: "Avg Risk Score",
      approvalRate: "Approval Rate", underReview: "SAR Under Review", riskDist: "Risk Distribution",
      low: "Low", medium: "Medium", high: "High", recentApps: "Recent Applications",
      company: "Company", sector: "Sector", score: "Score", level: "Level", decision: "Decision", view: "View",
      empty: "No applications yet. Start your first analysis!",
    },
    wizard: {
      step1: "Company Info", step2: "Financial Data", step3: "Compliance", step4: "Review",
      companyName: "Company Name", sector: "Sector", years: "Years in Business", employees: "Employees",
      revenue: "Annual Revenue (SAR)", financing: "Financing Amount (SAR)", purpose: "Purpose of Financing",
      ratio: "Financing / Monthly Income Ratio", ratioWarn: "Warning: Ratio exceeds SAMA 65% limit!",
      cr: "Commercial Register (MISA)", valid: "Valid", expired: "Expired",
      zatca: "ZATCA Status", compliant: "Compliant", nonCompliant: "Non-compliant",
      simah: "SIMAH Credit", clean: "Clean", minorIssues: "Minor Issues", majorIssues: "Major Issues",
      saudization: "Saudization %", samaChecks: "SAMA Compliance Checks",
      chk1: "Financing/Income ≤ 65%", chk2: "Max SAR 15M", chk3: "Valid CR (MISA)",
      chk4: "ZATCA Compliant", chk5: "Clean SIMAH", chk6: "Saudization ≥ 30%",
      review: "Review Summary", analyzeBtn: "Analyze with AI", next: "Next", prev: "Previous",
      analyzing: "Analyzing...", selectSector: "Select Sector",
    },
    sectors: ["Retail & Trade","Food & Beverage","Construction","Technology","Healthcare","Manufacturing","Transportation","Education","Real Estate","Agriculture","Professional Services","Tourism & Hospitality"],
    result: {
      title: "Risk Analysis Report", save: "Save to Portfolio", newAnalysis: "New Analysis",
      riskScore: "Risk Score", riskLevel: "Risk Level", recommendation: "Recommendation",
      recAmount: "Recommended Amount", recTenor: "Recommended Tenor",
      summary: "Executive Summary", strengths: "Strengths", risks: "Risk Factors",
      sharia: "Sharia Compliance", samaFlags: "SAMA Regulatory Notes", samaChecks: "SAMA Compliance Checks",
      conditions: "Conditions", saved: "Saved!",
    },
    apps: {
      title: "Applications", search: "Search company...", filterAll: "All Levels", filterLow: "Low",
      filterMedium: "Medium", filterHigh: "High", date: "Date", company: "Company", sector: "Sector",
      score: "Score", level: "Level", decision: "Decision", view: "View", empty: "No saved applications yet.",
    },
    settings: {
      title: "Settings", langLabel: "Language", apiKeyLabel: "Anthropic API Key", apiKeyPlaceholder: "sk-ant-...",
      apiKeySave: "Save Key", apiKeySaved: "Key Saved!", apiKeyNote: "Required for AI analysis. Stored locally in your browser.",
      about: "About",
      aboutText: "Alpha Pro MENA × Baker Tilly Platform — SME Risk Intelligence & AI Credit Scoring Engine. Powered by Claude AI. SAMA-compliant analysis for Islamic finance in Saudi Arabia.",
    },
    accept: "Accept", review: "Review", reject: "Reject",
    /* ── Credit Scoring translations ── */
    cs: {
      dashTitle: "Credit Scoring Dashboard", newAppBtn: "New Application",
      totalApps: "Total Applications", avgScore: "Average Score", approvalRate: "Approval Rate",
      totalFinancing: "Total Financing Requested", scoreDist: "Score Distribution",
      excellent: "Excellent", good: "Good", fair: "Fair", poor: "Poor",
      recentApps: "Recent Applications", date: "Date", name: "Applicant Name", type: "Type",
      score: "Score", eligibility: "Eligibility", decision: "Decision", view: "View",
      empty: "No applications yet. Start your first credit application!",
      individual: "Individual", sme: "SME",
      /* wizard */
      step1: "Applicant Info", step2: "Income / Business", step3: "Financing", step4: "Credit & Compliance", step5: "Review",
      applicantType: "Applicant Type", fullName: "Full Name", nationalId: "National ID / CR No.",
      nationality: "Nationality", saudi: "Saudi", nonSaudi: "Non-Saudi",
      city: "City", cities: ["Riyadh","Jeddah","Dammam","Khobar","Mecca","Medina","Other"],
      citiesAr: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      selectCity: "Select City",
      /* individual fields */
      empStatus: "Employment Status", government: "Government", privateSector: "Private Sector",
      selfEmployed: "Self-Employed", retired: "Retired", unemployed: "Unemployed",
      employer: "Employer Name", salary: "Monthly Salary (SAR)", yearsJob: "Years at Current Job",
      otherIncome: "Other Monthly Income (SAR)",
      /* sme fields */
      sector: "Business Sector", yearsInBiz: "Years in Business", annualRev: "Annual Revenue (SAR)",
      numEmployees: "Number of Employees", saudization: "Saudization %",
      /* financing */
      finAmount: "Financing Amount (SAR)", finPurpose: "Financing Purpose",
      finType: "Preferred Financing Type", murabaha: "Murabaha", ijarah: "Ijarah", tawarruq: "Tawarruq", aiDecide: "Let AI Decide",
      tenor: "Requested Tenor", months: "months",
      existingDebt: "Existing Monthly Debt Payments (SAR)",
      /* compliance */
      simahScore: "SIMAH Score", simahExcellent: "Excellent (750+)", simahGood: "Good (650-749)",
      simahFair: "Fair (550-649)", simahPoor: "Poor (Below 550)", simahNA: "Not Available",
      simahRemarks: "SIMAH Remarks", clean: "Clean", minorIssues: "Minor Issues", majorIssues: "Major Issues", defaulted: "Defaulted",
      zatca: "ZATCA Status", compliant: "Compliant", nonCompliant: "Non-Compliant", na: "N/A",
      crStatus: "Commercial Register", valid: "Valid", expired: "Expired",
      absher: "Absher Verification", verified: "Verified", notVerified: "Not Verified",
      existingCustomer: "Existing Tawkelat Customer", yes: "Yes", no: "No",
      prevDefaults: "Previous Defaults", noDefaults: "No", minorDefaults: "Yes (minor)", majorDefaults: "Yes (major)",
      samaChecks: "SAMA Eligibility Pre-Checks",
      chkRatio: "Financing/Income ≤ 65%", chkMaxInd: "Max SAR 5M (Individual)", chkMaxSme: "Max SAR 15M (SME)",
      chkSimah: "SIMAH Acceptable", chkNoDefault: "No Active Defaults",
      chkZatca: "ZATCA Compliant", chkCR: "Valid CR", chkAbsher: "Absher Verified", chkSaud: "Saudization ≥ 30%",
      reviewSummary: "Review Summary", analyzeBtn: "Analyze with AI", analyzing: "Analyzing...",
      next: "Next", prev: "Previous", selectSector: "Select Sector",
      /* result */
      reportTitle: "Credit Score Report", save: "Save to Portfolio", newApp: "New Application",
      creditScore: "Credit Score", scoreLabel: "Score Label", eligibilityLabel: "Eligibility",
      confidence: "Confidence", recStructure: "Recommended Structure", recAmount: "Recommended Amount",
      recTenor: "Recommended Tenor", estPayment: "Est. Monthly Payment", profitRate: "Profit Rate Range",
      scoreBreakdown: "Score Breakdown", incomeAdequacy: "Income Adequacy", creditHistory: "Credit History",
      empStability: "Employment Stability", dtiRatio: "Debt-to-Income Ratio", complianceScore: "Compliance Score",
      positiveFactors: "Positive Factors", riskFlags: "Risk Flags",
      shariaNote: "Sharia Compliance", samaFlags: "SAMA Regulatory Summary",
      conditions: "Conditions for Approval", rejectionReasons: "Rejection Reasons",
      disclaimer: "This AI-generated score is a decision-support tool. Final approval is subject to Tawkelat Finance's credit committee review and Sharia board approval per SAMA guidelines.",
      saved: "Saved!",
      approved: "Approved", conditional: "Conditional", rejected: "Rejected",
      /* history */
      histTitle: "Application History", search: "Search by name or ID...",
      filterAll: "All", filterApproved: "Approved", filterConditional: "Conditional", filterRejected: "Rejected",
      filterAllType: "All Types", filterIndividual: "Individual", filterSME: "SME",
      histEmpty: "No saved applications yet.",
    },
  },
  ar: {
    brand: "ألفا برو مينا",
    tagline: "مدعوم بالذكاء الاصطناعي · متوافق مع ساما",
    credit: "ألفا برو مينا × بيكر تيلي",
    sectionRisk: "تقييم مخاطر المنشآت",
    sectionCredit: "نظام تقييم الائتمان",
    nav: { dashboard: "لوحة التحكم", newAnalysis: "تحليل جديد", applications: "الطلبات", settings: "الإعدادات",
           csDashboard: "لوحة الائتمان", csNewApp: "طلب جديد", csHistory: "السجل" },
    dashboard: {
      title: "نظرة عامة على المحفظة", newBtn: "تحليل جديد", totalApps: "إجمالي الطلبات", avgRisk: "متوسط درجة المخاطر",
      approvalRate: "نسبة القبول", underReview: "ريال تحت المراجعة", riskDist: "توزيع المخاطر",
      low: "منخفض", medium: "متوسط", high: "مرتفع", recentApps: "الطلبات الأخيرة",
      company: "الشركة", sector: "القطاع", score: "الدرجة", level: "المستوى", decision: "القرار", view: "عرض",
      empty: "لا توجد طلبات بعد. ابدأ أول تحليل!",
    },
    wizard: {
      step1: "معلومات الشركة", step2: "البيانات المالية", step3: "الامتثال", step4: "المراجعة",
      companyName: "اسم الشركة", sector: "القطاع", years: "سنوات العمل", employees: "عدد الموظفين",
      revenue: "الإيرادات السنوية (ريال)", financing: "مبلغ التمويل (ريال)", purpose: "الغرض من التمويل",
      ratio: "نسبة التمويل / الدخل الشهري", ratioWarn: "تحذير: النسبة تتجاوز حد ساما 65%!",
      cr: "السجل التجاري (وزارة الاستثمار)", valid: "ساري", expired: "منتهي",
      zatca: "حالة هيئة الزكاة والضريبة", compliant: "متوافق", nonCompliant: "غير متوافق",
      simah: "سمة الائتمانية", clean: "نظيف", minorIssues: "مشاكل بسيطة", majorIssues: "مشاكل كبيرة",
      saudization: "نسبة السعودة %", samaChecks: "فحوصات الامتثال لساما",
      chk1: "التمويل/الدخل ≤ 65%", chk2: "الحد الأقصى 15 مليون ريال", chk3: "سجل تجاري ساري",
      chk4: "متوافق مع الزكاة والضريبة", chk5: "سمة نظيفة", chk6: "السعودة ≥ 30%",
      review: "ملخص المراجعة", analyzeBtn: "تحليل بالذكاء الاصطناعي", next: "التالي", prev: "السابق",
      analyzing: "جاري التحليل...", selectSector: "اختر القطاع",
    },
    sectors: ["التجزئة والتجارة","الأغذية والمشروبات","المقاولات","التقنية","الرعاية الصحية","التصنيع","النقل","التعليم","العقارات","الزراعة","الخدمات المهنية","السياحة والضيافة"],
    result: {
      title: "تقرير تحليل المخاطر", save: "حفظ في المحفظة", newAnalysis: "تحليل جديد",
      riskScore: "درجة المخاطر", riskLevel: "مستوى المخاطر", recommendation: "التوصية",
      recAmount: "المبلغ الموصى به", recTenor: "المدة الموصى بها",
      summary: "الملخص التنفيذي", strengths: "نقاط القوة", risks: "عوامل المخاطر",
      sharia: "الامتثال الشرعي", samaFlags: "ملاحظات ساما التنظيمية", samaChecks: "فحوصات الامتثال لساما",
      conditions: "الشروط", saved: "تم الحفظ!",
    },
    apps: {
      title: "الطلبات", search: "بحث عن شركة...", filterAll: "جميع المستويات", filterLow: "منخفض",
      filterMedium: "متوسط", filterHigh: "مرتفع", date: "التاريخ", company: "الشركة", sector: "القطاع",
      score: "الدرجة", level: "المستوى", decision: "القرار", view: "عرض", empty: "لا توجد طلبات محفوظة بعد.",
    },
    settings: {
      title: "الإعدادات", langLabel: "اللغة", apiKeyLabel: "مفتاح Anthropic API", apiKeyPlaceholder: "sk-ant-...",
      apiKeySave: "حفظ المفتاح", apiKeySaved: "تم حفظ المفتاح!", apiKeyNote: "مطلوب لتحليل الذكاء الاصطناعي. يُخزن محلياً في متصفحك.",
      about: "حول المنصة",
      aboutText: "منصة ألفا برو مينا × بيكر تيلي — تقييم مخاطر المنشآت ونظام تقييم الائتمان. مدعوم بالذكاء الاصطناعي كلود. تحليل متوافق مع ساما للتمويل الإسلامي في المملكة العربية السعودية.",
    },
    accept: "اقبل", review: "راجع", reject: "ارفض",
    cs: {
      dashTitle: "لوحة تقييم الائتمان", newAppBtn: "طلب جديد",
      totalApps: "إجمالي الطلبات", avgScore: "متوسط الدرجة", approvalRate: "معدل القبول",
      totalFinancing: "إجمالي التمويل المطلوب", scoreDist: "توزيع الدرجات",
      excellent: "ممتاز", good: "جيد", fair: "مقبول", poor: "ضعيف",
      recentApps: "الطلبات الأخيرة", date: "التاريخ", name: "اسم المتقدم", type: "النوع",
      score: "الدرجة", eligibility: "الأهلية", decision: "القرار", view: "عرض",
      empty: "لا توجد طلبات بعد. ابدأ أول طلب ائتمان!",
      individual: "فرد", sme: "منشأة",
      step1: "معلومات المتقدم", step2: "الدخل / الأعمال", step3: "التمويل", step4: "الائتمان والامتثال", step5: "المراجعة",
      applicantType: "نوع المتقدم", fullName: "الاسم الكامل", nationalId: "رقم الهوية / السجل التجاري",
      nationality: "الجنسية", saudi: "سعودي", nonSaudi: "غير سعودي",
      city: "المدينة", cities: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      citiesAr: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      selectCity: "اختر المدينة",
      empStatus: "حالة التوظيف", government: "حكومي", privateSector: "قطاع خاص",
      selfEmployed: "أعمال حرة", retired: "متقاعد", unemployed: "عاطل",
      employer: "اسم جهة العمل", salary: "الراتب الشهري (ريال)", yearsJob: "سنوات العمل الحالي",
      otherIncome: "دخل شهري آخر (ريال)",
      sector: "قطاع الأعمال", yearsInBiz: "سنوات العمل", annualRev: "الإيرادات السنوية (ريال)",
      numEmployees: "عدد الموظفين", saudization: "نسبة السعودة %",
      finAmount: "مبلغ التمويل (ريال)", finPurpose: "الغرض من التمويل",
      finType: "نوع التمويل المفضل", murabaha: "المرابحة", ijarah: "الإجارة", tawarruq: "التورق", aiDecide: "دع الذكاء الاصطناعي يقرر",
      tenor: "المدة المطلوبة", months: "شهر",
      existingDebt: "أقساط الديون الشهرية الحالية (ريال)",
      simahScore: "تقييم سمة", simahExcellent: "ممتاز (750+)", simahGood: "جيد (650-749)",
      simahFair: "مقبول (550-649)", simahPoor: "ضعيف (أقل من 550)", simahNA: "غير متوفر",
      simahRemarks: "ملاحظات سمة", clean: "نظيف", minorIssues: "مشاكل بسيطة", majorIssues: "مشاكل كبيرة", defaulted: "متعثر",
      zatca: "حالة الزكاة والضريبة", compliant: "متوافق", nonCompliant: "غير متوافق", na: "لا ينطبق",
      crStatus: "السجل التجاري", valid: "ساري", expired: "منتهي",
      absher: "توثيق أبشر", verified: "موثق", notVerified: "غير موثق",
      existingCustomer: "عميل حالي لتوكلات", yes: "نعم", no: "لا",
      prevDefaults: "تعثرات سابقة", noDefaults: "لا", minorDefaults: "نعم (بسيطة)", majorDefaults: "نعم (كبيرة)",
      samaChecks: "فحوصات أهلية ساما",
      chkRatio: "التمويل/الدخل ≤ 65%", chkMaxInd: "الحد الأقصى 5 مليون (فرد)", chkMaxSme: "الحد الأقصى 15 مليون (منشأة)",
      chkSimah: "سمة مقبولة", chkNoDefault: "لا تعثرات نشطة",
      chkZatca: "متوافق مع الزكاة", chkCR: "سجل تجاري ساري", chkAbsher: "أبشر موثق", chkSaud: "السعودة ≥ 30%",
      reviewSummary: "ملخص المراجعة", analyzeBtn: "تحليل بالذكاء الاصطناعي", analyzing: "جاري التحليل...",
      next: "التالي", prev: "السابق", selectSector: "اختر القطاع",
      reportTitle: "تقرير تقييم الائتمان", save: "حفظ في المحفظة", newApp: "طلب جديد",
      creditScore: "درجة الائتمان", scoreLabel: "تصنيف الدرجة", eligibilityLabel: "الأهلية",
      confidence: "مستوى الثقة", recStructure: "الهيكل الموصى به", recAmount: "المبلغ الموصى به",
      recTenor: "المدة الموصى بها", estPayment: "القسط الشهري التقديري", profitRate: "نطاق معدل الربح",
      scoreBreakdown: "تفصيل الدرجة", incomeAdequacy: "كفاية الدخل", creditHistory: "السجل الائتماني",
      empStability: "استقرار التوظيف", dtiRatio: "نسبة الدين للدخل", complianceScore: "درجة الامتثال",
      positiveFactors: "العوامل الإيجابية", riskFlags: "علامات المخاطر",
      shariaNote: "الامتثال الشرعي", samaFlags: "ملخص ساما التنظيمي",
      conditions: "شروط الموافقة", rejectionReasons: "أسباب الرفض",
      disclaimer: "هذا التقييم المولّد بالذكاء الاصطناعي هو أداة دعم قرار. الموافقة النهائية تخضع لمراجعة لجنة الائتمان في توكلات للتمويل وموافقة الهيئة الشرعية وفقاً لتعليمات ساما.",
      saved: "تم الحفظ!",
      approved: "موافق", conditional: "مشروط", rejected: "مرفوض",
      histTitle: "سجل الطلبات", search: "بحث بالاسم أو الرقم...",
      filterAll: "الكل", filterApproved: "موافق", filterConditional: "مشروط", filterRejected: "مرفوض",
      filterAllType: "جميع الأنواع", filterIndividual: "فرد", filterSME: "منشأة",
      histEmpty: "لا توجد طلبات محفوظة بعد.",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   STORAGE
   ═══════════════════════════════════════════════════════════════ */
const RISK_KEY = "sme_risk_apps_v1";
const CS_KEY = "credit_scoring_apps_v1";
const loadStore = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const saveStore = (k, a) => localStorage.setItem(k, JSON.stringify(a));

/* ═══════════════════════════════════════════════════════════════
   COLOUR HELPERS
   ═══════════════════════════════════════════════════════════════ */
const riskColor = (level) => {
  if (level === "low") return { bg: "#eaf3de", text: "#27500A" };
  if (level === "medium") return { bg: "#faeeda", text: "#633806" };
  return { bg: "#fcebeb", text: "#501313" };
};
const recColor = (r) => {
  const rl = (r || "").toLowerCase();
  if (rl === "accept" || rl === "اقبل") return "#27500A";
  if (rl === "review" || rl === "راجع") return "#633806";
  return "#501313";
};
const csScoreColor = (s) => {
  if (s >= 80) return { bg: "#eaf3de", text: "#27500A" };
  if (s >= 60) return { bg: "#eaf3de", text: "#3d7a0a" };
  if (s >= 40) return { bg: "#faeeda", text: "#633806" };
  return { bg: "#fcebeb", text: "#501313" };
};
const eligColor = (e) => {
  const el = (e || "").toLowerCase();
  if (el === "approved" || el === "موافق") return "#27500A";
  if (el === "conditional" || el === "مشروط") return "#633806";
  return "#501313";
};

/* ═══════════════════════════════════════════════════════════════
   SAMA CHECKS (SME Risk)
   ═══════════════════════════════════════════════════════════════ */
const computeSamaChecks = (form) => {
  const monthlyIncome = (Number(form.revenue) || 0) / 12;
  const ratio = monthlyIncome > 0 ? (Number(form.financing) || 0) / monthlyIncome : 999;
  return [
    ratio <= 0.65,
    (Number(form.financing) || 0) <= 15000000,
    form.cr === "valid",
    form.zatca === "compliant",
    form.simah === "clean",
    (Number(form.saudization) || 0) >= 30,
  ];
};

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("dashboard");
  const [riskApps, setRiskApps] = useState(loadStore(RISK_KEY));
  const [csApps, setCsApps] = useState(loadStore(CS_KEY));
  const [viewResult, setViewResult] = useState(null);
  const [viewForm, setViewForm] = useState(null);
  const t = T[lang];
  const isRtl = lang === "ar";

  useEffect(() => { saveStore(RISK_KEY, riskApps); }, [riskApps]);
  useEffect(() => { saveStore(CS_KEY, csApps); }, [csApps]);

  /* ═══════════════════════════════════════════════════════════════
     SIDEBAR
     ═══════════════════════════════════════════════════════════════ */
  const Sidebar = () => {
    const riskItems = [
      { key: "dashboard", icon: "◈", label: t.nav.dashboard },
      { key: "wizard", icon: "+", label: t.nav.newAnalysis },
      { key: "applications", icon: "≡", label: t.nav.applications },
    ];
    const csItems = [
      { key: "csDashboard", icon: "◈", label: t.nav.csDashboard },
      { key: "csWizard", icon: "+", label: t.nav.csNewApp },
      { key: "csHistory", icon: "≡", label: t.nav.csHistory },
    ];
    const otherItems = [
      { key: "settings", icon: "⚙", label: t.nav.settings },
    ];
    const isActive = (k) => screen === k || (screen === "result" && k === "wizard") || (screen === "csResult" && k === "csWizard");

    const renderItem = (it) => (
      <div
        key={it.key}
        onClick={() => { setScreen(it.key); setViewResult(null); setViewForm(null); }}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer",
          background: isActive(it.key) ? "rgba(190,30,45,0.15)" : "transparent",
          borderRight: !isRtl && isActive(it.key) ? "2px solid #BE1E2D" : "none",
          borderLeft: isRtl && isActive(it.key) ? "2px solid #BE1E2D" : "none",
          color: isActive(it.key) ? "#fff" : "#8888a0", fontSize: 13, transition: "all 0.15s",
        }}
      >
        <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{it.icon}</span>
        <span>{it.label}</span>
      </div>
    );

    const sectionLabel = (text) => (
      <div style={{ padding: "12px 16px 4px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#BE1E2D" }}>{text}</div>
    );

    return (
      <div style={{ width: 210, minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 16px", marginBottom: 24 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{t.brand}</div>
          <div style={{ color: "#BE1E2D", fontSize: 9, marginTop: 4 }}>{t.tagline}</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {sectionLabel(t.sectionRisk)}
          {riskItems.map(renderItem)}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 16px" }} />
          {sectionLabel(t.sectionCredit)}
          {csItems.map(renderItem)}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 16px" }} />
          {otherItems.map(renderItem)}
        </div>
        <div style={{ padding: "0 16px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {["en", "ar"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                flex: 1, padding: "5px 0", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600,
                background: lang === l ? "#BE1E2D" : "rgba(255,255,255,0.08)", color: "#fff",
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ color: "#555", fontSize: 8, textAlign: "center" }}>{t.credit}</div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     SME RISK — DASHBOARD
     ═══════════════════════════════════════════════════════════════ */
  const Dashboard = () => {
    const apps = riskApps;
    const total = apps.length;
    const avgScore = total ? Math.round(apps.reduce((s, a) => s + (a.riskScore || 0), 0) / total) : 0;
    const accepted = apps.filter((a) => { const r = (a.recommendation || "").toLowerCase(); return r === "accept" || r === "اقبل"; }).length;
    const approvalRate = total ? Math.round((accepted / total) * 100) : 0;
    const underReview = apps.filter((a) => { const r = (a.recommendation || "").toLowerCase(); return r === "review" || r === "راجع"; }).reduce((s, a) => s + (a.formData?.financing ? Number(a.formData.financing) : 0), 0);
    const lowCount = apps.filter((a) => a.riskLevel === "low").length;
    const medCount = apps.filter((a) => a.riskLevel === "medium").length;
    const highCount = apps.filter((a) => a.riskLevel === "high").length;
    const avgColor = avgScore <= 30 ? riskColor("low") : avgScore <= 60 ? riskColor("medium") : riskColor("high");
    const statCards = [
      { label: t.dashboard.totalApps, value: total },
      { label: t.dashboard.avgRisk, value: avgScore, color: avgColor },
      { label: t.dashboard.approvalRate, value: `${approvalRate}%` },
      { label: t.dashboard.underReview, value: `SAR ${underReview.toLocaleString()}` },
    ];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.dashboard.title}</h2>
          <button onClick={() => setScreen("wizard")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.dashboard.newBtn}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {statCards.map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color ? c.color.text : "#1a1a1a", background: c.color ? c.color.bg : "transparent", display: "inline-block", padding: c.color ? "2px 8px" : 0, borderRadius: 4 }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.riskDist}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[{ label: t.dashboard.low, count: lowCount, color: riskColor("low") }, { label: t.dashboard.medium, count: medCount, color: riskColor("medium") }, { label: t.dashboard.high, count: highCount, color: riskColor("high") }].map((r, i) => (
              <div key={i} style={{ flex: 1, background: r.color.bg, borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: r.color.text }}>{r.count}</div>
                <div style={{ fontSize: 11, color: r.color.text, marginTop: 2 }}>{r.label}</div>
                <div style={{ marginTop: 8, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}><div style={{ height: 4, borderRadius: 2, background: r.color.text, width: total ? `${(r.count / total) * 100}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.recentApps}</div>
          {apps.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.dashboard.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.dashboard.company, t.dashboard.sector, t.dashboard.score, t.dashboard.level, t.dashboard.decision, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{apps.slice(0, 10).map((a) => { const rc = riskColor(a.riskLevel); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.companyName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.sector || "—"}</td>
                  <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.riskScore}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: rc.bg, color: rc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.riskLevel}</span></td>
                  <td style={{ padding: "8px 6px", color: recColor(a.recommendation), fontWeight: 600 }}>{a.recommendation}</td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("result"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.dashboard.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     SME RISK — WIZARD
     ═══════════════════════════════════════════════════════════════ */
  const Wizard = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ companyName: "", sector: "", years: "", employees: "", revenue: "", financing: "", purpose: "", cr: "valid", zatca: "compliant", simah: "clean", saudization: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
    const monthlyIncome = (Number(form.revenue) || 0) / 12;
    const ratio = monthlyIncome > 0 ? ((Number(form.financing) || 0) / monthlyIncome) : 0;
    const ratioPercent = (ratio * 100).toFixed(1);
    const samaChecks = computeSamaChecks(form);
    const chkLabels = [t.wizard.chk1, t.wizard.chk2, t.wizard.chk3, t.wizard.chk4, t.wizard.chk5, t.wizard.chk6];
    const sectorOptions = t.sectors;
    const enSectors = T.en.sectors;
    const submit = async () => {
      setLoading(true); setError("");
      const sectorEn = enSectors[sectorOptions.indexOf(form.sector)] || form.sector;
      const msg = `SME Credit Risk Analysis Request:\nCompany: ${form.companyName}\nSector: ${sectorEn}\nYears in Business: ${form.years}\nEmployees: ${form.employees}\nAnnual Revenue: SAR ${Number(form.revenue).toLocaleString()}\nRequested Financing: SAR ${Number(form.financing).toLocaleString()}\nPurpose: ${form.purpose}\nFinancing/Monthly Income Ratio: ${ratioPercent}%\nCommercial Register (MISA): ${form.cr}\nZATCA Status: ${form.zatca}\nSIMAH Credit: ${form.simah}\nSaudization: ${form.saudization}%`;
      try {
        const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userMessage: msg, lang }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        const result = data.result;
        const appEntry = { id: Date.now().toString(), date: new Date().toISOString(), riskScore: result.riskScore, riskLevel: result.riskLevel, recommendation: result.recommendation, samaScore: samaChecks.filter(Boolean).length, samaChecks, formData: form, ...result };
        setViewResult(appEntry); setViewForm(form); setScreen("result");
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    };
    const steps = [t.wizard.step1, t.wizard.step2, t.wizard.step3, t.wizard.step4];
    const fld = { marginBottom: 14 };
    const lbl = { display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 };
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? "#27500A" : step === i + 1 ? "#BE1E2D" : "#ddd", color: "#fff", fontSize: 12, fontWeight: 700 }}>{step > i + 1 ? "✓" : i + 1}</div>
                <div style={{ fontSize: 10, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888" }}>{s}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#27500A" : "#ddd", margin: "0 4px", marginBottom: 18 }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 24, maxWidth: 560, margin: "0 auto" }}>
          {step === 1 && (<>
            <div style={fld}><label style={lbl}>{t.wizard.companyName}</label><input value={form.companyName} onChange={(e) => up("companyName", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.wizard.sector}</label><select value={form.sector} onChange={(e) => up("sector", e.target.value)}><option value="">{t.wizard.selectSector}</option>{sectorOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}><label style={lbl}>{t.wizard.years}</label><input type="number" value={form.years} onChange={(e) => up("years", e.target.value)} /></div>
              <div style={fld}><label style={lbl}>{t.wizard.employees}</label><input type="number" value={form.employees} onChange={(e) => up("employees", e.target.value)} /></div>
            </div>
          </>)}
          {step === 2 && (<>
            <div style={fld}><label style={lbl}>{t.wizard.revenue}</label><input type="number" value={form.revenue} onChange={(e) => up("revenue", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.wizard.financing}</label><input type="number" value={form.financing} onChange={(e) => up("financing", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.wizard.purpose}</label><input value={form.purpose} onChange={(e) => up("purpose", e.target.value)} /></div>
            {monthlyIncome > 0 && <div style={{ padding: 12, borderRadius: 6, background: ratio > 0.65 ? "#fcebeb" : "#eaf3de", marginTop: 8 }}><div style={{ fontSize: 12, fontWeight: 600, color: ratio > 0.65 ? "#501313" : "#27500A" }}>{t.wizard.ratio}: {ratioPercent}%</div>{ratio > 0.65 && <div style={{ fontSize: 11, color: "#501313", marginTop: 4 }}>{t.wizard.ratioWarn}</div>}</div>}
          </>)}
          {step === 3 && (<>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}><label style={lbl}>{t.wizard.cr}</label><select value={form.cr} onChange={(e) => up("cr", e.target.value)}><option value="valid">{t.wizard.valid}</option><option value="expired">{t.wizard.expired}</option></select></div>
              <div style={fld}><label style={lbl}>{t.wizard.zatca}</label><select value={form.zatca} onChange={(e) => up("zatca", e.target.value)}><option value="compliant">{t.wizard.compliant}</option><option value="non-compliant">{t.wizard.nonCompliant}</option></select></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}><label style={lbl}>{t.wizard.simah}</label><select value={form.simah} onChange={(e) => up("simah", e.target.value)}><option value="clean">{t.wizard.clean}</option><option value="minor">{t.wizard.minorIssues}</option><option value="major">{t.wizard.majorIssues}</option></select></div>
              <div style={fld}><label style={lbl}>{t.wizard.saudization}</label><input type="number" value={form.saudization} onChange={(e) => up("saudization", e.target.value)} min="0" max="100" /></div>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: "#f9f9fb", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{t.wizard.samaChecks}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {chkLabels.map((l, i) => <div key={i} style={{ padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center", background: samaChecks[i] ? "#eaf3de" : "#fcebeb", color: samaChecks[i] ? "#27500A" : "#501313" }}>{samaChecks[i] ? "✓" : "✗"} {l}</div>)}
              </div>
            </div>
          </>)}
          {step === 4 && (<>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{t.wizard.review}</div>
            {[[t.wizard.companyName, form.companyName],[t.wizard.sector, form.sector],[t.wizard.years, form.years],[t.wizard.employees, form.employees],[t.wizard.revenue, `SAR ${Number(form.revenue).toLocaleString()}`],[t.wizard.financing, `SAR ${Number(form.financing).toLocaleString()}`],[t.wizard.purpose, form.purpose],[t.wizard.ratio, `${ratioPercent}%`],[t.wizard.cr, form.cr === "valid" ? t.wizard.valid : t.wizard.expired],[t.wizard.zatca, form.zatca === "compliant" ? t.wizard.compliant : t.wizard.nonCompliant],[t.wizard.simah, form.simah === "clean" ? t.wizard.clean : form.simah === "minor" ? t.wizard.minorIssues : t.wizard.majorIssues],[t.wizard.saudization, `${form.saudization}%`]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{ color: "#888" }}>{k}</span><span style={{ fontWeight: 600 }}>{v || "—"}</span></div>)}
            {error && <div style={{ marginTop: 12, padding: 10, background: "#fcebeb", color: "#501313", borderRadius: 6, fontSize: 12 }}>{error}</div>}
          </>)}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 18px", fontSize: 13 }}>{t.wizard.prev}</button> : <div />}
            {step < 4 ? <button onClick={() => setStep(step + 1)} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.wizard.next}</button> : <button onClick={submit} disabled={loading} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 22px", fontSize: 13, fontWeight: 600 }}>{loading ? t.wizard.analyzing : t.wizard.analyzeBtn}</button>}
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     SME RISK — RESULT
     ═══════════════════════════════════════════════════════════════ */
  const RiskResult = () => {
    const [saved, setSaved] = useState(false);
    if (!viewResult) return null;
    const r = viewResult; const rc = riskColor(r.riskLevel);
    const samaChecks = r.samaChecks || computeSamaChecks(viewForm || {});
    const chkLabels = [t.wizard.chk1, t.wizard.chk2, t.wizard.chk3, t.wizard.chk4, t.wizard.chk5, t.wizard.chk6];
    const handleSave = () => { const existing = loadStore(RISK_KEY); if (!existing.find((a) => a.id === r.id)) { const updated = [r, ...existing]; saveStore(RISK_KEY, updated); setRiskApps(updated); } setSaved(true); };
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div><h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.result.title}</h2><div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.formData?.companyName || viewForm?.companyName} — {r.formData?.sector || viewForm?.sector}</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} disabled={saved} style={{ background: saved ? "#27500A" : "#BE1E2D", color: "#fff", border: "none", padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>{saved ? t.result.saved : t.result.save}</button>
            <button onClick={() => setScreen("wizard")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 16px", fontSize: 12 }}>{t.result.newAnalysis}</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.riskScore}</div><div style={{ fontSize: 36, fontWeight: 700, color: rc.text }}>{r.riskScore}</div></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.riskLevel}</div><span style={{ background: rc.bg, color: rc.text, padding: "4px 14px", borderRadius: 4, fontSize: 14, fontWeight: 700 }}>{r.riskLevel}</span></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.recommendation}</div><div style={{ fontSize: 18, fontWeight: 700, color: recColor(r.recommendation) }}>{r.recommendation}</div></div>
        </div>
        {(r.recommendedFinancingAmount || r.recommendedTenor) && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>{r.recommendedFinancingAmount && <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}><div style={{ fontSize: 11, color: "#888" }}>{t.result.recAmount}</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>SAR {Number(r.recommendedFinancingAmount).toLocaleString()}</div></div>}{r.recommendedTenor && <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}><div style={{ fontSize: 11, color: "#888" }}>{t.result.recTenor}</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{r.recommendedTenor}</div></div>}</div>}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.summary}</div><div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{r.summary}</div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.result.strengths}</div>{(r.strengths || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#27500A" }}>✓ {s}</div>)}</div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.result.risks}</div>{(r.risks || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>! {s}</div>)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#eaf3de", border: "0.5px solid #d5e8c0", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.result.sharia}</div><div style={{ fontSize: 12, lineHeight: 1.5, color: "#27500A" }}>{r.shariaNote}</div></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#633806" }}>{t.result.samaFlags}</div>{(r.samaFlags || []).map((f, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#633806" }}>⚑ {f}</div>)}</div>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.result.samaChecks}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>{chkLabels.map((l, i) => <div key={i} style={{ padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center", background: samaChecks[i] ? "#eaf3de" : "#fcebeb", color: samaChecks[i] ? "#27500A" : "#501313" }}>{samaChecks[i] ? "✓" : "✗"} {l}</div>)}</div></div>
        {r.conditions && r.conditions.length > 0 && <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.conditions}</div>{r.conditions.map((c, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#444" }}>{i + 1}. {c}</div>)}</div>}
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     SME RISK — APPLICATIONS
     ═══════════════════════════════════════════════════════════════ */
  const RiskApplications = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const filtered = riskApps.filter((a) => {
      const matchSearch = !search || (a.formData?.companyName || "").toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || a.riskLevel === filter;
      return matchSearch && matchFilter;
    });
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.apps.title}</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input placeholder={t.apps.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 260 }} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 160 }}><option value="all">{t.apps.filterAll}</option><option value="low">{t.apps.filterLow}</option><option value="medium">{t.apps.filterMedium}</option><option value="high">{t.apps.filterHigh}</option></select>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          {filtered.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.apps.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.apps.date, t.apps.company, t.apps.sector, t.apps.score, t.apps.level, t.apps.decision, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{filtered.map((a) => { const rc = riskColor(a.riskLevel); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.companyName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.sector || "—"}</td>
                  <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.riskScore}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: rc.bg, color: rc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.riskLevel}</span></td>
                  <td style={{ padding: "8px 6px", color: recColor(a.recommendation), fontWeight: 600 }}>{a.recommendation}</td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("result"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.apps.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     CREDIT SCORING — DASHBOARD
     ═══════════════════════════════════════════════════════════════ */
  const CsDashboard = () => {
    const apps = csApps;
    const total = apps.length;
    const avgScore = total ? Math.round(apps.reduce((s, a) => s + (a.creditScore || 0), 0) / total) : 0;
    const approved = apps.filter((a) => { const e = (a.eligibility || "").toLowerCase(); return e === "approved" || e === "موافق"; }).length;
    const approvalRate = total ? Math.round((approved / total) * 100) : 0;
    const totalFin = apps.reduce((s, a) => s + (Number(a.formData?.finAmount) || 0), 0);
    const excCount = apps.filter((a) => (a.creditScore || 0) >= 80).length;
    const goodCount = apps.filter((a) => (a.creditScore || 0) >= 60 && (a.creditScore || 0) < 80).length;
    const fairCount = apps.filter((a) => (a.creditScore || 0) >= 40 && (a.creditScore || 0) < 60).length;
    const poorCount = apps.filter((a) => (a.creditScore || 0) < 40).length;
    const statCards = [
      { label: t.cs.totalApps, value: total },
      { label: t.cs.avgScore, value: avgScore, color: csScoreColor(avgScore) },
      { label: t.cs.approvalRate, value: `${approvalRate}%` },
      { label: t.cs.totalFinancing, value: `SAR ${totalFin.toLocaleString()}` },
    ];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.cs.dashTitle}</h2>
          <button onClick={() => setScreen("csWizard")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.cs.newAppBtn}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {statCards.map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color ? c.color.text : "#1a1a1a", background: c.color ? c.color.bg : "transparent", display: "inline-block", padding: c.color ? "2px 8px" : 0, borderRadius: 4 }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.cs.scoreDist}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[{ label: t.cs.excellent + " (80-100)", count: excCount, color: csScoreColor(90) }, { label: t.cs.good + " (60-79)", count: goodCount, color: csScoreColor(70) }, { label: t.cs.fair + " (40-59)", count: fairCount, color: csScoreColor(50) }, { label: t.cs.poor + " (0-39)", count: poorCount, color: csScoreColor(20) }].map((r, i) => (
              <div key={i} style={{ background: r.color.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: r.color.text }}>{r.count}</div>
                <div style={{ fontSize: 10, color: r.color.text, marginTop: 2 }}>{r.label}</div>
                <div style={{ marginTop: 6, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}><div style={{ height: 4, borderRadius: 2, background: r.color.text, width: total ? `${(r.count / total) * 100}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.cs.recentApps}</div>
          {apps.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.cs.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.cs.date, t.cs.name, t.cs.type, t.cs.score, t.cs.eligibility, t.cs.decision, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{apps.slice(0, 10).map((a) => { const sc = csScoreColor(a.creditScore || 0); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.fullName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{a.formData?.applicantType === "individual" ? t.cs.individual : t.cs.sme}</span></td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.creditScore}</span></td>
                  <td style={{ padding: "8px 6px", color: eligColor(a.eligibility), fontWeight: 600 }}>{a.eligibility}</td>
                  <td style={{ padding: "8px 6px" }}>{a.scoreLabel || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("csResult"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.cs.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     CREDIT SCORING — 5-STEP WIZARD
     ═══════════════════════════════════════════════════════════════ */
  const CsWizard = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
      applicantType: "individual", fullName: "", nationalId: "", nationality: "saudi", city: "",
      empStatus: "government", employer: "", salary: "", yearsJob: "", otherIncome: "",
      sector: "", yearsInBiz: "", annualRev: "", numEmployees: "", saudization: "",
      finAmount: "", finPurpose: "", finType: "ai", tenor: "36", existingDebt: "",
      simahScore: "good", simahRemarks: "clean", zatca: "compliant", crStatus: "valid",
      absher: "verified", existingCustomer: "no", prevDefaults: "no",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
    const isInd = form.applicantType === "individual";
    const sectorOptions = t.sectors;
    const enSectors = T.en.sectors;
    const enCities = T.en.cs.cities;
    const cities = t.cs.cities;

    // income calc
    const monthlyIncome = isInd ? (Number(form.salary) || 0) + (Number(form.otherIncome) || 0) : (Number(form.annualRev) || 0) / 12;
    const estMonthlyPayment = Number(form.tenor) > 0 ? (Number(form.finAmount) || 0) / Number(form.tenor) : 0;
    const totalMonthlyDebt = (Number(form.existingDebt) || 0) + estMonthlyPayment;
    const ratio = monthlyIncome > 0 ? totalMonthlyDebt / monthlyIncome : 0;
    const maxFin = isInd ? 5000000 : 15000000;

    // SAMA pre-checks
    const samaChecks = [
      { label: t.cs.chkRatio, pass: ratio <= 0.65, show: true },
      { label: isInd ? t.cs.chkMaxInd : t.cs.chkMaxSme, pass: (Number(form.finAmount) || 0) <= maxFin, show: true },
      { label: t.cs.chkSimah, pass: form.simahScore !== "poor" && form.simahRemarks !== "defaulted", show: true },
      { label: t.cs.chkNoDefault, pass: form.prevDefaults === "no", show: true },
      { label: t.cs.chkZatca, pass: form.zatca === "compliant", show: !isInd },
      { label: t.cs.chkCR, pass: form.crStatus === "valid", show: !isInd },
      { label: t.cs.chkAbsher, pass: form.absher === "verified", show: isInd },
      { label: t.cs.chkSaud, pass: (Number(form.saudization) || 0) >= 30, show: !isInd },
    ].filter((c) => c.show);

    const submit = async () => {
      setLoading(true); setError("");
      const sectorEn = enSectors[sectorOptions.indexOf(form.sector)] || form.sector;
      const cityEn = enCities[cities.indexOf(form.city)] || form.city;
      let msg = `Credit Scoring Application:\nApplicant Type: ${form.applicantType}\nFull Name: ${form.fullName}\nNational ID / CR: ${form.nationalId}\nNationality: ${form.nationality}\nCity: ${cityEn}\n`;
      if (isInd) {
        msg += `Employment Status: ${form.empStatus}\nEmployer: ${form.employer}\nMonthly Salary: SAR ${Number(form.salary).toLocaleString()}\nYears at Current Job: ${form.yearsJob}\nOther Monthly Income: SAR ${Number(form.otherIncome || 0).toLocaleString()}\n`;
      } else {
        msg += `Business Sector: ${sectorEn}\nYears in Business: ${form.yearsInBiz}\nAnnual Revenue: SAR ${Number(form.annualRev).toLocaleString()}\nEmployees: ${form.numEmployees}\nSaudization: ${form.saudization}%\n`;
      }
      msg += `Financing Amount: SAR ${Number(form.finAmount).toLocaleString()}\nFinancing Purpose: ${form.finPurpose}\nPreferred Structure: ${form.finType === "ai" ? "Let AI Decide" : form.finType}\nRequested Tenor: ${form.tenor} months\nExisting Monthly Debt: SAR ${Number(form.existingDebt || 0).toLocaleString()}\nTotal Monthly Income: SAR ${Math.round(monthlyIncome).toLocaleString()}\nDebt-to-Income Ratio: ${(ratio * 100).toFixed(1)}%\n`;
      msg += `SIMAH Score: ${form.simahScore}\nSIMAH Remarks: ${form.simahRemarks}\nZATCA: ${form.zatca}\nCommercial Register: ${form.crStatus}\nAbsher: ${form.absher}\nExisting Tawkelat Customer: ${form.existingCustomer}\nPrevious Defaults: ${form.prevDefaults}`;
      try {
        const res = await fetch("/api/credit-score", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userMessage: msg, lang }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        const result = data.result;
        const appEntry = { id: Date.now().toString(), date: new Date().toISOString(), creditScore: result.creditScore, scoreLabel: result.scoreLabel, eligibility: result.eligibility, formData: form, ...result };
        setViewResult(appEntry); setViewForm(form); setScreen("csResult");
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    };

    const steps = [t.cs.step1, t.cs.step2, t.cs.step3, t.cs.step4, t.cs.step5];
    const fld = { marginBottom: 14 };
    const lbl = { display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 };

    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? "#27500A" : step === i + 1 ? "#BE1E2D" : "#ddd", color: "#fff", fontSize: 12, fontWeight: 700 }}>{step > i + 1 ? "✓" : i + 1}</div>
                <div style={{ fontSize: 9, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888", textAlign: "center" }}>{s}</div>
              </div>
              {i < 4 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#27500A" : "#ddd", margin: "0 2px", marginBottom: 18 }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 24, maxWidth: 580, margin: "0 auto" }}>
          {/* Step 1 */}
          {step === 1 && (<>
            <div style={fld}>
              <label style={lbl}>{t.cs.applicantType}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["individual", "sme"].map((tp) => (
                  <button key={tp} onClick={() => up("applicantType", tp)} style={{ flex: 1, padding: "8px 0", border: form.applicantType === tp ? "none" : "0.5px solid #d0d0d0", background: form.applicantType === tp ? "#BE1E2D" : "#fff", color: form.applicantType === tp ? "#fff" : "#1a1a1a", fontSize: 13, fontWeight: 600 }}>{tp === "individual" ? t.cs.individual : t.cs.sme}</button>
                ))}
              </div>
            </div>
            <div style={fld}><label style={lbl}>{t.cs.fullName}</label><input value={form.fullName} onChange={(e) => up("fullName", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.cs.nationalId}</label><input value={form.nationalId} onChange={(e) => up("nationalId", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}>
                <label style={lbl}>{t.cs.nationality}</label>
                <select value={form.nationality} onChange={(e) => up("nationality", e.target.value)}><option value="saudi">{t.cs.saudi}</option><option value="non-saudi">{t.cs.nonSaudi}</option></select>
              </div>
              <div style={fld}>
                <label style={lbl}>{t.cs.city}</label>
                <select value={form.city} onChange={(e) => up("city", e.target.value)}><option value="">{t.cs.selectCity}</option>{cities.map((c, i) => <option key={i} value={c}>{c}</option>)}</select>
              </div>
            </div>
          </>)}
          {/* Step 2 */}
          {step === 2 && (<>
            {isInd ? (<>
              <div style={fld}>
                <label style={lbl}>{t.cs.empStatus}</label>
                <select value={form.empStatus} onChange={(e) => up("empStatus", e.target.value)}>
                  {[["government", t.cs.government], ["private", t.cs.privateSector], ["self", t.cs.selfEmployed], ["retired", t.cs.retired], ["unemployed", t.cs.unemployed]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div style={fld}><label style={lbl}>{t.cs.employer}</label><input value={form.employer} onChange={(e) => up("employer", e.target.value)} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fld}><label style={lbl}>{t.cs.salary}</label><input type="number" value={form.salary} onChange={(e) => up("salary", e.target.value)} /></div>
                <div style={fld}><label style={lbl}>{t.cs.yearsJob}</label><input type="number" value={form.yearsJob} onChange={(e) => up("yearsJob", e.target.value)} /></div>
              </div>
              <div style={fld}><label style={lbl}>{t.cs.otherIncome}</label><input type="number" value={form.otherIncome} onChange={(e) => up("otherIncome", e.target.value)} /></div>
            </>) : (<>
              <div style={fld}><label style={lbl}>{t.cs.sector}</label><select value={form.sector} onChange={(e) => up("sector", e.target.value)}><option value="">{t.cs.selectSector}</option>{sectorOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fld}><label style={lbl}>{t.cs.yearsInBiz}</label><input type="number" value={form.yearsInBiz} onChange={(e) => up("yearsInBiz", e.target.value)} /></div>
                <div style={fld}><label style={lbl}>{t.cs.annualRev}</label><input type="number" value={form.annualRev} onChange={(e) => up("annualRev", e.target.value)} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fld}><label style={lbl}>{t.cs.numEmployees}</label><input type="number" value={form.numEmployees} onChange={(e) => up("numEmployees", e.target.value)} /></div>
                <div style={fld}><label style={lbl}>{t.cs.saudization}</label><input type="number" value={form.saudization} onChange={(e) => up("saudization", e.target.value)} min="0" max="100" /></div>
              </div>
            </>)}
          </>)}
          {/* Step 3 */}
          {step === 3 && (<>
            <div style={fld}><label style={lbl}>{t.cs.finAmount}</label><input type="number" value={form.finAmount} onChange={(e) => up("finAmount", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.cs.finPurpose}</label><input value={form.finPurpose} onChange={(e) => up("finPurpose", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}>
                <label style={lbl}>{t.cs.finType}</label>
                <select value={form.finType} onChange={(e) => up("finType", e.target.value)}>
                  {[["murabaha", t.cs.murabaha], ["ijarah", t.cs.ijarah], ["tawarruq", t.cs.tawarruq], ["ai", t.cs.aiDecide]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div style={fld}>
                <label style={lbl}>{t.cs.tenor}</label>
                <select value={form.tenor} onChange={(e) => up("tenor", e.target.value)}>
                  {["12","24","36","48","60"].map((m) => <option key={m} value={m}>{m} {t.cs.months}</option>)}
                </select>
              </div>
            </div>
            <div style={fld}><label style={lbl}>{t.cs.existingDebt}</label><input type="number" value={form.existingDebt} onChange={(e) => up("existingDebt", e.target.value)} /></div>
            {monthlyIncome > 0 && <div style={{ padding: 12, borderRadius: 6, background: ratio > 0.65 ? "#fcebeb" : "#eaf3de", marginTop: 8 }}><div style={{ fontSize: 12, fontWeight: 600, color: ratio > 0.65 ? "#501313" : "#27500A" }}>{t.cs.chkRatio}: {(ratio * 100).toFixed(1)}%</div></div>}
          </>)}
          {/* Step 4 */}
          {step === 4 && (<>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}>
                <label style={lbl}>{t.cs.simahScore}</label>
                <select value={form.simahScore} onChange={(e) => up("simahScore", e.target.value)}>
                  {[["excellent", t.cs.simahExcellent], ["good", t.cs.simahGood], ["fair", t.cs.simahFair], ["poor", t.cs.simahPoor], ["na", t.cs.simahNA]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div style={fld}>
                <label style={lbl}>{t.cs.simahRemarks}</label>
                <select value={form.simahRemarks} onChange={(e) => up("simahRemarks", e.target.value)}>
                  {[["clean", t.cs.clean], ["minor", t.cs.minorIssues], ["major", t.cs.majorIssues], ["defaulted", t.cs.defaulted]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}>
                <label style={lbl}>{t.cs.zatca}</label>
                <select value={form.zatca} onChange={(e) => up("zatca", e.target.value)}>
                  {[["compliant", t.cs.compliant], ["non-compliant", t.cs.nonCompliant], ["na", t.cs.na]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div style={fld}>
                <label style={lbl}>{t.cs.crStatus}</label>
                <select value={form.crStatus} onChange={(e) => up("crStatus", e.target.value)}>
                  {[["valid", t.cs.valid], ["expired", t.cs.expired], ["na", t.cs.na]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {isInd && <div style={fld}>
                <label style={lbl}>{t.cs.absher}</label>
                <select value={form.absher} onChange={(e) => up("absher", e.target.value)}>
                  {[["verified", t.cs.verified], ["not-verified", t.cs.notVerified]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>}
              <div style={fld}>
                <label style={lbl}>{t.cs.existingCustomer}</label>
                <select value={form.existingCustomer} onChange={(e) => up("existingCustomer", e.target.value)}>
                  {[["yes", t.cs.yes], ["no", t.cs.no]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={fld}>
              <label style={lbl}>{t.cs.prevDefaults}</label>
              <select value={form.prevDefaults} onChange={(e) => up("prevDefaults", e.target.value)}>
                {[["no", t.cs.noDefaults], ["minor", t.cs.minorDefaults], ["major", t.cs.majorDefaults]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </>)}
          {/* Step 5 — Review */}
          {step === 5 && (<>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{t.cs.reviewSummary}</div>
            {[
              [t.cs.applicantType, isInd ? t.cs.individual : t.cs.sme],
              [t.cs.fullName, form.fullName],
              [t.cs.nationalId, form.nationalId],
              [t.cs.nationality, form.nationality === "saudi" ? t.cs.saudi : t.cs.nonSaudi],
              [t.cs.city, form.city],
              ...(isInd ? [
                [t.cs.empStatus, form.empStatus],
                [t.cs.salary, `SAR ${Number(form.salary).toLocaleString()}`],
                [t.cs.yearsJob, form.yearsJob],
              ] : [
                [t.cs.sector, form.sector],
                [t.cs.annualRev, `SAR ${Number(form.annualRev).toLocaleString()}`],
                [t.cs.saudization, `${form.saudization}%`],
              ]),
              [t.cs.finAmount, `SAR ${Number(form.finAmount).toLocaleString()}`],
              [t.cs.tenor, `${form.tenor} ${t.cs.months}`],
              [t.cs.simahScore, form.simahScore],
              [t.cs.prevDefaults, form.prevDefaults],
            ].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{ color: "#888" }}>{k}</span><span style={{ fontWeight: 600 }}>{v || "—"}</span></div>)}
            {/* SAMA pre-checks */}
            <div style={{ marginTop: 16, padding: 14, background: "#f9f9fb", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{t.cs.samaChecks}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {samaChecks.map((c, i) => <div key={i} style={{ padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center", background: c.pass ? "#eaf3de" : "#fcebeb", color: c.pass ? "#27500A" : "#501313" }}>{c.pass ? "✓" : "✗"} {c.label}</div>)}
              </div>
            </div>
            {error && <div style={{ marginTop: 12, padding: 10, background: "#fcebeb", color: "#501313", borderRadius: 6, fontSize: 12 }}>{error}</div>}
          </>)}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 18px", fontSize: 13 }}>{t.cs.prev}</button> : <div />}
            {step < 5 ? <button onClick={() => setStep(step + 1)} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.cs.next}</button> : <button onClick={submit} disabled={loading} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 22px", fontSize: 13, fontWeight: 600 }}>{loading ? t.cs.analyzing : t.cs.analyzeBtn}</button>}
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     CREDIT SCORING — RESULT
     ═══════════════════════════════════════════════════════════════ */
  const CsResult = () => {
    const [saved, setSaved] = useState(false);
    if (!viewResult) return null;
    const r = viewResult;
    const sc = csScoreColor(r.creditScore || 0);
    const handleSave = () => { const existing = loadStore(CS_KEY); if (!existing.find((a) => a.id === r.id)) { const updated = [r, ...existing]; saveStore(CS_KEY, updated); setCsApps(updated); } setSaved(true); };
    const bd = r.scoreBreakdown || {};
    const bars = [
      { label: t.cs.incomeAdequacy, value: bd.incomeAdequacy || 0, max: 25 },
      { label: t.cs.creditHistory, value: bd.creditHistory || 0, max: 25 },
      { label: t.cs.empStability, value: bd.employmentStability || 0, max: 20 },
      { label: t.cs.dtiRatio, value: bd.debtToIncome || 0, max: 15 },
      { label: t.cs.complianceScore, value: bd.complianceScore || 0, max: 15 },
    ];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.cs.reportTitle}</h2>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.formData?.fullName} — <span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{r.formData?.applicantType === "individual" ? t.cs.individual : t.cs.sme}</span></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} disabled={saved} style={{ background: saved ? "#27500A" : "#BE1E2D", color: "#fff", border: "none", padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>{saved ? t.cs.saved : t.cs.save}</button>
            <button onClick={() => setScreen("csWizard")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 16px", fontSize: 12 }}>{t.cs.newApp}</button>
          </div>
        </div>
        {/* Score gauge + eligibility */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.creditScore}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: sc.text }}>{r.creditScore}</div>
            <div style={{ fontSize: 11, color: sc.text, marginTop: 2 }}>{r.scoreLabel}</div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.eligibilityLabel}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: eligColor(r.eligibility) }}>{r.eligibility}</div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.confidence}</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{r.confidenceLevel || "—"}</div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.recStructure}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#BE1E2D" }}>{r.recommendedStructure || "—"}</div>
          </div>
        </div>
        {/* Financing summary */}
        {(r.eligibility || "").toLowerCase() !== "rejected" && (r.eligibility || "").toLowerCase() !== "مرفوض" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
            {[[t.cs.recAmount, r.recommendedAmount ? `SAR ${Number(r.recommendedAmount).toLocaleString()}` : "—"], [t.cs.recTenor, r.recommendedTenor || "—"], [t.cs.estPayment, r.recommendedAmount && r.recommendedTenor ? `SAR ${Math.round(Number(r.recommendedAmount) / parseInt(r.recommendedTenor)).toLocaleString()}` : "—"], [t.cs.profitRate, r.estimatedProfitRate || "—"]].map(([lbl, val], i) => (
              <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: "#888" }}>{lbl}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        )}
        {/* Summary */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.summary}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{r.summary}</div>
        </div>
        {/* Score breakdown bars */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.cs.scoreBreakdown}</div>
          {bars.map((b, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span>{b.label}</span><span style={{ fontWeight: 600 }}>{b.value}/{b.max}</span></div>
              <div style={{ height: 8, background: "#f0f0f4", borderRadius: 4 }}><div style={{ height: 8, borderRadius: 4, background: b.value / b.max >= 0.7 ? "#27500A" : b.value / b.max >= 0.4 ? "#c89000" : "#BE1E2D", width: `${(b.value / b.max) * 100}%`, transition: "width 0.3s" }} /></div>
            </div>
          ))}
        </div>
        {/* Positive / Risk */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.cs.positiveFactors}</div>
            {(r.positiveFactors || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#27500A" }}>✓ {s}</div>)}
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.cs.riskFlags}</div>
            {(r.riskFlags || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>! {s}</div>)}
          </div>
        </div>
        {/* Sharia + SAMA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#eaf3de", border: "0.5px solid #d5e8c0", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.cs.shariaNote}</div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: "#27500A" }}>{r.shariaNote}</div>
            {r.structureReason && <div style={{ fontSize: 11, marginTop: 6, color: "#3d7a0a", fontStyle: "italic" }}>{r.structureReason}</div>}
          </div>
          <div style={{ background: "#f9f9fb", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#633806" }}>{t.cs.samaFlags}</div>
            {(r.samaFlags || []).map((f, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#633806" }}>⚑ {f}</div>)}
          </div>
        </div>
        {/* Conditions */}
        {r.conditions && r.conditions.length > 0 && <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.cs.conditions}</div>{r.conditions.map((c, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#444" }}>{i + 1}. {c}</div>)}</div>}
        {/* Rejection reasons */}
        {r.rejectionReasons && r.rejectionReasons.length > 0 && <div style={{ background: "#fcebeb", border: "0.5px solid #f0c0c0", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.cs.rejectionReasons}</div>{r.rejectionReasons.map((c, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>{i + 1}. {c}</div>)}</div>}
        {/* Disclaimer */}
        <div style={{ fontSize: 10, color: "#999", marginTop: 16, lineHeight: 1.5, textAlign: "center" }}>{t.cs.disclaimer}</div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     CREDIT SCORING — HISTORY
     ═══════════════════════════════════════════════════════════════ */
  const CsHistory = () => {
    const [search, setSearch] = useState("");
    const [filterElig, setFilterElig] = useState("all");
    const [filterType, setFilterType] = useState("all");
    const filtered = csApps.filter((a) => {
      const matchSearch = !search || (a.formData?.fullName || "").toLowerCase().includes(search.toLowerCase()) || (a.formData?.nationalId || "").includes(search);
      const el = (a.eligibility || "").toLowerCase();
      const matchElig = filterElig === "all" || el === filterElig || (filterElig === "approved" && el === "موافق") || (filterElig === "conditional" && el === "مشروط") || (filterElig === "rejected" && el === "مرفوض");
      const matchType = filterType === "all" || a.formData?.applicantType === filterType;
      return matchSearch && matchElig && matchType;
    });
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cs.histTitle}</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <input placeholder={t.cs.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 240 }} />
          <select value={filterElig} onChange={(e) => setFilterElig(e.target.value)} style={{ maxWidth: 150 }}>
            <option value="all">{t.cs.filterAll}</option><option value="approved">{t.cs.filterApproved}</option><option value="conditional">{t.cs.filterConditional}</option><option value="rejected">{t.cs.filterRejected}</option>
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ maxWidth: 150 }}>
            <option value="all">{t.cs.filterAllType}</option><option value="individual">{t.cs.filterIndividual}</option><option value="sme">{t.cs.filterSME}</option>
          </select>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          {filtered.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.cs.histEmpty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.cs.date, t.cs.name, t.cs.type, t.cs.score, t.cs.eligibility, "", ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{filtered.map((a) => { const sc = csScoreColor(a.creditScore || 0); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.fullName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{a.formData?.applicantType === "individual" ? t.cs.individual : t.cs.sme}</span></td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.creditScore}</span></td>
                  <td style={{ padding: "8px 6px", color: eligColor(a.eligibility), fontWeight: 600 }}>{a.eligibility}</td>
                  <td style={{ padding: "8px 6px" }}>{a.scoreLabel || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("csResult"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.cs.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     SETTINGS (shared)
     ═══════════════════════════════════════════════════════════════ */
  const Settings = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{t.settings.title}</h2>
      <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 20, maxWidth: 480, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.settings.langLabel}</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["en", "ar"].map((l) => <button key={l} onClick={() => setLang(l)} style={{ padding: "8px 24px", border: lang === l ? "none" : "0.5px solid #d0d0d0", background: lang === l ? "#BE1E2D" : "#fff", color: lang === l ? "#fff" : "#1a1a1a", fontSize: 13, fontWeight: 600 }}>{l === "en" ? "English" : "العربية"}</button>)}
        </div>
      </div>
      <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 20, maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.settings.about}</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{t.settings.aboutText}</div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     LAYOUT
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div style={{ display: "flex", direction: isRtl ? "rtl" : "ltr", minHeight: "100vh", width: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 28, overflowY: "auto", textAlign: isRtl ? "right" : "left" }}>
        {screen === "dashboard" && <Dashboard />}
        {screen === "wizard" && <Wizard />}
        {screen === "result" && <RiskResult />}
        {screen === "applications" && <RiskApplications />}
        {screen === "csDashboard" && <CsDashboard />}
        {screen === "csWizard" && <CsWizard />}
        {screen === "csResult" && <CsResult />}
        {screen === "csHistory" && <CsHistory />}
        {screen === "settings" && <Settings />}
      </div>
    </div>
  );
}
