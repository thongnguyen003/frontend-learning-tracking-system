import React ,{useEffect, useState}from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import Menu from "../components/Menu"; 
import { Outlet, Link,useNavigate} from "react-router-dom";
// import Header from "../components/header"; // Nếu cần, hãy nhập đúng cách
import '../../../../src/features/student/styles/course.css';
import "../../../assets/css/globalStyle.css";
const LearningProcessTracking = () => {
  const [navigateBar,setNavigateBar]=useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('goal')
  },[])

  return (
    <>
        <div className="course-layout-container">
            <div className="course-layout-inner">
                <aside className="course-sidebar  p-3 ">
                  <nav className="d-flex flex-column gap-2">
                    <Link to="goal">
                      <button className={`p-2 rounded ${navigateBar ? "globalActive " : ""}`} onClick={() => setNavigateBar(true)} style={{width:'150px'}}>
                        Goals
                      </button>
                    </Link>
                    <Link to="learningJournal" >
                      <button className={`p-2 rounded ${!navigateBar ? "globalActive " : ""}`} onClick={() => setNavigateBar(false)}  style={{width:'150px'}} >                     
                          Learning Journal
                      </button> 
                    </Link>
                  </nav>
                </aside>
                <div className="outlet" >
                  <Outlet></Outlet>
                </div>
            </div>
            
        </div>
    </>
  );
};

export default LearningProcessTracking;
