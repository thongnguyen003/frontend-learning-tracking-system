import React from "react";
import { useState,useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import HomepageMain from "../homepage/HomepageMain";
const HeaderElement = ({name})=>{
  return(
    <div className="d-flex align-items-center">
        <span className="me-3  fs-5" style={{ cursor: "pointer" }}><div > {name}</div></span>
      </div>
  );
}
const StudentHomepage = ()=>{
  const [name,setName]= useState(null)
  return(
    <StudentLayout  HeaderElement={<HeaderElement name={name}/> }>
      <HomepageMain setName={setName}></HomepageMain>
    </StudentLayout>
  );
}
export default StudentHomepage;