import React from "react";
import { useState, useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import Profile from "../profile/Profile"
import { Link } from "react-router-dom";

const HeaderElement = ()=>{
    return (
        <div className="d-flex align-item-center">
            <span className="me-3 fs-5" style={{cursor: "pointer"}}><Link to = '/student'></Link>Back</span>
            <span className="fs-5"> My profile </span>
        </div>
    );
}
const ProfilePage = () => {
    const [profile, setProfile] = useState([]);
    useEffect (()=>{
        const fetchProfile = async ()=>{
            try{
                const response = await fetch ("http://127.0.0.1:8000/api/students");
                if(!response.ok){
                    throw new Error(`HTTP error! Status:${response.status}`);
                }
                const result = await response.json();
                setProfile(result.original || []);
            }
            catch(error){
                console.error('Failed to fetch course', error);
            }
        };
        fetchProfile();
    },[]);
    return(
    
        <StudentLayout HeaderElement={<HeaderElement />}>
            <Profile/>
        </StudentLayout>
    )
}
export default ProfilePage;