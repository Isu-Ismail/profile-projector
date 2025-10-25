import React from "react";
import {
  BrowserRouter as Router, // This is BrowserRouter
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
    // FIX: Add the basename prop to tell the router that
    // the app is hosted under the /profile-projector/ path.
    <Router basename="/profile-projector">
      <Routes>
        {/* --- Root Route Redirect: Send user to the Profile Projector Aim page --- 
          NOTE: When using 'basename', all paths defined below are relative to it.
          e.g., path="/" now means /profile-projector/
          path="/experiments/profile-projector/Aim" now means /profile-projector/experiments/profile-projector/Aim
        */}

        {/* Since you have basename set, your initial path needs to be adjusted */}
        {/* We can simplify the initial redirect since the basename covers the repo path */}

        {/* --- Root Path Redirect (Handles: lsu-ismail.github.io/profile-projector/) --- */}
        <Route
          path="/"
          element={<Navigate to="/experiments/profile-projector/Aim" replace />}
        />

        {/* --- Main Experiment Information Routes --- */}
        {/* Redirect: /experiments/profile-projector to /experiments/profile-projector/Aim */}
        <Route
          path="/experiments/profile-projector"
          element={<Navigate to="/experiments/profile-projector/Aim" replace />}
        />

        {/* Renders the informational content (Aim, Theory, Procedure, Tests) */}
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
