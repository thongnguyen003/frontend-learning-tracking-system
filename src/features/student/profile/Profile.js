import React, { use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, Routes, Route, useNavigate } from "react-router-dom";
import GeneralInfo from "./general/GeneralInfo";
import { FaUser, FaLock } from "react-icons/fa";
const Profile = ({Profile}) =>{
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('general')
  }, [useNavigate]);
  return(

    <div className="items-start justify-center pl-4">
      <div className="d-flex" style={{ boxSizing: "border-box"}}>
        <aside
          className="flex flex-col mr-6 items-start p-6 gap-1 border-r border-[#d6d6f7]"
          style={{ width: "270px" }}
        >
        <div className="container mt-4">
            <div className="bg-[#00b72f] text-white text-[13px] font-semibold rounded px-2 py-[2px] mb-2 select-none">
              <Link to="general" className="flex items-center">
                <FaUser style={{ marginRight: "10px", display:"block" }} />
                General
              </Link>
            </div>
            <div className="bg-[#00b72f] text-white text-[13px] font-semibold rounded px-2 py-[2px] mb-2 select-none">
              <Link to="changepassword"className="flex items-center ">
                <FaLock style={{ marginRight: "10px"}} />
                Change Password
              </Link>
          </div>
        </div>
        </aside>
        <Outlet context={[Profile]} />
      </div>
    </div>
  );
}
export default Profile;
