import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneralInfoTab = ({ form = {}, handleChange, handleSave, role, userId }) => {
  const [avatar, setAvatar] = useState(
    localStorage.getItem(role + "Avatar") ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfw1A_cRtYdAWexnjtTAgB89uuh4KDA98zwQ&s"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleAvatarUpload(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append("achievement", file);

    try {
      // Upload avatar to the server
      const uploadResponse = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        const avatarUrl = uploadResult.files.achievement[0].path;
        console.log("Avatar URL:", avatarUrl);

        // Save avatar URL to the backend
        const backendResponse = await fetch(`http://localhost:8000/api/${role}/${userId}/avatar`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatar: avatarUrl }),
        });

        if (backendResponse.ok) {
          console.log("Avatar saved to backend successfully");
          setAvatar(avatarUrl);
          localStorage.setItem(role + "Avatar", avatarUrl);
        } else {
          console.error("Failed to save avatar to backend:", await backendResponse.text());
        }
      } else {
        console.error("Failed to upload avatar:", await uploadResponse.text());
      }
    } catch (error) {
      console.error("Error during avatar upload or save:", error);
    }
  };

  return (
    <>
      <div className="avatar-upload" style={{ marginBottom: "1rem" }}>
        <img
          src={avatar}
          alt="Avatar"
          className="avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <label
          className="upload-btn"
          style={{ cursor: "pointer", display: "inline-block", marginTop: "0.5rem" }}
        >
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name || ""} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hometown</label>
          <input
            name="hometown"
            value={form.hometown || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Your Birthdate</label>
          <input
            type="date"
            name="day_of_birth"
            value={form.day_of_birth || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email || ""} readOnly />
        </div>

        <div className="form-group">
          <label>Your phone</label>
          <input
            name="phone_number"
            value={form.phone_number || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        {role === "student" && (
          <div className="form-group">
            <label>Your Class</label>
            <input name="class_id" value={form.class_id || ""} readOnly />
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button type="submit" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <Logout role={role} />
      </div>
    </>
  );
};

const Logout = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem(`${role}Token`);
    localStorage.removeItem(`${role}Avatar`);
    sessionStorage.removeItem(role + "Profile");

    alert("You have logged out successfully!");
    navigate("/login");
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export { GeneralInfoTab, Logout };
