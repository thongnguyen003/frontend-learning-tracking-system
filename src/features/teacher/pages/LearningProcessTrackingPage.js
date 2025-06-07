import React from "react";
import { useState,useEffect } from "react";
import TeacherLayout from "../../../layouts/TeacherLayout";
import LearningProcessTracking from "../../student/learning_process_tracking/LearningProcessTracking";
import { Link ,useNavigate} from "react-router-dom";
const HeaderElement = ()=>{
  const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1); 
    };
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><div onClick={handleBack} >Back</div></span>
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