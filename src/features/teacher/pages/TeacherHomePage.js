import React from "react";
import { useState, useEffect } from "react";
import TeacherLayout from '../../../layouts/TeacherLayout.js';
import HomepageMain from "../homepage/HomepageMain";
import { Link } from "react-router-dom";

const HeaderElement = ()=>{
  return(
    <div className="d-flex align-items-center">
        <span className="me-3  fs-5" style={{ cursor: "pointer" }}></span>
      </div>
  );
}
const TeacherHomepage = ()=>{
  return(
    <TeacherLayout  HeaderElement={<HeaderElement/> }>
      <HomepageMain></HomepageMain>
    </TeacherLayout>
  );
}
export default TeacherHomepage;