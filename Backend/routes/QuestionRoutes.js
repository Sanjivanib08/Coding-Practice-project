const express = require("express");
const {
  getAllQuestions,
  getQuestionsByTopic,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/QuestionController");

const router = express.Router();

// Routes
router.get("/", getAllQuestions); // Fetch all questions
router.get("/topic/:topic", getQuestionsByTopic); // Fetch questions by topic
router.get("/:id", getQuestionById); // Fetch a single question by ID
router.post("/", addQuestion); // Add a new question
router.put("/:id", updateQuestion); // Update a question by ID
router.delete("/:id", deleteQuestion); // Delete a question by ID

module.exports = router;
