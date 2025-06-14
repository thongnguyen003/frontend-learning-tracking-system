import React, { useState } from "react";
import { json } from "react-router-dom";

const ChangePassword = ({ setChange }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const user = JSON.parse(sessionStorage.getItem("current_user"));

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }
    try {
      const path = user.role == "student" ? "student" : "teacher";
      const id = user.account.id;
      const response = await fetch(
        `http://localhost:8000/api/${path}/change-password/${id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password.");
      }

      const data = await response.json();
      setMessage(data.message);
      setChange();
    } catch (error) {
      setMessage(error.message || "Failed to change password.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className="mt-3">
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password:
          </label>
          <input
            id="currentPassword"
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password:
          </label>
          <input
            id="newPassword"
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ChangePassword;