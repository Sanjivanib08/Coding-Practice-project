import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import Dashboard from "./pages/Dashboard";
import AddProblem from "./pages/AddProblem";
import Profile from "./pages/Profile";
import ProblemDetailPage from "./pages/ProblemDetailPage"; // Import ProblemDetailPage
import './App.css'; // Global styles for your app

function App() {
  return (
    <div className="App">
      {/* Main routing for the application */}
      <Routes>
        <Route path="/" element={<HomeScreen />} /> {/* Home screen */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-problem" element={<AddProblem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} /> 
        {/* <Route path="/problem-detail" element={<ProblemDetailPage />} /> */}

      </Routes>
    </div>
  );
}

export default App;
