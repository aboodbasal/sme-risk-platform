import express from "express";
const router = express.Router();

const SYSTEM_PROMPT = `You are a senior credit analyst at an Islamic finance company in Saudi Arabia, operating under SAMA (Saudi Central Bank) regulations.

Your job is to analyze financing applications and produce a credit score and eligibility decision.

SCORING FRAMEWORK:
- Income Adequacy (25 points): Financing/income ratio, salary stability, income sources
- Credit History (25 points): SIMAH score, previous defaults, existing obligations
- Employment Stability (20 points): Job type (government=highest), years employed, sector
- Debt-to-Income Ratio (15 points): Total monthly obligations vs income
- Compliance Score (15 points): SAMA compliance, ZATCA, CR, Absher verification

TOTAL SCORE 0-100:
- 80-100: Excellent → APPROVED
- 60-79: Good → APPROVED with standard conditions
- 40-59: Fair → CONDITIONAL (needs additional docs/guarantor)
- 0-39: Poor → REJECTED

SAMA REGULATIONS TO ENFORCE:
- Individual: financing/monthly income ratio ≤ 65%
- SME: financing/monthly revenue (monthly) ≤ 65%
- Max individual financing: SAR 5,000,000
- Max SME financing: SAR 15,000,000
- Government employees: preferred risk (stable income)
- Non-Saudi nationals: higher risk weight, shorter tenor
- Previous defaults: automatic risk flag

ISLAMIC FINANCE STRUCTURES:
- Murabaha: best for asset purchase (vehicles, equipment)
- Ijarah: best for long-term assets, real estate
- Tawarruq: best for cash/working capital needs
- Always recommend Sharia-compliant structure

Return ONLY valid JSON:
{
  "creditScore": <0-100>,
  "scoreLabel": "<Excellent|Good|Fair|Poor>",
  "eligibility": "<Approved|Conditional|Rejected>",
  "confidenceLevel": "<High|Medium|Low>",
  "summary": "<2-3 sentence executive summary>",
  "recommendedStructure": "<Murabaha|Ijarah|Tawarruq>",
  "structureReason": "<1 sentence why this structure>",
  "recommendedAmount": <integer>,
  "recommendedTenor": "<e.g. 36 months>",
  "estimatedProfitRate": "<e.g. 4.5% - 6.2%>",
  "scoreBreakdown": {
    "incomeAdequacy": <0-25>,
    "creditHistory": <0-25>,
    "employmentStability": <0-20>,
    "debtToIncome": <0-15>,
    "complianceScore": <0-15>
  },
  "positiveFactors": ["<factor 1>", "<factor 2>", "<factor 3>"],
  "riskFlags": ["<flag 1>", "<flag 2>"],
  "shariaNote": "<Sharia compliance note>",
  "samaFlags": ["<SAMA flag 1>", "<flag 2>"],
  "conditions": ["<condition 1>", "<condition 2>"],
  "rejectionReasons": ["<reason if rejected>"]
}

If Arabic requested: eligibility = موافق|مشروط|مرفوض, scoreLabel = ممتاز|جيد|مقبول|ضعيف, all text in Arabic.`;

router.post("/", async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server." });
    }

    const { userMessage, lang } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required." });
    }

    const system = lang === "ar"
      ? SYSTEM_PROMPT + "\n\nIMPORTANT: Respond in Arabic. eligibility must be: موافق | مشروط | مرفوض. scoreLabel must be: ممتاز | جيد | مقبول | ضعيف"
      : SYSTEM_PROMPT;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `Anthropic API error: ${err}` });
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || "{}";

    let parsed;
    try {
      parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response.", raw: rawText });
    }

    res.json({ result: parsed });
  } catch (err) {
    console.error("Credit score route error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
