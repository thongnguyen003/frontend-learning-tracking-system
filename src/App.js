import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import Login from './features/Auth/Login'
import StudentProfile from './pages/StudentProfile';
import CoursePage from './features/student/pages/CoursePage';
import LearningGoals from './features/student/Course-page/CourseGoal';

function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courseGoal" element={<CoursePage/>}>
                          <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
                          <Route path = 'learningJournal' element = {<div>chua co</div>}></Route>
            </Route>
          </Routes>
      </Router>
  );
}
export default App;