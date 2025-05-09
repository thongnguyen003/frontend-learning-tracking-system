
import React from "react";
import "./studentLayout.css";
import Menu from "../components/leftMenuStudent/Menu";
import Header from "../components/headerStudent/header";

const ProfileLayout = ({HeaderElement, children}) => {
  return (
    <div className="bigContainer d-flex">
        <Menu />
        <div className="mainContainer col-md-11 px-3">
            <Header>{HeaderElement}</Header>
            {children}
        </div>
    </div>
  );
};
export default ProfileLayout;