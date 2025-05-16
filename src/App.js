import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './features/student/pages/StudentHomepage';
import Login from './features/Auth/Login';
import StudentProfile from "./features/student/profile/Profile"
import CoursePage from './features/student/pages/CoursePage';
import LearningGoals from './features/student/course/goal/Goal';
import LearningJournal from './features/student/course/journal/LearningJournal';
import ProfilePage from './features/student/pages/ProfilePage';
import ChangePassword from './features/student/profile/changePassword/ChangePassword';
import GeneralInfo from './features/student/profile/general/GeneralInfo';
function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/student" element={<StudentHomepage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/" element={<Login />} />
            <Route path="/course/:id" element={<CoursePage/>}>
              <Route path = 'goal' element = {<LearningGoals></LearningGoals>}></Route>
              <Route path = 'learningJournal' element = {<LearningJournal></LearningJournal>}></Route>
            </Route>
            <Route path='/profile/' element={<ProfilePage/>}>
              <Route path='general' element ={<GeneralInfo/>}></Route>
              <Route path='changePassword' element = {<ChangePassword></ChangePassword>}></Route>
            </Route>
          </Routes>
      </Router>
  );
}
export default App;