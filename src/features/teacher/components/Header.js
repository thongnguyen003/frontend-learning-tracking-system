import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = ({children}) => {
  const navigate = useNavigate();
  const [user,setUser]= useState(null);
  useEffect(()=>{
      const findUser = JSON.parse(sessionStorage.getItem('current_user'));
      if(!sessionStorage.getItem('current_user')){
        navigate("/");
        toast.error('Please login to your account!');
      }else{
      setUser(findUser.account);
      }
  },[sessionStorage.getItem('current_user')])
  return (
    <header className="d-flex justify-content-between align-items-center py-2 border-bottom " style={{minHeight:"5rem"}}>
        {children}
      <div className="d-flex align-items-center">
      <div style={{width: "32px", height: "32px", borderRadius: "50%",backgroundColor: "#ccc", marginRight:'3px', }}>
        {/* add Image */}
      </div>
        <div className="me-2 text-start">
          <div className="fw-semibold">{user?.name}</div>
          <small className="text-muted">Teacher</small>
          <small className="text-muted">Student</small>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
