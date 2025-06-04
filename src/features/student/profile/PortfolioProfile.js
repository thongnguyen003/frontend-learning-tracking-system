import React, { useState, useEffect } from "react";
import "../../student/styles/portfolioProfile.css";
import { GeneralInfoTab } from './components/GeneralInfoTab';
import ChangePasswordTab from "./components/ChangePassword";
import Achievement from "./components/Achievement";

const PortfolioProfile = ({ profile, setChange }) => {
  const [activeTab, setActiveTab] = useState("general");

  const currentUser = JSON.parse(sessionStorage.getItem('current_user'));
  const role = currentUser?.role || "student";

  const [form, setForm] = useState({
    name: "",
    day_of_birth: "",
    phone_number: "",
    class_id: "", 
    hometown: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      if (role === "student") {
        setForm({
          name: profile.student_name || "",
          day_of_birth: profile.day_of_birth || "",
          phone_number: profile.phone_number || "",
          class_id: profile.class_id || "",
          hometown: profile.hometown || "",
          email: profile.email || "",
          gender: profile.gender || "",
        });
      } else if (role === "teacher") {
        setForm({
          name: profile.teacher_name || "",
          day_of_birth: profile.day_of_birth || "",
          phone_number: profile.phone_number || "",
          hometown: profile.hometown || "",
          email: profile.email || "",
          gender: profile.gender || "",
        });
      }
    }
  }, [profile, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const url = role === "student"
        ? `http://localhost:8000/api/student/update-profile/${profile.id}`
        : `http://localhost:8000/api/teacher/update-profile/${profile.id}`;

      const body = role === "student"
        ? {
          student_name: form.name,
          day_of_birth: form.day_of_birth,
          phone_number: form.phone_number,
          class_id: form.class_id,
          hometown: form.hometown,
          email: form.email,
          gender: form.gender,
        }
        : {
          teacher_name: form.name,
          day_of_birth: form.day_of_birth,
          phone_number: form.phone_number,
          hometown: form.hometown,
          email: form.email,
          gender: form.gender,
        };
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChange();
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
          <GeneralInfoTab
            form={form}
            handleChange={handleChange}
            handleSave={handleSave}
            role={role} 
            userId={profile && profile.id}
          />
        ) : activeTab === "password" ? (
          <ChangePasswordTab setChange={setChange}/>
        ) : (
          <Achievement />
        )}
      </div>
    </div>
  );
};

export default PortfolioProfile;
