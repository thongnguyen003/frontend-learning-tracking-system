import React from "react";
import "./menu.css";
import webIcon from "./webIcon.svg";
import clasIcon from './class.svg';
import homeIcon from './home.svg';
import routineIcon from './routinesvg.svg';
const Menu = ()=>{
    return(
        <aside  className="col-md-1 ">
            <div className="d-flex justify-content-center align-items-center p-2 mr-2 border-bottom border-muted" style={{height:"70px",marginRight:"8px"}}>
                <img src={webIcon} alt="My Icon" style={{width:"100%",height:"100%"}}  />
            </div>
            <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled ">
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"60px",width:"100%"}}>
                    <img src={homeIcon} alt="My Icon" style={{width:"100%",height:"100%"}}  />
                </li>
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"60px",width:"100%"}}>
                    <img src={clasIcon} alt="My Icon" style={{width:"100%",height:"100%"}}  />
                </li>
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"70px",width:"100%"}}>
                    <img src={routineIcon} alt="My Icon" style={{width:"100%",height:"100%"}}  />
                </li>
            </ul>
        </aside>
    );
}
export default Menu;