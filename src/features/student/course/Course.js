import React ,{useEffect}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "../../../assets/css/globalStyle.css"
import { Outlet, Link,useNavigate} from "react-router-dom";

const Course = () => {
const navigate = useNavigate();
useEffect(()=>{
  navigate('goal')
},useNavigate)

  return (
    <>
        <div className=" items-start justify-center pl-4">
            <div className="d-flex " style={{boxSizing:"borderbox"}}>
                <aside className="flex flex-col mr-6 items-start p-6 gap-1  border-r border-[#d6d6f7]" style={{width:"240px"}}>
                  <div className="globalActive fs-6 w-100 mb-2 rounded-2 pl-2 select-none ">
                      <Link to = 'goal'>Goals</Link>
                  </div>
                  <div className="fs-6 w-100 rounded-2 pl-2   select-none"><Link to = 'learningJournal'>Learning Journal</Link></div>
                </aside>
                <Outlet></Outlet>
            </div>
            
        </div>
    </>
  );
};

export default Course;