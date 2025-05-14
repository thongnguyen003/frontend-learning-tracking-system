import React, { use, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Menu from "../components/Menu";
import "../styles/menu.css"
import { Outlet, Link, Routes, Route, useNavigate } from "react-router-dom";
import GeneralInfo from "./general/GeneralInfo";
const Profile= () =>{
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('general')
  }, useNavigate)
  return(
    <div className="  items-start justify-center pl-4">
        <div className="d-flex " style={{boxSizing:"borderbox"}}>
            <aside className="flex flex-col mr-6 items-start p-6 gap-1  border-r border-[#d6d6f7]" style={{width:"240px"}}>
              <div className="bg-[#00b72f] text-white text-[13px] font-semibold rounded px-2 py-[2px] mb-2 select-none">
                  <Link to = 'general'>General</Link>
              </div>
              <div className="text-[13px] font-normal select-none"><Link to = 'changePassword'>Change Password </Link></div>
            </aside>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
export default Profile;