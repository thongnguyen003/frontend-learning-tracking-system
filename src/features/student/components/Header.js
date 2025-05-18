import React,{useState,useEffect} from "react";
import "../styles/header.css"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = ({children}) => {
  const navigate = useNavigate();
  const [user,setUser]= useState(null);
  useEffect(()=>{
      const findUser = JSON.parse(sessionStorage.getItem('current_user'));
      if(!findUser){
        navigate("/");
        toast.error('Please login to your account!');
      }
      setUser(findUser.account);
  },[sessionStorage.getItem('current_user')])
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2" style={{height:"70px"}}>
        {children}
      <div className="d-flex align-items-center">
      <div style={{width: "32px", height: "32px", borderRadius: "50%",backgroundColor: "#ccc", marginRight:'3px', }}>
        {/* add Image */}
      </div>
        <div className="me-2 text-start">
          <div className="fw-semibold">{user?.name}</div>
          <small className="text-muted">Student</small>
        </div>
        
      </div>
    </div>
  );
};

export default Header;