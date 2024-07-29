import express from "express";
import {
  getSyllabus,
  addToTask,
  removeFromTask,
  completeTask,
  reset,
  addPracticeProblem,
  fetchPracticeProblem,
} from "../controllers/syllabus.js";

const App = express.Router();

App.get("/", getSyllabus);
App.get(
  "/practice-problems/:standard/:subject/:chapterName",
  fetchPracticeProblem
);
App.patch("/add-to-task", addToTask);
App.patch("/remove-from-task", removeFromTask);
App.patch("/complete-task", completeTask);

App.get("/add-practice-problem", addPracticeProblem);

App.get("/reset", reset);

export default App;
