import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../store/login/duck';
import "./Logout.css"
import cart from "./Dashboard/images/Icons/logout1.png"
function LogoutComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let auth = useSelector((state)=> (state?.loginUser.auth));
    useEffect(()=>{
      if(auth === false){
        navigate("/Login");
      }
    },[auth])
    const handleLogout = ()=> {
      const confirmBox = window.confirm("Do you really want to Logout?");
      if(confirmBox){
        dispatch(Logout());
        localStorage.removeItem("token");
        // navigate("/Login");
      }
    }
  return (
        <img className="logout-btn" src={cart} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={handleLogout} />
  )
}

export default LogoutComponent
