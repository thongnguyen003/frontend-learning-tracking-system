import React from "react";
// import "../assets/css/teacherLayout.css";
import Menu from "../features/student/components/Menu";
import Header from "../features/student/components/Header";
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

