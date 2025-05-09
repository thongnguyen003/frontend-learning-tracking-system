import React from "react";
import { useState,useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import LearningJournal from "../journal/LearningJournal";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><a>&larr; Back</a></span>
      <span className=" fs-5">IT English</span>
    </div>
  );
}
const LearningJournalPage = ()=>{
const [course,setCourse] = useState([]);
useEffect(()=>{
  const fetchCourse = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/course/getByStudentId/11');
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
    <StudentLayout HeaderElement={<HeaderElement/>}>
      <LearningJournal ></LearningJournal>
    </StudentLayout>
  );
}
export default LearningJournalPage;