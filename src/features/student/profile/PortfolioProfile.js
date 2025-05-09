import React, { useState, useEffect } from "react";
import "./PortfolioProfile.css";
import GeneralInfoTab from "./GeneralInfoTab";
import ChangePasswordTab from "./ChangePasswordTab";
const PortfolioProfile = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState({
    name: "thuy",
    birthdate: "13/3/2005",
    phone: "012345678",
    class: "",
    hometown: "Dong giang",
    email: "bnuochthithuy13032005@gmail.com",
    gender: "female",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setForm({
        name: profile.name || "",
        birthdate: profile.day_of_birth || "",
        phone: profile.phone_number || "",
        class: profile.class_id || "",
        hometown: profile.hometown || "",
        email: profile.email || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmitPassword = async () => {
    if (password.current && password.new) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/student/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${profile.token}`, // Sử dụng token nếu cần
          },
          body: JSON.stringify({
            current_password: password.current,
            new_password: password.new,
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log("Password updated:", result);
      } catch (error) {
        console.error("Error updating password:", error);
      }
    } else {
      console.log("Please enter both current and new password.");
    }
  };

  return (
    <div className="portfolio-container">
      <div className="left-menu">
        <p className="profile-title">Profile</p>
        <div>
          <button
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="main-content">
        {activeTab === "general" ? (
          <GeneralInfoTab form={form} handleChange={handleChange} />
        ) : (
          <ChangePasswordTab
            password={password}
            handlePasswordChange={handlePasswordChange}
            handleSubmitPassword={handleSubmitPassword} 
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioProfile;
