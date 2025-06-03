import React from "react";
import { useState,useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";

import Classes from "../classes/Classes";
import { Link } from "react-router-dom";
const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
      <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to='/Teacher'>&larr; Back</Link></span>
      <span className=" fs-5"> Class </span>
    </div>
  );
}
const ClassesPage = ()=>{
const [classes,setClasses] = useState([]);
useEffect(()=>{
  const fetchClasses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/class/getByTeacherId/4');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setClasses(result.original || []); 
      console.log(result.original || []);
    } catch (error) {
      console.error('Failed to fetch Classes:', error);
    }
  };
  fetchClasses();
},[]);
  return(
    <StudentLayout HeaderElement={<HeaderElement/>}>
      <Classes></Classes>
    </StudentLayout>
  );
}
export default ClassesPage;