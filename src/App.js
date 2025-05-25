
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import PortfolioProfile from './pages/ProfilePage';
import Login from './features/auth/Login';
import StudentProfile from "./features/student/profile/PortfolioProfile";
import CoursePage from './features/student/pages/CoursePage';
import LearningGoals from './features/student/course/goal/Goal';
import LearningJournal from './features/student/course/journal/LearningJournal';
import TeacherHomepage from './features/teacher/pages/TeacherHomePage'
function App() {
  return (
    <Router>
      <ToastContainer />
          <Routes>
            <Route path="/portfolio" element={<PortfolioProfile />} />
            <Route path="/student" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/" element={<Login />} />
            <Route path="/course/:id" element={<CoursePage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
            <Route path="/teacher" element={<TeacherHomepage/>}></Route>
          </Routes>
      </Router>
  );
}
export default App;