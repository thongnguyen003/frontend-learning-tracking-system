import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import PortfolioProfile from './pages/ProfilePage';
import Login from './features/Auth/Login'
import StudentProfile from './pages/StudentProfile';
import CoursePage from './features/student/pages/CoursePage';
import LearningGoals from './features/student/Course-page/CourseGoal';
import LearningJournal from './features/student/journal/LearningJournal';
function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/portfolio" element={<PortfolioProfile />} />
            <Route path="/student" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/" element={<Login />} />
            <Route path="/courseGoal/:id" element={<CoursePage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
          </Routes>
      </Router>
  );
}
export default App;