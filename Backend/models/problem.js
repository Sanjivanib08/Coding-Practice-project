const mongoose = require("mongoose");

// Define the Problem schema
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [String],
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
