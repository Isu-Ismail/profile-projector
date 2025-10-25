import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoPageLayout from "../ProfileProjector/components/InfoPageLayout";
import { pageContent, topicMap } from "./data/content";

const navItems = [
  { key: "Aim", label: "Aim" },
  { key: "Theory", label: "Theory" },
  { key: "Procedure", label: "Procedure" },
  { key: "Test1", label: "Pretest" },
  { key: "Simulation", label: "Simulation" },
  { key: "Test2", label: "Posttest" },
  { key: "References", label: "References" },
];

function DynamicAnalysisPage() {
  const navigate = useNavigate();
  const { topic } = useParams();

  // Set default to 'Aim' if no topic is specified
  const currentTopic = topic || "Aim";

  // State to manage the tutorial step (for the Lab page link, though the LabPage itself handles the demo)
  const [labTutorialStep, setLabTutorialStep] = useState(0);

  const handleNavClick = (key) => {
    if (key === "Simulation") {
      // Navigate to the separate full-screen lab route
      navigate("/lab/dynamic-analysis");
    } else {
      // Navigate to the informational page
      navigate(`/experiments/dynamic-analysis/${key}`);
    }
  };

  const PageKey = topicMap[currentTopic] || currentTopic;

  return (
    <div className="flex min-h-screen">
      {/* Left Navigation Sidebar */}
      <nav className="w-52 bg-slate-50 border-r border-slate-200 p-4 flex-shrink-0">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-left py-2 px-3 rounded-lg font-semibold transition-colors duration-200 ${
                  currentTopic === item.key
                    ? "bg-orange-100 text-orange-600"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow bg-slate-100">
        {/* Placeholder for Pretest/Posttest components or the InfoPageLayout */}
        {["Test1", "Test2"].includes(currentTopic) ? (
          <InfoPageLayout
            pageKey={currentTopic}
            content={{
              [currentTopic]: {
                title: `${
                  navItems.find((i) => i.key === currentTopic).label
                } Placeholder`,
                sections: [
                  {
                    type: "paragraph",
                    text: "Questions for this test will be loaded here from testQuestions.json.",
                  },
                ],
              },
            }}
          />
        ) : (
          <InfoPageLayout pageKey={PageKey} content={pageContent} />
        )}
      </div>
    </div>
  );
}

export default DynamicAnalysisPage;
