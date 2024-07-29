import mongoose from "mongoose";

// Define schema for a chapter
const practiceProblemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
});

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Not Yet Started", "In Progress", "Completed"], // Add more statuses as needed
    default: "Not Yet Started",
  },
  taskAge: {
    type: Number,
    default: 0,
  },
  questionCount: {
    type: Number,
    default: 0,
  },
  practiceProblem: [practiceProblemSchema],
});

// Define schema for subjects
const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  chapters: [chapterSchema],
});

// Define schema for a class
const classSchema = new mongoose.Schema({
  classNumber: {
    type: String,
    required: true,
  },
  subjects: [subjectSchema],
});

// Create and export the model
export const Syllabus = mongoose.model("Syllabus", classSchema);

// const syllabusSchema = new mongoose.Schema({
//   11: {
//     physics: [],
//     chemistry: [],
//     zoology: [],
//     botany: [],
//   },
//   12: {
//     physics: [],
//     chemistry: [],
//     zoology: [],
//     botany: [],
//   },
// });

// export const Syllabus = mongoose.model("Syllabus", classSchema);
