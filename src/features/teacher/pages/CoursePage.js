import React from "react";
import { useState,useEffect } from "react";
import Course from "../course/Course";
import { Link } from "react-router-dom";
import TeacherLayout from "../../../layouts/TeacherLayout";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to='/student'>&larr; Back</Link></span>
      <span className=" fs-5">IT English</span>
    </div>
  );
}
const CoursePage = ()=>{
const [course,setCourse] = useState([]);
useEffect(()=>{
  const fetchCourse = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/course/getByCourseId/9');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setCourse(result.original || []); 
      console.log(result.original || []);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };
  fetchCourse();
},[]);
  return(
    <TeacherLayout HeaderElement={<HeaderElement/>}>
      <Course></Course>
    </TeacherLayout>
  );
}
export default CoursePage;