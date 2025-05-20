
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
import AdminLayout from './layouts/Admin';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import Apps from './features/admin/pages/apps';
import NetworkDetector from './components/common/NetworkDetector';
function App() {
  return (
    <Router>
      <NetworkDetector />
      <ToastContainer />
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/portfolio" element={<PortfolioProfile />} />
            <Route path="/student" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/" element={<Login />} />
            <Route path="/course/:id" element={<CoursePage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="apps/chat" element={<Apps />} />

            </Route>
          </Routes>
      </Router>
  );
}
export default App;
