import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/analyze", analyzeRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    platform: "SME Risk Intelligence — Alpha Pro MENA",
    timestamp: new Date().toISOString(),
  });
});

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`SME Risk Platform running on http://localhost:${PORT}`);
  console.log(`API Key: ${process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING - app will not work"}`);
});
