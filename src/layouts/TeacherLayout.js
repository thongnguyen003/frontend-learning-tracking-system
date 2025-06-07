import React from "react";
import "../assets/css/teacherLayout.css";
import Menu from "../features/teacher/components/Menu";
import Header from "../features/teacher/components/Header";
const TeacherLayout = ({HeaderElement,children}) => {
  return (
    <div className="bigContainer ">
        <Menu ></Menu>
        <div className="mainContainer ">
            {/* header */}
            <Header>{HeaderElement}</Header>
            {/* main */}
            <div className="mainBody">{children}</div>
        </div>
    </div>
  );
};
export default TeacherLayout;

