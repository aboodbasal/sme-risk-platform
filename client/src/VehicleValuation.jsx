import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const VT = {
  en: {
    section: "Vehicle Valuation AI",
    nav: { dashboard: "Valuation Dashboard", newVal: "New Valuation", history: "Valuation History", market: "Market Insights" },
    dash: {
      title: "Vehicle Valuation Dashboard", totalVals: "Total Valuations", avgValue: "Avg Vehicle Value (SAR)",
      fraudFlags: "Fraud Flags Raised", protectedSAR: "Financing Protected (SAR)",
      dist: "Valuation Accuracy Distribution",
      fair: "Fair Value", slightlyHigh: "Slightly High", overInflated: "Over-Inflated (Flagged)", underMarket: "Under Market",
      recentTitle: "Recent Valuations",
      colDate: "Date", colVehicle: "Vehicle", colCustomer: "Customer", colDeclared: "Declared (SAR)", colAiVal: "AI Value (SAR)", colVariance: "Variance %", colStatus: "Status", colAction: "Action",
      view: "View", empty: "No valuations yet. Start your first valuation!",
      marketSnap: "Market Snapshot — Top 5 Financed Vehicles",
      demand: "Demand", depreciation: "Depreciation",
    },
    wizard: {
      step1: "Vehicle Details", step2: "Condition & Documentation", step3: "Review & Valuate",
      customerName: "Customer Name", customerId: "Customer ID / National ID", finRef: "Financing Application Ref (optional)",
      make: "Vehicle Make", model: "Vehicle Model", year: "Manufacturing Year", bodyType: "Body Type",
      engineSize: "Engine Size", transmission: "Transmission", fuelType: "Fuel Type", driveType: "Drive Type",
      color: "Color (optional)", origin: "Country of Origin",
      mileage: "Current Mileage (km)", condition: "Overall Condition", accidentHistory: "Accident History",
      serviceHistory: "Service History", registration: "Current Registration", fahas: "Inspection Certificate (Fahas)",
      modifications: "Modifications", prevOwners: "Previous Owners", collateral: "Vehicle used as collateral?",
      declaredValue: "Customer Declared Value (SAR)", financingAmount: "Financing Amount Requested (SAR)",
      financingType: "Financing Type",
      next: "Next", prev: "Previous", valuateBtn: "Get AI Valuation", valuating: "Analyzing vehicle data and Saudi market conditions...",
      reviewTitle: "Review Summary",
      makes: ["Toyota","Hyundai","Kia","Nissan","Mitsubishi","Honda","Ford","GMC","Chevrolet","Lexus","BMW","Mercedes-Benz","Audi","Land Rover","Jeep","Mazda","Suzuki","Isuzu","Renault","Other"],
      bodyTypes: ["Sedan","SUV","Pickup Truck","Van","Hatchback","Coupe","Minivan"],
      engines: ["1.0-1.6L","1.6-2.0L","2.0-2.5L","2.5-3.0L","3.0-4.0L","4.0L+"],
      transmissions: ["Automatic","Manual"],
      fuels: ["Petrol","Diesel","Hybrid","Electric"],
      drives: ["2WD","4WD","AWD"],
      origins: ["Saudi Arabia","GCC (imported)","Other import"],
      conditions: ["Excellent — Like new, no issues","Very Good — Minor wear, fully functional","Good — Normal wear, minor issues","Fair — Visible wear, some issues","Poor — Major issues, needs repairs"],
      accidents: ["No accidents","Minor accident (repaired)","Major accident (repaired)","Unknown"],
      services: ["Full documented history","Partial history","No history","Unknown"],
      registrations: ["Valid","Expired","Not registered"],
      fahasOpts: ["Valid","Expired","Not available"],
      mods: ["None","Minor (tint, wheels)","Major (engine, body)"],
      owners: ["1 (first owner)","2","3","4+"],
      yesNo: ["Yes","No"],
      finTypes: ["Murabaha (vehicle purchase)","Ijarah (vehicle lease)"],
      selectMake: "Select make",
    },
    result: {
      title: "Vehicle Valuation Report", save: "Save Valuation", newVal: "New Valuation", printCert: "Print Certificate",
      aiValue: "AI Estimated Market Value", valueRange: "Value Range", confidence: "Confidence Level",
      marketTrend: "Market Trend", appreciating: "Appreciating", stable: "Stable", depreciating: "Depreciating",
      fraudAlert: "Fraud Detection Alert",
      fairMsg: "Value within acceptable range",
      highMsg: "Declared value is {pct}% above market estimate — verify documentation",
      overMsg: "FRAUD ALERT — Declared value is {pct}% above market. Do not finance at declared value.",
      underMsg: "Declared value is below market — favorable for Tawkelat",
      finRec: "Financing Recommendation",
      aiMarketVal: "AI Market Value", declaredVal: "Customer Declared Value", variance: "Variance",
      maxFinancing: "Max Recommended Financing (80% LTV)", requestedFin: "Customer Requested Financing",
      finStatus: "Financing Status",
      ltvGauge: "Loan-to-Value (LTV) Ratio", ltvGreen: "Safe (0-70%)", ltvAmber: "Caution (71-80%)", ltvRed: "Exceeds Max (81%+)",
      comparables: "Market Comparison — Comparable Vehicles",
      compNote: "Comparable prices sourced from AI market knowledge of Saudi vehicle listings",
      boosters: "Value Boosters", detractors: "Value Detractors",
      deprecTitle: "Depreciation Analysis", current: "Current Value", in12: "Est. in 12 Months", in24: "Est. in 24 Months", residual: "Residual Value %",
      shariaNote: "Sharia Compliance Note",
      certTitle: "VEHICLE VALUATION CERTIFICATE", certPowered: "Tawkelat Finance — Powered by AI",
      certDisclaimer: "This valuation is generated by AI analysis based on Saudi market data. It is a decision-support tool and does not replace a physical inspection. Final financing approval subject to Tawkelat Finance credit committee.",
      recommendations: "Recommendations", summary: "Assessment Summary", saved: "Saved!",
    },
    history: {
      title: "Valuation History", search: "Search customer or vehicle...",
      filterAll: "All", filterFair: "Fair Value", filterFlagged: "Flagged", filterUnder: "Under Market",
      filterMake: "All Makes", exportBtn: "Export",
      colDate: "Date", colVehicle: "Vehicle", colCustomer: "Customer", colDeclared: "Declared SAR", colAiVal: "AI Value SAR", colVariance: "Variance %", colStatus: "Status", colAction: "Action",
      view: "View", empty: "No valuations in history.",
    },
    market: {
      title: "Saudi Vehicle Market Intelligence",
      topFinanced: "Most Financed Vehicles at Tawkelat",
      deprecGuide: "Depreciation Guide by Category",
      catLuxury: "Luxury Sedans (BMW, Mercedes, Audi)", catJapanese: "Japanese Sedans (Toyota, Honda, Hyundai)",
      catSuv: "SUVs (Popular Models)", catPickup: "Pickup Trucks (Hilux, Ranger)", catEv: "Electric Vehicles",
      yr1: "Year 1", yrAfter: "Thereafter",
      ltvTitle: "LTV Risk Guidelines (SAMA-informed)",
      ltvNew: "New vehicles", ltvUsed3: "Used (under 3 years)", ltvUsed7: "Used (3-7 years)", ltvOld: "Used (7+ years)", ltvSalvage: "Salvage/accident history",
      redFlags: "Red Flags Reference — Common Vehicle Fraud Patterns",
      inspNote: "Always request Fahas inspection certificate. For vehicles above SAR 200,000, consider independent inspection.",
    },
    statuses: { "Fair Value": "Fair Value", "Slightly High": "Slightly High", "Over-Inflated": "Over-Inflated", "Under Market": "Under Market" },
  },
  ar: {
    section: "نظام تقييم المركبات الذكي",
    nav: { dashboard: "لوحة التقييم", newVal: "تقييم جديد", history: "سجل التقييمات", market: "رؤى السوق" },
    dash: {
      title: "لوحة تقييم المركبات", totalVals: "إجمالي التقييمات", avgValue: "متوسط قيمة المركبة (ريال)",
      fraudFlags: "تنبيهات احتيال", protectedSAR: "تمويل محمي (ريال)",
      dist: "توزيع دقة التقييمات",
      fair: "قيمة عادلة", slightlyHigh: "مرتفعة قليلاً", overInflated: "مُضخَّمة (مُبلَّغ عنها)", underMarket: "أقل من السوق",
      recentTitle: "التقييمات الأخيرة",
      colDate: "التاريخ", colVehicle: "المركبة", colCustomer: "العميل", colDeclared: "المُعلن (ريال)", colAiVal: "قيمة AI (ريال)", colVariance: "الفارق %", colStatus: "الحالة", colAction: "إجراء",
      view: "عرض", empty: "لا توجد تقييمات بعد. ابدأ أول تقييم!",
      marketSnap: "لمحة السوق — أكثر 5 مركبات تمويلاً",
      demand: "الطلب", depreciation: "الاستهلاك",
    },
    wizard: {
      step1: "تفاصيل المركبة", step2: "الحالة والتوثيق", step3: "المراجعة والتقييم",
      customerName: "اسم العميل", customerId: "رقم الهوية", finRef: "مرجع طلب التمويل (اختياري)",
      make: "الشركة المصنعة", model: "الموديل", year: "سنة الصنع", bodyType: "نوع الهيكل",
      engineSize: "حجم المحرك", transmission: "ناقل الحركة", fuelType: "نوع الوقود", driveType: "نوع الدفع",
      color: "اللون (اختياري)", origin: "بلد المنشأ",
      mileage: "المسافة المقطوعة (كم)", condition: "الحالة العامة", accidentHistory: "تاريخ الحوادث",
      serviceHistory: "تاريخ الصيانة", registration: "التسجيل الحالي", fahas: "شهادة الفحص (فحص)",
      modifications: "التعديلات", prevOwners: "الملاك السابقون", collateral: "المركبة كضمان؟",
      declaredValue: "القيمة المُعلنة من العميل (ريال)", financingAmount: "مبلغ التمويل المطلوب (ريال)",
      financingType: "نوع التمويل",
      next: "التالي", prev: "السابق", valuateBtn: "الحصول على تقييم AI", valuating: "جاري تحليل بيانات المركبة وظروف السوق السعودي...",
      reviewTitle: "ملخص المراجعة",
      makes: ["تويوتا","هيونداي","كيا","نيسان","ميتسوبيشي","هوندا","فورد","جي إم سي","شيفروليه","لكزس","بي إم دبليو","مرسيدس بنز","أودي","لاند روفر","جيب","مازدا","سوزوكي","إيسوزو","رينو","أخرى"],
      bodyTypes: ["سيدان","دفع رباعي","بيك أب","فان","هاتشباك","كوبيه","ميني فان"],
      engines: ["1.0-1.6 لتر","1.6-2.0 لتر","2.0-2.5 لتر","2.5-3.0 لتر","3.0-4.0 لتر","4.0+ لتر"],
      transmissions: ["أوتوماتيك","يدوي"],
      fuels: ["بنزين","ديزل","هجين","كهربائي"],
      drives: ["دفع أمامي","دفع رباعي","دفع كلي"],
      origins: ["السعودية","خليجي (مستورد)","استيراد آخر"],
      conditions: ["ممتاز — كالجديد","جيد جداً — استهلاك بسيط","جيد — استهلاك عادي","مقبول — استهلاك ظاهر","ضعيف — يحتاج إصلاحات"],
      accidents: ["لا حوادث","حادث بسيط (تم الإصلاح)","حادث كبير (تم الإصلاح)","غير معروف"],
      services: ["سجل صيانة كامل","سجل جزئي","لا يوجد سجل","غير معروف"],
      registrations: ["ساري","منتهي","غير مسجل"],
      fahasOpts: ["ساري","منتهي","غير متوفر"],
      mods: ["لا تعديلات","بسيطة (تظليل، جنوط)","كبيرة (محرك، هيكل)"],
      owners: ["1 (المالك الأول)","2","3","4+"],
      yesNo: ["نعم","لا"],
      finTypes: ["مرابحة (شراء مركبة)","إجارة (تأجير مركبة)"],
      selectMake: "اختر الشركة المصنعة",
    },
    result: {
      title: "تقرير تقييم المركبة", save: "حفظ التقييم", newVal: "تقييم جديد", printCert: "طباعة الشهادة",
      aiValue: "القيمة المقدرة بالذكاء الاصطناعي", valueRange: "نطاق القيمة", confidence: "مستوى الثقة",
      marketTrend: "اتجاه السوق", appreciating: "صاعد", stable: "مستقر", depreciating: "هابط",
      fraudAlert: "تنبيه كشف الاحتيال",
      fairMsg: "القيمة ضمن النطاق المقبول",
      highMsg: "القيمة المُعلنة أعلى بنسبة {pct}% من تقدير السوق — تحقق من الوثائق",
      overMsg: "تنبيه احتيال — القيمة المُعلنة أعلى بنسبة {pct}% من السوق. لا تموّل بالقيمة المُعلنة.",
      underMsg: "القيمة المُعلنة أقل من السوق — مناسب لتوكلات",
      finRec: "توصية التمويل",
      aiMarketVal: "القيمة السوقية AI", declaredVal: "القيمة المُعلنة من العميل", variance: "الفارق",
      maxFinancing: "الحد الأقصى للتمويل (80% LTV)", requestedFin: "التمويل المطلوب من العميل",
      finStatus: "حالة التمويل",
      ltvGauge: "نسبة التمويل إلى القيمة (LTV)", ltvGreen: "آمن (0-70%)", ltvAmber: "تحذير (71-80%)", ltvRed: "يتجاوز الحد (81%+)",
      comparables: "مقارنة السوق — مركبات مماثلة",
      compNote: "الأسعار المقارنة مصدرها معرفة AI بالسوق السعودي",
      boosters: "عوامل رفع القيمة", detractors: "عوامل خفض القيمة",
      deprecTitle: "تحليل الاستهلاك", current: "القيمة الحالية", in12: "المتوقعة بعد 12 شهر", in24: "المتوقعة بعد 24 شهر", residual: "القيمة المتبقية %",
      shariaNote: "ملاحظة الامتثال الشرعي",
      certTitle: "شهادة تقييم مركبة", certPowered: "توكلات للتمويل — مدعوم بالذكاء الاصطناعي",
      certDisclaimer: "هذا التقييم مُنشأ بتحليل الذكاء الاصطناعي بناءً على بيانات السوق السعودي. هو أداة دعم قرار ولا يحل محل الفحص الفعلي. الموافقة النهائية تخضع للجنة الائتمان في توكلات.",
      recommendations: "التوصيات", summary: "ملخص التقييم", saved: "تم الحفظ!",
    },
    history: {
      title: "سجل التقييمات", search: "بحث عن عميل أو مركبة...",
      filterAll: "الكل", filterFair: "قيمة عادلة", filterFlagged: "مُبلَّغ عنها", filterUnder: "أقل من السوق",
      filterMake: "جميع الشركات", exportBtn: "تصدير",
      colDate: "التاريخ", colVehicle: "المركبة", colCustomer: "العميل", colDeclared: "المُعلن (ريال)", colAiVal: "قيمة AI (ريال)", colVariance: "الفارق %", colStatus: "الحالة", colAction: "إجراء",
      view: "عرض", empty: "لا توجد تقييمات في السجل.",
    },
    market: {
      title: "استخبارات سوق المركبات السعودي",
      topFinanced: "أكثر المركبات تمويلاً في توكلات",
      deprecGuide: "دليل الاستهلاك حسب الفئة",
      catLuxury: "سيدان فاخرة (BMW، مرسيدس، أودي)", catJapanese: "سيدان يابانية (تويوتا، هوندا، هيونداي)",
      catSuv: "دفع رباعي (موديلات شائعة)", catPickup: "بيك أب (هايلكس، رينجر)", catEv: "مركبات كهربائية",
      yr1: "السنة الأولى", yrAfter: "بعد ذلك",
      ltvTitle: "إرشادات LTV (وفق ساما)",
      ltvNew: "مركبات جديدة", ltvUsed3: "مستعملة (أقل من 3 سنوات)", ltvUsed7: "مستعملة (3-7 سنوات)", ltvOld: "مستعملة (7+ سنوات)", ltvSalvage: "حوادث/تالفة",
      redFlags: "مرجع العلامات الحمراء — أنماط احتيال المركبات الشائعة",
      inspNote: "اطلب دائماً شهادة فحص. للمركبات فوق 200,000 ريال، فكر في فحص مستقل.",
    },
    statuses: { "Fair Value": "قيمة عادلة", "Slightly High": "مرتفعة قليلاً", "Over-Inflated": "مُضخَّمة", "Under Market": "أقل من السوق" },
  },
};

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════════════════════ */
const SAMPLE_HISTORY = [
  { id: "VAL-001", date: "2024-04-01", make: "Toyota", model: "Camry", year: 2021, customer: "Ahmed Al-Harbi", declaredValue: 78000, aiValue: 72000, variance: 8.3, status: "Fair Value", mileage: 45000 },
  { id: "VAL-002", date: "2024-04-02", make: "Nissan", model: "Patrol", year: 2019, customer: "Khalid Al-Mutairi", declaredValue: 195000, aiValue: 148000, variance: 31.7, status: "Over-Inflated", mileage: 88000 },
  { id: "VAL-003", date: "2024-04-03", make: "Hyundai", model: "Sonata", year: 2022, customer: "Mohammed Al-Qahtani", declaredValue: 58000, aiValue: 62000, variance: -6.5, status: "Under Market", mileage: 28000 },
  { id: "VAL-004", date: "2024-04-05", make: "Toyota", model: "Hilux", year: 2020, customer: "Faisal Al-Dosari", declaredValue: 98000, aiValue: 91000, variance: 7.7, status: "Fair Value", mileage: 62000 },
  { id: "VAL-005", date: "2024-04-07", make: "BMW", model: "3 Series", year: 2021, customer: "Omar Al-Zahrani", declaredValue: 145000, aiValue: 108000, variance: 34.2, status: "Over-Inflated", mileage: 52000 },
];

