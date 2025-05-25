import React ,{useEffect, useState}from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from "../components/Menu"; 
import { Outlet, Link,useNavigate} from "react-router-dom";
// import Header from "../components/Header";
import '../../../../src/features/student/styles/course.css';
import "../../../assets/css/globalStyle.css";
const Course = () => {
  const [navigateBar,setNavigateBar]=useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('')
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
                      <Link to="detailCourse">
                        Course Detail
                      </Link>
                    </button>
                    <button
                      className={`p-2 rounded ${!navigateBar ? "globalActive " : ""}`}
                      onClick={() => setNavigateBar(false)}
                    >
                      <Link to="studentlist" >
                        Student List
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

export default Course;
