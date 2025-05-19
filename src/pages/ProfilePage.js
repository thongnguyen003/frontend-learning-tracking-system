import React, { useEffect, useState } from "react";
import StudentLayout from "../layouts/StudentLayout";
import Portfolio from '../features/student/profile/PortfolioProfile';
const HeaderElement = () => {
  return (
    <div className="d-flex align-items-center">
      <span className="me-3 fs-5" style={{ cursor: "pointer" }}></span>
    </div>
  );
};
const PortfolioPage = () => {
  const [profile, setProfile] = useState(null);
  const [change, setChange] = useState(true);
  const studentId = JSON.parse(sessionStorage.getItem("current_user")).account.id;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log("Profile fetched:", result);
        setProfile(result || {}); // Lưu kết quả vào state
        setChange(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [change]);

  return (
    <StudentLayout HeaderElement={<HeaderElement />}>
      <Portfolio profile={profile} setChange={setChange} />
    </StudentLayout>
  );
};

export default PortfolioPage;
