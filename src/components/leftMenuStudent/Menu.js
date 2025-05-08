import React from "react";
import "./menu.css";
import webIcon from "./webIcon.svg";
import clasIcon from './class.svg';
import homeIcon from './home.svg';
import routineIcon from './routinesvg.svg';

const menuItems = [
  { icon: homeIcon, alt: "Home Icon", height: 60 },
  { icon: clasIcon, alt: "Class Icon", height: 60 },
  { icon: routineIcon, alt: "Routine Icon", height: 70 },
];

const Menu = () => {
  return (
    <aside className="col-md-1">
      <div className="d-flex justify-content-center align-items-center p-2 mr-2 border-bottom border-muted menu-header">
        <img src={webIcon} alt="My Icon" className="menu-header-icon" />
      </div>
      <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled menu-list">
        {menuItems.map(({ icon, alt, height }, index) => (
          <li
            key={index}
            className="d-flex justify-content-center align-items-center p-2 menu-item"
            style={{ height: `${height}px`, width: "100%" }}
          >
            <img src={icon} alt={alt} className="menu-item-icon" />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Menu;
