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
                    <button
                      className={`p-2 rounded ${navigateBar ? "globalActive " : ""}`}
                      onClick={() => setNavigateBar(true)}
                    >
                      <Link to="goal">
                        Goals
                      </Link>
                    </button>
                    <button
                      className={`p-2 rounded ${!navigateBar ? "globalActive " : ""}`}
                      onClick={() => setNavigateBar(false)}
                    >
                      <Link to="learningJournal" >
                        Learning Journal
                      </Link>
                    </button>
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
