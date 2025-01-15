import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card } from "antd";
import InputMode from "./pages/InputMode";
import MultipleChoiceMode from "./pages/MultipleChoiceMode";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
              <h1 className="text-3xl font-bold mb-8">Select Mode</h1>
              <div className="flex gap-8">
                <Link to="/input-mode">
                  <Card
                    hoverable
                    className="w-64 h-40 flex flex-col items-center justify-center shadow-lg border-blue-500"
                  >
                    <h2 className="text-xl font-bold">Input Mode</h2>
                    <p className="text-gray-600 text-sm">
                      Practice typing vocabulary.
                    </p>
                  </Card>
                </Link>
                <Link to="/multiple-choice-mode">
                  <Card
                    hoverable
                    className="w-64 h-40 flex flex-col items-center justify-center shadow-lg border-green-500"
                  >
                    <h2 className="text-xl font-bold">Multiple Choice</h2>
                    <p className="text-gray-600 text-sm">
                      Choose the correct answer.
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/input-mode" element={<InputMode />} />
        <Route path="/multiple-choice-mode" element={<MultipleChoiceMode />} />
      </Routes>
    </Router>
  );
};

export default App;
