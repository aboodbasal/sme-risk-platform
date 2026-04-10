import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   COLLECTIONS TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const CT = {
  en: {
    nav: { portfolio: "Portfolio Dashboard", earlyWarning: "Early Warning", callList: "Call List", addAccount: "Add Account", reports: "Reports" },
    section: "Collections & Early Warning",
    /* dashboard */
    dash: {
      title: "Portfolio Collections Dashboard",
      totalAccounts: "Total Accounts", totalOutstanding: "Total Outstanding (SAR)", accountsAtRisk: "Accounts at Risk",
      avgDpd: "Avg Days Past Due", recoveryRate: "Recovery Rate",
      healthBar: "Portfolio Health",
      current: "Current", watch: "Watch", atRisk: "At-Risk", critical: "Critical", default_: "Default",
      accounts: "accounts", ofPortfolio: "of portfolio",
      colId: "Account ID", colName: "Customer", colProduct: "Product", colOutstanding: "Outstanding (SAR)",
      colDpd: "DPD", colTier: "Risk Tier", colProb: "Default %", colAction: "Action",
      analyze: "Analyze", analyzeAll: "Run Early Warning Analysis",
      callsDue: "Calls Due Today", restructCandidates: "Restructuring Candidates",
      legalApproaching: "Approaching Legal", paymentsToday: "Payments Today (SAR)",
      sortBy: "Sort by", noAccounts: "No accounts in portfolio.",
    },
    /* early warning */
    ew: {
      title: "Early Warning Analysis",
      modeA: "Single Account", modeB: "Bulk Analysis",
      accountId: "Account ID", customerName: "Customer Name",
      customerType: "Customer Type", individual: "Individual", sme: "SME",
      productType: "Product Type",
      products: ["Murabaha", "Ijarah", "Tawarruq", "Musharaka"],
      originalAmount: "Original Financing Amount (SAR)", outstandingBal: "Outstanding Balance (SAR)",
      monthlyInstallment: "Monthly Installment (SAR)", dpd: "Days Past Due (DPD)",
      missedPayments: "Number of Missed Payments",
      paymentPattern: "Payment History Pattern",
      patterns: ["Always on time", "Occasional delays (1-5 days)", "Regular delays (6-15 days)", "Significant delays (16-30 days)", "Chronic delays (30+ days)", "Deteriorating (getting worse)", "Improving (getting better)"],
      employmentChange: "Employment/Business Status Change",
      empStatuses: ["No change", "Job loss / business closure", "Salary reduction", "Business revenue decline", "Positive change (promotion/growth)"],
      contactResp: "Contact Responsiveness",
      respLevels: ["Always responsive", "Sometimes responsive", "Rarely responsive", "Unresponsive", "Number changed / unreachable"],
      existingRestructure: "Existing Restructuring", legalAction: "Legal Action Initiated",
      collateralAvail: "Collateral Available", yes: "Yes", no: "No", partial: "Partial",
      collateralType: "Collateral Type",
      collTypes: ["Vehicle", "Real Estate", "Guarantor", "Deposit"],
      simahChange: "SIMAH Recent Change",
      simahOpts: ["No change", "Deteriorated", "Improved", "Unknown"],
      notes: "Notes (any relevant information)",
      analyzeBtn: "Analyze Account", analyzing: "Analyzing account...",
      bulkPlaceholder: "Paste CSV data: Account ID, Name, Outstanding, DPD, Missed Payments, Payment Pattern\nExample:\nTWK-001, Ahmed Ali, 500000, 45, 2, Deteriorating",
      analyzeAllBtn: "Analyze All Accounts", progress: "Analyzing",
      of: "of",
    },
    /* result */
    res: {
      title: "Account Analysis Report", save: "Save to Portfolio", newAnalysis: "New Analysis",
      defaultProb: "Default Probability", riskTier: "Risk Tier",
      daysToDefault: "Days to Potential Default",
      actions: "Recommended Actions — Priority Queue",
      priority: "Priority", actionType: "Action Type", description: "Description",
      timing: "Timing", expectedOutcome: "Expected Outcome",
      warningSignals: "Warning Signals", positiveSignals: "Positive Signals",
      restructuring: "Restructuring Assessment", recommended: "Recommended",
      options: "Options", samaNote: "Per SAMA guidelines, restructuring must maintain Sharia compliance.",
      collectionScript: "Collection Script (English)", collectionScriptAr: "Collection Script (Arabic)",
      opening: "Opening (First 30 seconds)", keyPoints: "Key Talking Points", objection: "Objection Response",
      samaCompliance: "SAMA Compliance Notes",
      escalation: "Escalation Recommendation",
      escalateManager: "Escalate to Manager", initiateLegal: "Initiate Legal",
      estimatedRecovery: "Estimated Recovery", nextReview: "Next Review",
      saved: "Saved!",
    },
    /* call list */
    cl: {
      title: "Today's Priority Call List",
      colPriority: "#", colName: "Customer", colOutstanding: "Outstanding (SAR)",
      colDpd: "DPD", colTier: "Risk Tier", colReason: "Reason", colStatus: "Status",
      statuses: ["Pending", "Called - Promise to Pay", "Called - Refused", "No Answer", "Restructuring Agreed", "Paid"],
      markCalled: "Mark Called", addNote: "Add Note", reschedule: "Reschedule", viewAnalysis: "View Analysis",
      totalPlanned: "Total Planned", completed: "Completed", promisesPay: "Promises to Pay (SAR)", resolved: "Resolved",
      exportBtn: "Export Call List", empty: "No accounts in call list. Run Early Warning Analysis first.",
    },
    /* add account */
    add: {
      title: "Add Account to Portfolio",
      accountId: "Account ID", customerName: "Customer Name", customerType: "Customer Type",
      productType: "Product Type", originalAmount: "Original Amount (SAR)",
      outstandingBal: "Outstanding Balance (SAR)", monthlyInstallment: "Monthly Installment (SAR)",
      startDate: "Start Date", maturityDate: "Maturity Date",
      dpd: "Current DPD", missedPayments: "Missed Payments",
      paymentPattern: "Payment Pattern", phone: "Contact Phone", notes: "Notes",
      saveBtn: "Save Account", saved: "Account saved!",
      individual: "Individual", sme: "SME",
      products: ["Murabaha", "Ijarah", "Tawarruq", "Musharaka"],
      patterns: ["Always on time", "Occasional delays (1-5 days)", "Regular delays (6-15 days)", "Significant delays (16-30 days)", "Chronic delays (30+ days)", "Deteriorating", "Improving"],
    },
    /* reports */
    rpt: {
      title: "Reports",
      tabAging: "Portfolio Aging", tabRisk: "AI Risk Summary", tabSama: "SAMA Collections Report",
      bucket: "Bucket", accounts: "Accounts", outstanding: "Outstanding SAR", pctPortfolio: "% of Portfolio",
      buckets: ["Current (0 DPD)", "1-30 DPD", "31-60 DPD", "61-90 DPD", "91-180 DPD", "180+ DPD"],
      riskSummary: "AI-generated portfolio risk summary",
      generateBtn: "Generate AI Summary", generating: "Generating...",
      top10: "Top 10 Highest-Risk Accounts",
      nplRatio: "NPL Ratio", restructuredCount: "Restructured Accounts",
      collectionsActivity: "Collections Activity Summary", legalActions: "Legal Actions Initiated",
      disclaimer: "For internal use. Formal SAMA reporting requires additional verification.",
    },
    tiers: { current: "Current", watch: "Watch", atRisk: "At-Risk", critical: "Critical", default_: "Default" },
    actionTypes: { Call: "Call", SMS: "SMS", Restructure: "Restructure", Escalate: "Escalate", Legal: "Legal", "Field Visit": "Field Visit" },
  },
  ar: {
    nav: { portfolio: "لوحة المحفظة", earlyWarning: "الإنذار المبكر", callList: "قائمة المكالمات", addAccount: "إضافة حساب", reports: "التقارير" },
    section: "التحصيل والإنذار المبكر",
    dash: {
      title: "لوحة تحصيل المحفظة",
      totalAccounts: "إجمالي الحسابات", totalOutstanding: "إجمالي المستحقات (ريال)", accountsAtRisk: "حسابات في خطر",
      avgDpd: "متوسط أيام التأخر", recoveryRate: "معدل الاسترداد",
      healthBar: "صحة المحفظة",
      current: "منتظم", watch: "مراقبة", atRisk: "في خطر", critical: "حرج", default_: "متعثر",
      accounts: "حسابات", ofPortfolio: "من المحفظة",
      colId: "رقم الحساب", colName: "العميل", colProduct: "المنتج", colOutstanding: "المستحق (ريال)",
      colDpd: "أيام التأخر", colTier: "مستوى المخاطر", colProb: "احتمالية التعثر %", colAction: "إجراء",
      analyze: "تحليل", analyzeAll: "تشغيل تحليل الإنذار المبكر",
      callsDue: "مكالمات اليوم", restructCandidates: "مرشحون لإعادة الهيكلة",
      legalApproaching: "اقتراب من الإجراء القانوني", paymentsToday: "مدفوعات اليوم (ريال)",
      sortBy: "ترتيب حسب", noAccounts: "لا توجد حسابات في المحفظة.",
    },
    ew: {
      title: "تحليل الإنذار المبكر",
      modeA: "حساب واحد", modeB: "تحليل جماعي",
      accountId: "رقم الحساب", customerName: "اسم العميل",
      customerType: "نوع العميل", individual: "فرد", sme: "منشأة",
      productType: "نوع المنتج",
      products: ["مرابحة", "إجارة", "تورق", "مشاركة"],
      originalAmount: "مبلغ التمويل الأصلي (ريال)", outstandingBal: "الرصيد المتبقي (ريال)",
      monthlyInstallment: "القسط الشهري (ريال)", dpd: "أيام التأخر",
      missedPayments: "عدد الأقساط المتأخرة",
      paymentPattern: "نمط السداد",
      patterns: ["دائماً في الموعد", "تأخر عرضي (1-5 أيام)", "تأخر منتظم (6-15 يوم)", "تأخر كبير (16-30 يوم)", "تأخر مزمن (30+ يوم)", "متدهور (يزداد سوءاً)", "متحسن (يتحسن)"],
      employmentChange: "تغيير الحالة الوظيفية/التجارية",
      empStatuses: ["لا تغيير", "فقدان العمل / إغلاق المنشأة", "تخفيض الراتب", "انخفاض إيرادات المنشأة", "تغيير إيجابي (ترقية/نمو)"],
      contactResp: "استجابة التواصل",
      respLevels: ["دائماً متجاوب", "أحياناً متجاوب", "نادراً متجاوب", "غير متجاوب", "الرقم تغير / لا يمكن الوصول"],
      existingRestructure: "إعادة هيكلة قائمة", legalAction: "إجراء قانوني مبدأ",
      collateralAvail: "ضمان متاح", yes: "نعم", no: "لا", partial: "جزئي",
      collateralType: "نوع الضمان",
      collTypes: ["مركبة", "عقار", "كفيل", "وديعة"],
      simahChange: "تغيير سمة الأخير",
      simahOpts: ["لا تغيير", "تدهور", "تحسن", "غير معروف"],
      notes: "ملاحظات (أي معلومات ذات صلة)",
      analyzeBtn: "تحليل الحساب", analyzing: "جاري تحليل الحساب...",
      bulkPlaceholder: "الصق بيانات CSV: رقم الحساب، الاسم، المستحق، أيام التأخر، الأقساط المتأخرة، نمط السداد",
      analyzeAllBtn: "تحليل جميع الحسابات", progress: "جاري التحليل",
      of: "من",
    },
    res: {
      title: "تقرير تحليل الحساب", save: "حفظ في المحفظة", newAnalysis: "تحليل جديد",
      defaultProb: "احتمالية التعثر", riskTier: "مستوى المخاطر",
      daysToDefault: "أيام حتى التعثر المحتمل",
      actions: "الإجراءات الموصى بها — حسب الأولوية",
      priority: "الأولوية", actionType: "نوع الإجراء", description: "الوصف",
      timing: "التوقيت", expectedOutcome: "النتيجة المتوقعة",
      warningSignals: "إشارات تحذيرية", positiveSignals: "إشارات إيجابية",
      restructuring: "تقييم إعادة الهيكلة", recommended: "موصى به",
      options: "الخيارات", samaNote: "وفقاً لإرشادات ساما، يجب أن تحافظ إعادة الهيكلة على الامتثال الشرعي.",
      collectionScript: "نص المكالمة (إنجليزي)", collectionScriptAr: "نص المكالمة (عربي)",
      opening: "الافتتاحية (أول 30 ثانية)", keyPoints: "نقاط الحوار الرئيسية", objection: "الرد على الاعتراضات",
      samaCompliance: "ملاحظات امتثال ساما",
      escalation: "توصية التصعيد",
      escalateManager: "تصعيد للمدير", initiateLegal: "بدء إجراء قانوني",
      estimatedRecovery: "الاسترداد المتوقع", nextReview: "المراجعة القادمة",
      saved: "تم الحفظ!",
    },
    cl: {
      title: "قائمة مكالمات اليوم ذات الأولوية",
      colPriority: "#", colName: "العميل", colOutstanding: "المستحق (ريال)",
      colDpd: "أيام التأخر", colTier: "مستوى المخاطر", colReason: "السبب", colStatus: "الحالة",
      statuses: ["معلق", "تم الاتصال - وعد بالسداد", "تم الاتصال - رفض", "لا إجابة", "تمت الموافقة على إعادة الهيكلة", "تم السداد"],
      markCalled: "تم الاتصال", addNote: "إضافة ملاحظة", reschedule: "إعادة جدولة", viewAnalysis: "عرض التحليل",
      totalPlanned: "إجمالي المخطط", completed: "مكتمل", promisesPay: "وعود بالسداد (ريال)", resolved: "تم الحل",
      exportBtn: "تصدير قائمة المكالمات", empty: "لا توجد حسابات في قائمة المكالمات. قم بتشغيل تحليل الإنذار المبكر أولاً.",
    },
    add: {
      title: "إضافة حساب للمحفظة",
      accountId: "رقم الحساب", customerName: "اسم العميل", customerType: "نوع العميل",
      productType: "نوع المنتج", originalAmount: "المبلغ الأصلي (ريال)",
      outstandingBal: "الرصيد المتبقي (ريال)", monthlyInstallment: "القسط الشهري (ريال)",
      startDate: "تاريخ البدء", maturityDate: "تاريخ الاستحقاق",
      dpd: "أيام التأخر الحالية", missedPayments: "الأقساط المتأخرة",
      paymentPattern: "نمط السداد", phone: "رقم الهاتف", notes: "ملاحظات",
      saveBtn: "حفظ الحساب", saved: "تم حفظ الحساب!",
      individual: "فرد", sme: "منشأة",
      products: ["مرابحة", "إجارة", "تورق", "مشاركة"],
      patterns: ["دائماً في الموعد", "تأخر عرضي (1-5 أيام)", "تأخر منتظم (6-15 يوم)", "تأخر كبير (16-30 يوم)", "تأخر مزمن (30+ يوم)", "متدهور", "متحسن"],
    },
    rpt: {
      title: "التقارير",
      tabAging: "تقرير التقادم", tabRisk: "ملخص المخاطر بالذكاء الاصطناعي", tabSama: "تقرير تحصيل ساما",
      bucket: "الفئة", accounts: "الحسابات", outstanding: "المستحق (ريال)", pctPortfolio: "% من المحفظة",
      buckets: ["منتظم (0 يوم)", "1-30 يوم", "31-60 يوم", "61-90 يوم", "91-180 يوم", "180+ يوم"],
      riskSummary: "ملخص مخاطر المحفظة بالذكاء الاصطناعي",
      generateBtn: "إنشاء ملخص بالذكاء الاصطناعي", generating: "جاري الإنشاء...",
      top10: "أعلى 10 حسابات خطورة",
      nplRatio: "نسبة القروض غير المنتجة", restructuredCount: "الحسابات المعاد هيكلتها",
      collectionsActivity: "ملخص نشاط التحصيل", legalActions: "الإجراءات القانونية المبدأة",
      disclaimer: "للاستخدام الداخلي. التقارير الرسمية لساما تتطلب تحققاً إضافياً.",
    },
    tiers: { current: "منتظم", watch: "مراقبة", atRisk: "في خطر", critical: "حرج", default_: "متعثر" },
    actionTypes: { Call: "اتصال", SMS: "رسالة", Restructure: "إعادة هيكلة", Escalate: "تصعيد", Legal: "قانوني", "Field Visit": "زيارة ميدانية" },
  },
};

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════════════════════ */
const SAMPLE_ACCOUNTS = [
  { id: "TWK-2024-001", name: "Mohammed Al-Rashidi", type: "Individual", product: "Murabaha", original: 450000, outstanding: 280000, installment: 8500, dpd: 0, missed: 0, pattern: "Always on time", tier: "Current", probability: 8, lastAction: "None", phone: "0501234567" },
  { id: "TWK-2024-002", name: "Al-Noor Logistics Co.", type: "SME", product: "Ijarah", original: 1200000, outstanding: 890000, installment: 22000, dpd: 12, missed: 1, pattern: "Regular delays", tier: "Watch", probability: 32, lastAction: "SMS sent", phone: "0559876543" },
  { id: "TWK-2024-003", name: "Fatima Al-Zahrani", type: "Individual", product: "Tawarruq", original: 180000, outstanding: 145000, installment: 3800, dpd: 35, missed: 2, pattern: "Deteriorating", tier: "At-Risk", probability: 67, lastAction: "Called", phone: "0541112233" },
  { id: "TWK-2024-004", name: "Al-Salam Trading Est.", type: "SME", product: "Murabaha", original: 2500000, outstanding: 2100000, installment: 48000, dpd: 72, missed: 3, pattern: "Chronic delays", tier: "Critical", probability: 88, lastAction: "Manager escalated", phone: "0567778899" },
  { id: "TWK-2024-005", name: "Khalid Al-Mutairi", type: "Individual", product: "Ijarah", original: 320000, outstanding: 95000, installment: 6200, dpd: 0, missed: 0, pattern: "Always on time", tier: "Current", probability: 5, lastAction: "None", phone: "0532223344" },
  { id: "TWK-2024-006", name: "Green Tech Solutions", type: "SME", product: "Musharaka", original: 800000, outstanding: 720000, installment: 18000, dpd: 45, missed: 2, pattern: "Significant delays", tier: "At-Risk", probability: 74, lastAction: "Restructure offered", phone: "0543334455" },
  { id: "TWK-2024-007", name: "Sara Al-Hamdan", type: "Individual", product: "Murabaha", original: 95000, outstanding: 88000, installment: 2100, dpd: 8, missed: 0, pattern: "Occasional delays", tier: "Watch", probability: 22, lastAction: "Reminder sent", phone: "0554445566" },
  { id: "TWK-2024-008", name: "Al-Majd Construction", type: "SME", product: "Ijarah", original: 3800000, outstanding: 3650000, installment: 75000, dpd: 120, missed: 5, pattern: "Chronic delays", tier: "Default", probability: 95, lastAction: "Legal notice", phone: "0565556677" },
];

