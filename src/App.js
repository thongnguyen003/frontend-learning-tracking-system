import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import PortfolioProfile from './pages/ProfilePage';
import Login from './features/auth/Login';
import StudentProfile from "./features/student/profile/PortfolioProfile";
import CoursePage from './features/student/pages/CoursePage';
import LearningGoals from './features/student/course/goal/Goal';
import LearningJournal from './features/student/course/journal/LearningJournal';
import AdminLayout from './layouts/Admin';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import UserManagement from './features/admin/pages/UserManagement';
import NetworkDetector from './components/common/NetworkDetector';
import AddUsers from './features/admin/pages/MultiUserForm';
// import CoursePageT from "./features/teacher/pages/CoursePage";
import ClassManagement from "./features/admin/pages/ClassManagement";
import CourseDetail from "./features/teacher/course/courseDetail/CourseDetail";
import StudentList from "./features/teacher/course/studentList/studentList";
import DetailCourse from "./features/teacher/pages/DetailCoursePage";
import CoursePageT from "./features/teacher/pages/CoursePage";
import Lich from "./features/StudentCalendar.jsx";
import Dashboard from "./features/AdminDashboard.jsx";
import Track from "./features/TrackVisit.jsx";
import TeacherHomepage from './features/teacher/pages/TeacherHomePage'

const LichWrapper = () => {
  const { studentId } = useParams();
  return <Lich studentId={studentId} />;
};
function App() {
  return (
    <Router>
      <NetworkDetector />
      <ToastContainer />
      <Routes>
        <Route path="/portfolio" element={<PortfolioProfile />} />
        <Route path="/student" element={<StudentHomepage />} />
        <Route path="/teacher" element={<TeacherHomepage />}></Route>
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/" element={<Login />} />
        <Route path="/course/:id" element={<CoursePage />}>
          <Route path='goal' element={<LearningGoals></LearningGoals>}></Route>
          <Route path='learningJournal' element={<LearningJournal></LearningJournal>}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="Lich/:studentId" element={<LichWrapper />} />              <Route path="dashboard" element={<Dashboard />} />
          <Route path="users/UserManagement" element={<UserManagement />} />
          <Route path="form/add-new-user" element={<AddUsers />} />
          <Route path="/admin/classes" element={<ClassManagement />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<TeacherHomepage />}></Route>
        <Route path="teacher/course/:id" element={<CoursePageT></CoursePageT>}></Route>
        <Route path="student/course/detail" element={<DetailCourse />} >
          <Route path="studentlist" element={<StudentList></StudentList>}></Route>
          <Route path="detailCourse" element={<CourseDetail></CourseDetail>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;