import React from "react";
import { useState,useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import LearningProcessTracking from "../learning_process_tracking/LearningProcessTracking";
import { Link } from "react-router-dom";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to='/student'>&larr; Back</Link></span>
      <span className=" fs-5">IT English</span>
    </div>
  );
}
const LearningProcessTrackingPage = ()=>{
  return(
    <StudentLayout HeaderElement={<HeaderElement/>}>
      <LearningProcessTracking></LearningProcessTracking>
    </StudentLayout>
  );
}
export default LearningProcessTrackingPage;