import React from "react";
import {
  BrowserRouter as Router,
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
    <Router>
      <Routes>
        {/* --- Root Route Redirect: Send user to the Profile Projector Aim page --- */}
        <Route
          path="/"
          element={<Navigate to="/experiments/profile-projector/Aim" replace />}
        />

        {/* --- Main Experiment Information Routes --- */}
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
