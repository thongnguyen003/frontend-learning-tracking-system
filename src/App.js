import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './pages/StudentHomepage';
import Login from './features/Auth/Login'
import StudentProfile from './pages/StudentProfile';
function App() {
  return (
      <Router>
          <Routes>
            {/* Cập nhật cách khai báo Route với element */}
            <Route path="/profile" element={<StudentHomepage />} />
            <Route path="/" element={<StudentProfile />} />
             <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App;