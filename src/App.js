import './App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './pages/StudentHomepage';
import Login from './features/Auth/Login'
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Cập nhật cách khai báo Route với element */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<StudentHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;