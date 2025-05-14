import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import ChangePassword from "../features/student/profile/components/ChangePassword";
import "../layouts/StudentSetting.css";

const StudentSettings = () => {
    const [activeTab, setActiveTab] = useState("general");
  
    return (
      <div className="settings-wrapper">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <button
            className={`tab-button ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <FaUser style={{ marginRight: "8px" }} /> General
          </button>
          <button
            className={`tab-button ${activeTab === "changepassword" ? "active" : ""}`}
            onClick={() => setActiveTab("changepassword")}
          >
            <FaLock style={{ marginRight: "8px" }} /> Change Password
          </button>
        </div>
  
        {/* Content */}
        <div className="settings-content">
          {/* {activeTab === "general" && <General />} */}
          {activeTab === "changepassword" && <ChangePassword studentId={1} />}
        </div>
      </div>
    );
  };
  
  export default StudentSettings;