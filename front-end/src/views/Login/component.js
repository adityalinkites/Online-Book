import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./component.css"

function LoginComponent(props) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginUser, LoginUserAPI } = props;

    useEffect(() => {
        if(loginUser.auth === true){
            localStorage.setItem("token", loginUser.token);
            localStorage.setItem("role", loginUser.user.role)
            if (loginUser.user.role === "Admin") {
                console.log(loginUser?.user.role)
        alert(loginUser.message)
 
        navigate("/UserList");
      } else {

        navigate(`/SingleUser`);
      }
        }
    },[loginUser.auth, loginUser.role])

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (phone.trim() === "") {
            setError("Please Enter Your Contact No.");
            return;
        }

        if (password.trim() === "") {
            setError("Please Enter Your Password");
            return;
        }
        try {

            const Data = {
                phone: phone.trim(),
                password: password.trim(),
            };
            const response = await LoginUserAPI(Data);
            console.log("Login successful: ", response.data);

        }
        catch (error) {
            console.log("error", error);
            if (error.response) {
                console.error("Response data: ", error.response.data);
            }
            alert(error.response.data.message);
        }
    }

    return (
        <div className='login-wrapper'>
            <form className='login-form'>
                <div className='login-title'>
                    LOGIN
                </div>
                <hr className="solid" />
                <br />
                <div className="login-form-group">
                    <label htmlFor="exampleInputPhone1">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        value={phone}
                        id="exampleInputPhone1"
                        onChange={handlePhoneChange}
                    />
                    {error === "Please Enter Your Contact No." && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        id="exampleInputPassword1"
                        onChange={handlePasswordChange}
                    />
                    {error === "Please Enter Your Password" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <button type="submit" className="btn" onClick={handleSubmit}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginComponent