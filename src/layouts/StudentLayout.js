import React from "react";
import "../assets/css/studentLayout.css";
import Menu from "../features/student/components/Menu";
import Header from "../features/student/components/Header";
const StudentLayout = ({HeaderElement,children}) => {
  return (
    <div className="bigContainer d-flex ">
        <Menu ></Menu>
        <div className="mainContainer col-md-11 px-3">
            {/* header */}
            <Header>{HeaderElement}</Header>
            {/* main */}
            {children}
        </div>
    </div>
  );
};

export default StudentLayout;