const COL_KEY = "collections_accounts_v1";
const COL_RESULTS_KEY = "collections_results_v1";
const COL_CALLLIST_KEY = "collections_calllist_v1";
const loadS = (k, def) => { try { const d = JSON.parse(localStorage.getItem(k)); return d && d.length ? d : def || []; } catch { return def || []; } };
const saveS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const tierColor = (tier) => {
  const t = (tier || "").toLowerCase();
  if (t === "current" || t === "منتظم") return { bg: "#eaf3de", text: "#27500A", border: "#97C459" };
  if (t === "watch" || t === "مراقبة") return { bg: "#faeeda", text: "#633806", border: "#EF9F27" };
  if (t === "at-risk" || t === "في خطر") return { bg: "#fde8d8", text: "#7c2d12", border: "#f97316" };
  if (t === "critical" || t === "حرج") return { bg: "#fcebeb", text: "#501313", border: "#F09595" };
  if (t === "default" || t === "متعثر") return { bg: "#1a1a1a", text: "#fff", border: "#666" };
  return { bg: "#f0f0f4", text: "#444", border: "#ccc" };
};
const actionBadge = (type) => {
  const t = (type || "").toLowerCase();
  if (t === "call" || t === "اتصال") return { bg: "#e8f0fe", text: "#1a3c8f" };
  if (t === "sms" || t === "رسالة") return { bg: "#f3e8ff", text: "#6b21a8" };
  if (t === "restructure" || t === "إعادة هيكلة") return { bg: "#eaf3de", text: "#27500A" };
  if (t === "escalate" || t === "تصعيد") return { bg: "#fcebeb", text: "#501313" };
  if (t === "legal" || t === "قانوني") return { bg: "#1a1a2e", text: "#fff" };
  return { bg: "#e8f0fe", text: "#1a3c8f" };
};
const probColor = (p) => {
  if (p <= 30) return "#27500A";
  if (p <= 60) return "#EF9F27";
  if (p <= 80) return "#f97316";
  return "#BE1E2D";
};
const fmtSAR = (n) => Number(n || 0).toLocaleString("en-SA");

