import React, { useState, useEffect, useMemo } from "react";

/* ─── translations ─── */
const T = {
  en: {
    brand: "SME Risk Intelligence",
    tagline: "Powered by AI · SAMA Compliant",
    credit: "Alpha Pro MENA × Baker Tilly",
    nav: { dashboard: "Dashboard", newAnalysis: "New Analysis", applications: "Applications", settings: "Settings" },
    dashboard: {
      title: "Portfolio Overview",
      newBtn: "New Analysis",
      totalApps: "Total Applications",
      avgRisk: "Avg Risk Score",
      approvalRate: "Approval Rate",
      underReview: "SAR Under Review",
      riskDist: "Risk Distribution",
      low: "Low",
      medium: "Medium",
      high: "High",
      recentApps: "Recent Applications",
      company: "Company",
      sector: "Sector",
      score: "Score",
      level: "Level",
      decision: "Decision",
      view: "View",
      empty: "No applications yet. Start your first analysis!",
    },
    wizard: {
      step1: "Company Info",
      step2: "Financial Data",
      step3: "Compliance",
      step4: "Review",
      companyName: "Company Name",
      sector: "Sector",
      years: "Years in Business",
      employees: "Employees",
      revenue: "Annual Revenue (SAR)",
      financing: "Financing Amount (SAR)",
      purpose: "Purpose of Financing",
      ratio: "Financing / Monthly Income Ratio",
      ratioWarn: "Warning: Ratio exceeds SAMA 65% limit!",
      cr: "Commercial Register (MISA)",
      valid: "Valid",
      expired: "Expired",
      zatca: "ZATCA Status",
      compliant: "Compliant",
      nonCompliant: "Non-compliant",
      simah: "SIMAH Credit",
      clean: "Clean",
      minorIssues: "Minor Issues",
      majorIssues: "Major Issues",
      saudization: "Saudization %",
      samaChecks: "SAMA Compliance Checks",
      chk1: "Financing/Income ≤ 65%",
      chk2: "Max SAR 15M",
      chk3: "Valid CR (MISA)",
      chk4: "ZATCA Compliant",
      chk5: "Clean SIMAH",
      chk6: "Saudization ≥ 30%",
      review: "Review Summary",
      analyzeBtn: "Analyze with AI",
      next: "Next",
      prev: "Previous",
      analyzing: "Analyzing...",
      selectSector: "Select Sector",
    },
    sectors: [
      "Retail & Trade",
      "Food & Beverage",
      "Construction",
      "Technology",
      "Healthcare",
      "Manufacturing",
      "Transportation",
      "Education",
      "Real Estate",
      "Agriculture",
      "Professional Services",
      "Tourism & Hospitality",
    ],
    result: {
      title: "Risk Analysis Report",
      save: "Save to Portfolio",
      newAnalysis: "New Analysis",
      riskScore: "Risk Score",
      riskLevel: "Risk Level",
      recommendation: "Recommendation",
      recAmount: "Recommended Amount",
      recTenor: "Recommended Tenor",
      summary: "Executive Summary",
      strengths: "Strengths",
      risks: "Risk Factors",
      sharia: "Sharia Compliance",
      samaFlags: "SAMA Regulatory Notes",
      samaChecks: "SAMA Compliance Checks",
      conditions: "Conditions",
      saved: "Saved!",
    },
    apps: {
      title: "Applications",
      search: "Search company...",
      filterAll: "All Levels",
      filterLow: "Low",
      filterMedium: "Medium",
      filterHigh: "High",
      date: "Date",
      company: "Company",
      sector: "Sector",
      score: "Score",
      level: "Level",
      decision: "Decision",
      view: "View",
      empty: "No saved applications yet.",
    },
    settings: {
      title: "Settings",
      langLabel: "Language",
      about: "About",
      aboutText: "SME Risk Intelligence Platform — Built by Alpha Pro MENA × Baker Tilly. Powered by Claude AI. SAMA-compliant SME credit risk analysis for Islamic finance in Saudi Arabia.",
    },
    accept: "Accept",
    review: "Review",
    reject: "Reject",
  },
  ar: {
    brand: "منصة تقييم مخاطر المنشآت",
    tagline: "مدعوم بالذكاء الاصطناعي · متوافق مع ساما",
    credit: "ألفا برو مينا × بيكر تيلي",
    nav: { dashboard: "لوحة التحكم", newAnalysis: "تحليل جديد", applications: "الطلبات", settings: "الإعدادات" },
    dashboard: {
      title: "نظرة عامة على المحفظة",
      newBtn: "تحليل جديد",
      totalApps: "إجمالي الطلبات",
      avgRisk: "متوسط درجة المخاطر",
      approvalRate: "نسبة القبول",
      underReview: "ريال تحت المراجعة",
      riskDist: "توزيع المخاطر",
      low: "منخفض",
      medium: "متوسط",
      high: "مرتفع",
      recentApps: "الطلبات الأخيرة",
      company: "الشركة",
      sector: "القطاع",
      score: "الدرجة",
      level: "المستوى",
      decision: "القرار",
      view: "عرض",
      empty: "لا توجد طلبات بعد. ابدأ أول تحليل!",
    },
    wizard: {
      step1: "معلومات الشركة",
      step2: "البيانات المالية",
      step3: "الامتثال",
      step4: "المراجعة",
      companyName: "اسم الشركة",
      sector: "القطاع",
      years: "سنوات العمل",
      employees: "عدد الموظفين",
      revenue: "الإيرادات السنوية (ريال)",
      financing: "مبلغ التمويل (ريال)",
      purpose: "الغرض من التمويل",
      ratio: "نسبة التمويل / الدخل الشهري",
      ratioWarn: "تحذير: النسبة تتجاوز حد ساما 65%!",
      cr: "السجل التجاري (وزارة الاستثمار)",
      valid: "ساري",
      expired: "منتهي",
      zatca: "حالة هيئة الزكاة والضريبة",
      compliant: "متوافق",
      nonCompliant: "غير متوافق",
      simah: "سمة الائتمانية",
      clean: "نظيف",
      minorIssues: "مشاكل بسيطة",
      majorIssues: "مشاكل كبيرة",
      saudization: "نسبة السعودة %",
      samaChecks: "فحوصات الامتثال لساما",
      chk1: "التمويل/الدخل ≤ 65%",
      chk2: "الحد الأقصى 15 مليون ريال",
      chk3: "سجل تجاري ساري",
      chk4: "متوافق مع الزكاة والضريبة",
      chk5: "سمة نظيفة",
      chk6: "السعودة ≥ 30%",
      review: "ملخص المراجعة",
      analyzeBtn: "تحليل بالذكاء الاصطناعي",
      next: "التالي",
      prev: "السابق",
      analyzing: "جاري التحليل...",
      selectSector: "اختر القطاع",
    },
    sectors: [
      "التجزئة والتجارة",
      "الأغذية والمشروبات",
      "المقاولات",
      "التقنية",
      "الرعاية الصحية",
      "التصنيع",
      "النقل",
      "التعليم",
      "العقارات",
      "الزراعة",
      "الخدمات المهنية",
      "السياحة والضيافة",
    ],
    result: {
      title: "تقرير تحليل المخاطر",
      save: "حفظ في المحفظة",
      newAnalysis: "تحليل جديد",
      riskScore: "درجة المخاطر",
      riskLevel: "مستوى المخاطر",
      recommendation: "التوصية",
      recAmount: "المبلغ الموصى به",
      recTenor: "المدة الموصى بها",
      summary: "الملخص التنفيذي",
      strengths: "نقاط القوة",
      risks: "عوامل المخاطر",
      sharia: "الامتثال الشرعي",
      samaFlags: "ملاحظات ساما التنظيمية",
      samaChecks: "فحوصات الامتثال لساما",
      conditions: "الشروط",
      saved: "تم الحفظ!",
    },
    apps: {
      title: "الطلبات",
      search: "بحث عن شركة...",
      filterAll: "جميع المستويات",
      filterLow: "منخفض",
      filterMedium: "متوسط",
      filterHigh: "مرتفع",
      date: "التاريخ",
      company: "الشركة",
      sector: "القطاع",
      score: "الدرجة",
      level: "المستوى",
      decision: "القرار",
      view: "عرض",
      empty: "لا توجد طلبات محفوظة بعد.",
    },
    settings: {
      title: "الإعدادات",
      langLabel: "اللغة",
      about: "حول المنصة",
      aboutText: "منصة تقييم مخاطر المنشآت — من تطوير ألفا برو مينا × بيكر تيلي. مدعوم بالذكاء الاصطناعي كلود. تحليل مخاطر الائتمان للمنشآت الصغيرة والمتوسطة المتوافق مع ساما للتمويل الإسلامي في المملكة العربية السعودية.",
    },
    accept: "اقبل",
    review: "راجع",
    reject: "ارفض",
  },
};

