import React from "react";
import "./studentLayout.css";
import Menu from "../components/leftMenuStudent/Menu";
import Header from "../components/headerStudent/header";
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