import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHomepage from './pages/StudentHomepage';
import PortfolioProfile from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentHomepage />} />
        <Route path="/portfolio" element={<PortfolioProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
