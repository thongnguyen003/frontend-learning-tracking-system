import React from "react";
import { useState,useEffect } from "react";
import TeacherLayout from "../../../layouts/TeacherLayout";
import LearningProcessTracking from "../../student/learning_process_tracking/LearningProcessTracking";
import { Link } from "react-router-dom";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to='/student'>&larr; Back</Link></span>
      <span className=" fs-5">IT English</span>
    </div>
  );
}
const LearningProcessTrackingPage2 = ()=>{
  return(
    <TeacherLayout HeaderElement={<HeaderElement/>}>
      <LearningProcessTracking></LearningProcessTracking>
    </TeacherLayout>
  );
}
export default LearningProcessTrackingPage2;