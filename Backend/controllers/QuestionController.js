const Question = require("../models/Question");

// Fetch all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

// Fetch questions by topic
exports.getQuestionsByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const questions = await Question.find({ topic });
    if (questions.length === 0) {
      return res.status(404).json({ message: `No questions found for topic: ${topic}` });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions by topic", error: error.message });
  }
};

// Fetch a single question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question", error: error.message });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  const { name, topic, difficulty, description, testCases } = req.body;
  try {
    const newQuestion = new Question({ name, topic, difficulty, description, testCases });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
};

// Update an existing question
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { name, topic, difficulty, description, testCases } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { name, topic, difficulty, description, testCases },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully", deletedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
};
