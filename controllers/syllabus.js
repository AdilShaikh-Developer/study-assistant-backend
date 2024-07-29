import { Syllabus } from "../models/syllabus.js";

export const getSyllabus = async (req, res) => {
  const syllabus = await Syllabus.find();

  res.json({
    success: true,
    syllabus,
  });
};

export const addToTask = async (req, res) => {
  const { standard, subject, chapterId } = req.body;

  const syllabus = await Syllabus.findOne({
    classNumber: `${standard}`,
  });

  const response = syllabus.subjects
    .find((e) => e.subject === subject)
    .chapters.find((e) => e._id == chapterId);

  response.status = "In Progress";
  response.taskAge = new Date();

  await syllabus.save();

  res.json({
    success: true,
    response,
  });
};

export const removeFromTask = async (req, res) => {
  const { standard, subject, chapterId } = req.body;

  const syllabus = await Syllabus.findOne({
    classNumber: `${standard}`,
  });

  const response = syllabus.subjects
    .find((e) => e.subject === subject)
    .chapters.find((e) => e._id == chapterId);
  response.status = "Not Yet Started";
  response.taskAge = 0;

  await syllabus.save();

  res.json({
    success: true,
    response,
  });
};

export const completeTask = async (req, res) => {
  const { standard, subject, chapterId } = req.body;

  const syllabus = await Syllabus.findOne({
    classNumber: `${standard}`,
  });

  const response = syllabus.subjects
    .find((e) => e.subject === subject)
    .chapters.find((e) => e._id == chapterId);
  response.status = "Completed";
  response.taskAge = (new Date() - response.taskAge) / (1000 * 60 * 60 * 24);

  await syllabus.save();

  res.json({
    success: true,
    response,
  });
};

export const addPracticeProblem = async (req, res) => {
  const syllabus = await Syllabus.findOne({ classNumber: 12 });

  const response = syllabus.subjects
    .filter((e) => e.subject === "botany")[0]
    .chapters.filter((e) => e.name === "Molecular Basis of Inheritance")[0];
  // .practiceProblem.push(
  //   {
  //     question:
  //       "<span> first quesition of <b>Molecular Basis of Inheritance</b> </span>",
  //     options: [
  //       "first option",
  //       "second option",
  //       "third option",
  //       "fourth option",
  //     ],
  //     correctOption: 2,
  //   },
  //   {
  //     question:
  //       "<span> second quesition of <b>Molecular Basis of Inheritance</b> </span>",
  //     options: [
  //       "first option",
  //       "second option",
  //       "third option",
  //       "fourth option",
  //     ],
  //     correctOption: 0,
  //   },
  //   {
  //     question:
  //       "<span> third quesition of <b>Molecular Basis of Inheritance</b> </span>",
  //     options: [
  //       "first option",
  //       "second option",
  //       "third option",
  //       "fourth option",
  //     ],
  //     correctOption: 3,
  //   },
  //   {
  //     question:
  //       "<span> fourth quesition of <b>Molecular Basis of Inheritance</b> </span>",
  //     options: [
  //       "first option",
  //       "second option",
  //       "third option",
  //       "fourth option",
  //     ],
  //     correctOption: 1,
  //   }
  // );

  await syllabus.save();

  res.json({
    success: true,
    response,
  });
};

export const fetchPracticeProblem = async (req, res) => {
  const { standard, subject, chapterName } = req.params;

  const syllabus = await Syllabus.findOne({ classNumber: standard });

  const response = syllabus.subjects
    .find((e) => e.subject === subject)
    .chapters.find((e) => e.name === chapterName);

  res.json({
    success: true,
    response: response.practiceProblem,
  });
};

export const reset = async (req, res) => {
  const syllabus = await Syllabus.findOne();

  const response = [syllabus].forEach((e) => {
    e.subjects.forEach((e) =>
      e.chapters.forEach((e) => {
        e.status = "Not Yet Started";
        e.taskAge = 0;
      })
    );
  });

  await syllabus.save();

  res.json({
    success: true,
    response,
  });
};
