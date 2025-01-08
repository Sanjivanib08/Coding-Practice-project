const express = require("express");
const router = express.Router();
const problemController = require("../controllers/ProblemController");

// Create a new problem with AI-generated test cases
router.post("/create", problemController.createProblem);

// Get all problems
router.get("/", problemController.getAllProblems);

// Generate AI test cases for a problem description
router.post("/generate-ai-test-cases", problemController.generateAiTestCases);

module.exports = router;
