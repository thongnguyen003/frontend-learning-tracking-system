import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import Login from './features/Auth/Login'
import StudentProfile from './pages/StudentProfile';
import GoalsPage from './features/student/Course-page/CourseGoal';
import LearningJournalPage from './features/student/pages/LearningJournalPage';
import StudentLayout from './layouts/StudentLayout';
function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/course" element={<GoalsPage />}  />
          </Routes>
      </Router>
  );
}
export default App;