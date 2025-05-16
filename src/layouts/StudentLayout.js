import React from "react";
import "../assets/css/studentLayout.css";
import Menu from "../features/student/components/Menu";
import Header from "../features/student/components/Header";
const StudentLayout = ({HeaderElement, children, fullScreen = false}) => {
  return (
    <div className={`bigContainer d-flex${fullScreen ? ' fullScreen' : ''}`}>
      {!fullScreen && <Menu />}
      <div className={`mainContainer${fullScreen ? ' fullWidth' : ' col-md-11 px-3'}`}>
        {/* header */}
        <Header>{HeaderElement}</Header>
        {/* main */}
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;