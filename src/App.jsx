import React from "react";
import {
  HashRouter as Router, // CHANGED to HashRouter
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// CORRECTED: Import from the newly created page
import ProfileProjectorPage from "./experiments/ProfileProjector/ProfileProjectorPage";
// CORRECTED: Import the LabPage component
import ProfileProjectorLabPage from "./experiments/ProfileProjector/LabPage";

function App() {
  return (
    // FIX: Use HashRouter and REMOVE basename to fix 404s on refresh.
    // All routes will now have a # prefix in the URL.
    <Router>
      <Routes>
        {/* --- Root Route Redirect --- */}
        {/* Path "/" will match the URL ending in #/ */}
        <Route
          path="/"
          element={<Navigate to="/experiments/profile-projector/Aim" replace />}
        />

        {/* --- Main Experiment Information Routes --- */}
        <Route
          path="/experiments/profile-projector"
          element={<Navigate to="/experiments/profile-projector/Aim" replace />}
        />

        <Route
          path="/experiments/profile-projector/:topic"
          element={<ProfileProjectorPage />}
        />

        {/* --- Dedicated Full-Screen Lab Route (Simulation) --- */}
        <Route
          path="/lab/profile-projector"
          element={<ProfileProjectorLabPage />}
        />

        {/* You may want to add a generic 404 route here */}
      </Routes>
    </Router>
  );
}

export default App;