const MARKET_SNAPSHOT = [
  { name: "Toyota Camry", years: "2020-2024", range: "55,000 — 115,000", demand: "High", depreciation: "10-12%" },
  { name: "Hyundai Sonata", years: "2020-2024", range: "40,000 — 70,000", demand: "High", depreciation: "12-15%" },
  { name: "Toyota Hilux", years: "2020-2024", range: "75,000 — 110,000", demand: "High", depreciation: "5-8%" },
  { name: "Kia Sportage", years: "2020-2024", range: "55,000 — 90,000", demand: "Medium", depreciation: "10-13%" },
  { name: "Nissan Patrol", years: "2020-2024", range: "120,000 — 190,000", demand: "High", depreciation: "8-10%" },
];

const TOP_FINANCED = [
  { name: "Toyota Camry", pct: 28 }, { name: "Hyundai Sonata", pct: 18 }, { name: "Toyota Hilux", pct: 15 },
  { name: "Nissan Patrol", pct: 12 }, { name: "Kia Sportage", pct: 10 }, { name: "Others", pct: 17 },
];

const DEPRECIATION_DATA = [
  { cat: "catLuxury", yr1: "15-20%", after: "10-15%" },
  { cat: "catJapanese", yr1: "10-15%", after: "8-12%" },
  { cat: "catSuv", yr1: "8-12%", after: "7-10%" },
  { cat: "catPickup", yr1: "5-8%", after: "5-7%" },
  { cat: "catEv", yr1: "20-25%", after: "15-20%" },
];

