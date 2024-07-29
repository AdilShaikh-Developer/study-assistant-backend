import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    standard: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    endedAt: {
      type: Date,
      required: true,
    },
    answerKey: {
      type: Array,
    },
    scoreArray: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);
