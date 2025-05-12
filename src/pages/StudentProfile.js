import React from "react";
import StudentLayout from "../layouts/StudentLayout";
import StudentSettings from "../layouts/StudentSettings";

// Header element with "Back" link
const HeaderElement = () => (
  <div className="d-flex align-items-center">
    <span className="me-3 fs-5" style={{ cursor: "pointer" }}>
      <a>&larr; Back</a>
    </span>
    <span className="fs-5">Student Profile</span>
  </div>
);

const StudentProfile = () => {
  return (
    <StudentLayout HeaderElement={<HeaderElement />}>
      <StudentSettings />
    </StudentLayout>
  );
};

export default StudentProfile;