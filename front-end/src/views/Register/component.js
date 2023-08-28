import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./component.css"

function RegisterComponent(props) {
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [Confirm, setConfirm] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register, RegisterUserAPI } = props;

    useEffect(() => {
        console.log(register);
        if (register.status === 403) {
            alert("Email or Phone already Registered")
        }
        if (register.status === 200) {
            alert(register.message)
            navigate("/Login");
        }
    }, [register.status])

    const handleFnameChange = (e) => {
        setFname(e.target.value);
    };

    const handleLnameChange = (e) => {
        setLname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
    };

    const handleUser = async (e) => {
        e.preventDefault();

        if (Fname === "") {
            setError("Please enter your first name");
            return;
        }

        if (Lname === "") {
            setError("Please enter your last name");
            return;
        }

        if (gender === "") {
            setError("Please choose your gender");
            return;
        }

        const pattern1 =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email === "" || !pattern1.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (phone === "" || phone.length !== 10) {
            setError("Phone must contain 10 digits");
            return;
        }

        const pattern2 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (password === "" || !pattern2.test(password)) {
            setError(
                "Password must contain at least one digit and one special character"
            );
            return;
        }

        if (Confirm !== password) {
            setError("Mismatch password");
            return;
        }
        try {
            const Data = {
                first_name: Fname,
                last_name: Lname,
                email: email,
                phone: phone,
                gender: gender,
                password: password,
            };
            const response = await RegisterUserAPI(Data);
        }
        catch (err) {
            console.log(err);
            if (
                err.response &&
                err.response.data &&
                err.response.data.message === "Email already exists"
            ) {
                alert("Email is already registered");
            } else if (
                err.response &&
                err.response.data.error &&
                err.response.data.message === "Phone already exists"
            ) {
                alert("Phone number is already registered");
            }
            else {
                alert("Registration failed");
            }
        }
    };
    return (
        <div className='wrapper'>
            <form className='form' onSubmit={handleUser}>
                <div className='title'>
                    Register
                </div>
                <hr className="solid" />
                <div className="form-group">
                    <label htmlFor="exampleInputFname1">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputFname1"
                        onChange={handleFnameChange}

                    />
                    {error === "Please enter your first name" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputLname1">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputLname1"
                        onChange={handleLnameChange}
                    />
                    {error === "Please enter your last name" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <label className="form-group">Gender:</label>
                <br />
                <div className=" form-check">
                    <br />
                    <input
                        type="radio"
                        id="exampleCheck1"
                        name="Choose"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="exampleCheck1">Male &nbsp;</label>
                    <br />
                    <input
                        type="radio"
                        id="exampleCheck2"
                        name="Choose"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="exampleCheck2">Female &nbsp;</label>
                    <br />
                    <input
                        type="radio"
                        id="exampleCheck3"
                        name="Choose"
                        value="others"
                        checked={gender === "others"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="exampleCheck3">Others</label>
                    <br />
                    {error === "Please choose your gender" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        onChange={handleEmailChange}
                    />
                    {error === "Please enter a valid email address" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputPhone1">Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputPhone1"
                        onChange={handlePhoneChange}
                    />
                    {error === "Phone must contain 10 digits" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputPass1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPass1"
                        onChange={handlePassChange}
                    />
                    {error ===
                        "Password must contain at least one digit and one special character" && (
                            <span className="error-message">{error}</span>
                        )}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputConfirm1">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputConfirm1"
                        onChange={handleConfirmChange}
                    />
                    {error === "Mismatch password" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default RegisterComponent;
