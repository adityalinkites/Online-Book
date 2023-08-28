import React from "react-router-dom"
import "./Navbar.css"
// import Badge from 'react-bootstrap/Badge';
import { useState } from "react"
import cart from "../Dashboard/images/Icons/cart3.png"
import home from "../Dashboard/images/Icons/home2.png"
import list from "../Dashboard/images/Icons/list.png"
import store from "../Dashboard/images/Icons/store.png"
import user from "../Dashboard/images/Icons/icons8-user-50.png"
import { useNavigate } from "react-router-dom"
import Logout from "../Logout"
const Navbar = (props) => {
    const [num, setNum] = useState("")
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const navigate = useNavigate();
    const {cartItems} = props
    console.log(cartItems)

    function Cart() {
        navigate("/cart")
    }

    function Home() {
        navigate("/")
    }

    function UserList() {
        navigate("/UserList")
    }

    function Store() {
        navigate("/WebList")
    }

    function User() {
        navigate("/SingleUser")
    }

    // function handleNum() {
    //     setNum(num)
    // }

    if (token) {
        if (role === "Admin") {
            return (
                <nav className="navbar">
                    <img className="home-logo" src={home} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={Home}/>
                    <img className="home-logo" src={list} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={UserList}/>
                    <img className="home-logo" src={store} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={Store}/>
                    <Logout onClick={props.handleLogout}></Logout>
                </nav>
            );
        }
        else if (role === "user") {
            return (
                <nav className="navbar ">
                        <img className="home-logo" src={home} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={Home}/>
                        <div className="num-logo">{cartItems?.length ? (cartItems.length) : (0)}</div>
                        <img className="home-logo" src={user} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={User}/>
                        <img className="cart-logo" src={cart} alt="Webtoon Logo" style={{ width: 50, height: 50 }} onClick={Cart} />
                        <Logout className="cart-logo" onClick={props.handleLogout} />

                </nav>
            );
        }
    }
    return (
        null
    );
}

export default Navbar;