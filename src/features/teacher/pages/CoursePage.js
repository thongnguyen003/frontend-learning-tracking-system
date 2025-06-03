import React from "react";
import { useState,useEffect } from "react";
import TeacherLayout from "../../../layouts/TeacherLayout";
import HomepageMain from "../../student/homepage/HomepageMain";
import { Link } from "react-router-dom";
const HeaderElement = ({name})=>{
  return(
    <div className="d-flex align-items-center">
        <span className="me-3  fs-5" style={{ cursor: "pointer" }}><div >{name}</div></span>
      </div>
  );
}
const CoursePageT = ()=>{
  const [name,setName]= useState(null)
  return(
    <TeacherLayout  HeaderElement={<HeaderElement name={name}/> }>
      <HomepageMain setName={setName}></HomepageMain>
    </TeacherLayout>
  );
}
export default CoursePageT;