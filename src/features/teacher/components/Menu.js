import React from "react";
import { useNavigate } from "react-router-dom";
import "../../student/styles/menu.css";
import webIcon from "../../../assets/icons/webIcon.svg";
import clasIcon from '../../../assets/icons/class.svg';
import homeIcon from '../../../assets/icons/home.svg';
import routineIcon from '../../../assets/icons/routinesvg.svg';
const Menu = ()=>{
    const navigate = useNavigate();
    return(
        <aside className="col-md-1 ">
            <div className="d-flex justify-content-center align-items-center py-2 border-bottom border-muted" style={{maxHeight:"5rem",marginRight:"8px",overflow:"hidden"}}>
                <img  src={webIcon} alt="My Icon" style={{width:"100%",height:"100%"}} onClick={() => navigate('/student')} />
            </div>
            <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled ">
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"60px",width:"100%"}}>
                    <img src={homeIcon} alt="My Icon" style={{width:"100%",height:"100%"}} onClick={() => navigate('/portfolio')} />
                </li>
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"60px",width:"100%"}}>
                    <img src={clasIcon} alt="My Icon" style={{width:"100%",height:"100%"}} />
                </li>
                <li className="d-flex justify-content-center align-items-center p-2" style={{height:"70px",width:"100%"}}>
                    <img src={routineIcon} alt="My Icon" style={{width:"100%",height:"100%"}} />
                </li>
            </ul>
        </aside>
    );
}
export default Menu;
