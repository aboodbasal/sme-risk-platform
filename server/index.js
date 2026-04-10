import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";
import creditScoreRouter from "./routes/credit-score.js";
import shariaAuditRouter from "./routes/sharia-audit.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/analyze", analyzeRouter);
app.use("/api/credit-score", creditScoreRouter);
app.use("/api/sharia-audit", shariaAuditRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    version: "3.0.0",
    platform: "Alpha Pro MENA — SME Risk Intelligence, Credit Scoring & Sharia Audit",
    timestamp: new Date().toISOString(),
  });
});

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Alpha Pro MENA Platform running on http://localhost:${PORT}`);
  console.log(`API Key: ${process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING - app will not work"}`);
});
