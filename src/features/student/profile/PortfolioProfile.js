import React, { useState, useEffect } from "react";
import "../../student/styles/portfolioProfile.css";
import GeneralInfoTab from "./components/GeneralInfoTab";
import ChangePasswordTab from "./components/ChangePassword";
import Achievement from "./components/Achievement";
const PortfolioProfile = ({ profile, setChange}) => {
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState({
    student_name: "",
    day_of_birth: "",
    phone_number: "",
    class_id: "",
    hometown: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setForm({
        student_name: profile.student_name || "",
        day_of_birth: profile.day_of_birth || "",
        phone_number: profile.phone_number || "",
        class_id: profile.class_id || "",
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


 const handleSave = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/student/update-profile/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
    }

    const data = await response.json();
    setChange(false);
    alert("Profile updated successfully!");
    console.log("Response:", data);
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
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
          <button
            className={`tab ${activeTab === "achievement" ? "active" : ""}`}
            onClick={() => setActiveTab("achievement")}
          >
            Achievement
          </button>
        </div>
      </div>

      <div className="main-content">
        {activeTab === "general" ? (
          <GeneralInfoTab form={form} handleChange={handleChange} handleSave={handleSave} />
        ) : activeTab === "password" ?  (
          <ChangePasswordTab />
        ) : (
          <Achievement></Achievement>
        )}
      </div>
    </div>
  );
};

export default PortfolioProfile;
