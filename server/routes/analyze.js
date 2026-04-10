import express from "express";
const router = express.Router();

const SYSTEM_PROMPT = `You are a credit risk analyst specializing in SME financing in Saudi Arabia under SAMA (Saudi Central Bank) regulations and Islamic finance principles.

REGULATORY FRAMEWORK:
1. SAMA SME Financing Guidelines 2024
2. Maximum financing: SAR 15,000,000 for small enterprises
3. Financing-to-monthly-income ratio must not exceed 65%
4. All financing must be Sharia-compliant (Murabaha, Ijarah, or Tawarruq structures)
5. SIMAH credit bureau verification required
6. ZATCA (Zakat, Tax and Customs Authority) compliance mandatory
7. MISA (Ministry of Investment) commercial register validation
8. Nitaqat Saudization program compliance (minimum 30%)
9. AML/CFT (Anti-Money Laundering) screening required
10. Nafith digital contract requirements for financing above SAR 1M

RISK SCORING:
- 0-30: Low risk → Accept
- 31-60: Medium risk → Review with conditions
- 61-100: High risk → Reject or heavy conditions

Return ONLY valid JSON, no markdown, no extra text:
{
  "riskScore": <integer 0-100>,
  "riskLevel": "<low|medium|high>",
  "recommendation": "<Accept|Review|Reject>",
  "summary": "<2-3 sentence executive summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "shariaNote": "<Sharia compliance assessment and recommended structure: Murabaha/Ijarah/Tawarruq>",
  "samaFlags": ["<SAMA regulatory flag 1>", "<flag 2>"],
  "conditions": ["<condition 1>", "<condition 2>", "<condition 3>"],
  "recommendedFinancingAmount": <integer>,
  "recommendedTenor": "<e.g. 36 months>"
}

If Arabic language requested: use اقبل|راجع|ارفض for recommendation, respond in Arabic for all text fields.`;

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
      ? SYSTEM_PROMPT + "\n\nIMPORTANT: Respond in Arabic. recommendation must be: اقبل | راجع | ارفض"
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
        max_tokens: 1200,
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
    console.error("Analyze route error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
