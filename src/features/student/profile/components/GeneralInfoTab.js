import React, {useState } from "react";
const GeneralInfoTab = ({ form, handleChange, handleSave }) => { 
  const [avatar, setAvatar] = useState(
    localStorage.getItem("studentAvatar") || 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfw1A_cRtYdAWexnjtTAgB89uuh4KDA98zwQ&s"
  );

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setAvatar(base64Image);
        localStorage.setItem("studentAvatar", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="avatar-upload">
        <img src={avatar} alt="avatar" className="avatar" />
        <label className="upload-btn" style={{ cursor: "pointer" }}>
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input name="student_name" value={form.student_name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hometown</label>
          <input name="hometown" value={form.hometown} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Your Birthdate</label>
          <input
            type="date"
            name="day_of_birth"
            value={form.day_of_birth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email} readOnly/>
        </div>

        <div className="form-group">
          <label>Your phone</label>
          <input name="phone_number" value={form.phone_number} onChange={handleChange} />
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

        <div className="form-group">
          <label>Your Class</label>
          <input name="class_id" value={form.class_id} readOnly />
        </div>
      </div>
       <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
    </>
  );
};

export default GeneralInfoTab;
