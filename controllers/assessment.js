import { Assessment } from "../models/assessment.js";

export const getAssessments = async (req, res) => {
  const assessments = await Assessment.find();
  // const assessments = await Assessment.find().deleteMany({ standard: 11 });

  res.json({
    success: true,
    assessments,
  });
};

export const getAssessment = async (req, res) => {
  const { id } = req.params;
  const assessment = await Assessment.findById(id);

  res.json({
    success: true,
    assessment,
  });
};

export const createAssessment = async (req, res) => {
  const { standard, subject, chapterName, problemLength } = req.body;

  const response = await Assessment.create({
    standard,
    subject,
    chapter: chapterName,
    endedAt: new Date(Date.now() + problemLength * 60 * 1000),
    answerKey: new Array(problemLength).fill(undefined),
    scoreArray: new Array(problemLength).fill(0),
  });

  res.json({
    success: true,
    response,
  });
};

export const endAssessment = async (req, res) => {
  const { id, endedAt } = req.body;

  const response = await Assessment.findById(id);
  response.endedAt = new Date(endedAt);
  response.save();

  res.json({
    success: true,
    endedAt,
    response,
  });
};

export const updateAnswerKey = async (req, res) => {
  const { id, studentAnswer, problemIndex, currentQuestionScore } = req.body;

  const response = await Assessment.findById(id);

  response.answerKey[problemIndex] = studentAnswer;
  response.scoreArray[problemIndex] = currentQuestionScore;
  response.save();

  res.json({
    success: true,
    studentAnswer,
    currentQuestionScore,
    answerKey: response.answerKey,
    scoreArray: response.scoreArray,
  });
};
