import React from "react";
import { useState,useEffect } from "react";
import TeacherLayout from "../../../layouts/TeacherLayout";
import HomepageMain from "../../student/homepage/HomepageMain";
import { Link } from "react-router-dom";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
        <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to="/student">&larr; IT English</Link></span>
      </div>
  );
}
const CoursePageT = ()=>{
  return(
    <TeacherLayout  HeaderElement={<HeaderElement/> }>
      <HomepageMain ></HomepageMain>
    </TeacherLayout>
  );
}
export default CoursePageT;