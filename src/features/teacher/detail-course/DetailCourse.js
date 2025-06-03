import React ,{useEffect, useState}from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from "../components/Menu"; 
import { Outlet, Link,useNavigate} from "react-router-dom";
// import Header from "../components/Header";
import '../../../../src/features/student/styles/course.css';
import "../../../assets/css/globalStyle.css";
const DetailCourse = () => {
  const [navigateBar,setNavigateBar]=useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('infoCourse')
  },[])

  return (
    <>
        <div className="course-layout-container">
            <div className="course-layout-inner">
                <aside className="course-sidebar  p-3 ">
                  <nav className="d-flex flex-column gap-2">
                    <Link to="infoCourse">
                      <button className={`p-2 rounded ${navigateBar ? "globalActive " : ""}`} onClick={() => setNavigateBar(true)} style={{width:'150px'}}>
                          Course Detail
                      </button>
                    </Link>
                    <Link to="listStudent" >
                      <button className={`p-2 rounded ${!navigateBar ? "globalActive " : ""}`} onClick={() => setNavigateBar(false)} style={{width:'150px'}}>
                          Student List
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

export default DetailCourse;
