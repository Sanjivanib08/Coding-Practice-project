import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios is still used for direct requests
import "../styles/Dashboard.css"; // Link to your dashboard styles
import AddProblem from "./AddProblem"; // Import AddProblem component
import {
  fetchProblems,
  fetchBundles,
  fetchQuestions,
  createBundle,
  deleteBundle as deleteBundleApi
} from "../utils/apiUtils.js"; // Import utility functions

// Custom Hook for Fetching Data
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Modal component for creating a custom bundle
const CreateBundleModal = ({ closeModal, fetchQuestions }) => {
  const [bundleName, setBundleName] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const { data: questionsByTopic, loading, error } = useFetchData("/api/questions");

  const groupQuestionsByTopic = (questions) => {
    return questions.reduce((acc, question) => {
      const { topic } = question;
      if (!acc[topic]) acc[topic] = [];
      acc[topic].push(question);
      return acc;
    }, {});
  };

  const handleSubmit = async () => {
    try {
      await createBundle(bundleName, selectedQuestions); // Use createBundle from apiUtils.js
      closeModal(); // Close modal after saving
      fetchQuestions(); // Refresh questions after bundle creation
    } catch (error) {
      console.error("Error creating bundle:", error);
    }
  };

  const groupedQuestions = groupQuestionsByTopic(questionsByTopic);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Custom Bundle</h2>
        <input
          type="text"
          placeholder="Bundle Name"
          value={bundleName}
          onChange={(e) => setBundleName(e.target.value)}
        />
        <div className="question-select">
          <h3>Select Questions</h3>
          {loading ? (
            <p>Loading questions...</p>
          ) : error ? (
            <p>Error loading questions: {error.message}</p>
          ) : (
            Object.keys(groupedQuestions).map((topic) => (
              <div key={topic} className="topic-section">
                <h4>{topic}</h4>
                <select
                  multiple
                  value={selectedQuestions}
                  onChange={(e) =>
                    setSelectedQuestions(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {groupedQuestions[topic].map((question) => (
                    <option key={question._id} value={question._id}>
                      {question.name}
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}
        </div>
        <button onClick={handleSubmit}>Save Bundle</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [bundles, setBundles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [practiceMode, setPracticeMode] = useState("Random Topic"); // Default practice mode
  const [showAddProblem, setShowAddProblem] = useState(false);

  const { data: fetchedBundles, loading, error } = useFetchData("/api/bundles/user-id"); // Replace with actual user ID

  useEffect(() => {
    if (!loading && fetchedBundles) {
      setBundles(fetchedBundles);
    }
  }, [loading, fetchedBundles]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const deleteBundle = async (bundleId) => {
    try {
      await deleteBundleApi(bundleId); // Use deleteBundle from apiUtils.js
      setBundles(bundles.filter((bundle) => bundle._id !== bundleId));
    } catch (error) {
      console.error("Error deleting bundle:", error);
    }
  };

  const togglePracticeMode = () => {
    setPracticeMode((prevMode) =>
      prevMode === "Random Topic" ? "Series Test Mode" : "Random Topic"
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Coding Practice</div>
        <div className="menu">
          <div className="menu-item">Practice</div>
          <div className="menu-item">Topics</div>
          <div className="menu-item">Settings</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Coding Practice Dashboard</h1>
          <div className="progress-bar-container">
            <div className="progress-bar-label">Overall Progress: 0%</div>
            <div className="progress-bar">
              <span style={{ width: "0%" }}></span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button" onClick={togglePracticeMode}>
            Toggle Practice Mode: {practiceMode}
          </button>
          <button
            className="action-button"
            onClick={() => setShowAddProblem(!showAddProblem)}
          >
            Add New Problem
          </button>
        </div>

        {/* Problem Bundles */}
        <div className="problem-bundles">
          <h2>Problem Bundles</h2>
          {bundles.map((bundle) => (
            <div key={bundle._id} className="bundle">
              <h3>{bundle.name}</h3>
              <p>Progress: 50%</p>
              <button className="action-button">Practice</button>
              <button
                className="action-button"
                onClick={() => deleteBundle(bundle._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Custom Bundles Section */}
        <div className="custom-bundles">
          <h2>Custom Bundles</h2>
          <button className="action-button" onClick={openModal}>
            Create Custom Bundle
          </button>
          <div className="bundle-list">
            {bundles.map((bundle) => (
              <div key={bundle._id} className="bundle-item">
                <h3>{bundle.name}</h3>
                <p>Progress: 0%</p>
                <button className="action-button">Practice</button>
              </div>
            ))}
          </div>
        </div>

        {showAddProblem && <AddProblem />}
      </div>

      {isModalOpen && <CreateBundleModal closeModal={closeModal} fetchQuestions={fetchQuestions} />}
    </div>
  );
};

export default Dashboard;
