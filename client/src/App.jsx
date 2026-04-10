import { useState, useEffect } from "react";
import Collections, { collectionsSectionLabel, collectionsNavKeys } from "./Collections";

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
    sectionSharia: "Sharia Audit",
    sectionCollections: "Collections & Early Warning",
    nav: { dashboard: "Dashboard", newAnalysis: "New Analysis", applications: "Applications", settings: "Settings",
           csDashboard: "Credit Dashboard", csNewApp: "New Application", csHistory: "History",
           saDashboard: "Audit Dashboard", saNewAudit: "New Audit", saHistory: "Audit History", saStandards: "Standards Library",
           colDashboard: "Portfolio Dashboard", colEarlyWarning: "Early Warning", colCallList: "Call List", colAddAccount: "Add Account", colReports: "Reports" },
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
      aboutText: "Alpha Pro MENA × Baker Tilly Platform — SME Risk Intelligence, AI Credit Scoring Engine & Sharia Compliance Audit Assistant. Powered by Claude AI. SAMA-compliant analysis for Islamic finance in Saudi Arabia.",
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
      step1: "Applicant Info", step2: "Income / Business", step3: "Financing", step4: "Credit & Compliance", step5: "Review",
      applicantType: "Applicant Type", fullName: "Full Name", nationalId: "National ID / CR No.",
      nationality: "Nationality", saudi: "Saudi", nonSaudi: "Non-Saudi",
      city: "City", cities: ["Riyadh","Jeddah","Dammam","Khobar","Mecca","Medina","Other"],
      citiesAr: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      selectCity: "Select City",
      empStatus: "Employment Status", government: "Government", privateSector: "Private Sector",
      selfEmployed: "Self-Employed", retired: "Retired", unemployed: "Unemployed",
      employer: "Employer Name", salary: "Monthly Salary (SAR)", yearsJob: "Years at Current Job",
      otherIncome: "Other Monthly Income (SAR)",
      sector: "Business Sector", yearsInBiz: "Years in Business", annualRev: "Annual Revenue (SAR)",
      numEmployees: "Number of Employees", saudization: "Saudization %",
      finAmount: "Financing Amount (SAR)", finPurpose: "Financing Purpose",
      finType: "Preferred Financing Type", murabaha: "Murabaha", ijarah: "Ijarah", tawarruq: "Tawarruq", aiDecide: "Let AI Decide",
      tenor: "Requested Tenor", months: "months",
      existingDebt: "Existing Monthly Debt Payments (SAR)",
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
      histTitle: "Application History", search: "Search by name or ID...",
      filterAll: "All", filterApproved: "Approved", filterConditional: "Conditional", filterRejected: "Rejected",
      filterAllType: "All Types", filterIndividual: "Individual", filterSME: "SME",
      histEmpty: "No saved applications yet.",
    },
    /* ── Sharia Audit translations ── */
    sa: {
      dashTitle: "Sharia Compliance Dashboard", newAuditBtn: "New Audit",
      totalAudits: "Total Audits Completed", avgScore: "Average Compliance Score",
      fullyCompliant: "Contracts Fully Compliant", violationsFound: "Violations Found",
      compOverview: "Compliance Overview",
      catFull: "Fully Compliant (85-100)", catMinor: "Minor Issues (60-84)", catMajor: "Major Violations (0-59)",
      recentAudits: "Recent Audits", date: "Date", name: "Contract / Product Name", type: "Type",
      score: "Score", status: "Status", view: "View",
      empty: "No audits yet. Start a new audit to analyze a contract.",
      /* wizard */
      step1: "Contract Details", step2: "Contract Input", step3: "Review & Submit",
      auditName: "Audit Name / Contract Reference", contractType: "Contract Type",
      types: ["Murabaha (Cost-plus sale)","Ijarah (Lease)","Ijarah Muntahia Bittamleek","Tawarruq (Commodity Murabaha)","Musharaka (Partnership)","Mudaraba (Profit-sharing)","Wakala (Agency)","Qard (Benevolent loan)","Other / Unknown"],
      typesShort: ["Murabaha","Ijarah","IMB","Tawarruq","Musharaka","Mudaraba","Wakala","Qard","Other"],
      selectType: "Select Contract Type",
      standards: "Applicable Standards",
      stdLabels: ["AAOIFI Sharia Standards","SAMA Islamic Finance Guidelines","OIC Fiqh Academy Resolutions","Local Saudi Sharia Board Requirements"],
      finAmount: "Financing Amount (SAR, optional)",
      financier: "Financier Name (optional)", customer: "Customer Name (optional)",
      contractLang: "Language of Contract", arabic: "Arabic", english: "English", bilingual: "Bilingual",
      /* step 2 */
      tabPaste: "Paste Text", tabClauses: "Key Clauses",
      pastePlaceholder: "Paste the full contract text, term sheet, or product description here for Sharia compliance review...",
      charCount: "characters", clear: "Clear",
      clauseLabel: "Clause", clauseType: "Clause Type",
      clauseTypes: ["Profit Rate","Penalty","Late Payment","Termination","Collateral","Other"],
      addClause: "Add Another Clause", maxClauses: "Maximum 10 clauses",
      guidanceTitle: "Common Red Flags to Watch For",
      guidanceItems: [
        "Fixed guaranteed returns (Riba indicator)",
        "Penalty interest on late payment",
        "Uncertainty in asset ownership timing (Gharar)",
        "Conventional insurance requirements",
        "Interest-based benchmark references (e.g. LIBOR/SOFR without adjustment)"
      ],
      /* step 3 */
      reviewTitle: "Review Summary", textLength: "Text Length", clauseCount: "Clauses",
      runAudit: "Run Sharia Audit", analyzing: "Analyzing contract for Sharia compliance...",
      next: "Next", prev: "Previous",
      /* result */
      reportTitle: "Sharia Compliance Audit Report", save: "Save Report", newAudit: "New Audit",
      exportBtn: "Export Summary",
      complianceScore: "Compliance Score",
      statusFull: "Fully Compliant", statusMinor: "Minor Issues", statusMajor: "Significant Violations", statusNon: "Non-Compliant",
      standardsApplied: "Standards Applied",
      execSummary: "Executive Summary",
      violationsTitle: "Violations & Issues Found",
      severity: "Severity", violationType: "Type", clause: "Clause", issue: "Issue",
      islamicRuling: "Islamic Ruling", correction: "Recommended Correction",
      sevCritical: "CRITICAL", sevMajor: "MAJOR", sevMinor: "MINOR", sevAdvisory: "ADVISORY",
      compliantTitle: "Compliant Elements",
      structureTitle: "Sharia Structure Assessment",
      isPermissible: "Structure Permissible", recStructure: "Recommended Structure",
      missingPillars: "Missing Pillars", structureNotes: "Notes",
      checklistTitle: "AAOIFI & SAMA Compliance Checklist",
      chkStandard: "Standard", chkRequirement: "Requirement", chkStatus: "Status",
      memoTitle: "Committee Pre-Review Memo",
      recsTitle: "Recommendations & Next Steps",
      overallRec: "Overall Recommendation",
      disclaimer: "This AI-generated audit is a pre-review tool to assist the Sharia committee. It does not constitute a formal Sharia opinion (fatwa). All financing contracts require review and approval by a qualified Sharia scholar or Sharia Supervisory Board per SAMA requirements.",
      saved: "Saved!",
      /* history */
      histTitle: "Audit History", search: "Search by contract name...",
      filterAll: "All", filterFull: "Fully Compliant", filterMinor: "Minor Issues", filterMajor: "Major Violations", filterNon: "Non-Compliant",
      filterAllType: "All Types", histEmpty: "No saved audits yet.",
      saveAudit: "Save to Portfolio", outOf100: "out of 100",
      dimBreakdown: "Compliance Dimension Breakdown",
      refLabel: "Reference", remedyLabel: "Remedy",
      fatwaTitle: "Fatwa & Scholarly References",
      summaryTitle: "Executive Summary",
      searchPlaceholder: "Search by contract name...",
      filterCompliant: "Fully Compliant",
      violations: "Violations",
      /* standards library */
      stdLibTitle: "Islamic Finance Standards Reference",
      libTitle: "Islamic Finance Standards Reference",
      tabAAOIFI: "AAOIFI", tabSAMA: "SAMA", tabProhibitions: "Key Prohibitions", tabStructures: "Structure Guides",
      standardsLib: [
        { name: "AAOIFI SS 8 — Murabaha", code: "SS-8", desc: "Standards for cost-plus sale financing including asset ownership, disclosure of cost and profit, and delivery requirements.", scope: "Murabaha contracts" },
        { name: "AAOIFI SS 9 — Ijarah", code: "SS-9", desc: "Standards for Islamic leasing including ownership retention, maintenance obligations, and lease-to-own structures.", scope: "Ijarah & IMB contracts" },
        { name: "AAOIFI SS 30 — Tawarruq", code: "SS-30", desc: "Standards for organized commodity Murabaha including independence of transactions and prohibition of circular arrangements.", scope: "Tawarruq contracts" },
        { name: "AAOIFI SS 12 — Musharaka", code: "SS-12", desc: "Standards for partnership financing including profit/loss sharing ratios, capital contribution, and management rights.", scope: "Musharaka & diminishing Musharaka" },
        { name: "SAMA Islamic Finance Framework", code: "SAMA-IF", desc: "Saudi Central Bank regulations for Islamic financial institutions including Sharia governance, product approval, and compliance requirements.", scope: "All Islamic finance products" },
        { name: "OIC Fiqh Academy Resolutions", code: "OIC-FA", desc: "Resolutions from the International Islamic Fiqh Academy on contemporary financial transactions and their Sharia permissibility.", scope: "Cross-border Islamic finance" },
      ],
    },
  },
  ar: {
    brand: "ألفا برو مينا",
    tagline: "مدعوم بالذكاء الاصطناعي · متوافق مع ساما",
    credit: "ألفا برو مينا × بيكر تيلي",
    sectionRisk: "تقييم مخاطر المنشآت",
    sectionCredit: "نظام تقييم الائتمان",
    sectionSharia: "المراجعة الشرعية",
    sectionCollections: "التحصيل والإنذار المبكر",
    nav: { dashboard: "لوحة التحكم", newAnalysis: "تحليل جديد", applications: "الطلبات", settings: "الإعدادات",
           csDashboard: "لوحة الائتمان", csNewApp: "طلب جديد", csHistory: "السجل",
           saDashboard: "لوحة المراجعة", saNewAudit: "مراجعة جديدة", saHistory: "سجل المراجعات", saStandards: "مكتبة المعايير",
           colDashboard: "لوحة المحفظة", colEarlyWarning: "الإنذار المبكر", colCallList: "قائمة المكالمات", colAddAccount: "إضافة حساب", colReports: "التقارير" },
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
      sharia: "الامتثال الشرعي", samaFlags: "ملاحظات ساما التنظيمية", samaChecks: "فحوصات ساما",
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
      about: "حول",
      aboutText: "منصة ألفا برو مينا × بيكر تيلي — تقييم مخاطر المنشآت، نظام تقييم الائتمان ومساعد المراجعة الشرعية. مدعوم بالذكاء الاصطناعي كلود. تحليل متوافق مع ساما للتمويل الإسلامي في المملكة العربية السعودية.",
    },
    accept: "قبول", review: "مراجعة", reject: "رفض",
    cs: {
      dashTitle: "لوحة تقييم الائتمان", newAppBtn: "طلب جديد",
      totalApps: "إجمالي الطلبات", avgScore: "متوسط الدرجة", approvalRate: "نسبة القبول",
      totalFinancing: "إجمالي التمويل المطلوب", scoreDist: "توزيع الدرجات",
      excellent: "ممتاز", good: "جيد", fair: "مقبول", poor: "ضعيف",
      recentApps: "الطلبات الأخيرة", date: "التاريخ", name: "اسم المتقدم", type: "النوع",
      score: "الدرجة", eligibility: "الأهلية", decision: "القرار", view: "عرض",
      empty: "لا توجد طلبات بعد. ابدأ أول طلب ائتمان!",
      individual: "فرد", sme: "منشأة",
      step1: "معلومات المتقدم", step2: "الدخل / النشاط", step3: "التمويل", step4: "الائتمان والامتثال", step5: "المراجعة",
      applicantType: "نوع المتقدم", fullName: "الاسم الكامل", nationalId: "رقم الهوية / السجل التجاري",
      nationality: "الجنسية", saudi: "سعودي", nonSaudi: "غير سعودي",
      city: "المدينة", cities: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      citiesAr: ["الرياض","جدة","الدمام","الخبر","مكة","المدينة","أخرى"],
      selectCity: "اختر المدينة",
      empStatus: "الحالة الوظيفية", government: "حكومي", privateSector: "قطاع خاص",
      selfEmployed: "عمل حر", retired: "متقاعد", unemployed: "غير موظف",
      employer: "اسم جهة العمل", salary: "الراتب الشهري (ريال)", yearsJob: "سنوات العمل الحالي",
      otherIncome: "دخل شهري إضافي (ريال)",
      sector: "قطاع النشاط", yearsInBiz: "سنوات العمل", annualRev: "الإيرادات السنوية (ريال)",
      numEmployees: "عدد الموظفين", saudization: "نسبة السعودة %",
      finAmount: "مبلغ التمويل (ريال)", finPurpose: "الغرض من التمويل",
      finType: "نوع التمويل المفضل", murabaha: "مرابحة", ijarah: "إجارة", tawarruq: "تورق", aiDecide: "اختيار الذكاء الاصطناعي",
      tenor: "المدة المطلوبة", months: "شهر",
      existingDebt: "الأقساط الشهرية الحالية (ريال)",
      simahScore: "درجة سمة", simahExcellent: "ممتاز (750+)", simahGood: "جيد (650-749)",
      simahFair: "مقبول (550-649)", simahPoor: "ضعيف (أقل من 550)", simahNA: "غير متاح",
      simahRemarks: "ملاحظات سمة", clean: "نظيف", minorIssues: "مشاكل بسيطة", majorIssues: "مشاكل كبيرة", defaulted: "متعثر",
      zatca: "حالة الزكاة والضريبة", compliant: "متوافق", nonCompliant: "غير متوافق", na: "غير منطبق",
      crStatus: "السجل التجاري", valid: "ساري", expired: "منتهي",
      absher: "التحقق من أبشر", verified: "موثق", notVerified: "غير موثق",
      existingCustomer: "عميل حالي لتوكلات", yes: "نعم", no: "لا",
      prevDefaults: "تعثرات سابقة", noDefaults: "لا", minorDefaults: "نعم (بسيطة)", majorDefaults: "نعم (كبيرة)",
      samaChecks: "فحوصات أهلية ساما",
      chkRatio: "التمويل/الدخل ≤ 65%", chkMaxInd: "الحد الأقصى 5 مليون (فرد)", chkMaxSme: "الحد الأقصى 15 مليون (منشأة)",
      chkSimah: "سمة مقبولة", chkNoDefault: "لا تعثرات نشطة",
      chkZatca: "متوافق مع الزكاة", chkCR: "سجل تجاري ساري", chkAbsher: "أبشر موثق", chkSaud: "السعودة ≥ 30%",
      reviewSummary: "ملخص المراجعة", analyzeBtn: "تحليل بالذكاء الاصطناعي", analyzing: "جاري التحليل...",
      next: "التالي", prev: "السابق", selectSector: "اختر القطاع",
      reportTitle: "تقرير التقييم الائتماني", save: "حفظ في المحفظة", newApp: "طلب جديد",
      creditScore: "الدرجة الائتمانية", scoreLabel: "التصنيف", eligibilityLabel: "الأهلية",
      confidence: "مستوى الثقة", recStructure: "الهيكل الموصى به", recAmount: "المبلغ الموصى به",
      recTenor: "المدة الموصى بها", estPayment: "القسط الشهري التقديري", profitRate: "نطاق معدل الربح",
      scoreBreakdown: "تفصيل الدرجة", incomeAdequacy: "كفاية الدخل", creditHistory: "السجل الائتماني",
      empStability: "استقرار التوظيف", dtiRatio: "نسبة الدين للدخل", complianceScore: "درجة الامتثال",
      positiveFactors: "العوامل الإيجابية", riskFlags: "مؤشرات المخاطر",
      shariaNote: "الامتثال الشرعي", samaFlags: "ملخص ساما التنظيمي",
      conditions: "شروط الموافقة", rejectionReasons: "أسباب الرفض",
      disclaimer: "هذه الدرجة المولدة بالذكاء الاصطناعي أداة لدعم القرار. الموافقة النهائية تخضع لمراجعة لجنة الائتمان والهيئة الشرعية في توكلات للتمويل وفقاً لإرشادات ساما.",
      saved: "تم الحفظ!",
      approved: "موافق", conditional: "مشروط", rejected: "مرفوض",
      histTitle: "سجل الطلبات", search: "بحث بالاسم أو الرقم...",
      filterAll: "الكل", filterApproved: "موافق", filterConditional: "مشروط", filterRejected: "مرفوض",
      filterAllType: "جميع الأنواع", filterIndividual: "فرد", filterSME: "منشأة",
      histEmpty: "لا توجد طلبات محفوظة بعد.",
    },
    sa: {
      dashTitle: "لوحة الامتثال الشرعي", newAuditBtn: "مراجعة جديدة",
      totalAudits: "إجمالي المراجعات المكتملة", avgScore: "متوسط درجة الامتثال",
      fullyCompliant: "عقود متوافقة تماماً", violationsFound: "المخالفات المكتشفة",
      compOverview: "نظرة عامة على الامتثال",
      catFull: "متوافق تماماً (85-100)", catMinor: "مشكلات بسيطة (60-84)", catMajor: "مخالفات جوهرية (0-59)",
      recentAudits: "المراجعات الأخيرة", date: "التاريخ", name: "اسم العقد / المنتج", type: "النوع",
      score: "الدرجة", status: "الحالة", view: "عرض",
      empty: "لا توجد مراجعات بعد. ابدأ مراجعة جديدة لتحليل عقد.",
      step1: "تفاصيل العقد", step2: "نص العقد", step3: "المراجعة والإرسال",
      auditName: "اسم المراجعة / مرجع العقد", contractType: "نوع العقد",
      types: ["المرابحة (بيع بالتكلفة مع ربح)","الإجارة","إجارة منتهية بالتمليك","التورق (مرابحة السلع)","المشاركة","المضاربة","الوكالة","القرض الحسن","أخرى / غير معروف"],
      typesShort: ["المرابحة","الإجارة","إجارة منتهية","التورق","المشاركة","المضاربة","الوكالة","القرض","أخرى"],
      selectType: "اختر نوع العقد",
      standards: "المعايير المطبقة",
      stdLabels: ["معايير الشريعة AAOIFI","إرشادات ساما للتمويل الإسلامي","قرارات مجمع الفقه الإسلامي","متطلبات الهيئة الشرعية المحلية"],
      finAmount: "مبلغ التمويل (ريال، اختياري)",
      financier: "اسم الممول (اختياري)", customer: "اسم العميل (اختياري)",
      contractLang: "لغة العقد", arabic: "عربي", english: "إنجليزي", bilingual: "ثنائي اللغة",
      tabPaste: "لصق النص", tabClauses: "بنود رئيسية",
      pastePlaceholder: "الصق نص العقد الكامل أو ورقة الشروط أو وصف المنتج هنا للمراجعة الشرعية...",
      charCount: "حرف", clear: "مسح",
      clauseLabel: "البند", clauseType: "نوع البند",
      clauseTypes: ["معدل الربح","الغرامة","السداد المتأخر","الإنهاء","الضمان","أخرى"],
      addClause: "إضافة بند آخر", maxClauses: "الحد الأقصى 10 بنود",
      guidanceTitle: "علامات تحذيرية شائعة يجب مراقبتها",
      guidanceItems: [
        "عوائد ثابتة مضمونة (مؤشر ربا)",
        "فائدة جزائية على التأخر في السداد",
        "عدم وضوح في توقيت نقل ملكية الأصل (غرر)",
        "اشتراط تأمين تقليدي",
        "مراجع معيارية قائمة على الفائدة (مثل LIBOR/SOFR بدون تعديل)"
      ],
      reviewTitle: "ملخص المراجعة", textLength: "طول النص", clauseCount: "البنود",
      runAudit: "تشغيل المراجعة الشرعية", analyzing: "جاري تحليل العقد للامتثال الشرعي...",
      next: "التالي", prev: "السابق",
      reportTitle: "تقرير المراجعة الشرعية", save: "حفظ التقرير", newAudit: "مراجعة جديدة",
      exportBtn: "تصدير الملخص",
      complianceScore: "درجة الامتثال",
      statusFull: "متوافق تماماً", statusMinor: "مشكلات بسيطة", statusMajor: "مخالفات جوهرية", statusNon: "غير متوافق",
      standardsApplied: "المعايير المطبقة",
      execSummary: "الملخص التنفيذي",
      violationsTitle: "المخالفات والمشكلات المكتشفة",
      severity: "الخطورة", violationType: "النوع", clause: "البند", issue: "المشكلة",
      islamicRuling: "الحكم الشرعي", correction: "التصحيح الموصى به",
      sevCritical: "حرج", sevMajor: "جوهري", sevMinor: "بسيط", sevAdvisory: "استشاري",
      compliantTitle: "العناصر المتوافقة",
      structureTitle: "تقييم الهيكل الشرعي",
      isPermissible: "الهيكل مباح", recStructure: "الهيكل الموصى به",
      missingPillars: "الأركان المفقودة", structureNotes: "ملاحظات",
      checklistTitle: "قائمة فحص AAOIFI وساما",
      chkStandard: "المعيار", chkRequirement: "المتطلب", chkStatus: "الحالة",
      memoTitle: "مذكرة ما قبل مراجعة اللجنة",
      recsTitle: "التوصيات والخطوات التالية",
      overallRec: "التوصية العامة",
      disclaimer: "هذه المراجعة المولدة بالذكاء الاصطناعي أداة مراجعة أولية لمساعدة اللجنة الشرعية. لا تشكل رأياً شرعياً رسمياً (فتوى). جميع عقود التمويل تتطلب مراجعة وموافقة عالم شرعي مؤهل أو هيئة رقابة شرعية وفقاً لمتطلبات ساما.",
      saved: "تم الحفظ!",
      histTitle: "سجل المراجعات", search: "بحث باسم العقد...",
      filterAll: "الكل", filterFull: "متوافق تماماً", filterMinor: "مشكلات بسيطة", filterMajor: "مخالفات جوهرية", filterNon: "غير متوافق",
      filterAllType: "جميع الأنواع", histEmpty: "لا توجد مراجعات محفوظة بعد.",
      saveAudit: "حفظ في المحفظة", outOf100: "من 100",
      dimBreakdown: "تفصيل أبعاد الامتثال",
      refLabel: "المرجع", remedyLabel: "العلاج",
      fatwaTitle: "مراجع الفتاوى والعلماء",
      summaryTitle: "الملخص التنفيذي",
      searchPlaceholder: "بحث باسم العقد...",
      filterCompliant: "متوافق تماماً",
      violations: "المخالفات",
      stdLibTitle: "مرجع معايير التمويل الإسلامي",
      libTitle: "مرجع معايير التمويل الإسلامي",
      tabAAOIFI: "AAOIFI", tabSAMA: "ساما", tabProhibitions: "المحظورات الرئيسية", tabStructures: "أدلة الهياكل",
      standardsLib: [
        { name: "معيار AAOIFI الشرعي 8 — المرابحة", code: "SS-8", desc: "معايير بيع التكلفة مع الربح بما في ذلك ملكية الأصل والإفصاح عن التكلفة والربح ومتطلبات التسليم.", scope: "عقود المرابحة" },
        { name: "معيار AAOIFI الشرعي 9 — الإجارة", code: "SS-9", desc: "معايير التأجير الإسلامي بما في ذلك الاحتفاظ بالملكية والتزامات الصيانة وهياكل الإجارة المنتهية بالتمليك.", scope: "عقود الإجارة" },
        { name: "معيار AAOIFI الشرعي 30 — التورق", code: "SS-30", desc: "معايير مرابحة السلع المنظمة بما في ذلك استقلالية المعاملات وحظر الترتيبات الدائرية.", scope: "عقود التورق" },
        { name: "معيار AAOIFI الشرعي 12 — المشاركة", code: "SS-12", desc: "معايير تمويل الشراكة بما في ذلك نسب تقاسم الأرباح والخسائر والمساهمة الرأسمالية وحقوق الإدارة.", scope: "المشاركة والمشاركة المتناقصة" },
        { name: "إطار ساما للتمويل الإسلامي", code: "SAMA-IF", desc: "لوائح البنك المركزي السعودي للمؤسسات المالية الإسلامية بما في ذلك الحوكمة الشرعية واعتماد المنتجات ومتطلبات الامتثال.", scope: "جميع منتجات التمويل الإسلامي" },
        { name: "قرارات مجمع الفقه الإسلامي", code: "OIC-FA", desc: "قرارات المجمع الدولي للفقه الإسلامي حول المعاملات المالية المعاصرة وجوازها الشرعي.", scope: "التمويل الإسلامي العابر للحدود" },
      ],
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════ */
const RISK_KEY = "sme_risk_apps_v1";
const CS_KEY = "credit_scoring_apps_v1";
const SA_KEY = "sharia_audit_apps_v1";
const loadStore = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const saveStore = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const riskColor = (level) => {
  const l = (level || "").toLowerCase();
  if (l === "low" || l === "منخفض") return { bg: "#eaf3de", text: "#27500A", border: "#97C459" };
  if (l === "medium" || l === "متوسط") return { bg: "#faeeda", text: "#633806", border: "#EF9F27" };
  return { bg: "#fcebeb", text: "#501313", border: "#F09595" };
};
const csScoreColor = (s) => {
  if (s >= 80) return { bg: "#eaf3de", text: "#27500A" };
  if (s >= 60) return { bg: "#e8f0fe", text: "#1a3c8f" };
  if (s >= 40) return { bg: "#faeeda", text: "#633806" };
  return { bg: "#fcebeb", text: "#501313" };
};
const saScoreColor = (s) => {
  if (s >= 85) return { bg: "#eaf3de", text: "#27500A", border: "#97C459" };
  if (s >= 60) return { bg: "#faeeda", text: "#633806", border: "#EF9F27" };
  return { bg: "#fcebeb", text: "#501313", border: "#F09595" };
};
const eligColor = (e) => {
  const el = (e || "").toLowerCase();
  if (el === "approved" || el === "موافق") return "#27500A";
  if (el === "conditional" || el === "مشروط") return "#c89000";
  return "#BE1E2D";
};
const recColor = (r) => {
  const rl = (r || "").toLowerCase();
  if (rl === "accept" || rl === "قبول") return "#27500A";
  if (rl === "review" || rl === "مراجعة") return "#c89000";
  return "#BE1E2D";
};
const computeSamaChecks = (f) => {
  const rev = Number(f.revenue) || 0;
  const fin = Number(f.financing) || 0;
  const monthlyIncome = rev / 12;
  const ratio = monthlyIncome > 0 ? fin / monthlyIncome : 999;
  return [ratio <= 0.65, fin <= 15000000, f.cr === "valid", f.zatca === "compliant", f.simah === "clean", (Number(f.saudization) || 0) >= 30];
};
const sevColor = (sev) => {
  const s = (sev || "").toLowerCase();
  if (s === "critical" || s === "حرج") return { bg: "#fcebeb", text: "#501313", border: "#F09595" };
  if (s === "major" || s === "جوهري") return { bg: "#fef3e2", text: "#7a3b00", border: "#f0a830" };
  if (s === "minor" || s === "بسيط") return { bg: "#faeeda", text: "#633806", border: "#EF9F27" };
  return { bg: "#e8f0fe", text: "#1a3c8f", border: "#7baaf7" };
};

/* ═══════════════════════════════════════════════════════════════
   APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("app_lang") || "en");
  const [screen, setScreen] = useState("dashboard");
  const [viewResult, setViewResult] = useState(null);
  const [viewForm, setViewForm] = useState(null);
  const [riskApps, setRiskApps] = useState(() => loadStore(RISK_KEY));
  const [csApps, setCsApps] = useState(() => loadStore(CS_KEY));
  const [saApps, setSaApps] = useState(() => loadStore(SA_KEY));

  useEffect(() => { localStorage.setItem("app_lang", lang); }, [lang]);
  const t = T[lang];
  const isRtl = lang === "ar";

  /* Old sidebar removed — using the new unified Sidebar defined below */

  /* ═══════════════════════════════════════════════════════════════
     SME RISK — DASHBOARD
     ═══════════════════════════════════════════════════════════════ */
  const Dashboard = () => {
    const apps = riskApps;
    const total = apps.length;
    const avgRisk = total ? Math.round(apps.reduce((s, a) => s + (a.riskScore || 0), 0) / total) : 0;
    const accepted = apps.filter((a) => { const r = (a.recommendation || "").toLowerCase(); return r === "accept" || r === "قبول"; }).length;
    const approvalRate = total ? Math.round((accepted / total) * 100) : 0;
    const underReview = apps.reduce((s, a) => s + (Number(a.formData?.financing) || 0), 0);
    const lowCount = apps.filter((a) => { const l = (a.riskLevel || "").toLowerCase(); return l === "low" || l === "منخفض"; }).length;
    const medCount = apps.filter((a) => { const l = (a.riskLevel || "").toLowerCase(); return l === "medium" || l === "متوسط"; }).length;
    const highCount = apps.filter((a) => { const l = (a.riskLevel || "").toLowerCase(); return l === "high" || l === "مرتفع"; }).length;
    const statCards = [
      { label: t.dashboard.totalApps, value: total },
      { label: t.dashboard.avgRisk, value: avgRisk, color: riskColor(avgRisk <= 40 ? "low" : avgRisk <= 70 ? "medium" : "high") },
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
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color ? c.color.text : "#1a1a1a" }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.riskDist}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[{ label: t.dashboard.low, count: lowCount, color: riskColor("low") }, { label: t.dashboard.medium, count: medCount, color: riskColor("medium") }, { label: t.dashboard.high, count: highCount, color: riskColor("high") }].map((r, i) => (
              <div key={i} style={{ background: r.color.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: r.color.text }}>{r.count}</div>
                <div style={{ fontSize: 10, color: r.color.text, marginTop: 2 }}>{r.label}</div>
                <div style={{ marginTop: 6, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}><div style={{ height: 4, borderRadius: 2, background: r.color.text, width: total ? `${(r.count / total) * 100}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.recentApps}</div>
          {apps.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.dashboard.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.dashboard.company, t.dashboard.sector, t.dashboard.score, t.dashboard.level, t.dashboard.decision, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{apps.slice(0, 8).map((a) => { const rc = riskColor(a.riskLevel); return (
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
    const sectorOptions = t.sectors;
    const enSectors = T.en.sectors;
    const rev = Number(form.revenue) || 0;
    const fin = Number(form.financing) || 0;
    const monthlyIncome = rev / 12;
    const ratioPercent = monthlyIncome > 0 ? ((fin / monthlyIncome) * 100).toFixed(1) : "0.0";
    const samaChecks = computeSamaChecks(form);
    const chkLabels = [t.wizard.chk1, t.wizard.chk2, t.wizard.chk3, t.wizard.chk4, t.wizard.chk5, t.wizard.chk6];

    const submit = async () => {
      setLoading(true); setError("");
      const sectorEn = enSectors[sectorOptions.indexOf(form.sector)] || form.sector;
      const msg = `Company: ${form.companyName}\nSector: ${sectorEn}\nYears in Business: ${form.years}\nEmployees: ${form.employees}\nAnnual Revenue: SAR ${Number(form.revenue).toLocaleString()}\nFinancing Requested: SAR ${Number(form.financing).toLocaleString()}\nPurpose: ${form.purpose}\nCommercial Register: ${form.cr}\nZATCA: ${form.zatca}\nSIMAH: ${form.simah}\nSaudization: ${form.saudization}%\nFinancing/Monthly Income Ratio: ${ratioPercent}%`;
      try {
        const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userMessage: msg, lang }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        const result = data.result;
        const appEntry = { id: Date.now().toString(), date: new Date().toISOString(), riskScore: result.riskScore, riskLevel: result.riskLevel, recommendation: result.recommendation, formData: form, ...result };
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
                <div style={{ fontSize: 9, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888", textAlign: "center" }}>{s}</div>
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
            {monthlyIncome > 0 && <div style={{ padding: 10, borderRadius: 6, background: parseFloat(ratioPercent) > 65 ? "#fcebeb" : "#eaf3de", marginTop: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: parseFloat(ratioPercent) > 65 ? "#501313" : "#27500A" }}>{t.wizard.ratio}: {ratioPercent}%</span>{parseFloat(ratioPercent) > 65 && <div style={{ fontSize: 11, color: "#501313", marginTop: 4 }}>{t.wizard.ratioWarn}</div>}</div>}
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
    const samaChks = r.samaChecks || computeSamaChecks(viewForm || {});
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
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.result.samaChecks}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>{chkLabels.map((l, i) => <div key={i} style={{ padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center", background: samaChks[i] ? "#eaf3de" : "#fcebeb", color: samaChks[i] ? "#27500A" : "#501313" }}>{samaChks[i] ? "✓" : "✗"} {l}</div>)}</div></div>
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
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.cs.dashTitle}</h2>
          <button onClick={() => setScreen("csWizard")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.cs.newAppBtn}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[{ label: t.cs.totalApps, value: total }, { label: t.cs.avgScore, value: avgScore, color: csScoreColor(avgScore) }, { label: t.cs.approvalRate, value: `${approvalRate}%` }, { label: t.cs.totalFinancing, value: `SAR ${totalFin.toLocaleString()}` }].map((c, i) => (
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
    const [form, setForm] = useState({ applicantType: "individual", fullName: "", nationalId: "", nationality: "saudi", city: "", empStatus: "government", employer: "", salary: "", yearsJob: "", otherIncome: "", sector: "", yearsInBiz: "", annualRev: "", numEmployees: "", saudization: "", finAmount: "", finPurpose: "", finType: "ai", tenor: "36", existingDebt: "", simahScore: "good", simahRemarks: "clean", zatca: "compliant", crStatus: "valid", absher: "verified", existingCustomer: "no", prevDefaults: "no" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
    const isInd = form.applicantType === "individual";
    const sectorOptions = t.sectors;
    const enSectors = T.en.sectors;
    const enCities = T.en.cs.cities;
    const cities = t.cs.cities;
    const monthlyIncome = isInd ? (Number(form.salary) || 0) + (Number(form.otherIncome) || 0) : (Number(form.annualRev) || 0) / 12;
    const estMonthlyPayment = Number(form.tenor) > 0 ? (Number(form.finAmount) || 0) / Number(form.tenor) : 0;
    const totalMonthlyDebt = (Number(form.existingDebt) || 0) + estMonthlyPayment;
    const ratio = monthlyIncome > 0 ? totalMonthlyDebt / monthlyIncome : 0;
    const maxFin = isInd ? 5000000 : 15000000;
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
      if (isInd) { msg += `Employment Status: ${form.empStatus}\nEmployer: ${form.employer}\nMonthly Salary: SAR ${Number(form.salary).toLocaleString()}\nYears at Current Job: ${form.yearsJob}\nOther Monthly Income: SAR ${Number(form.otherIncome || 0).toLocaleString()}\n`; }
      else { msg += `Business Sector: ${sectorEn}\nYears in Business: ${form.yearsInBiz}\nAnnual Revenue: SAR ${Number(form.annualRev).toLocaleString()}\nEmployees: ${form.numEmployees}\nSaudization: ${form.saudization}%\n`; }
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
          {steps.map((s, i) => (<React.Fragment key={i}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}><div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? "#27500A" : step === i + 1 ? "#BE1E2D" : "#ddd", color: "#fff", fontSize: 12, fontWeight: 700 }}>{step > i + 1 ? "✓" : i + 1}</div><div style={{ fontSize: 9, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888", textAlign: "center" }}>{s}</div></div>{i < 4 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#27500A" : "#ddd", margin: "0 2px", marginBottom: 18 }} />}</React.Fragment>))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 24, maxWidth: 580, margin: "0 auto" }}>
          {step === 1 && (<>
            <div style={fld}><label style={lbl}>{t.cs.applicantType}</label><div style={{ display: "flex", gap: 8 }}>{["individual", "sme"].map((tp) => (<button key={tp} onClick={() => up("applicantType", tp)} style={{ flex: 1, padding: "8px 0", border: form.applicantType === tp ? "none" : "0.5px solid #d0d0d0", background: form.applicantType === tp ? "#BE1E2D" : "#fff", color: form.applicantType === tp ? "#fff" : "#1a1a1a", fontSize: 13, fontWeight: 600 }}>{tp === "individual" ? t.cs.individual : t.cs.sme}</button>))}</div></div>
            <div style={fld}><label style={lbl}>{t.cs.fullName}</label><input value={form.fullName} onChange={(e) => up("fullName", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>{t.cs.nationalId}</label><input value={form.nationalId} onChange={(e) => up("nationalId", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}><label style={lbl}>{t.cs.nationality}</label><select value={form.nationality} onChange={(e) => up("nationality", e.target.value)}><option value="saudi">{t.cs.saudi}</option><option value="non-saudi">{t.cs.nonSaudi}</option></select></div>
              <div style={fld}><label style={lbl}>{t.cs.city}</label><select value={form.city} onChange={(e) => up("city", e.target.value)}><option value="">{t.cs.selectCity}</option>{cities.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></div>
            </div>
          </>)}
          {step === 2 && (<>{isInd ? (<><div style={fld}><label style={lbl}>{t.cs.empStatus}</label><select value={form.empStatus} onChange={(e) => up("empStatus", e.target.value)}>{[["government", t.cs.government], ["private", t.cs.privateSector], ["self", t.cs.selfEmployed], ["retired", t.cs.retired], ["unemployed", t.cs.unemployed]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div><div style={fld}><label style={lbl}>{t.cs.employer}</label><input value={form.employer} onChange={(e) => up("employer", e.target.value)} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.salary}</label><input type="number" value={form.salary} onChange={(e) => up("salary", e.target.value)} /></div><div style={fld}><label style={lbl}>{t.cs.yearsJob}</label><input type="number" value={form.yearsJob} onChange={(e) => up("yearsJob", e.target.value)} /></div></div><div style={fld}><label style={lbl}>{t.cs.otherIncome}</label><input type="number" value={form.otherIncome} onChange={(e) => up("otherIncome", e.target.value)} /></div></>) : (<><div style={fld}><label style={lbl}>{t.cs.sector}</label><select value={form.sector} onChange={(e) => up("sector", e.target.value)}><option value="">{t.cs.selectSector}</option>{sectorOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.yearsInBiz}</label><input type="number" value={form.yearsInBiz} onChange={(e) => up("yearsInBiz", e.target.value)} /></div><div style={fld}><label style={lbl}>{t.cs.annualRev}</label><input type="number" value={form.annualRev} onChange={(e) => up("annualRev", e.target.value)} /></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.numEmployees}</label><input type="number" value={form.numEmployees} onChange={(e) => up("numEmployees", e.target.value)} /></div><div style={fld}><label style={lbl}>{t.cs.saudization}</label><input type="number" value={form.saudization} onChange={(e) => up("saudization", e.target.value)} min="0" max="100" /></div></div></>)}</>)}
          {step === 3 && (<><div style={fld}><label style={lbl}>{t.cs.finAmount}</label><input type="number" value={form.finAmount} onChange={(e) => up("finAmount", e.target.value)} /></div><div style={fld}><label style={lbl}>{t.cs.finPurpose}</label><input value={form.finPurpose} onChange={(e) => up("finPurpose", e.target.value)} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.finType}</label><select value={form.finType} onChange={(e) => up("finType", e.target.value)}>{[["murabaha", t.cs.murabaha], ["ijarah", t.cs.ijarah], ["tawarruq", t.cs.tawarruq], ["ai", t.cs.aiDecide]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div><div style={fld}><label style={lbl}>{t.cs.tenor}</label><select value={form.tenor} onChange={(e) => up("tenor", e.target.value)}>{["12","24","36","48","60"].map((m) => <option key={m} value={m}>{m} {t.cs.months}</option>)}</select></div></div><div style={fld}><label style={lbl}>{t.cs.existingDebt}</label><input type="number" value={form.existingDebt} onChange={(e) => up("existingDebt", e.target.value)} /></div>{monthlyIncome > 0 && <div style={{ padding: 12, borderRadius: 6, background: ratio > 0.65 ? "#fcebeb" : "#eaf3de", marginTop: 8 }}><div style={{ fontSize: 12, fontWeight: 600, color: ratio > 0.65 ? "#501313" : "#27500A" }}>{t.cs.chkRatio}: {(ratio * 100).toFixed(1)}%</div></div>}</>)}
          {step === 4 && (<><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.simahScore}</label><select value={form.simahScore} onChange={(e) => up("simahScore", e.target.value)}>{[["excellent", t.cs.simahExcellent], ["good", t.cs.simahGood], ["fair", t.cs.simahFair], ["poor", t.cs.simahPoor], ["na", t.cs.simahNA]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div><div style={fld}><label style={lbl}>{t.cs.simahRemarks}</label><select value={form.simahRemarks} onChange={(e) => up("simahRemarks", e.target.value)}>{[["clean", t.cs.clean], ["minor", t.cs.minorIssues], ["major", t.cs.majorIssues], ["defaulted", t.cs.defaulted]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={fld}><label style={lbl}>{t.cs.zatca}</label><select value={form.zatca} onChange={(e) => up("zatca", e.target.value)}>{[["compliant", t.cs.compliant], ["non-compliant", t.cs.nonCompliant], ["na", t.cs.na]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div><div style={fld}><label style={lbl}>{t.cs.crStatus}</label><select value={form.crStatus} onChange={(e) => up("crStatus", e.target.value)}>{[["valid", t.cs.valid], ["expired", t.cs.expired], ["na", t.cs.na]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{isInd && <div style={fld}><label style={lbl}>{t.cs.absher}</label><select value={form.absher} onChange={(e) => up("absher", e.target.value)}>{[["verified", t.cs.verified], ["not-verified", t.cs.notVerified]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>}<div style={fld}><label style={lbl}>{t.cs.existingCustomer}</label><select value={form.existingCustomer} onChange={(e) => up("existingCustomer", e.target.value)}>{[["yes", t.cs.yes], ["no", t.cs.no]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div></div><div style={fld}><label style={lbl}>{t.cs.prevDefaults}</label><select value={form.prevDefaults} onChange={(e) => up("prevDefaults", e.target.value)}>{[["no", t.cs.noDefaults], ["minor", t.cs.minorDefaults], ["major", t.cs.majorDefaults]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div></>)}
          {step === 5 && (<>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{t.cs.reviewSummary}</div>
            {[[t.cs.applicantType, isInd ? t.cs.individual : t.cs.sme],[t.cs.fullName, form.fullName],[t.cs.nationalId, form.nationalId],[t.cs.nationality, form.nationality === "saudi" ? t.cs.saudi : t.cs.nonSaudi],[t.cs.city, form.city],...(isInd ? [[t.cs.empStatus, form.empStatus],[t.cs.salary, `SAR ${Number(form.salary).toLocaleString()}`],[t.cs.yearsJob, form.yearsJob]] : [[t.cs.sector, form.sector],[t.cs.annualRev, `SAR ${Number(form.annualRev).toLocaleString()}`],[t.cs.saudization, `${form.saudization}%`]]),[t.cs.finAmount, `SAR ${Number(form.finAmount).toLocaleString()}`],[t.cs.tenor, `${form.tenor} ${t.cs.months}`],[t.cs.simahScore, form.simahScore],[t.cs.prevDefaults, form.prevDefaults]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{ color: "#888" }}>{k}</span><span style={{ fontWeight: 600 }}>{v || "—"}</span></div>)}
            <div style={{ marginTop: 16, padding: 14, background: "#f9f9fb", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{t.cs.samaChecks}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{samaChecks.map((c, i) => <div key={i} style={{ padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center", background: c.pass ? "#eaf3de" : "#fcebeb", color: c.pass ? "#27500A" : "#501313" }}>{c.pass ? "✓" : "✗"} {c.label}</div>)}</div>
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
    const bars = [{ label: t.cs.incomeAdequacy, value: bd.incomeAdequacy || 0, max: 25 }, { label: t.cs.creditHistory, value: bd.creditHistory || 0, max: 25 }, { label: t.cs.empStability, value: bd.employmentStability || 0, max: 20 }, { label: t.cs.dtiRatio, value: bd.debtToIncome || 0, max: 15 }, { label: t.cs.complianceScore, value: bd.complianceScore || 0, max: 15 }];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div><h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.cs.reportTitle}</h2><div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.formData?.fullName} — <span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{r.formData?.applicantType === "individual" ? t.cs.individual : t.cs.sme}</span></div></div>
          <div style={{ display: "flex", gap: 8 }}><button onClick={handleSave} disabled={saved} style={{ background: saved ? "#27500A" : "#BE1E2D", color: "#fff", border: "none", padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>{saved ? t.cs.saved : t.cs.save}</button><button onClick={() => setScreen("csWizard")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 16px", fontSize: 12 }}>{t.cs.newApp}</button></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.creditScore}</div><div style={{ fontSize: 40, fontWeight: 700, color: sc.text }}>{r.creditScore}</div><div style={{ fontSize: 11, color: sc.text, marginTop: 2 }}>{r.scoreLabel}</div></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.eligibilityLabel}</div><div style={{ fontSize: 20, fontWeight: 700, color: eligColor(r.eligibility) }}>{r.eligibility}</div></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.confidence}</div><div style={{ fontSize: 16, fontWeight: 700 }}>{r.confidenceLevel || "—"}</div></div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.cs.recStructure}</div><div style={{ fontSize: 16, fontWeight: 700, color: "#BE1E2D" }}>{r.recommendedStructure || "—"}</div></div>
        </div>
        {(r.eligibility || "").toLowerCase() !== "rejected" && (r.eligibility || "").toLowerCase() !== "مرفوض" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
            {[[t.cs.recAmount, r.recommendedAmount ? `SAR ${Number(r.recommendedAmount).toLocaleString()}` : "—"], [t.cs.recTenor, r.recommendedTenor || "—"], [t.cs.estPayment, r.recommendedAmount && r.recommendedTenor ? `SAR ${Math.round(Number(r.recommendedAmount) / parseInt(r.recommendedTenor)).toLocaleString()}` : "—"], [t.cs.profitRate, r.estimatedProfitRate || "—"]].map(([lbl, val], i) => (
              <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}><div style={{ fontSize: 11, color: "#888" }}>{lbl}</div><div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{val}</div></div>
            ))}
          </div>
        )}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.summary}</div><div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{r.summary}</div></div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.cs.scoreBreakdown}</div>{bars.map((b, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span>{b.label}</span><span style={{ fontWeight: 600 }}>{b.value}/{b.max}</span></div><div style={{ height: 8, background: "#f0f0f4", borderRadius: 4 }}><div style={{ height: 8, borderRadius: 4, background: b.value / b.max >= 0.7 ? "#27500A" : b.value / b.max >= 0.4 ? "#c89000" : "#BE1E2D", width: `${(b.value / b.max) * 100}%`, transition: "width 0.3s" }} /></div></div>))}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.cs.positiveFactors}</div>{(r.positiveFactors || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#27500A" }}>✓ {s}</div>)}</div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.cs.riskFlags}</div>{(r.riskFlags || []).map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>! {s}</div>)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#eaf3de", border: "0.5px solid #d5e8c0", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.cs.shariaNote}</div><div style={{ fontSize: 12, lineHeight: 1.5, color: "#27500A" }}>{r.shariaNote}</div>{r.structureReason && <div style={{ fontSize: 11, marginTop: 6, color: "#3d7a0a", fontStyle: "italic" }}>{r.structureReason}</div>}</div>
          <div style={{ background: "#f9f9fb", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#633806" }}>{t.cs.samaFlags}</div>{(r.samaFlags || []).map((f, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#633806" }}>⚑ {f}</div>)}</div>
        </div>
        {r.conditions && r.conditions.length > 0 && <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.cs.conditions}</div>{r.conditions.map((c, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#444" }}>{i + 1}. {c}</div>)}</div>}
        {r.rejectionReasons && r.rejectionReasons.length > 0 && <div style={{ background: "#fcebeb", border: "0.5px solid #f0c0c0", borderRadius: 8, padding: 16, marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.cs.rejectionReasons}</div>{r.rejectionReasons.map((c, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>{i + 1}. {c}</div>)}</div>}
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
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input placeholder={t.cs.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 240 }} />
          <select value={filterElig} onChange={(e) => setFilterElig(e.target.value)} style={{ maxWidth: 150 }}><option value="all">{t.cs.filterAll}</option><option value="approved">{t.cs.filterApproved}</option><option value="conditional">{t.cs.filterConditional}</option><option value="rejected">{t.cs.filterRejected}</option></select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ maxWidth: 150 }}><option value="all">{t.cs.filterAllType}</option><option value="individual">{t.cs.filterIndividual}</option><option value="sme">{t.cs.filterSME}</option></select>
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
     SHARIA AUDIT — DASHBOARD
     ═══════════════════════════════════════════════════════════════ */
  const SaDashboard = () => {
    const apps = saApps;
    const total = apps.length;
    const avgScore = total ? Math.round(apps.reduce((s, a) => s + (a.complianceScore || 0), 0) / total) : 0;
    const fullCount = apps.filter((a) => (a.complianceScore || 0) >= 85).length;
    const totalViolations = apps.reduce((s, a) => s + ((a.violations || []).length), 0);
    const minorCount = apps.filter((a) => (a.complianceScore || 0) >= 60 && (a.complianceScore || 0) < 85).length;
    const majorCount = apps.filter((a) => (a.complianceScore || 0) < 60).length;
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.sa.dashTitle}</h2>
          <button onClick={() => setScreen("saNewAudit")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.sa.newAuditBtn}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[{ label: t.sa.totalAudits, value: total }, { label: t.sa.avgScore, value: avgScore, color: saScoreColor(avgScore) }, { label: t.sa.fullyCompliant, value: fullCount }, { label: t.sa.violationsFound, value: totalViolations, color: totalViolations > 0 ? { bg: "#fcebeb", text: "#501313" } : { bg: "#eaf3de", text: "#27500A" } }].map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color ? c.color.text : "#1a1a1a", background: c.color ? c.color.bg : "transparent", display: "inline-block", padding: c.color ? "2px 8px" : 0, borderRadius: 4 }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.sa.compOverview}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[{ label: t.sa.catFull, count: fullCount, color: saScoreColor(90) }, { label: t.sa.catMinor, count: minorCount, color: saScoreColor(70) }, { label: t.sa.catMajor, count: majorCount, color: saScoreColor(30) }].map((r, i) => (
              <div key={i} style={{ background: r.color.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: r.color.text }}>{r.count}</div>
                <div style={{ fontSize: 10, color: r.color.text, marginTop: 2 }}>{r.label}</div>
                <div style={{ marginTop: 6, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}><div style={{ height: 4, borderRadius: 2, background: r.color.text, width: total ? `${(r.count / total) * 100}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.sa.recentAudits}</div>
          {apps.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.sa.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.sa.date, t.sa.name, t.sa.type, t.sa.score, t.sa.status, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{apps.slice(0, 10).map((a) => { const sc = saScoreColor(a.complianceScore || 0); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.auditName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{a.formData?.contractTypeShort || "—"}</span></td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.complianceScore}</span></td>
                  <td style={{ padding: "8px 6px", color: sc.text, fontWeight: 600, fontSize: 12 }}>{a.complianceStatus || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("saResult"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.sa.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };


  /* ═══════════════════════════════════════════════════════════════
     SHARIA AUDIT — 3-STEP WIZARD
     ═══════════════════════════════════════════════════════════════ */
  const SaWizard = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ auditName: "", contractType: "", contractTypeShort: "", standards: [true, true, false, true], finAmount: "", financier: "", customer: "", contractLang: "arabic" });
    const [inputTab, setInputTab] = useState("paste");
    const [pasteText, setPasteText] = useState("");
    const [clauses, setClauses] = useState([{ text: "", type: "Profit Rate" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
    const typeOptions = t.sa.types;
    const typeShort = t.sa.typesShort;
    const enTypes = T.en.sa.types;
    const stdLabels = t.sa.stdLabels;
    const enStdLabels = T.en.sa.stdLabels;
    const clauseTypeOptions = t.sa.clauseTypes;
    const enClauseTypes = T.en.sa.clauseTypes;

    const toggleStd = (idx) => { const ns = [...form.standards]; ns[idx] = !ns[idx]; up("standards", ns); };
    const addClause = () => { if (clauses.length < 10) setClauses([...clauses, { text: "", type: "Other" }]); };
    const removeClause = (idx) => setClauses(clauses.filter((_, i) => i !== idx));
    const updateClause = (idx, field, val) => { const nc = [...clauses]; nc[idx] = { ...nc[idx], [field]: val }; setClauses(nc); };

    const submit = async () => {
      setLoading(true); setError("");
      const contractTypeEn = enTypes[typeOptions.indexOf(form.contractType)] || form.contractType;
      const selectedStds = enStdLabels.filter((_, i) => form.standards[i]).join(", ");
      let contractContent = "";
      if (inputTab === "paste") {
        contractContent = `CONTRACT TEXT:\n${pasteText}`;
      } else {
        contractContent = "KEY CLAUSES:\n" + clauses.filter(c => c.text.trim()).map((c, i) => {
          const typeEn = enClauseTypes[clauseTypeOptions.indexOf(c.type)] || c.type;
          return `Clause ${i + 1} (${typeEn}): ${c.text}`;
        }).join("\n");
      }
      const msg = `Contract Type: ${contractTypeEn}\nApplicable Standards: ${selectedStds}\nFinancing Amount: SAR ${Number(form.finAmount || 0).toLocaleString()}\nContract Language: ${form.contractLang}\n\n${contractContent}\n\nPlease perform a complete Sharia compliance audit.`;
      try {
        const res = await fetch("/api/sharia-audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userMessage: msg, lang }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        const result = data.result;
        const appEntry = { id: Date.now().toString(), date: new Date().toISOString(), complianceScore: result.complianceScore, complianceStatus: result.complianceStatus, formData: { ...form, contractTypeShort: typeShort[typeOptions.indexOf(form.contractType)] || form.contractType }, ...result };
        setViewResult(appEntry); setViewForm(form); setScreen("saResult");
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    };

    const steps = [t.sa.step1, t.sa.step2, t.sa.step3];
    const fld = { marginBottom: 14 };
    const lbl = { display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 };

    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 }}>
          {steps.map((s, i) => (<React.Fragment key={i}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}><div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? "#27500A" : step === i + 1 ? "#BE1E2D" : "#ddd", color: "#fff", fontSize: 12, fontWeight: 700 }}>{step > i + 1 ? "✓" : i + 1}</div><div style={{ fontSize: 9, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888", textAlign: "center" }}>{s}</div></div>{i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#27500A" : "#ddd", margin: "0 4px", marginBottom: 18 }} />}</React.Fragment>))}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 24, maxWidth: 620, margin: "0 auto" }}>
          {/* Step 1 — Contract Details */}
          {step === 1 && (<>
            <div style={fld}><label style={lbl}>{t.sa.auditName}</label><input value={form.auditName} onChange={(e) => up("auditName", e.target.value)} placeholder="e.g. Murabaha Vehicle Finance Agreement #2024-001" /></div>
            <div style={fld}><label style={lbl}>{t.sa.contractType}</label><select value={form.contractType} onChange={(e) => up("contractType", e.target.value)}><option value="">{t.sa.selectType}</option>{typeOptions.map((tp, i) => <option key={i} value={tp}>{tp}</option>)}</select></div>
            <div style={fld}>
              <label style={lbl}>{t.sa.standards}</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {stdLabels.map((s, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer", padding: "6px 8px", background: form.standards[i] ? "#eaf3de" : "#f9f9fb", borderRadius: 6, border: `0.5px solid ${form.standards[i] ? "#97C459" : "#e8e8e8"}` }}>
                    <input type="checkbox" checked={form.standards[i]} onChange={() => toggleStd(i)} style={{ accentColor: "#27500A" }} />{s}
                  </label>
                ))}
              </div>
            </div>
            <div style={fld}><label style={lbl}>{t.sa.finAmount}</label><input type="number" value={form.finAmount} onChange={(e) => up("finAmount", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={fld}><label style={lbl}>{t.sa.financier}</label><input value={form.financier} onChange={(e) => up("financier", e.target.value)} /></div>
              <div style={fld}><label style={lbl}>{t.sa.customer}</label><input value={form.customer} onChange={(e) => up("customer", e.target.value)} /></div>
            </div>
            <div style={fld}>
              <label style={lbl}>{t.sa.contractLang}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["arabic", t.sa.arabic], ["english", t.sa.english], ["bilingual", t.sa.bilingual]].map(([v, l]) => (
                  <button key={v} onClick={() => up("contractLang", v)} style={{ flex: 1, padding: "7px 0", border: form.contractLang === v ? "none" : "0.5px solid #d0d0d0", background: form.contractLang === v ? "#BE1E2D" : "#fff", color: form.contractLang === v ? "#fff" : "#1a1a1a", fontSize: 12, fontWeight: 600 }}>{l}</button>
                ))}
              </div>
            </div>
          </>)}
          {/* Step 2 — Contract Input */}
          {step === 2 && (<>
            <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
              {[["paste", t.sa.tabPaste], ["clauses", t.sa.tabClauses]].map(([v, l]) => (
                <button key={v} onClick={() => setInputTab(v)} style={{ flex: 1, padding: "8px 0", fontSize: 13, fontWeight: 600, border: "none", borderBottom: inputTab === v ? "2px solid #BE1E2D" : "2px solid #e8e8e8", background: "transparent", color: inputTab === v ? "#BE1E2D" : "#888" }}>{l}</button>
              ))}
            </div>
            {inputTab === "paste" ? (
              <div>
                <textarea value={pasteText} onChange={(e) => setPasteText(e.target.value)} placeholder={t.sa.pastePlaceholder} style={{ minHeight: 300, width: "100%", resize: "vertical" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#888" }}>{pasteText.length} {t.sa.charCount}</span>
                  <button onClick={() => setPasteText("")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 12px", fontSize: 11 }}>{t.sa.clear}</button>
                </div>
              </div>
            ) : (
              <div>
                {clauses.map((c, i) => (
                  <div key={i} style={{ background: "#f9f9fb", borderRadius: 8, padding: 12, marginBottom: 10, border: "0.5px solid #e8e8e8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{t.sa.clauseLabel} {i + 1}</span>
                      {clauses.length > 1 && <button onClick={() => removeClause(i)} style={{ background: "none", border: "none", color: "#BE1E2D", fontSize: 16, cursor: "pointer", padding: 0 }}>×</button>}
                    </div>
                    <select value={c.type} onChange={(e) => updateClause(i, "type", e.target.value)} style={{ marginBottom: 8, fontSize: 12 }}>
                      {clauseTypeOptions.map((ct, ci) => <option key={ci} value={ct}>{ct}</option>)}
                    </select>
                    <textarea value={c.text} onChange={(e) => updateClause(i, "text", e.target.value)} placeholder={`${t.sa.clauseLabel} ${i + 1}...`} style={{ minHeight: 60, width: "100%", resize: "vertical" }} />
                  </div>
                ))}
                {clauses.length < 10 ? <button onClick={addClause} style={{ background: "none", border: "0.5px solid #BE1E2D", color: "#BE1E2D", padding: "6px 14px", fontSize: 12, fontWeight: 600, width: "100%" }}>{t.sa.addClause}</button> : <div style={{ fontSize: 11, color: "#888", textAlign: "center" }}>{t.sa.maxClauses}</div>}
              </div>
            )}
            <div style={{ marginTop: 16, padding: 14, background: "#e8f0fe", borderRadius: 8, border: "0.5px solid #7baaf7" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3c8f", marginBottom: 8 }}>{t.sa.guidanceTitle}</div>
              {t.sa.guidanceItems.map((item, i) => <div key={i} style={{ fontSize: 11, color: "#1a3c8f", padding: "2px 0" }}>• {item}</div>)}
            </div>
          </>)}
          {/* Step 3 — Review & Submit */}
          {step === 3 && (<>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{t.sa.reviewTitle}</div>
            {[[t.sa.auditName, form.auditName], [t.sa.contractType, form.contractType], [t.sa.standards, stdLabels.filter((_, i) => form.standards[i]).join(", ")], [t.sa.finAmount, form.finAmount ? `SAR ${Number(form.finAmount).toLocaleString()}` : "—"], [t.sa.contractLang, form.contractLang], [inputTab === "paste" ? t.sa.textLength : t.sa.clauseCount, inputTab === "paste" ? `${pasteText.length} ${t.sa.charCount}` : `${clauses.filter(c => c.text.trim()).length}`]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{ color: "#888" }}>{k}</span><span style={{ fontWeight: 600 }}>{v || "—"}</span></div>)}
            {error && <div style={{ marginTop: 12, padding: 10, background: "#fcebeb", color: "#501313", borderRadius: 6, fontSize: 12 }}>{error}</div>}
          </>)}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 18px", fontSize: 13 }}>{t.sa.prev}</button> : <div />}
            {step < 3 ? <button onClick={() => setStep(step + 1)} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>{t.sa.next}</button> : <button onClick={submit} disabled={loading} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 22px", fontSize: 13, fontWeight: 600 }}>{loading ? t.sa.analyzing : t.sa.runAudit}</button>}
          </div>
        </div>
      </div>
    );
  };


  /* ═══════════════════════════════════════════════════════════════
     SHARIA AUDIT — RESULT
     ═══════════════════════════════════════════════════════════════ */
  const SaResult = () => {
    const r = viewResult;
    if (!r) return <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No result loaded</div>;
    const sc = saScoreColor(r.complianceScore || 0);
    const save = () => { const next = [{ ...r, formData: viewForm }, ...saApps]; setSaApps(next); localStorage.setItem("sharia_audit_apps_v1", JSON.stringify(next)); setScreen("saHistory"); };
    const dims = r.dimensions || [];
    const violations = r.violations || [];
    const recommendations = r.recommendations || [];
    const fatwas = r.fatwas || [];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.sa.resultTitle}</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "7px 16px", fontSize: 12, fontWeight: 600 }}>{t.sa.saveAudit}</button>
            <button onClick={() => setScreen("saNewAudit")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "7px 16px", fontSize: 12 }}>{t.sa.newAuditBtn}</button>
          </div>
        </div>
        {/* Score Card */}
        <div style={{ background: sc.bg, borderRadius: 10, padding: 24, textAlign: "center", marginBottom: 20, border: `1px solid ${sc.text}22` }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: sc.text }}>{r.complianceScore}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: sc.text, marginTop: 4 }}>{r.complianceStatus}</div>
          <div style={{ fontSize: 12, color: sc.text, opacity: 0.7, marginTop: 4 }}>{t.sa.outOf100}</div>
        </div>
        {/* Dimension Breakdown */}
        {dims.length > 0 && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.sa.dimBreakdown}</div>
            {dims.map((d, i) => { const dsc = saScoreColor(d.score || 0); return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span>{d.name}</span><span style={{ fontWeight: 600, color: dsc.text }}>{d.score}/100</span>
                </div>
                <div style={{ height: 8, background: "#f0f0f4", borderRadius: 4 }}><div style={{ height: 8, borderRadius: 4, background: dsc.text, width: `${d.score}%` }} /></div>
                {d.note && <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{d.note}</div>}
              </div>
            ); })}
          </div>
        )}
        {/* Violations */}
        {violations.length > 0 && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#BE1E2D" }}>{t.sa.violationsTitle} ({violations.length})</div>
            {violations.map((v, i) => (
              <div key={i} style={{ padding: 12, background: v.severity === "Major" || v.severity === "جسيمة" ? "#fcebeb" : "#fff8e6", borderRadius: 8, marginBottom: 8, border: `0.5px solid ${v.severity === "Major" || v.severity === "جسيمة" ? "#f5c6cb" : "#ffeaa7"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v.title}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600, background: v.severity === "Major" || v.severity === "جسيمة" ? "#BE1E2D" : "#f39c12", color: "#fff" }}>{v.severity}</span>
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>{v.description}</div>
                {v.reference && <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>{t.sa.refLabel}: {v.reference}</div>}
                {v.remedy && <div style={{ fontSize: 11, color: "#27500A", marginTop: 4, fontWeight: 600 }}>{t.sa.remedyLabel}: {v.remedy}</div>}
              </div>
            ))}
          </div>
        )}
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.sa.recsTitle}</div>
            {recommendations.map((rec, i) => (
              <div key={i} style={{ padding: 10, background: "#f9f9fb", borderRadius: 6, marginBottom: 6, fontSize: 12 }}>
                <span style={{ fontWeight: 600 }}>{i + 1}.</span> {rec}
              </div>
            ))}
          </div>
        )}
        {/* Fatwa References */}
        {fatwas.length > 0 && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.sa.fatwaTitle}</div>
            {fatwas.map((f, i) => (
              <div key={i} style={{ padding: 10, background: "#f0f7ff", borderRadius: 6, marginBottom: 6, border: "0.5px solid #c8dff7" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3c8f" }}>{f.source}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{f.text}</div>
              </div>
            ))}
          </div>
        )}
        {/* Summary */}
        {r.summary && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.sa.summaryTitle}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{r.summary}</div>
          </div>
        )}
      </div>
    );
  };


  /* ═══════════════════════════════════════════════════════════════
     SHARIA AUDIT — HISTORY
     ═══════════════════════════════════════════════════════════════ */
  const SaHistory = () => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const filtered = saApps.filter((a) => {
      const matchSearch = !search || (a.formData?.auditName || "").toLowerCase().includes(search.toLowerCase());
      if (filterStatus === "all") return matchSearch;
      const score = a.complianceScore || 0;
      if (filterStatus === "compliant") return matchSearch && score >= 85;
      if (filterStatus === "minor") return matchSearch && score >= 60 && score < 85;
      if (filterStatus === "major") return matchSearch && score < 60;
      return matchSearch;
    });
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.sa.histTitle}</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input placeholder={t.sa.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 240 }} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ maxWidth: 180 }}>
            <option value="all">{t.sa.filterAll}</option>
            <option value="compliant">{t.sa.filterCompliant}</option>
            <option value="minor">{t.sa.filterMinor}</option>
            <option value="major">{t.sa.filterMajor}</option>
          </select>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          {filtered.length === 0 ? <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.sa.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: "1px solid #eee" }}>{[t.sa.date, t.sa.name, t.sa.type, t.sa.score, t.sa.status, t.sa.violations, ""].map((h, i) => <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>)}</tr></thead>
              <tbody>{filtered.map((a) => { const sc = saScoreColor(a.complianceScore || 0); return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px 6px" }}>{a.formData?.auditName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: "#f0f0f4", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{a.formData?.contractTypeShort || "—"}</span></td>
                  <td style={{ padding: "8px 6px" }}><span style={{ background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.complianceScore}</span></td>
                  <td style={{ padding: "8px 6px", color: sc.text, fontWeight: 600, fontSize: 12 }}>{a.complianceStatus || "—"}</td>
                  <td style={{ padding: "8px 6px" }}><span style={{ color: (a.violations || []).length > 0 ? "#BE1E2D" : "#27500A", fontWeight: 600 }}>{(a.violations || []).length}</span></td>
                  <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("saResult"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>{t.sa.view}</button></td>
                </tr>); })}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  };


  /* ═══════════════════════════════════════════════════════════════
     SHARIA AUDIT — STANDARDS LIBRARY
     ═══════════════════════════════════════════════════════════════ */
  const SaStandards = () => {
    const standards = t.sa.standardsLib;
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.sa.stdLibTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {standards.map((std, i) => (
            <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{std.name}</div>
                <span style={{ fontSize: 10, background: "#f0f0f4", padding: "2px 8px", borderRadius: 4 }}>{std.code}</span>
              </div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 8 }}>{std.desc}</div>
              <div style={{ fontSize: 10, color: "#888" }}>{std.scope}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  /* ═══════════════════════════════════════════════════════════════
     SETTINGS
     ═══════════════════════════════════════════════════════════════ */
  const Settings = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.settings.title}</h2>
      <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 20, maxWidth: 480 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{t.settings.langLabel}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setLang("en")} style={{ flex: 1, padding: "8px 0", border: lang === "en" ? "none" : "0.5px solid #d0d0d0", background: lang === "en" ? "#BE1E2D" : "#fff", color: lang === "en" ? "#fff" : "#1a1a1a", fontWeight: 600, fontSize: 13 }}>English</button>
            <button onClick={() => setLang("ar")} style={{ flex: 1, padding: "8px 0", border: lang === "ar" ? "none" : "0.5px solid #d0d0d0", background: lang === "ar" ? "#BE1E2D" : "#fff", color: lang === "ar" ? "#fff" : "#1a1a1a", fontWeight: 600, fontSize: 13 }}>العربية</button>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.settings.about}</div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{t.settings.aboutText}</div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     SIDEBAR
     ═══════════════════════════════════════════════════════════════ */
  const Sidebar = () => {
    const navItem = (label, icon, target) => {
      const active = screen === target;
      return (
        <div key={target} onClick={() => setScreen(target)} style={{
          padding: "9px 14px", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
          background: active ? "rgba(190,30,45,0.15)" : "transparent",
          color: active ? "#BE1E2D" : "#444", fontWeight: active ? 600 : 400, borderRadius: 6, margin: "1px 6px"
        }}>{icon} {label}</div>
      );
    };
    const section = (title) => <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", padding: "12px 14px 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>;
    return (
      <div style={{ width: 230, minHeight: "100vh", background: "#fafafa", borderRight: isRtl ? "none" : "0.5px solid #e8e8e8", borderLeft: isRtl ? "0.5px solid #e8e8e8" : "none", paddingTop: 16, flexShrink: 0 }}>
        <div style={{ padding: "0 14px 16px", fontSize: 15, fontWeight: 700, color: "#BE1E2D" }}>Alpha Pro</div>
        {section(t.sectionRisk)}
        {navItem(t.nav.dashboard, "📊", "dashboard")}
        {navItem(t.nav.newAnalysis, "➕", "wizard")}
        {navItem(t.nav.applications, "📋", "applications")}
        {section(t.sectionCredit)}
        {navItem(t.nav.csDashboard, "💳", "csDashboard")}
        {navItem(t.nav.csNewApp, "📝", "csWizard")}
        {navItem(t.nav.csHistory, "📂", "csHistory")}
        {section(t.sectionSharia)}
        {navItem(t.nav.saDashboard, "🕌", "saDashboard")}
        {navItem(t.nav.saNewAudit, "📜", "saNewAudit")}
        {navItem(t.nav.saHistory, "📚", "saHistory")}
        {navItem(t.nav.saStandards, "⚖️", "saStandards")}
        {section(t.sectionCollections)}
        {navItem(t.nav.colDashboard, "📈", "colDashboard")}
        {navItem(t.nav.colEarlyWarning, "⚠️", "colEarlyWarning")}
        {navItem(t.nav.colCallList, "📞", "colCallList")}
        {navItem(t.nav.colAddAccount, "➕", "colAddAccount")}
        {navItem(t.nav.colReports, "📊", "colReports")}
        <div style={{ borderTop: "0.5px solid #e8e8e8", marginTop: 12 }} />
        {navItem(t.nav.settings, "⚙️", "settings")}
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     MAIN LAYOUT
     ═══════════════════════════════════════════════════════════════ */
  const renderScreen = () => {
    switch (screen) {
      case "dashboard": return <Dashboard />;
      case "wizard": return <Wizard />;
      case "result": return <Result />;
      case "applications": return <Applications />;
      case "csDashboard": return <CsDashboard />;
      case "csWizard": return <CsWizard />;
      case "csResult": return <CsResult />;
      case "csHistory": return <CsHistory />;
      case "saDashboard": return <SaDashboard />;
      case "saNewAudit": return <SaWizard />;
      case "saResult": return <SaResult />;
      case "saHistory": return <SaHistory />;
      case "saStandards": return <SaStandards />;
      case "colDashboard": case "colEarlyWarning": case "colResult": case "colCallList": case "colAddAccount": case "colReports":
        return <Collections lang={lang} screen={screen} setScreen={setScreen} />;
      case "settings": return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ fontFamily: "'Inter', sans-serif", display: "flex", minHeight: "100vh", background: "#f4f4f7", color: "#1a1a1a" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "24px 28px", maxWidth: 960, margin: "0 auto" }}>
        {renderScreen()}
      </div>
    </div>
  );
}

