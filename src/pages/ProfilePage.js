import React, { useEffect, useState } from "react";
import StudentLayout from "../layouts/StudentLayout"; // Nếu teacher có layout riêng thì cần xử lý thêm
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
  const changeOposite = () => {
    setChange(!change);
  }
  const user = JSON.parse(sessionStorage.getItem("current_user"));
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = user.account.id;
        const path = user.role == "student" ? "student" : "teacher";
        const response = await fetch(`http://127.0.0.1:8000/api/${path}/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log("Profile fetched:", result);
        setProfile(result || {}); // Lưu kết quả vào state
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [change]);

  return (
    <StudentLayout HeaderElement={<HeaderElement />}>
      <Portfolio profile={profile} setChange={changeOposite} />
    </StudentLayout>
  );
};

export default PortfolioPage;
