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
        <div className="bg-[#f0f4fb] min-h-screen flex items-start justify-center p-4">
            <div className="flex w-full h-full max-w-none min-h-screen">
                <aside className="flex flex-col items-start gap-1 pr-6 border-r border-[#d6d6f7]">
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