import React from "react";
import "./header.css"; 

const Header = ({children}) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2" style={{height:"70px"}}>
        {children}
      <div className="d-flex align-items-center">
      <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            marginRight:'3px',
          }}
        ></div>
        <div className="me-2 text-start">
          <div className="fw-semibold">Huỳnh Hữu Hậu</div>
          <small className="text-muted">Student</small>
        </div>
        
      </div>
    </div>
  );
};

export default Header;