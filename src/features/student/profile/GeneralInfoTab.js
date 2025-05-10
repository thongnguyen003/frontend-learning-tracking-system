import React, {useState } from "react";
const GeneralInfoTab = ({ form, handleChange }) => { 
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
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hometown</label>
          <input name="hometown" value={form.hometown} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Your Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Your phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
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
          <input name="class" value={form.class} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default GeneralInfoTab;
