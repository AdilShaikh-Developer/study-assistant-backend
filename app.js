import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import syllabusRouter from "./routes/syllabus.js";
import assessmentRouter from "./routes/assessment.js";

export const App = express();

dotenv.config();

App.use(express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.json({
    success: true,
    message: "App is successfully started",
    client: process.env.CLIENT_URL,
  });
});

App.use("/api/v1/syllabus", syllabusRouter);
App.use("/api/v1/assessments", assessmentRouter);
