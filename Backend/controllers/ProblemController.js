const Problem = require("../models/Problem");
const { generateTestCases } = require("../config/openAi");

// Create a new problem
exports.createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, tags } = req.body;

    // Create and save the new problem
    const newProblem = new Problem({ title, description, difficulty, tags });

    // Generate AI test cases for the problem description
    const aiTestCases = await generateTestCases(description);
    newProblem.testCases = aiTestCases;

    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate AI Test Cases (Separate API for standalone usage)
exports.generateAiTestCases = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Problem description is required." });
  }

  try {
    const aiTestCases = await generateTestCases(description);
    res.status(200).json({ testCases: aiTestCases });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate AI test cases." });
  }
};
