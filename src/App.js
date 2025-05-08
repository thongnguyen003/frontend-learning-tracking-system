import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import GoalsPage from './features/student/Course-page/CourseGoal';
function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/courseGoal" element={<GoalsPage />}  />
            <Route path="/" element={<StudentHomepage />} />
          </Routes>
      </Router>
  );
}
export default App;
