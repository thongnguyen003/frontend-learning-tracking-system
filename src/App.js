import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import PortfolioProfile from './pages/ProfilePage';
import Login from './features/auth/Login';
import LearningProcessTrackingPage from './features/student/pages/LearningProcessTrackingPage';
import LearningProcessTrackingPage2 from "./features/teacher/pages/LearningProcessTrackingPage";
import LearningGoals from './features/student/learning_process_tracking/goal/Goal';
import LearningJournal from './features/student/learning_process_tracking/journal/LearningJournal';
import AdminLayout from './layouts/Admin';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import UserManagement from './features/admin/pages/UserManagement';
import NetworkDetector from './components/common/NetworkDetector';
import AddUsers from './features/admin/pages/MultiUserForm';
// import CoursePageT from "./features/teacher/pages/CoursePage";
import ClassManagement from "./features/admin/pages/ClassManagement";
import CourseInfo from "./features/teacher/detail-course/info-course/CourseInfo";
import StudentList from "./features/teacher/detail-course/list-student/studentList";
import DetailCourse from "./features/teacher/pages/DetailCoursePage";
import CoursePageT from "./features/teacher/pages/CoursePage";
import DetailCourseAdmin from './features/admin/DetailCourse/DetailClass';
import SubjectList  from './features/admin/subject/Subjects';
import Lich from "./components/common/StudentCalendar.jsx";
import Dashboard from "./features/admin/pages/AdminDashboard.jsx";
import TrackUsers from "./features/admin/pages/TrackUsers.jsx";
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
            {/* student */}
            <Route path="/" element={<Login />} />
            <Route path="/portfolio" element={<PortfolioProfile />} />
            <Route path="/student/course" element={<StudentHomepage />} />
            <Route path="/student/learningProcessTracking/:id" element={<LearningProcessTrackingPage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
            {/* teacher */}
            <Route path="/teacher/class" element={<TeacherHomepage/>}></Route>
            <Route path="teacher/course/:id" element={<CoursePageT></CoursePageT>}></Route>
            <Route path="teacher/course/detail/:id" element={<DetailCourse />} >
                <Route path="listStudent" element={<StudentList></StudentList> }></Route>
                <Route path="infoCourse" element={<CourseInfo></CourseInfo> }></Route>
            </Route>
            <Route path="/teacher/learningProcessTracking/:id" element={<LearningProcessTrackingPage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
            {/* admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users/UserManagement" element={<UserManagement />} />
              <Route path="form/add-new-user" element={<AddUsers />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="Lich/:studentId" element={<LichWrapper />} />              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/admin/classes" element={<ClassManagement />} />
              <Route path="/admin/classes/detail/:id" element={<DetailCourseAdmin />} />
              <Route path="/admin/subjects" element={<SubjectList/>} />
              <Route path="/admin/users/TrackUsers" element={<TrackUsers />} />
            </Route>
            {/* end */}
          </Routes>
      </Router>
  );
}
export default App;