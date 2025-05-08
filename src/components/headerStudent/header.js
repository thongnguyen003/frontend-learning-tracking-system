import React from "react";
import styles from "./header.module.css";

const Header = ({ children, userName, userRole }) => {
  return (
    <div className={styles.headerContainer}>
      {children}
      <div className={styles.userInfo}>
        <div className={styles.avatar}></div>
        <div className="me-2 text-start">
          <div className="fw-semibold">{userName}</div>
          <small className="text-muted">{userRole}</small>
        </div>
      </div>
    </div>
  );
};

export default Header;
