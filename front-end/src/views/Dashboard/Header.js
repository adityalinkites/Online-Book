import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import logo from "./images/headerLogo.png"
import "./Header.css";
import { useNavigate } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function Register() {
    navigate("/Register")
  }

  function Login() {
    navigate("/Login")//hkjjhkkjkjk
  }

  return (
    <header className="header">
      <div className='headerElement'>
          <div className='header-1'>
          <hr className="solid" />
          <span className='logo'>
          <img src={logo} alt="Webtoon Logo" style={{ width: 250, height: 150 }} />
          </span>
          {!token && (
          <span className='butt'>
          <button className='btn' onClick={Register}>
          REGISTER
            </button>
            <button className='btn' onClick={Login}>
            LOGIN
            </button>
          </span>
          
          )}
          <hr className="solid" />
          </div>
      </div>
    </header>
  )
}

export default Header;


