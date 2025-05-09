import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from "../components/Menu"; 
import { Outlet, Link,Routes, Route} from "react-router-dom";
// import Header from "../components/header"; // Nếu cần, hãy nhập đúng cách
import LearningGoals from "./CourseGoal";

const Course = () => {

  return (
    <>
        <div className="  items-start justify-center pl-4">
            <div className="d-flex " style={{boxSizing:"borderbox"}}>
                <aside className="flex flex-col mr-6 items-start p-6 gap-1  border-r border-[#d6d6f7]" style={{width:"240px"}}>
                  <div className="bg-[#00b72f] text-white text-[13px] font-semibold rounded px-2 py-[2px] mb-2 select-none">
                      <Link to = 'goal'>Goals</Link>
                  </div>
                  <div className="text-[13px] font-normal select-none"><Link to = 'learningJournal'>Learning Journal</Link></div>
                </aside>
                <Outlet></Outlet>
            </div>
            
        </div>
    </>
  );
};

export default Course;