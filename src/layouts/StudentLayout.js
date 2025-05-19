import React from "react";
import "../assets/css/studentLayout.css";
import Menu from "../features/student/components/Menu";
import Header from "../features/student/components/header";
const StudentLayout = ({HeaderElement,children}) => {
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

export default StudentLayout;