# SME Risk Intelligence Platform

**AI-powered SME credit risk analysis for Islamic finance in Saudi Arabia**

Built by **Alpha Pro MENA × Baker Tilly**

## Features

- AI-powered credit risk scoring using Claude AI
- SAMA (Saudi Central Bank) regulatory compliance checks
- Sharia-compliant financing structure recommendations (Murabaha, Ijarah, Tawarruq)
- Bilingual interface (English / Arabic with full RTL support)
- Portfolio dashboard with risk distribution analytics
- 4-step analysis wizard with live compliance validation
- Application history with search and filtering
- LocalStorage persistence for portfolio data

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **AI:** Claude claude-sonnet-4-20250514 via Anthropic API
- **Deployment:** Railway

## Quick Start

```bash
# Install dependencies
npm run install:all

# Create .env file
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Build frontend
npm run build

# Start server
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `PORT` | Server port (default: 3001) |
| `NODE_ENV` | Environment (production/development) |

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/analyze` — AI risk analysis

## Deployment

Configured for Railway with `railway.json`. Auto-detects build and start commands.

## License

Proprietary — Alpha Pro MENA × Baker Tilly
