// src/pages/Profile.js
import React from "react";
import useAuth from "../hooks/useAuth"; // Import the useAuth hook

const Profile = () => {
  const { user, logout } = useAuth(); // Use the hook to get user data and logout function

  return (
    <div>
      <h1>{user ? `Hello, ${user.name}` : "Please log in"}</h1>
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Profile;