const STORAGE_KEY = "sme_risk_apps_v1";
const loadApps = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
const saveApps = (a) => localStorage.setItem(STORAGE_KEY, JSON.stringify(a));

/* ─── colour helpers ─── */
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

/* ─── SAMA checks helper ─── */
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

export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("dashboard");
  const [apps, setApps] = useState(loadApps);
  const [viewResult, setViewResult] = useState(null);
  const [viewForm, setViewForm] = useState(null);
  const t = T[lang];
  const isRtl = lang === "ar";

  useEffect(() => { saveApps(apps); }, [apps]);

  /* ─── Sidebar ─── */
  const Sidebar = () => {
    const items = [
      { key: "dashboard", icon: "◈", label: t.nav.dashboard },
      { key: "wizard", icon: "+", label: t.nav.newAnalysis },
      { key: "applications", icon: "≡", label: t.nav.applications },
      { key: "settings", icon: "⚙", label: t.nav.settings },
    ];
    return (
      <div style={{ width: 200, minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 16px", marginBottom: 32 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{t.brand}</div>
          <div style={{ color: "#BE1E2D", fontSize: 10, marginTop: 4 }}>{t.tagline}</div>
        </div>
        <div style={{ flex: 1 }}>
          {items.map((it) => {
            const active = screen === it.key || (screen === "result" && it.key === "wizard");
            return (
              <div
                key={it.key}
                onClick={() => { setScreen(it.key); setViewResult(null); setViewForm(null); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer",
                  background: active ? "rgba(190,30,45,0.15)" : "transparent",
                  borderRight: !isRtl && active ? "2px solid #BE1E2D" : "none",
                  borderLeft: isRtl && active ? "2px solid #BE1E2D" : "none",
                  color: active ? "#fff" : "#8888a0", fontSize: 13, transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{it.icon}</span>
                <span>{it.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: "0 16px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {["en", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  flex: 1, padding: "5px 0", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600,
                  background: lang === l ? "#BE1E2D" : "rgba(255,255,255,0.08)", color: "#fff",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ color: "#555", fontSize: 9, textAlign: "center" }}>{t.credit}</div>
        </div>
      </div>
    );
  };

  /* ─── Dashboard ─── */
  const Dashboard = () => {
    const total = apps.length;
    const avgScore = total ? Math.round(apps.reduce((s, a) => s + (a.riskScore || 0), 0) / total) : 0;
    const accepted = apps.filter((a) => {
      const r = (a.recommendation || "").toLowerCase();
      return r === "accept" || r === "اقبل";
    }).length;
    const approvalRate = total ? Math.round((accepted / total) * 100) : 0;
    const underReview = apps
      .filter((a) => { const r = (a.recommendation || "").toLowerCase(); return r === "review" || r === "راجع"; })
      .reduce((s, a) => s + (a.formData?.financing ? Number(a.formData.financing) : 0), 0);
    const lowCount = apps.filter((a) => a.riskLevel === "low").length;
    const medCount = apps.filter((a) => a.riskLevel === "medium").length;
    const highCount = apps.filter((a) => a.riskLevel === "high").length;
    const avgColor = avgScore <= 30 ? riskColor("low") : avgScore <= 60 ? riskColor("medium") : riskColor("high");

    const statCards = [
      { label: t.dashboard.totalApps, value: total, color: null },
      { label: t.dashboard.avgRisk, value: avgScore, color: avgColor },
      { label: t.dashboard.approvalRate, value: `${approvalRate}%`, color: null },
      { label: t.dashboard.underReview, value: `SAR ${underReview.toLocaleString()}`, color: null },
    ];

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.dashboard.title}</h2>
          <button onClick={() => setScreen("wizard")} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>
            {t.dashboard.newBtn}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {statCards.map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color ? c.color.text : "#1a1a1a", background: c.color ? c.color.bg : "transparent", display: "inline-block", padding: c.color ? "2px 8px" : 0, borderRadius: 4 }}>
                {c.value}
              </div>
            </div>
          ))}
        </div>
        {/* Risk Distribution */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.riskDist}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: t.dashboard.low, count: lowCount, color: riskColor("low") },
              { label: t.dashboard.medium, count: medCount, color: riskColor("medium") },
              { label: t.dashboard.high, count: highCount, color: riskColor("high") },
            ].map((r, i) => (
              <div key={i} style={{ flex: 1, background: r.color.bg, borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: r.color.text }}>{r.count}</div>
                <div style={{ fontSize: 11, color: r.color.text, marginTop: 2 }}>{r.label}</div>
                <div style={{ marginTop: 8, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}>
                  <div style={{ height: 4, borderRadius: 2, background: r.color.text, width: total ? `${(r.count / total) * 100}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Applications */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.dashboard.recentApps}</div>
          {apps.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.dashboard.empty}</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  {[t.dashboard.company, t.dashboard.sector, t.dashboard.score, t.dashboard.level, t.dashboard.decision, ""].map((h, i) => (
                    <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.slice(0, 10).map((a) => {
                  const rc = riskColor(a.riskLevel);
                  return (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                      <td style={{ padding: "8px 6px" }}>{a.formData?.companyName || "—"}</td>
                      <td style={{ padding: "8px 6px" }}>{a.formData?.sector || "—"}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.riskScore}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <span style={{ background: rc.bg, color: rc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.riskLevel}</span>
                      </td>
                      <td style={{ padding: "8px 6px", color: recColor(a.recommendation), fontWeight: 600 }}>{a.recommendation}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("result"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>
                          {t.dashboard.view}
                        </button>
                      </td>
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

  /* ─── Wizard ─── */
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
      setLoading(true);
      setError("");
      const sectorEn = enSectors[sectorOptions.indexOf(form.sector)] || form.sector;
      const msg = `SME Credit Risk Analysis Request:
Company: ${form.companyName}
Sector: ${sectorEn}
Years in Business: ${form.years}
Employees: ${form.employees}
Annual Revenue: SAR ${Number(form.revenue).toLocaleString()}
Requested Financing: SAR ${Number(form.financing).toLocaleString()}
Purpose: ${form.purpose}
Financing/Monthly Income Ratio: ${ratioPercent}%
Commercial Register (MISA): ${form.cr}
ZATCA Status: ${form.zatca}
SIMAH Credit: ${form.simah}
Saudization: ${form.saudization}%`;
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: msg, lang }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        const result = data.result;
        const appEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          riskScore: result.riskScore,
          riskLevel: result.riskLevel,
          recommendation: result.recommendation,
          samaScore: samaChecks.filter(Boolean).length,
          samaChecks,
          formData: form,
          ...result,
        };
        setViewResult(appEntry);
        setViewForm(form);
        setScreen("result");
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    const steps = [t.wizard.step1, t.wizard.step2, t.wizard.step3, t.wizard.step4];

    const fieldStyle = { marginBottom: 14 };
    const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 };

    return (
      <div>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: step > i + 1 ? "#27500A" : step === i + 1 ? "#BE1E2D" : "#ddd",
                  color: "#fff", fontSize: 12, fontWeight: 700,
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <div style={{ fontSize: 10, marginTop: 4, color: step === i + 1 ? "#BE1E2D" : "#888" }}>{s}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#27500A" : "#ddd", margin: "0 4px", marginBottom: 18 }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 24, maxWidth: 560, margin: "0 auto" }}>
          {step === 1 && (
            <>
              <div style={fieldStyle}><label style={labelStyle}>{t.wizard.companyName}</label><input value={form.companyName} onChange={(e) => up("companyName", e.target.value)} /></div>
              <div style={fieldStyle}>
                <label style={labelStyle}>{t.wizard.sector}</label>
                <select value={form.sector} onChange={(e) => up("sector", e.target.value)}>
                  <option value="">{t.wizard.selectSector}</option>
                  {sectorOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fieldStyle}><label style={labelStyle}>{t.wizard.years}</label><input type="number" value={form.years} onChange={(e) => up("years", e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>{t.wizard.employees}</label><input type="number" value={form.employees} onChange={(e) => up("employees", e.target.value)} /></div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={fieldStyle}><label style={labelStyle}>{t.wizard.revenue}</label><input type="number" value={form.revenue} onChange={(e) => up("revenue", e.target.value)} /></div>
              <div style={fieldStyle}><label style={labelStyle}>{t.wizard.financing}</label><input type="number" value={form.financing} onChange={(e) => up("financing", e.target.value)} /></div>
              <div style={fieldStyle}><label style={labelStyle}>{t.wizard.purpose}</label><input value={form.purpose} onChange={(e) => up("purpose", e.target.value)} /></div>
              {monthlyIncome > 0 && (
                <div style={{ padding: 12, borderRadius: 6, background: ratio > 0.65 ? "#fcebeb" : "#eaf3de", marginTop: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: ratio > 0.65 ? "#501313" : "#27500A" }}>
                    {t.wizard.ratio}: {ratioPercent}%
                  </div>
                  {ratio > 0.65 && <div style={{ fontSize: 11, color: "#501313", marginTop: 4 }}>{t.wizard.ratioWarn}</div>}
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>{t.wizard.cr}</label>
                  <select value={form.cr} onChange={(e) => up("cr", e.target.value)}>
                    <option value="valid">{t.wizard.valid}</option>
                    <option value="expired">{t.wizard.expired}</option>
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>{t.wizard.zatca}</label>
                  <select value={form.zatca} onChange={(e) => up("zatca", e.target.value)}>
                    <option value="compliant">{t.wizard.compliant}</option>
                    <option value="non-compliant">{t.wizard.nonCompliant}</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>{t.wizard.simah}</label>
                  <select value={form.simah} onChange={(e) => up("simah", e.target.value)}>
                    <option value="clean">{t.wizard.clean}</option>
                    <option value="minor">{t.wizard.minorIssues}</option>
                    <option value="major">{t.wizard.majorIssues}</option>
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>{t.wizard.saudization}</label>
                  <input type="number" value={form.saudization} onChange={(e) => up("saudization", e.target.value)} min="0" max="100" />
                </div>
              </div>
              {/* SAMA Checks */}
              <div style={{ marginTop: 16, padding: 14, background: "#f9f9fb", borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{t.wizard.samaChecks}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {chkLabels.map((lbl, i) => (
                    <div key={i} style={{
                      padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center",
                      background: samaChecks[i] ? "#eaf3de" : "#fcebeb",
                      color: samaChecks[i] ? "#27500A" : "#501313",
                    }}>
                      {samaChecks[i] ? "✓" : "✗"} {lbl}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{t.wizard.review}</div>
              {[
                [t.wizard.companyName, form.companyName],
                [t.wizard.sector, form.sector],
                [t.wizard.years, form.years],
                [t.wizard.employees, form.employees],
                [t.wizard.revenue, `SAR ${Number(form.revenue).toLocaleString()}`],
                [t.wizard.financing, `SAR ${Number(form.financing).toLocaleString()}`],
                [t.wizard.purpose, form.purpose],
                [t.wizard.ratio, `${ratioPercent}%`],
                [t.wizard.cr, form.cr === "valid" ? t.wizard.valid : t.wizard.expired],
                [t.wizard.zatca, form.zatca === "compliant" ? t.wizard.compliant : t.wizard.nonCompliant],
                [t.wizard.simah, form.simah === "clean" ? t.wizard.clean : form.simah === "minor" ? t.wizard.minorIssues : t.wizard.majorIssues],
                [t.wizard.saudization, `${form.saudization}%`],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v || "—"}</span>
                </div>
              ))}
              {error && <div style={{ marginTop: 12, padding: 10, background: "#fcebeb", color: "#501313", borderRadius: 6, fontSize: 12 }}>{error}</div>}
            </>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 18px", fontSize: 13 }}>
                {t.wizard.prev}
              </button>
            ) : <div />}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>
                {t.wizard.next}
              </button>
            ) : (
              <button onClick={submit} disabled={loading} style={{ background: "#BE1E2D", color: "#fff", border: "none", padding: "8px 22px", fontSize: 13, fontWeight: 600 }}>
                {loading ? t.wizard.analyzing : t.wizard.analyzeBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ─── Result ─── */
  const Result = () => {
    const [saved, setSaved] = useState(false);
    if (!viewResult) return null;
    const r = viewResult;
    const rc = riskColor(r.riskLevel);
    const samaChecks = r.samaChecks || computeSamaChecks(viewForm || {});
    const chkLabels = [t.wizard.chk1, t.wizard.chk2, t.wizard.chk3, t.wizard.chk4, t.wizard.chk5, t.wizard.chk6];

    const handleSave = () => {
      const existing = loadApps();
      if (!existing.find((a) => a.id === r.id)) {
        const updated = [r, ...existing];
        saveApps(updated);
        setApps(updated);
      }
      setSaved(true);
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t.result.title}</h2>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.formData?.companyName || viewForm?.companyName} — {r.formData?.sector || viewForm?.sector}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} disabled={saved} style={{ background: saved ? "#27500A" : "#BE1E2D", color: "#fff", border: "none", padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>
              {saved ? t.result.saved : t.result.save}
            </button>
            <button onClick={() => setScreen("wizard")} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "8px 16px", fontSize: 12 }}>
              {t.result.newAnalysis}
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.riskScore}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: rc.text }}>{r.riskScore}</div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.riskLevel}</div>
            <span style={{ background: rc.bg, color: rc.text, padding: "4px 14px", borderRadius: 4, fontSize: 14, fontWeight: 700 }}>{r.riskLevel}</span>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.result.recommendation}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: recColor(r.recommendation) }}>{r.recommendation}</div>
          </div>
        </div>

        {/* Recommended Amount & Tenor */}
        {(r.recommendedFinancingAmount || r.recommendedTenor) && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {r.recommendedFinancingAmount && (
              <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: "#888" }}>{t.result.recAmount}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>SAR {Number(r.recommendedFinancingAmount).toLocaleString()}</div>
              </div>
            )}
            {r.recommendedTenor && (
              <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: "#888" }}>{t.result.recTenor}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{r.recommendedTenor}</div>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.summary}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{r.summary}</div>
        </div>

        {/* Strengths & Risks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.result.strengths}</div>
            {(r.strengths || []).map((s, i) => (
              <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#27500A" }}>✓ {s}</div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#501313" }}>{t.result.risks}</div>
            {(r.risks || []).map((s, i) => (
              <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#501313" }}>! {s}</div>
            ))}
          </div>
        </div>

        {/* Sharia & SAMA Flags */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#eaf3de", border: "0.5px solid #d5e8c0", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#27500A" }}>{t.result.sharia}</div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: "#27500A" }}>{r.shariaNote}</div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#633806" }}>{t.result.samaFlags}</div>
            {(r.samaFlags || []).map((f, i) => (
              <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#633806" }}>⚑ {f}</div>
            ))}
          </div>
        </div>

        {/* SAMA Checks */}
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.result.samaChecks}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {chkLabels.map((lbl, i) => (
              <div key={i} style={{
                padding: "6px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: "center",
                background: samaChecks[i] ? "#eaf3de" : "#fcebeb",
                color: samaChecks[i] ? "#27500A" : "#501313",
              }}>
                {samaChecks[i] ? "✓" : "✗"} {lbl}
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        {r.conditions && r.conditions.length > 0 && (
          <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.result.conditions}</div>
            {r.conditions.map((c, i) => (
              <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "#444" }}>{i + 1}. {c}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ─── Applications ─── */
  const Applications = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const filtered = apps.filter((a) => {
      const matchSearch = !search || (a.formData?.companyName || "").toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || a.riskLevel === filter;
      return matchSearch && matchFilter;
    });

    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.apps.title}</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input placeholder={t.apps.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 260 }} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 160 }}>
            <option value="all">{t.apps.filterAll}</option>
            <option value="low">{t.apps.filterLow}</option>
            <option value="medium">{t.apps.filterMedium}</option>
            <option value="high">{t.apps.filterHigh}</option>
          </select>
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", padding: 32, fontSize: 13 }}>{t.apps.empty}</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  {[t.apps.date, t.apps.company, t.apps.sector, t.apps.score, t.apps.level, t.apps.decision, ""].map((h, i) => (
                    <th key={i} style={{ textAlign: isRtl ? "right" : "left", padding: "8px 6px", fontWeight: 600, fontSize: 11, color: "#888" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const rc = riskColor(a.riskLevel);
                  return (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                      <td style={{ padding: "8px 6px", fontSize: 11 }}>{new Date(a.date).toLocaleDateString()}</td>
                      <td style={{ padding: "8px 6px" }}>{a.formData?.companyName || "—"}</td>
                      <td style={{ padding: "8px 6px" }}>{a.formData?.sector || "—"}</td>
                      <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.riskScore}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <span style={{ background: rc.bg, color: rc.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{a.riskLevel}</span>
                      </td>
                      <td style={{ padding: "8px 6px", color: recColor(a.recommendation), fontWeight: 600 }}>{a.recommendation}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <button onClick={() => { setViewResult(a); setViewForm(a.formData); setScreen("result"); }} style={{ background: "none", border: "0.5px solid #d0d0d0", padding: "3px 10px", fontSize: 11 }}>
                          {t.apps.view}
                        </button>
                      </td>
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

  /* ─── Settings ─── */
  const Settings = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{t.settings.title}</h2>
      <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 20, maxWidth: 480, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.settings.langLabel}</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["en", "ar"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "8px 24px", border: lang === l ? "none" : "0.5px solid #d0d0d0",
                background: lang === l ? "#BE1E2D" : "#fff", color: lang === l ? "#fff" : "#1a1a1a",
                fontSize: 13, fontWeight: 600,
              }}
            >
              {l === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: "0.5px solid #e8e8e8", borderRadius: 8, padding: 20, maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.settings.about}</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "#444" }}>{t.settings.aboutText}</div>
      </div>
    </div>
  );

  /* ─── Layout ─── */
  return (
    <div style={{ display: "flex", direction: isRtl ? "rtl" : "ltr", minHeight: "100vh", width: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 28, overflowY: "auto", textAlign: isRtl ? "right" : "left" }}>
        {screen === "dashboard" && <Dashboard />}
        {screen === "wizard" && <Wizard />}
        {screen === "result" && <Result />}
        {screen === "applications" && <Applications />}
        {screen === "settings" && <Settings />}
      </div>
    </div>
  );
}
