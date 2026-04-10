import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";
import creditScoreRouter from "./routes/credit-score.js";
import shariaAuditRouter from "./routes/sharia-audit.js";
import collectionsRouter from "./routes/collections.js";
import vehicleValuationRouter from "./routes/vehicle-valuation.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Request logging (lightweight)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/") && req.method === "POST") {
    const start = Date.now();
    res.on("finish", () => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`);
    });
  }
  next();
});

// API routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/credit-score", creditScoreRouter);
app.use("/api/sharia-audit", shariaAuditRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/vehicle-valuation", vehicleValuationRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    version: "5.1.0",
    platform: "Alpha Pro MENA — SME Risk, Credit Scoring, Sharia Audit, Collections & Vehicle Valuation",
    apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Serve React frontend
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// Global error handler (must be last)
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Alpha Pro MENA Platform running on http://localhost:${PORT}`);
  console.log(`API Key: ${process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING - AI features will not work"}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
