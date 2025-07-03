import express, { Express } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import { analysisPhotos } from "./controller/analysis.controller";

dotenv.config();

const app: Express = express();
const server = createServer(app);
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/analysis", analysisPhotos);

const port = process.env.PORT || 5050;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
