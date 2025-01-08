import axios from 'axios';

// Set the base URL for all Axios requests (adjust this based on your backend's URL)
axios.defaults.baseURL = 'http://your-backend-url.com'; // Replace with your backend URL

// Fetch problems from the API
export const fetchProblems = async () => {
  try {
    const response = await axios.get('/api/problems');
    return response.data; // Returns the list of problems
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

// Fetch a specific problem by ID from the API
export const fetchProblemById = async (problemId) => {
  try {
    const response = await axios.get(`/api/problems/${problemId}`);
    return response.data; // Returns the problem data
  } catch (error) {
    console.error("Error fetching problem:", error);
    throw error;
  }
};

// Submit an answer for a specific problem
export const submitAnswer = async (problemId, userAnswer) => {
  try {
    const response = await axios.post('/api/submit-answer', {
      problemId,
      userAnswer,
    });
    return response.data; // Returns the result of the submission
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};

// Fetch bundles (custom problem bundles) for the user
export const fetchBundles = async (userId) => {
  try {
    const response = await axios.get(`/api/bundles/${userId}`);
    return response.data; // Returns the list of bundles
  } catch (error) {
    console.error("Error fetching bundles:", error);
    throw error;
  }
};

// Create a new custom bundle with selected questions
export const createBundle = async (bundleName, selectedQuestions) => {
  try {
    const response = await axios.post('/api/bundles', {
      name: bundleName,
      questions: selectedQuestions,
    });
    return response.data; // Returns the created bundle
  } catch (error) {
    console.error("Error creating bundle:", error);
    throw error;
  }
};

// Delete a custom bundle by ID
export const deleteBundle = async (bundleId) => {
  try {
    await axios.delete(`/api/bundles/${bundleId}`);
  } catch (error) {
    console.error("Error deleting bundle:", error);
    throw error;
  }
};

// Fetch all questions for a user (or by topic if needed)
export const fetchQuestions = async () => {
  try {
    const response = await axios.get('/api/questions');
    return response.data; // Returns the list of all questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
