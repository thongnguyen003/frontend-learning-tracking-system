import React ,{useEffect}from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import Menu from "../components/Menu"; 
import { Outlet, Link,useNavigate} from "react-router-dom";
// import Header from "../components/header"; // Nếu cần, hãy nhập đúng cách
import '../../../assets/css/Course.css';
const Course = () => {
const navigate = useNavigate();
useEffect(()=>{
  navigate('goal')
},[navigate])

  return (
    <>
        <div className="course-layout-container">
            <div className="course-layout-inner">
                <aside className="course-sidebar">
                  <div className="course-sidebar-goal-link">
                      <Link to = 'goal'>Goals</Link>
                  </div>
                  <div className="course-sidebar-link"><Link to = 'learningJournal'>Learning Journal</Link></div>
                </aside>
                <Outlet></Outlet>
            </div>
            
        </div>
    </>
  );
};

export default Course;