const LTV_GUIDELINES = [
  { key: "ltvNew", max: "90%" }, { key: "ltvUsed3", max: "85%" }, { key: "ltvUsed7", max: "80%" },
  { key: "ltvOld", max: "70%" }, { key: "ltvSalvage", max: "Case by case" },
];

const RED_FLAGS = [
  "Odometer rollback (mileage inconsistent with year/condition)",
  "Flood/accident damage concealed with repainting",
  "VIN plate tampering",
  "Declared value significantly above market",
  "Vehicle listed as 'private' but shows heavy commercial use",
  "Registration in different region than customer",
];
const RED_FLAGS_AR = [
  "تلاعب بعداد المسافات (المسافة غير متوافقة مع السنة/الحالة)",
  "أضرار فيضان/حادث مخفية بإعادة الطلاء",
  "تلاعب بلوحة رقم الهيكل",
  "القيمة المُعلنة أعلى بكثير من السوق",
  "المركبة مسجلة كـ'خاصة' لكن تظهر استخداماً تجارياً كثيفاً",
  "التسجيل في منطقة مختلفة عن العميل",
];

const VV_KEY = "vehicle_valuations_v1";
const loadS = (k, def) => { try { const d = JSON.parse(localStorage.getItem(k)); return d && d.length ? d : def || []; } catch { return def || []; } };
const saveS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const fmtSAR = (n) => Number(n || 0).toLocaleString("en-SA");

