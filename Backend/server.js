const express = require('express');
const mongoose = require('mongoose');
const problemRoutes = require('./routes/problemRoute');
const bundleRoutes = require('./routes/bundleRoutes');
const testCaseRoutes = require('./routes/testCaseRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS for all requests

// MongoDB connection setup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database connection error:', err));

// Import routes
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

// API routes
app.use('/api/problems', problemRoutes);
app.use('/api/bundles', bundleRoutes);
app.use('/api/testcases', testCaseRoutes);

// OpenAI API Key (optional: do not log in production)
const openaiApiKey = process.env.OPENAI_API_KEY;
if (openaiApiKey) {
  console.log("OpenAI API Key loaded successfully.");
} else {
  console.log("OpenAI API Key not found!");
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