/* ═══════════════════════════════════════════════════════════════
   COLLECTIONS MODULE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Collections({ lang, screen, setScreen }) {
  const ct = CT[lang] || CT.en;
  const isRtl = lang === "ar";

  const [accounts, setAccounts] = useState(() => loadS(COL_KEY, SAMPLE_ACCOUNTS));
  const [colResults, setColResults] = useState(() => loadS(COL_RESULTS_KEY));
  const [callList, setCallList] = useState(() => loadS(COL_CALLLIST_KEY));
  const [viewResult, setViewResult] = useState(null);
  const [sortField, setSortField] = useState("dpd");
  const [demoLoading, setDemoLoading] = useState(false);

  /* Quick Demo for Collections */
  const runDemoCollections = async () => {
    setDemoLoading(true);
    const demoAcct = {
      id: "TWK-2024-067", name: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0623\u0645\u0644 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", type: "SME", product: "Ijarah",
      original: 2800000, outstanding: 2450000, installment: 58000, dpd: 52, missed: 2,
      pattern: "Deteriorating (getting worse)", empChange: "Business revenue decline",
      contactResp: "Sometimes responsive", restructured: "No", legalAction: "No",
      collateral: "Real Estate", simahChange: "Deteriorated",
      notes: "\u0627\u0644\u0639\u0645\u064a\u0644 \u0623\u0628\u0644\u063a \u0639\u0646 \u0627\u0646\u062e\u0641\u0627\u0636 \u0641\u064a \u0627\u0644\u0639\u0642\u0648\u062f \u0627\u0644\u062d\u0643\u0648\u0645\u064a\u0629 \u0628\u0633\u0628\u0628 \u062a\u0623\u062e\u0631 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639. \u0644\u062f\u064a\u0647 \u0639\u0642\u0648\u062f \u0645\u0639\u0644\u0642\u0629 \u0628\u0642\u064a\u0645\u0629 4.5 \u0645\u0644\u064a\u0648\u0646 \u0631\u064a\u0627\u0644",
      tier: "At-Risk", probability: 50, lastAction: "New",
    };
    await analyzeAccount(demoAcct);
    setDemoLoading(false);
  };

  useEffect(() => { saveS(COL_KEY, accounts); }, [accounts]);
  useEffect(() => { saveS(COL_RESULTS_KEY, colResults); }, [colResults]);
  useEffect(() => { saveS(COL_CALLLIST_KEY, callList); }, [callList]);

  const card = { background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 10, padding: 20 };
  const inputS = { width: "100%", padding: "10px 12px", border: "0.5px solid #d0d0d0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" };
  const btnPrimary = { background: "#BE1E2D", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" };
  const badge = (tc) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.text, border: `1px solid ${tc.border || tc.bg}` });

  /* ── DASHBOARD ── */
  const ColDashboard = () => {
    const sorted = [...accounts].sort((a, b) => {
      if (sortField === "dpd") return b.dpd - a.dpd;
      if (sortField === "probability") return b.probability - a.probability;
      if (sortField === "outstanding") return b.outstanding - a.outstanding;
      return 0;
    });
    const totalOut = accounts.reduce((s, a) => s + a.outstanding, 0);
    const atRiskCount = accounts.filter(a => ["At-Risk", "Critical", "Default"].includes(a.tier)).length;
    const avgDpd = accounts.length ? Math.round(accounts.reduce((s, a) => s + a.dpd, 0) / accounts.length) : 0;
    const tiers = ["Current", "Watch", "At-Risk", "Critical", "Default"];
    const tierKeys = ["current", "watch", "atRisk", "critical", "default_"];
    const tierCounts = tiers.map(t => accounts.filter(a => a.tier === t).length);
    const tierAmounts = tiers.map(t => accounts.filter(a => a.tier === t).reduce((s, a) => s + a.outstanding, 0));

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{ct.dash.title}</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={runDemoCollections} disabled={demoLoading} style={{ background: "#1a1a2e", color: "#fff", border: "none", padding: "12px 24px", fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: demoLoading ? "wait" : "pointer", opacity: demoLoading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 8 }}>
              {demoLoading ? <span className="spin" style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%" }} /> : "\uD83C\uDFAF"} {demoLoading ? "Analyzing..." : "Quick Demo"}
            </button>
            <button onClick={() => { generateCallList(); setScreen("colCallList"); }} style={btnPrimary}>{ct.dash.analyzeAll}</button>
          </div>
        </div>
        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            [ct.dash.totalAccounts, accounts.length],
            [ct.dash.totalOutstanding, `SAR ${fmtSAR(totalOut)}`],
            [ct.dash.accountsAtRisk, atRiskCount, "#BE1E2D"],
            [ct.dash.avgDpd, avgDpd],
            [ct.dash.recoveryRate, "78%"],
          ].map(([label, val, color], i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: color || "#1a1a1a" }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Health Bar */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{ct.dash.healthBar}</div>
          <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
            {tiers.map((t, i) => {
              const pct = accounts.length ? (tierCounts[i] / accounts.length * 100) : 0;
              if (pct === 0) return null;
              const tc = tierColor(t);
              return <div key={t} style={{ width: `${pct}%`, background: tc.border || tc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 600 }}>{Math.round(pct)}%</div>;
            })}
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 10 }}>
            {tiers.map((t, i) => {
              const tc = tierColor(t);
              return <span key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: tc.border || tc.bg }} />{ct.dash[tierKeys[i]]} ({tierCounts[i]})</span>;
            })}
          </div>
        </div>
        {/* Tier Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
          {tiers.map((t, i) => {
            const tc = tierColor(t);
            const pct = accounts.length ? (tierCounts[i] / accounts.length * 100).toFixed(0) : 0;
            return (
              <div key={t} style={{ ...card, background: tc.bg, borderColor: tc.border }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: tc.text }}>{ct.dash[tierKeys[i]]}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: tc.text, margin: "4px 0" }}>{tierCounts[i]}</div>
                <div style={{ fontSize: 10, color: tc.text, opacity: 0.7 }}>SAR {fmtSAR(tierAmounts[i])}</div>
                <div style={{ fontSize: 10, color: tc.text, opacity: 0.7 }}>{pct}% {ct.dash.ofPortfolio}</div>
              </div>
            );
          })}
        </div>
        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            [ct.dash.callsDue, accounts.filter(a => a.dpd > 0 && a.dpd <= 60).length],
            [ct.dash.restructCandidates, accounts.filter(a => a.dpd >= 30 && a.dpd <= 90).length],
            [ct.dash.legalApproaching, accounts.filter(a => a.dpd >= 75).length],
            [ct.dash.paymentsToday, "SAR 0"],
          ].map(([label, val], i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 10, color: "#888" }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Sort + Table */}
        <div style={{ ...card }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{ct.dash.colId}</div>
            <select value={sortField} onChange={e => setSortField(e.target.value)} style={{ ...inputS, width: "auto" }}>
              <option value="dpd">{ct.dash.colDpd}</option>
              <option value="probability">{ct.dash.colProb}</option>
              <option value="outstanding">{ct.dash.colOutstanding}</option>
            </select>
          </div>
          {sorted.length === 0 ? <div style={{ color: "#888", fontSize: 13, padding: 20, textAlign: "center" }}>{ct.dash.noAccounts}</div> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                    {[ct.dash.colId, ct.dash.colName, ct.dash.colProduct, ct.dash.colOutstanding, ct.dash.colDpd, ct.dash.colTier, ct.dash.colProb, ct.dash.colAction].map(h => (
                      <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888", fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(a => {
                    const tc = tierColor(a.tier);
                    return (
                      <tr key={a.id} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                        <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.id}</td>
                        <td style={{ padding: "8px 6px" }}>{a.name}</td>
                        <td style={{ padding: "8px 6px" }}>{a.product}</td>
                        <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(a.outstanding)}</td>
                        <td style={{ padding: "8px 6px", fontWeight: 600, color: a.dpd > 30 ? "#BE1E2D" : "#1a1a1a" }}>{a.dpd}</td>
                        <td style={{ padding: "8px 6px" }}><span style={badge(tc)}>{a.tier}</span></td>
                        <td style={{ padding: "8px 6px", fontWeight: 700, color: probColor(a.probability) }}>{a.probability}%</td>
                        <td style={{ padding: "8px 6px" }}>
                          <button onClick={() => analyzeAccount(a)} style={{ ...btnPrimary, padding: "4px 12px", fontSize: 11 }}>{ct.dash.analyze}</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ── ANALYZE SINGLE ACCOUNT ── */
  const analyzeAccount = async (acct) => {
    setScreen("colResult");
    setViewResult({ loading: true, account: acct });
    const msg = `Account Analysis Request:\nCustomer: ${acct.name} | Account ID: ${acct.id}\nProduct: ${acct.product} | Customer Type: ${acct.type}\nOriginal Amount: SAR ${acct.original} | Outstanding: SAR ${acct.outstanding}\nMonthly Installment: SAR ${acct.installment}\nDays Past Due: ${acct.dpd} | Missed Payments: ${acct.missed}\nPayment Pattern: ${acct.pattern}\nEmployment/Business Change: ${acct.empChange || "No change"}\nContact Responsiveness: ${acct.contactResp || "Unknown"}\nExisting Restructuring: ${acct.restructured || "No"}\nLegal Action: ${acct.legalAction || "No"}\nCollateral: ${acct.collateral || "Unknown"}\nSIMAH Change: ${acct.simahChange || "Unknown"}\nNotes: ${acct.notes || "None"}\n\nPlease analyze default probability and recommend collection actions.`;
    try {
      const resp = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: msg, lang }),
      });
      const data = await resp.json();
      if (data.error) { setViewResult({ error: data.error, account: acct }); return; }
      const result = { ...data.result, account: acct, date: new Date().toISOString() };
      setViewResult(result);
      setColResults(prev => [result, ...prev]);
      // Update account in portfolio
      setAccounts(prev => prev.map(a => a.id === acct.id ? { ...a, tier: data.result.riskTier || a.tier, probability: data.result.defaultProbability || a.probability, lastAction: "AI Analyzed" } : a));
    } catch (err) {
      setViewResult({ error: err.message, account: acct });
    }
  };

  const generateCallList = () => {
    const atRisk = accounts.filter(a => a.dpd > 0).sort((a, b) => b.probability - a.probability);
    const list = atRisk.map((a, i) => ({
      ...a,
      priority: i + 1,
      reason: a.dpd >= 90 ? "Legal threshold" : a.dpd >= 60 ? "Critical overdue" : a.dpd >= 30 ? "Overdue" : "Early reminder",
      status: "Pending",
    }));
    setCallList(list);
  };

  /* ── EARLY WARNING ── */
  const EarlyWarning = () => {
    const [mode, setMode] = useState("single");
    const [form, setForm] = useState({ accountId: "", customerName: "", customerType: "Individual", productType: "Murabaha", originalAmount: "", outstandingBal: "", monthlyInstallment: "", dpd: "0", missedPayments: "0", paymentPattern: "Always on time", employmentChange: "No change", contactResp: "Always responsive", existingRestructure: "No", legalAction: "No", collateralAvail: "No", collateralType: "", simahChange: "No change", notes: "" });
    const [loading, setLoading] = useState(false);
    const [bulkText, setBulkText] = useState("");
    const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const field = (label, key, type = "text") => (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
        <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)} style={inputS} />
      </div>
    );
    const sel = (label, key, options) => (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
        <select value={form[key]} onChange={e => upd(key, e.target.value)} style={inputS}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );

    const submit = async () => {
      if (!form.customerName) return;
      setLoading(true);
      const acct = { id: form.accountId || `TWK-${Date.now()}`, name: form.customerName, type: form.customerType, product: form.productType, original: Number(form.originalAmount) || 0, outstanding: Number(form.outstandingBal) || 0, installment: Number(form.monthlyInstallment) || 0, dpd: Number(form.dpd) || 0, missed: Number(form.missedPayments) || 0, pattern: form.paymentPattern, empChange: form.employmentChange, contactResp: form.contactResp, restructured: form.existingRestructure, legalAction: form.legalAction, collateral: form.collateralAvail === "Yes" ? form.collateralType : form.collateralAvail, simahChange: form.simahChange, notes: form.notes, tier: "Watch", probability: 50, lastAction: "New" };
      await analyzeAccount(acct);
      setLoading(false);
    };

    return (
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{ct.ew.title}</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setMode("single")} style={{ ...btnPrimary, background: mode === "single" ? "#BE1E2D" : "#fff", color: mode === "single" ? "#fff" : "#1a1a1a", border: "0.5px solid #d0d0d0" }}>{ct.ew.modeA}</button>
          <button onClick={() => setMode("bulk")} style={{ ...btnPrimary, background: mode === "bulk" ? "#BE1E2D" : "#fff", color: mode === "bulk" ? "#fff" : "#1a1a1a", border: "0.5px solid #d0d0d0" }}>{ct.ew.modeB}</button>
        </div>
        {mode === "single" ? (
          <div style={card}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {field(ct.ew.accountId, "accountId")}
              {field(ct.ew.customerName, "customerName")}
              {sel(ct.ew.customerType, "customerType", [ct.ew.individual, ct.ew.sme])}
              {sel(ct.ew.productType, "productType", ct.ew.products)}
              {field(ct.ew.originalAmount, "originalAmount", "number")}
              {field(ct.ew.outstandingBal, "outstandingBal", "number")}
              {field(ct.ew.monthlyInstallment, "monthlyInstallment", "number")}
              {field(ct.ew.dpd, "dpd", "number")}
              {field(ct.ew.missedPayments, "missedPayments", "number")}
              {sel(ct.ew.paymentPattern, "paymentPattern", ct.ew.patterns)}
              {sel(ct.ew.employmentChange, "employmentChange", ct.ew.empStatuses)}
              {sel(ct.ew.contactResp, "contactResp", ct.ew.respLevels)}
              {sel(ct.ew.existingRestructure, "existingRestructure", [ct.ew.yes, ct.ew.no])}
              {sel(ct.ew.legalAction, "legalAction", [ct.ew.yes, ct.ew.no])}
              {sel(ct.ew.collateralAvail, "collateralAvail", [ct.ew.yes, ct.ew.no, ct.ew.partial])}
              {form.collateralAvail === ct.ew.yes && sel(ct.ew.collateralType, "collateralType", ct.ew.collTypes)}
              {sel(ct.ew.simahChange, "simahChange", ct.ew.simahOpts)}
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{ct.ew.notes}</label>
              <textarea value={form.notes} onChange={e => upd("notes", e.target.value)} rows={3} style={{ ...inputS, resize: "vertical" }} />
            </div>
            <button onClick={submit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}>{loading ? ct.ew.analyzing : ct.ew.analyzeBtn}</button>
          </div>
        ) : (
          <div style={card}>
            <textarea value={bulkText} onChange={e => setBulkText(e.target.value)} rows={10} placeholder={ct.ew.bulkPlaceholder} style={{ ...inputS, resize: "vertical", marginBottom: 12 }} />
            <button onClick={() => { /* bulk analysis would parse CSV and run each */ }} style={btnPrimary}>{ct.ew.analyzeAllBtn}</button>
          </div>
        )}
      </div>
    );
  };

  /* ── RESULT ── */
  const ColResult = () => {
    const r = viewResult;
    if (!r) return <div style={{ color: "#888", padding: 40, textAlign: "center" }}>No analysis result.</div>;
    if (r.loading) return <div style={{ padding: 40, textAlign: "center" }}><div style={{ fontSize: 14, color: "#888" }}>{ct.ew.analyzing}</div></div>;
    if (r.error) return <div style={{ ...card, color: "#BE1E2D" }}>Error: {r.error}</div>;

    const prob = r.defaultProbability || 0;
    const pc = probColor(prob);
    const tc = tierColor(r.riskTier);
    const acct = r.account || {};

    const saveToPortfolio = () => {
      const exists = accounts.find(a => a.id === acct.id);
      if (!exists) {
        setAccounts(prev => [...prev, { ...acct, tier: r.riskTier || acct.tier, probability: prob }]);
      }
      alert(ct.res.saved);
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>{ct.res.title}</h2>
            <div style={{ fontSize: 12, color: "#888" }}>{acct.name} — {acct.id} — {acct.product}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveToPortfolio} style={btnPrimary}>{ct.res.save}</button>
            <button onClick={() => setScreen("colEarlyWarning")} style={{ ...btnPrimary, background: "#fff", color: "#1a1a1a", border: "0.5px solid #d0d0d0" }}>{ct.res.newAnalysis}</button>
          </div>
        </div>
        {/* Probability Gauge */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{ct.res.defaultProb}</div>
            <div style={{ width: 100, height: 100, borderRadius: "50%", border: `6px solid ${pc}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 28, fontWeight: 700, color: pc }}>{prob}%</div>
          </div>
          <div style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{ct.res.riskTier}</div>
            <div style={{ ...badge(tc), fontSize: 16, padding: "8px 20px" }}>{r.riskTier}</div>
          </div>
          <div style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{ct.res.daysToDefault}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: pc }}>{r.daysToDefault || "N/A"}</div>
          </div>
        </div>
        {/* Summary */}
        {r.summary && <div style={{ ...card, marginBottom: 16, fontSize: 13, lineHeight: 1.6 }}>{r.summary}</div>}
        {/* Actions */}
        {r.recommendedActions?.length > 0 && (
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{ct.res.actions}</div>
            {r.recommendedActions.map((a, i) => {
              const ab = actionBadge(a.actionType);
              return (
                <div key={i} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: i < r.recommendedActions.length - 1 ? "0.5px solid #f0f0f0" : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#BE1E2D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{a.priority}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ ...badge({ bg: ab.bg, text: ab.text, border: ab.bg }), fontSize: 10 }}>{a.actionType}</span>
                      <span style={{ fontSize: 10, color: "#888" }}>{a.timing}</span>
                    </div>
                    <div style={{ fontSize: 13 }}>{a.description}</div>
                    {a.expectedOutcome && <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{ct.res.expectedOutcome}: {a.expectedOutcome}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Warning & Positive Signals */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {r.warningSignals?.length > 0 && (
            <div style={{ ...card }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#EF9F27" }}>{ct.res.warningSignals}</div>
              {r.warningSignals.map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#633806" }}>⚠ {s}</div>)}
            </div>
          )}
          {r.positiveSignals?.length > 0 && (
            <div style={{ ...card }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{ct.res.positiveSignals}</div>
              {r.positiveSignals.map((s, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#27500A" }}>✓ {s}</div>)}
            </div>
          )}
        </div>
        {/* Restructuring */}
        {r.restructuringRecommended && (
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{ct.res.restructuring}</div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>{ct.res.recommended}: <strong>{r.restructuringRecommended}</strong></div>
            {r.restructuringOptions?.length > 0 && (
              <ul style={{ margin: 0, paddingInlineStart: 20, fontSize: 12 }}>
                {r.restructuringOptions.map((o, i) => <li key={i} style={{ marginBottom: 4 }}>{o}</li>)}
              </ul>
            )}
            <div style={{ fontSize: 11, color: "#888", marginTop: 8, fontStyle: "italic" }}>{ct.res.samaNote}</div>
          </div>
        )}
        {/* Collection Scripts */}
        {r.collectionScript && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ ...card }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{ct.res.collectionScript}</div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{ct.res.opening}</div>
              <div style={{ fontSize: 12, marginBottom: 8, background: "#f8f8fa", padding: 8, borderRadius: 6 }}>{r.collectionScript.opening}</div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{ct.res.keyPoints}</div>
              <ul style={{ margin: 0, paddingInlineStart: 16, fontSize: 12 }}>
                {r.collectionScript.keyPoints?.map((p, i) => <li key={i} style={{ marginBottom: 2 }}>{p}</li>)}
              </ul>
              {r.collectionScript.objectionResponse && <div style={{ fontSize: 11, marginTop: 8 }}><strong>{ct.res.objection}:</strong> {r.collectionScript.objectionResponse}</div>}
            </div>
            {r.collectionScriptAr && (
              <div style={{ ...card }} dir="rtl">
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{ct.res.collectionScriptAr}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{ct.res.opening}</div>
                <div style={{ fontSize: 12, marginBottom: 8, background: "#f8f8fa", padding: 8, borderRadius: 6 }}>{r.collectionScriptAr.opening}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{ct.res.keyPoints}</div>
                <ul style={{ margin: 0, paddingInlineStart: 16, fontSize: 12 }}>
                  {r.collectionScriptAr.keyPoints?.map((p, i) => <li key={i} style={{ marginBottom: 2 }}>{p}</li>)}
                </ul>
                {r.collectionScriptAr.objectionResponse && <div style={{ fontSize: 11, marginTop: 8 }}><strong>{ct.res.objection}:</strong> {r.collectionScriptAr.objectionResponse}</div>}
              </div>
            )}
          </div>
        )}
        {/* SAMA Notes */}
        {r.samaComplianceNotes?.length > 0 && (
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{ct.res.samaCompliance}</div>
            {r.samaComplianceNotes.map((n, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#1a3c8f" }}>{n}</div>)}
          </div>
        )}
        {/* Escalation */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{ct.res.escalation}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, fontSize: 12 }}>
            <div><span style={{ color: "#888" }}>{ct.res.escalateManager}:</span> <strong>{r.escalateToManager ? "Yes" : "No"}</strong></div>
            <div><span style={{ color: "#888" }}>{ct.res.initiateLegal}:</span> <strong style={{ color: r.inititateLegal ? "#BE1E2D" : "#27500A" }}>{r.inititateLegal ? "Yes" : "No"}</strong></div>
            <div><span style={{ color: "#888" }}>{ct.res.estimatedRecovery}:</span> <strong>{r.estimatedRecovery || "N/A"}</strong></div>
            <div><span style={{ color: "#888" }}>{ct.res.nextReview}:</span> <strong>{r.nextReviewDate || "N/A"}</strong></div>
          </div>
        </div>
      </div>
    );
  };

  /* ── CALL LIST ── */
  const CallList = () => {
    const [list, setList] = useState(callList);
    useEffect(() => { setList(callList); }, [callList]);
    const updateStatus = (idx, status) => {
      const updated = list.map((item, i) => i === idx ? { ...item, status } : item);
      setList(updated);
      setCallList(updated);
    };
    const completed = list.filter(i => i.status !== "Pending").length;
    const promises = list.filter(i => i.status === "Called - Promise to Pay" || i.status === "تم الاتصال - وعد بالسداد").reduce((s, i) => s + i.outstanding, 0);
    const resolved = list.filter(i => i.status === "Paid" || i.status === "تم السداد").length;

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>{ct.cl.title}</h2>
            <div style={{ fontSize: 12, color: "#888" }}>{new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <button onClick={() => window.print()} style={btnPrimary}>{ct.cl.exportBtn}</button>
        </div>
        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            [ct.cl.totalPlanned, list.length],
            [ct.cl.completed, completed],
            [ct.cl.promisesPay, `SAR ${fmtSAR(promises)}`],
            [ct.cl.resolved, resolved],
          ].map(([label, val], i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 10, color: "#888" }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
        {list.length === 0 ? <div style={{ ...card, textAlign: "center", color: "#888", padding: 40 }}>{ct.cl.empty}</div> : (
          <div style={{ ...card, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  {[ct.cl.colPriority, ct.cl.colName, ct.cl.colOutstanding, ct.cl.colDpd, ct.cl.colTier, ct.cl.colReason, ct.cl.colStatus].map(h => (
                    <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888", fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => {
                  const tc = tierColor(item.tier);
                  return (
                    <tr key={idx} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                      <td style={{ padding: "8px 6px", fontWeight: 700 }}>{item.priority}</td>
                      <td style={{ padding: "8px 6px" }}>{item.name}</td>
                      <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(item.outstanding)}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 600, color: item.dpd > 30 ? "#BE1E2D" : "#1a1a1a" }}>{item.dpd}</td>
                      <td style={{ padding: "8px 6px" }}><span style={badge(tc)}>{item.tier}</span></td>
                      <td style={{ padding: "8px 6px", fontSize: 11 }}>{item.reason}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <select value={item.status} onChange={e => updateStatus(idx, e.target.value)} style={{ ...inputS, width: "auto", fontSize: 11, padding: "4px 6px" }}>
                          {ct.cl.statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  /* ── ADD ACCOUNT ── */
  const AddAccount = () => {
    const [form, setForm] = useState({ accountId: "", customerName: "", customerType: "Individual", productType: "Murabaha", originalAmount: "", outstandingBal: "", monthlyInstallment: "", startDate: "", maturityDate: "", dpd: "0", missedPayments: "0", paymentPattern: "Always on time", phone: "", notes: "" });
    const [saved, setSaved] = useState(false);
    const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const field = (label, key, type = "text") => (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
        <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)} style={inputS} />
      </div>
    );
    const sel = (label, key, options) => (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
        <select value={form[key]} onChange={e => upd(key, e.target.value)} style={inputS}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
    const save = () => {
      if (!form.customerName) return;
      const dpd = Number(form.dpd) || 0;
      let tier = "Current";
      if (dpd >= 90) tier = "Default";
      else if (dpd >= 60) tier = "Critical";
      else if (dpd >= 30) tier = "At-Risk";
      else if (dpd > 0) tier = "Watch";
      const acct = { id: form.accountId || `TWK-${Date.now()}`, name: form.customerName, type: form.customerType, product: form.productType, original: Number(form.originalAmount) || 0, outstanding: Number(form.outstandingBal) || 0, installment: Number(form.monthlyInstallment) || 0, dpd, missed: Number(form.missedPayments) || 0, pattern: form.paymentPattern, tier, probability: 0, lastAction: "Added", phone: form.phone, notes: form.notes };
      setAccounts(prev => [...prev, acct]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };
    return (
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{ct.add.title}</h2>
        <div style={card}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {field(ct.add.accountId, "accountId")}
            {field(ct.add.customerName, "customerName")}
            {sel(ct.add.customerType, "customerType", [ct.add.individual, ct.add.sme])}
            {sel(ct.add.productType, "productType", ct.add.products)}
            {field(ct.add.originalAmount, "originalAmount", "number")}
            {field(ct.add.outstandingBal, "outstandingBal", "number")}
            {field(ct.add.monthlyInstallment, "monthlyInstallment", "number")}
            {field(ct.add.startDate, "startDate", "date")}
            {field(ct.add.maturityDate, "maturityDate", "date")}
            {field(ct.add.dpd, "dpd", "number")}
            {field(ct.add.missedPayments, "missedPayments", "number")}
            {sel(ct.add.paymentPattern, "paymentPattern", ct.add.patterns)}
            {field(ct.add.phone, "phone")}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{ct.add.notes}</label>
            <textarea value={form.notes} onChange={e => upd("notes", e.target.value)} rows={3} style={{ ...inputS, resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={save} style={btnPrimary}>{ct.add.saveBtn}</button>
            {saved && <span style={{ color: "#27500A", fontSize: 12, fontWeight: 600 }}>{ct.add.saved}</span>}
          </div>
        </div>
      </div>
    );
  };

  /* ── REPORTS ── */
  const Reports = () => {
    const [tab, setTab] = useState("aging");
    const [aiSummary, setAiSummary] = useState("");
    const [generating, setGenerating] = useState(false);

    const bucketRanges = [[0, 0], [1, 30], [31, 60], [61, 90], [91, 180], [181, 99999]];
    const totalOut = accounts.reduce((s, a) => s + a.outstanding, 0);
    const agingData = bucketRanges.map(([min, max]) => {
      const accts = accounts.filter(a => a.dpd >= min && a.dpd <= max);
      return { count: accts.length, outstanding: accts.reduce((s, a) => s + a.outstanding, 0), pct: totalOut > 0 ? (accts.reduce((s, a) => s + a.outstanding, 0) / totalOut * 100).toFixed(1) : 0 };
    });
    const nplAccounts = accounts.filter(a => a.dpd >= 90);
    const nplRatio = totalOut > 0 ? (nplAccounts.reduce((s, a) => s + a.outstanding, 0) / totalOut * 100).toFixed(1) : 0;
    const top10 = [...accounts].sort((a, b) => b.probability - a.probability).slice(0, 10);

    const generateSummary = async () => {
      setGenerating(true);
      try {
        const msg = `Generate a portfolio risk summary for a collections portfolio with ${accounts.length} accounts, total outstanding SAR ${totalOut.toLocaleString()}, NPL ratio ${nplRatio}%, average DPD ${Math.round(accounts.reduce((s, a) => s + a.dpd, 0) / accounts.length)}. Tiers: ${["Current", "Watch", "At-Risk", "Critical", "Default"].map(t => `${t}: ${accounts.filter(a => a.tier === t).length}`).join(", ")}. Provide a 3-paragraph narrative summary with key risks and recommendations.`;
        const resp = await fetch("/api/collections", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userMessage: msg, lang, summaryMode: true }) });
        const data = await resp.json();
        setAiSummary(data.result?.summary || data.result?.toString() || "Summary generated.");
      } catch (err) { setAiSummary("Error generating summary: " + err.message); }
      setGenerating(false);
    };

    return (
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{ct.rpt.title}</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["aging", "risk", "sama"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...btnPrimary, background: tab === t ? "#BE1E2D" : "#fff", color: tab === t ? "#fff" : "#1a1a1a", border: "0.5px solid #d0d0d0" }}>
              {t === "aging" ? ct.rpt.tabAging : t === "risk" ? ct.rpt.tabRisk : ct.rpt.tabSama}
            </button>
          ))}
        </div>
        {tab === "aging" && (
          <div style={{ ...card, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  {[ct.rpt.bucket, ct.rpt.accounts, ct.rpt.outstanding, ct.rpt.pctPortfolio].map(h => (
                    <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ct.rpt.buckets.map((b, i) => (
                  <tr key={i} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                    <td style={{ padding: "8px 6px", fontWeight: 600 }}>{b}</td>
                    <td style={{ padding: "8px 6px" }}>{agingData[i].count}</td>
                    <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(agingData[i].outstanding)}</td>
                    <td style={{ padding: "8px 6px" }}>{agingData[i].pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "risk" && (
          <div>
            <div style={{ ...card, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{ct.rpt.riskSummary}</div>
                <button onClick={generateSummary} disabled={generating} style={{ ...btnPrimary, fontSize: 11, padding: "6px 14px" }}>{generating ? ct.rpt.generating : ct.rpt.generateBtn}</button>
              </div>
              {aiSummary && <div style={{ fontSize: 12, lineHeight: 1.7, color: "#333", whiteSpace: "pre-wrap" }}>{aiSummary}</div>}
            </div>
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{ct.rpt.top10}</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  {[ct.dash.colId, ct.dash.colName, ct.dash.colOutstanding, ct.dash.colDpd, ct.dash.colProb].map(h => (
                    <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888", fontSize: 11 }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {top10.map(a => (
                    <tr key={a.id} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                      <td style={{ padding: "8px 6px" }}>{a.id}</td>
                      <td style={{ padding: "8px 6px" }}>{a.name}</td>
                      <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(a.outstanding)}</td>
                      <td style={{ padding: "8px 6px" }}>{a.dpd}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 700, color: probColor(a.probability) }}>{a.probability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === "sama" && (
          <div style={card}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><div style={{ fontSize: 11, color: "#888" }}>{ct.rpt.nplRatio}</div><div style={{ fontSize: 22, fontWeight: 700, color: "#BE1E2D" }}>{nplRatio}%</div></div>
              <div><div style={{ fontSize: 11, color: "#888" }}>{ct.rpt.restructuredCount}</div><div style={{ fontSize: 22, fontWeight: 700 }}>{accounts.filter(a => a.lastAction?.includes("Restructur")).length}</div></div>
              <div><div style={{ fontSize: 11, color: "#888" }}>{ct.rpt.collectionsActivity}</div><div style={{ fontSize: 22, fontWeight: 700 }}>{colResults.length} analyses</div></div>
              <div><div style={{ fontSize: 11, color: "#888" }}>{ct.rpt.legalActions}</div><div style={{ fontSize: 22, fontWeight: 700 }}>{accounts.filter(a => a.dpd >= 90).length}</div></div>
            </div>
            <div style={{ fontSize: 11, color: "#888", fontStyle: "italic", borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>{ct.rpt.disclaimer}</div>
          </div>
        )}
      </div>
    );
  };

  /* ── RENDER ── */
  switch (screen) {
    case "colDashboard": return <ColDashboard />;
    case "colEarlyWarning": return <EarlyWarning />;
    case "colResult": return <ColResult />;
    case "colCallList": return <CallList />;
    case "colAddAccount": return <AddAccount />;
    case "colReports": return <Reports />;
    default: return <ColDashboard />;
  }
}

/* Export translations and nav keys for the parent App */
export const collectionsTranslations = CT;
export const collectionsNavKeys = {
  en: CT.en.nav,
  ar: CT.ar.nav,
};
export const collectionsSectionLabel = {
  en: CT.en.section,
  ar: CT.ar.section,
};