const statusColor = (s) => {
  if (s === "Fair Value") return { bg: "#eaf3de", text: "#27500A", border: "#97C459" };
  if (s === "Slightly High") return { bg: "#faeeda", text: "#633806", border: "#EF9F27" };
  if (s === "Over-Inflated") return { bg: "#fcebeb", text: "#501313", border: "#F09595" };
  if (s === "Under Market") return { bg: "#e8f0fe", text: "#1a3c8f", border: "#7baaf7" };
  return { bg: "#f0f0f4", text: "#444", border: "#ccc" };
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function VehicleValuation({ lang, screen, setScreen }) {
  const vt = VT[lang] || VT.en;
  const isRtl = lang === "ar";
  const [valuations, setValuations] = useState(() => loadS(VV_KEY, SAMPLE_HISTORY));
  const [viewResult, setViewResult] = useState(null);
  const [demoLoading, setDemoLoading] = useState(false);
  useEffect(() => { saveS(VV_KEY, valuations); }, [valuations]);

  /* Quick Demo for Vehicle Valuation */
  const runDemoVehicle = async () => {
    setDemoLoading(true);
    const demoForm = {
      customerName: "Fahad Al-Qahtani", customerId: "1088776655", finRef: "TWK-VF-2024-089",
      make: "Toyota", model: "Camry GLE", year: "2023", bodyType: "Sedan",
      engineSize: "2.5-3.0L", transmission: "Automatic", fuelType: "Petrol",
      driveType: "2WD", color: "Pearl White", origin: "Saudi Arabia",
      mileage: "28000", condition: "Very Good \u2014 Minor wear, fully functional",
      accidentHistory: "No accidents", serviceHistory: "Full documented history",
      registration: "Valid", fahas: "Valid", modifications: "None",
      prevOwners: "1 (first owner)", collateral: "Yes",
      declaredValue: "115000", financingAmount: "92000", financingType: "Murabaha (vehicle purchase)",
    };
    const msg = `Vehicle Valuation Request:\nMake: Toyota | Model: Camry GLE | Year: 2023\nBody Type: Sedan | Engine: 2.5-3.0L | Transmission: Automatic\nFuel: Petrol | Drive: 2WD | Origin: Saudi Arabia\nMileage: 28000 km\nCondition: Very Good \u2014 Minor wear, fully functional\nAccident History: No accidents\nService History: Full documented history\nRegistration: Valid\nModifications: None\nPrevious Owners: 1 (first owner)\nCustomer Declared Value: SAR 115000\nFinancing Requested: SAR 92000\nFinancing Type: Murabaha (vehicle purchase)\n\nPlease provide a comprehensive valuation with market comparisons.`;
    try {
      const resp = await fetch("/api/vehicle-valuation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: msg, lang }),
      });
      const data = await resp.json();
      if (data.error) { setViewResult({ error: data.error?.message || data.error, form: demoForm }); setScreen("vvResult"); setDemoLoading(false); return; }
      const result = { ...data.result, form: demoForm, date: new Date().toISOString().split("T")[0], id: `VAL-${Date.now()}` };
      setViewResult(result);
      setScreen("vvResult");
    } catch (err) { setViewResult({ error: err.message, form: demoForm }); setScreen("vvResult"); }
    setDemoLoading(false);
  };

  const card = { background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 10, padding: 20 };
  const inputS = { width: "100%", padding: "10px 12px", border: "0.5px solid #d0d0d0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" };
  const btnP = { background: "#BE1E2D", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" };
  const badge = (sc) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.text, border: `1px solid ${sc.border || sc.bg}` });

  /* ── DASHBOARD ── */
  const Dashboard = () => {
    const total = valuations.length;
    const avgVal = total ? Math.round(valuations.reduce((s, v) => s + v.aiValue, 0) / total) : 0;
    const fraudCount = valuations.filter(v => v.status === "Over-Inflated").length;
    const protectedSAR = valuations.filter(v => v.variance > 20).reduce((s, v) => s + (v.declaredValue - v.aiValue), 0);
    const counts = { fair: valuations.filter(v => v.status === "Fair Value").length, high: valuations.filter(v => v.status === "Slightly High").length, over: valuations.filter(v => v.status === "Over-Inflated").length, under: valuations.filter(v => v.status === "Under Market").length };
    const maxCount = Math.max(counts.fair, counts.high, counts.over, counts.under, 1);

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{vt.dash.title}</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={runDemoVehicle} disabled={demoLoading} style={{ background: "#1a1a2e", color: "#fff", border: "none", padding: "12px 24px", fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: demoLoading ? "wait" : "pointer", opacity: demoLoading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 8 }}>
              {demoLoading ? <span className="spin" style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%" }} /> : "\uD83C\uDFAF"} {demoLoading ? "Valuating..." : "Quick Demo"}
            </button>
            <button onClick={() => setScreen("vvWizard")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "12px 24px", fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: "pointer" }}>{vt.nav.newVal}</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[[vt.dash.totalVals, total], [vt.dash.avgValue, `SAR ${fmtSAR(avgVal)}`], [vt.dash.fraudFlags, fraudCount, "#BE1E2D"], [vt.dash.protectedSAR, `SAR ${fmtSAR(protectedSAR)}`]].map(([l, v, c], i) => (
            <div key={i} style={card}><div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 22, fontWeight: 700, color: c || "#1a1a1a" }}>{v}</div></div>
          ))}
        </div>
        {/* Distribution */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{vt.dash.dist}</div>
          {[["fair", vt.dash.fair, "#97C459"], ["high", vt.dash.slightlyHigh, "#EF9F27"], ["over", vt.dash.overInflated, "#F09595"], ["under", vt.dash.underMarket, "#7baaf7"]].map(([k, label, color]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 120, fontSize: 12 }}>{label}</div>
              <div style={{ flex: 1, height: 20, background: "#f4f4f7", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${(counts[k] / maxCount) * 100}%`, height: "100%", background: color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 600, minWidth: counts[k] > 0 ? 24 : 0 }}>{counts[k]}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent Table */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{vt.dash.recentTitle}</div>
          {valuations.length === 0 ? <div style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>{vt.dash.empty}</div> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  {[vt.dash.colDate, vt.dash.colVehicle, vt.dash.colCustomer, vt.dash.colDeclared, vt.dash.colAiVal, vt.dash.colVariance, vt.dash.colStatus, vt.dash.colAction].map(h => (
                    <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888", fontSize: 11 }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {valuations.slice(0, 10).map(v => {
                    const sc = statusColor(v.status);
                    return (
                      <tr key={v.id} style={{ borderBottom: "0.5px solid #f0f0f0", background: v.variance > 20 ? "#fcebeb22" : "transparent" }}>
                        <td style={{ padding: "8px 6px" }}>{v.date}</td>
                        <td style={{ padding: "8px 6px", fontWeight: 600 }}>{v.make} {v.model} {v.year}</td>
                        <td style={{ padding: "8px 6px" }}>{v.customer}</td>
                        <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(v.declaredValue)}</td>
                        <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(v.aiValue)}</td>
                        <td style={{ padding: "8px 6px", fontWeight: 600, color: v.variance > 20 ? "#BE1E2D" : v.variance > 10 ? "#EF9F27" : "#27500A" }}>{v.variance > 0 ? "+" : ""}{v.variance}%</td>
                        <td style={{ padding: "8px 6px" }}><span style={badge(sc)}>{vt.statuses[v.status] || v.status}</span></td>
                        <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(v); setScreen("vvResult"); }} style={{ ...btnP, padding: "4px 12px", fontSize: 11 }}>{vt.dash.view}</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Market Snapshot */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{vt.dash.marketSnap}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {MARKET_SNAPSHOT.map(m => (
              <div key={m.name} style={{ background: "#f8f8fa", borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: "#888" }}>{m.years}</div>
                <div style={{ fontSize: 11, fontWeight: 600, margin: "4px 0" }}>SAR {m.range}</div>
                <div style={{ fontSize: 10 }}>{vt.dash.demand}: <strong>{m.demand}</strong></div>
                <div style={{ fontSize: 10 }}>{vt.dash.depreciation}: {m.depreciation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ── WIZARD ── */
  const Wizard = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
      customerName: "", customerId: "", finRef: "", make: "", model: "", year: "2023", bodyType: "Sedan",
      engineSize: "2.0-2.5L", transmission: "Automatic", fuelType: "Petrol", driveType: "2WD", color: "", origin: "Saudi Arabia",
      mileage: "", condition: "Very Good — Minor wear, fully functional", accidentHistory: "No accidents",
      serviceHistory: "Full documented history", registration: "Valid", fahas: "Valid", modifications: "None",
      prevOwners: "1 (first owner)", collateral: "No", declaredValue: "", financingAmount: "", financingType: "Murabaha (vehicle purchase)",
    });
    const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const w = vt.wizard;
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
          {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
        </select>
      </div>
    );
    const years = Array.from({ length: 16 }, (_, i) => String(2025 - i));

    const submit = async () => {
      setLoading(true);
      const makesEN = VT.en.wizard.makes;
      const makeVal = lang === "ar" ? (makesEN[w.makes.indexOf(form.make)] || form.make) : form.make;
      const msg = `Vehicle Valuation Request:\nMake: ${makeVal} | Model: ${form.model} | Year: ${form.year}\nBody Type: ${form.bodyType} | Engine: ${form.engineSize} | Transmission: ${form.transmission}\nFuel: ${form.fuelType} | Drive: ${form.driveType} | Origin: ${form.origin}\nMileage: ${form.mileage} km\nCondition: ${form.condition}\nAccident History: ${form.accidentHistory}\nService History: ${form.serviceHistory}\nRegistration: ${form.registration}\nModifications: ${form.modifications}\nPrevious Owners: ${form.prevOwners}\nCustomer Declared Value: SAR ${form.declaredValue}\nFinancing Requested: SAR ${form.financingAmount}\nFinancing Type: ${form.financingType}\n\nPlease provide a comprehensive valuation with market comparisons.`;
      try {
        const resp = await fetch("/api/vehicle-valuation", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: msg, lang }),
        });
        const data = await resp.json();
        if (data.error) { setViewResult({ error: data.error?.message || data.error, form }); setScreen("vvResult"); setLoading(false); return; }
        const result = { ...data.result, form, date: new Date().toISOString().split("T")[0], id: `VAL-${Date.now()}` };
        setViewResult(result);
        setScreen("vvResult");
      } catch (err) { setViewResult({ error: err.message, form }); setScreen("vvResult"); }
      setLoading(false);
    };

    const steps = [w.step1, w.step2, w.step3];
    return (
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{w.step1} — {w.step2} — {w.step3}</h2>
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "8px 0", textAlign: "center", fontSize: 12, fontWeight: step === i ? 700 : 400, color: step === i ? "#BE1E2D" : "#888", borderBottom: step === i ? "2px solid #BE1E2D" : "1px solid #e8e8e8" }}>{i + 1}. {s}</div>
          ))}
        </div>
        <div style={card}>
          {step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {field(w.customerName, "customerName")}
              {field(w.customerId, "customerId")}
              {field(w.finRef, "finRef")}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{w.make}</label>
                <select value={form.make} onChange={e => upd("make", e.target.value)} style={inputS}>
                  <option value="">{w.selectMake}</option>
                  {w.makes.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
              </div>
              {field(w.model, "model")}
              {sel(w.year, "year", years)}
              {sel(w.bodyType, "bodyType", w.bodyTypes)}
              {sel(w.engineSize, "engineSize", w.engines)}
              {sel(w.transmission, "transmission", w.transmissions)}
              {sel(w.fuelType, "fuelType", w.fuels)}
              {sel(w.driveType, "driveType", w.drives)}
              {field(w.color, "color")}
              {sel(w.origin, "origin", w.origins)}
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {field(w.mileage, "mileage", "number")}
              {sel(w.condition, "condition", w.conditions)}
              {sel(w.accidentHistory, "accidentHistory", w.accidents)}
              {sel(w.serviceHistory, "serviceHistory", w.services)}
              {sel(w.registration, "registration", w.registrations)}
              {sel(w.fahas, "fahas", w.fahasOpts)}
              {sel(w.modifications, "modifications", w.mods)}
              {sel(w.prevOwners, "prevOwners", w.owners)}
              {sel(w.collateral, "collateral", w.yesNo)}
              {field(w.declaredValue, "declaredValue", "number")}
              {field(w.financingAmount, "financingAmount", "number")}
              {sel(w.financingType, "financingType", w.finTypes)}
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{w.reviewTitle}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                {Object.entries(form).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ padding: "6px 0", borderBottom: "0.5px solid #f0f0f0" }}>
                    <span style={{ color: "#888" }}>{w[k] || k}: </span><strong>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            {step > 0 ? <button onClick={() => setStep(step - 1)} style={{ ...btnP, background: "#fff", color: "#1a1a1a", border: "0.5px solid #d0d0d0" }}>{w.prev}</button> : <div />}
            {step < 2 ? <button onClick={() => setStep(step + 1)} style={btnP}>{w.next}</button>
              : <button onClick={submit} disabled={loading} style={{ ...btnP, opacity: loading ? 0.6 : 1 }}>{loading ? w.valuating : w.valuateBtn}</button>}
          </div>
        </div>
      </div>
    );
  };

  /* ── RESULT ── */
  const Result = () => {
    const r = viewResult;
    if (!r) return <div style={{ color: "#888", padding: 40, textAlign: "center" }}>No result.</div>;
    if (r.error) return <div style={{ ...card, color: "#BE1E2D" }}>Error: {r.error}</div>;

    const f = r.form || {};
    const variance = r.declaredValueVariance || 0;
    const sc = statusColor(r.valuationStatus);
    const ltv = r.ltv || 0;

    const saveVal = () => {
      const entry = { id: r.id, date: r.date, make: f.make, model: f.model, year: f.year, customer: f.customerName, declaredValue: Number(f.declaredValue) || 0, aiValue: r.estimatedValue || 0, variance: Math.abs(variance).toFixed(1), status: r.valuationStatus || "Fair Value", mileage: Number(f.mileage) || 0, fullResult: r };
      setValuations(prev => [entry, ...prev]);
      alert(vt.result.saved);
    };

    const printCert = () => window.print();

    const fraudBanner = () => {
      if (variance <= 10 && variance >= -100) return { bg: "#eaf3de", text: "#27500A", icon: "✓", msg: vt.result.fairMsg };
      if (variance > 10 && variance <= 20) return { bg: "#faeeda", text: "#633806", icon: "⚠", msg: vt.result.highMsg.replace("{pct}", Math.round(variance)) };
      if (variance > 20) return { bg: "#fcebeb", text: "#501313", icon: "🚨", msg: vt.result.overMsg.replace("{pct}", Math.round(variance)) };
      return { bg: "#e8f0fe", text: "#1a3c8f", icon: "ℹ", msg: vt.result.underMsg };
    };
    const fb = fraudBanner();

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>{vt.result.title}</h2>
            <div style={{ fontSize: 12, color: "#888" }}>{f.make} {f.model} {f.year} — {f.customerName} — {r.date}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveVal} style={btnP}>{vt.result.save}</button>
            <button onClick={() => setScreen("vvNewVal")} style={{ ...btnP, background: "#fff", color: "#1a1a1a", border: "0.5px solid #d0d0d0" }}>{vt.result.newVal}</button>
            <button onClick={printCert} style={{ ...btnP, background: "#1a1a2e" }}>{vt.result.printCert}</button>
          </div>
        </div>
        {/* Main Value Card */}
        <div style={{ ...card, textAlign: "center", marginBottom: 16, padding: 24 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{vt.result.aiValue}</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#BE1E2D" }}>SAR {fmtSAR(r.estimatedValue)}</div>
          <div style={{ fontSize: 12, color: "#888", margin: "8px 0" }}>{vt.result.valueRange}: SAR {fmtSAR(r.valueLow)} — SAR {fmtSAR(r.valueHigh)}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 12 }}>
            <span>{vt.result.confidence}: <strong>{r.confidenceLevel}</strong></span>
            <span>{vt.result.marketTrend}: <strong>{r.marketTrend === "Appreciating" ? "↑" : r.marketTrend === "Depreciating" ? "↓" : "→"} {r.marketTrend}</strong></span>
          </div>
        </div>
        {/* Fraud Banner */}
        <div style={{ ...card, background: fb.bg, borderColor: fb.bg, color: fb.text, marginBottom: 16, fontSize: 14, fontWeight: 600 }}>
          {fb.icon} {fb.msg}
        </div>
        {/* Financing Recommendation */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{vt.result.finRec}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
            {[[vt.result.aiMarketVal, `SAR ${fmtSAR(r.estimatedValue)}`], [vt.result.declaredVal, `SAR ${fmtSAR(f.declaredValue)}`], [vt.result.variance, `${variance > 0 ? "+" : ""}${variance.toFixed ? variance.toFixed(1) : variance}%`], [vt.result.maxFinancing, `SAR ${fmtSAR(r.maxRecommendedFinancing)}`], [vt.result.requestedFin, `SAR ${fmtSAR(f.financingAmount)}`], [vt.result.finStatus, r.ltvStatus]].map(([l, v], i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: "0.5px solid #f0f0f0" }}>
                <span style={{ color: "#888" }}>{l}: </span><strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
        {/* LTV Gauge */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{vt.result.ltvGauge}: {ltv.toFixed ? ltv.toFixed(1) : ltv}%</div>
          <div style={{ position: "relative", height: 28, borderRadius: 6, overflow: "hidden", display: "flex" }}>
            <div style={{ width: "70%", background: "#97C459", height: "100%" }} />
            <div style={{ width: "10%", background: "#EF9F27", height: "100%" }} />
            <div style={{ width: "20%", background: "#F09595", height: "100%" }} />
            <div style={{ position: "absolute", left: `${Math.min(ltv, 100)}%`, top: 0, width: 3, height: "100%", background: "#1a1a1a", transform: "translateX(-50%)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 4, color: "#888" }}>
            <span>{vt.result.ltvGreen}</span><span>{vt.result.ltvAmber}</span><span>{vt.result.ltvRed}</span>
          </div>
        </div>
        {/* Comparables */}
        {r.comparables?.length > 0 && (
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{vt.result.comparables}</div>
            {r.comparables.map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < r.comparables.length - 1 ? "0.5px solid #f0f0f0" : "none", fontSize: 12 }}>
                <div><strong>{c.description}</strong><div style={{ fontSize: 10, color: "#888" }}>{c.mileageRange}</div></div>
                <div style={{ textAlign: isRtl ? "left" : "right" }}><strong>{c.priceRange}</strong><div style={{ fontSize: 10, color: "#888" }}>{c.source}</div></div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#888", marginTop: 8, fontStyle: "italic" }}>{vt.result.compNote}</div>
          </div>
        )}
        {/* Value Factors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {r.valueFactors?.boosters?.length > 0 && (
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{vt.result.boosters}</div>
              {r.valueFactors.boosters.map((b, i) => <div key={i} style={{ fontSize: 12, padding: "3px 0", color: "#27500A" }}>✓ {b}</div>)}
            </div>
          )}
          {r.valueFactors?.detractors?.length > 0 && (
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#BE1E2D" }}>{vt.result.detractors}</div>
              {r.valueFactors.detractors.map((d, i) => <div key={i} style={{ fontSize: 12, padding: "3px 0", color: "#BE1E2D" }}>↓ {d}</div>)}
            </div>
          )}
        </div>
        {/* Depreciation */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{vt.result.deprecTitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, fontSize: 12 }}>
            <div><span style={{ color: "#888" }}>{vt.result.current}:</span><div style={{ fontSize: 18, fontWeight: 700 }}>SAR {fmtSAR(r.estimatedValue)}</div></div>
            <div><span style={{ color: "#888" }}>{vt.result.in12}:</span><div style={{ fontSize: 18, fontWeight: 700 }}>SAR {fmtSAR(r.valueIn12Months)}</div></div>
            <div><span style={{ color: "#888" }}>{vt.result.in24}:</span><div style={{ fontSize: 18, fontWeight: 700 }}>SAR {fmtSAR(r.valueIn24Months)}</div></div>
            <div><span style={{ color: "#888" }}>{vt.result.residual}:</span><div style={{ fontSize: 18, fontWeight: 700 }}>{r.estimatedValue ? Math.round(r.valueIn24Months / r.estimatedValue * 100) : 0}%</div></div>
          </div>
        </div>
        {/* Sharia Note */}
        {r.shariaNote && (
          <div style={{ ...card, background: "#eaf3de", borderColor: "#97C459", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "#27500A" }}>{vt.result.shariaNote}</div>
            <div style={{ fontSize: 12, color: "#27500A" }}>{r.shariaNote}</div>
          </div>
        )}
        {/* Summary */}
        {r.summary && <div style={{ ...card, marginBottom: 16, fontSize: 13, lineHeight: 1.6 }}><strong>{vt.result.summary}:</strong> {r.summary}</div>}
        {/* Recommendations */}
        {r.recommendations?.length > 0 && (
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{vt.result.recommendations}</div>
            {r.recommendations.map((rec, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0" }}>{i + 1}. {rec}</div>)}
          </div>
        )}
        {/* Certificate */}
        <div style={{ ...card, border: "2px solid #888", marginBottom: 16, fontFamily: "monospace" }} id="valuation-certificate">
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>{vt.result.certTitle}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{vt.result.certPowered}</div>
            <div style={{ fontSize: 11, color: "#888" }}>{r.date} | {r.id}</div>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>Vehicle: {f.make} {f.model} {f.year}</div>
            <div>Mileage: {fmtSAR(f.mileage)} km | Condition: {f.condition}</div>
            <div style={{ fontSize: 16, fontWeight: 700, margin: "8px 0", color: "#BE1E2D" }}>AI ESTIMATED MARKET VALUE: SAR {fmtSAR(r.estimatedValue)}</div>
            <div>Value Range: SAR {fmtSAR(r.valueLow)} — SAR {fmtSAR(r.valueHigh)}</div>
            <div>Confidence: {r.confidenceLevel}</div>
            <div style={{ marginTop: 4 }}>Maximum Recommended Financing (80% LTV): SAR {fmtSAR(r.maxRecommendedFinancing)}</div>
          </div>
          <div style={{ fontSize: 10, color: "#888", marginTop: 12, borderTop: "1px solid #ccc", paddingTop: 8 }}>{vt.result.certDisclaimer}</div>
        </div>
      </div>
    );
  };

  /* ── HISTORY ── */
  const History = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [makeFilter, setMakeFilter] = useState("All");
    const filtered = valuations.filter(v => {
      if (search && !`${v.customer} ${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "Fair" && v.status !== "Fair Value") return false;
      if (filter === "Flagged" && v.status !== "Over-Inflated" && v.status !== "Slightly High") return false;
      if (filter === "Under" && v.status !== "Under Market") return false;
      if (makeFilter !== "All" && v.make !== makeFilter) return false;
      return true;
    });
    const makes = [...new Set(valuations.map(v => v.make))];

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{vt.history.title}</h2>
          <button onClick={() => window.print()} style={btnP}>{vt.history.exportBtn}</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={vt.history.search} style={{ ...inputS, flex: 1 }} />
          {[["All", vt.history.filterAll], ["Fair", vt.history.filterFair], ["Flagged", vt.history.filterFlagged], ["Under", vt.history.filterUnder]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{ ...btnP, background: filter === k ? "#BE1E2D" : "#fff", color: filter === k ? "#fff" : "#1a1a1a", border: "0.5px solid #d0d0d0", padding: "6px 12px", fontSize: 11 }}>{l}</button>
          ))}
          <select value={makeFilter} onChange={e => setMakeFilter(e.target.value)} style={{ ...inputS, width: "auto" }}>
            <option value="All">{vt.history.filterMake}</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div style={card}>
          {filtered.length === 0 ? <div style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>{vt.history.empty}</div> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                {[vt.history.colDate, vt.history.colVehicle, vt.history.colCustomer, vt.history.colDeclared, vt.history.colAiVal, vt.history.colVariance, vt.history.colStatus, vt.history.colAction].map(h => (
                  <th key={h} style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888", fontSize: 11 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map(v => {
                  const sc = statusColor(v.status);
                  return (
                    <tr key={v.id} style={{ borderBottom: "0.5px solid #f0f0f0", background: v.variance > 20 ? "#fcebeb22" : "transparent" }}>
                      <td style={{ padding: "8px 6px" }}>{v.date}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 600 }}>{v.make} {v.model} {v.year}</td>
                      <td style={{ padding: "8px 6px" }}>{v.customer}</td>
                      <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(v.declaredValue)}</td>
                      <td style={{ padding: "8px 6px" }}>SAR {fmtSAR(v.aiValue)}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 600, color: v.variance > 20 ? "#BE1E2D" : v.variance > 10 ? "#EF9F27" : "#27500A" }}>{v.variance > 0 ? "+" : ""}{v.variance}%</td>
                      <td style={{ padding: "8px 6px" }}><span style={badge(sc)}>{vt.statuses[v.status] || v.status}</span></td>
                      <td style={{ padding: "8px 6px" }}><button onClick={() => { setViewResult(v.fullResult || v); setScreen("vvResult"); }} style={{ ...btnP, padding: "4px 12px", fontSize: 11 }}>{vt.history.view}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  /* ── MARKET INSIGHTS ── */
  const MarketInsights = () => {
    const m = vt.market;
    const flags = lang === "ar" ? RED_FLAGS_AR : RED_FLAGS;
    const barColors = ["#BE1E2D", "#EF9F27", "#97C459", "#7baaf7", "#f97316", "#888"];

    return (
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{m.title}</h2>
        {/* Top Financed */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{m.topFinanced}</div>
          {TOP_FINANCED.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 130, fontSize: 12 }}>{t.name}</div>
              <div style={{ flex: 1, height: 22, background: "#f4f4f7", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${t.pct}%`, height: "100%", background: barColors[i], borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 10, color: "#fff", fontWeight: 600 }}>{t.pct}%</div>
              </div>
            </div>
          ))}
        </div>
        {/* Depreciation Guide */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{m.deprecGuide}</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "1px solid #e8e8e8" }}>
              <th style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888" }}></th>
              <th style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888" }}>{m.yr1}</th>
              <th style={{ padding: "8px 6px", textAlign: isRtl ? "right" : "left", fontWeight: 600, color: "#888" }}>{m.yrAfter}</th>
            </tr></thead>
            <tbody>
              {DEPRECIATION_DATA.map((d, i) => (
                <tr key={i} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 6px", fontWeight: 600 }}>{m[d.cat]}</td>
                  <td style={{ padding: "8px 6px" }}>{d.yr1}</td>
                  <td style={{ padding: "8px 6px" }}>{d.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* LTV Guidelines */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{m.ltvTitle}</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <tbody>
              {LTV_GUIDELINES.map((g, i) => (
                <tr key={i} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 6px" }}>{m[g.key]}</td>
                  <td style={{ padding: "8px 6px", fontWeight: 700 }}>{g.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Red Flags */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#BE1E2D" }}>{m.redFlags}</div>
          {flags.map((f, i) => <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>🚩 {f}</div>)}
        </div>
        {/* Inspector Note */}
        <div style={{ ...card, background: "#faeeda", borderColor: "#EF9F27" }}>
          <div style={{ fontSize: 12, color: "#633806" }}>{m.inspNote}</div>
        </div>
      </div>
    );
  };

  /* ── RENDER ── */
  switch (screen) {
    case "vvDashboard": return <Dashboard />;
    case "vvNewVal": return <Wizard />;
    case "vvResult": return <Result />;
    case "vvHistory": return <History />;
    case "vvMarket": return <MarketInsights />;
    default: return <Dashboard />;
  }
}

export const vehicleValuationSection = { en: VT.en.section, ar: VT.ar.section };
export const vehicleValuationNav = { en: VT.en.nav, ar: VT.ar.nav };
