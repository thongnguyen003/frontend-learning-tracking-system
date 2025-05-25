import React from "react";
import { useState, useEffect } from "react";
import TeacherLayout from '../../../layouts/TeacherLayout.js';
import HomepageMain from "../homepage/HomepageMain";
import { Link } from "react-router-dom";

const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
        <span className="me-3  fs-5" style={{ cursor: "pointer" }}><Link to="/Teacher">&larr; Teacher </Link></span>
      </div>
  );
}
const TeacherHomepage = ()=>{
const [classes,setclasses] = useState([]);
useEffect(()=>{
  const fetchclasses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/class/getByTeacherId/4');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setclasses(result.original || []); 
      console.log(result.original || []);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };
  fetchclasses();
},[]);
  return(
    <TeacherLayout  HeaderElement={<HeaderElement/> }>
      <HomepageMain classes={classes}></HomepageMain>
    </TeacherLayout>
  );
}
export default TeacherHomepage;