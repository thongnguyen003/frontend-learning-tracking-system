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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/students");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log("Profile fetched:", result);
        setProfile(result.data || {}); // Lưu kết quả vào state
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <StudentLayout HeaderElement={<HeaderElement />}>
      <Portfolio profile={profile} />
    </StudentLayout>
  );
};

export default PortfolioPage;
