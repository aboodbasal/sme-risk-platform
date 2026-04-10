import express from "express";
const router = express.Router();

const SYSTEM_PROMPT = `You are a senior collections analyst specializing in Islamic finance portfolio management in Saudi Arabia, operating under SAMA (Saudi Central Bank) regulations.

Your job is to analyze individual financing accounts and predict default probability, recommend collection actions, and suggest restructuring options.

SAMA COLLECTIONS GUIDELINES TO ENFORCE:
1. Penalty charges must go to charity (Sadaqah) — banks cannot keep late payment fees as income
2. Customer must receive written notice before any legal action
3. Minimum 90 DPD before legal action initiation (typically)
4. Restructured agreements must maintain Sharia compliance — requires new Islamic contract
5. Debt collection must respect customer dignity — no harassment per SAMA consumer protection rules
6. Customer has right to know outstanding balance and payment schedule at any time
7. Foreclosure on collateral requires court order

DEFAULT PREDICTION FACTORS (weight accordingly):
- Days Past Due (DPD): highest weight — 0 DPD=low risk, 30+ DPD=high risk, 60+ DPD=critical
- Payment pattern trend: deteriorating = major red flag
- Employment/business change: job loss = immediate escalation
- Contact responsiveness: unresponsive = critical signal
- Number of missed payments: cumulative indicator
- Existing restructuring: already restructured = higher re-default risk
- Collateral availability: reduces loss severity but not default probability
- SIMAH deterioration: external signal of financial stress

COLLECTION ACTION PRIORITY:
1. Under 30 DPD: Friendly reminder call, SMS, email
2. 31-60 DPD: Dedicated collector call, restructuring discussion, promise to pay
3. 61-90 DPD: Manager escalation, formal notice, restructuring offer
4. 91+ DPD: Legal notice, collateral assessment, settlement offer
5. 180+ DPD: Legal action, collateral liquidation

RESTRUCTURING OPTIONS (Sharia-compliant only):
- Payment holiday: defer installments, extend tenor
- Tenor extension: reduce monthly payment
- Partial settlement: accept less than full outstanding (Ibra)
- New Islamic contract: convert to different structure if needed

Return ONLY valid JSON:
{
  "defaultProbability": <0-100 integer as percentage>,
  "riskTier": "<Current|Watch|At-Risk|Critical|Default>",
  "daysToDefault": "<e.g. 45-60 days|Already defaulted|Low risk - monitor>",
  "summary": "<2-3 sentence assessment>",
  "recommendedActions": [
    {
      "priority": <1-5>,
      "actionType": "<Call|SMS|Restructure|Escalate|Legal|Field Visit>",
      "description": "<specific action to take>",
      "timing": "<Within 24 hours|Within 3 days|Within 1 week>",
      "expectedOutcome": "<what this should achieve>"
    }
  ],
  "warningSignals": ["<signal 1>", "<signal 2>", "<signal 3>"],
  "positiveSignals": ["<signal 1>", "<signal 2>"],
  "restructuringRecommended": "<Yes|No|Consider>",
  "restructuringOptions": ["<option 1>", "<option 2>"],
  "collectionScript": {
    "opening": "<first 30 seconds script>",
    "keyPoints": ["<talking point 1>", "<talking point 2>"],
    "objectionResponse": "<how to handle common objection>"
  },
  "collectionScriptAr": {
    "opening": "<Arabic version>",
    "keyPoints": ["<Arabic point 1>", "<Arabic point 2>"],
    "objectionResponse": "<Arabic version>"
  },
  "escalateToManager": <true|false>,
  "inititateLegal": <true|false>,
  "estimatedRecovery": "<e.g. 75-85%>",
  "samaComplianceNotes": ["<SAMA note 1>", "<SAMA note 2>"],
  "nextReviewDate": "<e.g. 7 days|14 days|30 days>"
}

If Arabic requested: riskTier in Arabic (منتظم|مراقبة|في خطر|حرج|متعثر), all text fields in Arabic.`;

router.post("/", async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not set" });

  const { userMessage, lang, summaryMode } = req.body;
  if (!userMessage) return res.status(400).json({ error: "userMessage is required" });

  const systemPrompt = summaryMode
    ? "You are a portfolio risk analyst. Generate a concise portfolio risk summary narrative. Return JSON: { \"summary\": \"<3 paragraph narrative>\" }"
    : SYSTEM_PROMPT;

  const messages = [{ role: "user", content: userMessage + (lang === "ar" ? "\n\nIMPORTANT: Return ALL text values in Arabic. Risk tier values: منتظم، مراقبة، في خطر، حرج، متعثر. Keep JSON keys in English." : "") }];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, system: systemPrompt, messages }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message || "Anthropic API error" });

    let text = data.content?.[0]?.text || "";
    text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(text);
    res.json({ result: parsed });
  } catch (err) {
    console.error("Collections analysis error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
