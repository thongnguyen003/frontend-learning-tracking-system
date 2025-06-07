import React from "react";
import { useState,useEffect } from "react";
import DetailCourse from "../detail-course/DetailCourse";
import { Link,useNavigate } from "react-router-dom";
import TeacherLayout from "../../../layouts/TeacherLayout";
const HeaderElement = ()=>{
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><div onClick={handleBack} > Back</div></span>
    </div>
  );
}
const DetailCoursePage = ()=>{
const [course,setCourse] = useState([]);
useEffect(()=>{
  const fetchCourse = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/class/getByTeacherId/4');
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
      <DetailCourse></DetailCourse>
    </TeacherLayout>
  );
}
export default DetailCoursePage;