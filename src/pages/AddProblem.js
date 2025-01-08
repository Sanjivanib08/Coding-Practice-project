import "../styles/AddProblem.css";
import React, { useState } from "react";
import axios from "axios";
import useFormValidation from "../hooks/useFormValidation"; // Import the custom hook

const AddProblem = () => {
  // Initial form state
  const initialState = {
    title: "",
    description: "",
    difficulty: "easy",
    topic: "",
    manualTestCases: [{ input: "", output: "" }],
    generateAi: false,
  };

  const { formData, setFormData, errors, handleChange, validate } = useFormValidation(initialState);
  const [aiTestCases, setAiTestCases] = useState([]);

  // Handle adding/removing manual test cases
  const handleInputChange = (index, field, value) => {
    const newTestCases = [...formData.manualTestCases];
    newTestCases[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      manualTestCases: newTestCases,
    }));
  };

  const handleAddTestCase = () => {
    setFormData((prevState) => ({
      ...prevState,
      manualTestCases: [...formData.manualTestCases, { input: "", output: "" }],
    }));
  };

  const handleRemoveTestCase = (index) => {
    const newTestCases = formData.manualTestCases.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      manualTestCases: newTestCases,
    }));
  };

  // Handle AI Test Case Generation
  const handleGenerateAiTestCases = async () => {
    try {
      const response = await axios.post("/api/generate-ai-test-cases", {
        description: formData.description,
      });
      setAiTestCases(response.data.aiTestCases);
    } catch (error) {
      console.error("Error generating AI test cases:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // If validation fails, do not proceed
    }

    // Construct the problem data
    const problemData = {
      ...formData,
      manualTestCases: formData.manualTestCases,
      generateAi: formData.generateAi,
    };

    try {
      // Save the question under the specified topic and in the 'Practice Random Question' bundle
      await axios.post("/api/add-problem", problemData);

      // If the topic doesn't exist, create it and save the question in it
      await axios.post("/api/create-or-update-topic", { topic: formData.topic, problemData });

      alert("Problem added successfully!");
      // Clear form after submission
      setFormData(initialState);
      setAiTestCases([]);
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("Failed to add problem.");
    }
  };

  return (
    <div className="add-problem-container">
      <h2>Add Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the title"
            required
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter the description"
            required
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter the topic"
            required
          />
          {errors.topic && <div className="error-message">{errors.topic}</div>}
        </div>

        <div className="test-cases-container">
          <h3>Test Cases</h3>
          {formData.manualTestCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div className="form-group">
                <label htmlFor={`input-${index}`}>Input:</label>
                <textarea
                  id={`input-${index}`}
                  value={testCase.input}
                  onChange={(e) => handleInputChange(index, "input", e.target.value)}
                  placeholder="Enter test case input"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`output-${index}`}>Output:</label>
                <textarea
                  id={`output-${index}`}
                  value={testCase.output}
                  onChange={(e) => handleInputChange(index, "output", e.target.value)}
                  placeholder="Enter test case output"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveTestCase(index)}
                className="remove-test-case-btn"
              >
                Remove Test Case
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddTestCase} className="add-test-case-btn">
            Add Test Case
          </button>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.generateAi}
              onChange={() => setFormData({ ...formData, generateAi: !formData.generateAi })}
            />
            Generate AI Test Cases
          </label>
        </div>

        <div className="ai-test-cases">
          {aiTestCases.length > 0 && (
            <div>
              <h4>AI Generated Test Cases:</h4>
              {aiTestCases.map((testCase, index) => (
                <div key={index} className="ai-test-case">
                  <div>
                    <strong>Input:</strong> {testCase.input}
                  </div>
                  <div>
                    <strong>Output:</strong> {testCase.output}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default AddProblem;
