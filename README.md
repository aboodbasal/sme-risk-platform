# Alpha Pro MENA — AI-Powered Islamic Finance Platform

> SME Risk Intelligence, Credit Scoring, Sharia Compliance Audit, Collections & Early Warning, and Vehicle Valuation — all in one unified, bilingual (EN/AR) platform built for Saudi Arabia's SAMA-regulated Islamic finance sector.

---

## Overview

Alpha Pro MENA is a comprehensive AI-powered platform designed for Islamic finance companies (NBFIs) operating under SAMA (Saudi Central Bank) regulations. It combines five specialized modules into a single application with a unified sidebar navigation, full bilingual support (English/Arabic with RTL), and AI-driven analysis powered by Claude.

## Modules

### 1. SME Risk Intelligence
Analyze SME financing applications for credit risk with SAMA regulatory compliance checks.
- 4-step wizard (Company Info, Financial Data, Compliance, Review)
- Risk scoring (0-100) with Accept/Review/Reject recommendations
- SAMA compliance pre-checks (financing ratio, CR, ZATCA, SIMAH, Saudization)
- Sharia-compliant financing structure recommendations

### 2. Credit Scoring Engine
Score individual and SME applicants for financing eligibility with Islamic finance structure recommendations.
- 5-step wizard with dynamic fields for Individual vs SME applicants
- Credit scoring (0-100) across 5 dimensions
- Eligibility decisions: Approved / Conditional / Rejected
- Islamic financing structure recommendations (Murabaha / Ijarah / Tawarruq)

### 3. Sharia Compliance Audit
Audit Islamic financing contracts against AAOIFI and SAMA standards.
- 3-step wizard (Contract Details, Contract Input, Review)
- Supports 9 Islamic contract types
- Compliance scoring (0-100) across 5 dimensions
- Violation classification with remediation steps
- Standards Library reference

### 4. Collections & Early Warning
AI-powered default prediction and collections management.
- Portfolio dashboard with pre-loaded sample accounts
- Early Warning system with single and bulk analysis modes
- AI-driven default probability prediction (0-100%)
- Call list management with status tracking
- Portfolio aging and SAMA collections reports

### 5. Vehicle Valuation AI
AI-powered vehicle appraisal for Islamic auto financing.
- 3-step wizard (Vehicle Details, Condition, Review)
- AI valuation with Saudi market pricing
- Fraud detection and LTV calculation
- Market comparables and depreciation forecasts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| AI Engine | Claude claude-sonnet-4-20250514 (Anthropic API) |
| Styling | Inline React styles + CSS |
| State | React useState + localStorage |
| Language | Full bilingual EN/AR with RTL |
| Deployment | Railway (Nixpacks) |

## Project Structure

```
sme-risk-platform/
├── package.json
├── railway.json
├── .env.example
├── server/
│   ├── index.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── routes/
│       ├── analyze.js
│       ├── credit-score.js
│       ├── sharia-audit.js
│       ├── collections.js
│       └── vehicle-valuation.js
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── Collections.jsx
        └── VehicleValuation.jsx
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/aboodbasal/sme-risk-platform.git
cd sme-risk-platform

# Install all dependencies
npm run install:all

# Create .env file
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Build and start
npm run build
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `PORT` | Server port (default: 3001) |
| `NODE_ENV` | Environment (production/development) |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/analyze` | SME risk analysis |
| POST | `/api/credit-score` | Credit scoring |
| POST | `/api/sharia-audit` | Sharia compliance audit |
| POST | `/api/collections` | Collections default prediction |
| POST | `/api/vehicle-valuation` | Vehicle valuation |

All POST endpoints accept `{ userMessage, lang }` and return `{ result }` or `{ error: { code, message, retry } }`.

## Deployment (Railway)

1. Push code to GitHub
2. Create a new Railway project from the GitHub repo
3. Set `ANTHROPIC_API_KEY` and `NODE_ENV=production`
4. Railway auto-detects `railway.json` and deploys

## License

Proprietary — Alpha Pro MENA. All rights reserved.
