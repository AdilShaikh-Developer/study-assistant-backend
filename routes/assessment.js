import express from "express";
import {
  createAssessment,
  endAssessment,
  getAssessment,
  getAssessments,
  updateAnswerKey,
} from "../controllers/assessment.js";

const App = express.Router();

App.get("/", getAssessments);
App.post("/create", createAssessment);
App.patch("/end", endAssessment);
App.patch("/update-answer", updateAnswerKey);
App.get("/:id", getAssessment);

export default App;
