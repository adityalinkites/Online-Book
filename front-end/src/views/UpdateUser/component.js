import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "./component.css"


function UpdateUserComponent(props) {
    console.log(props)
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [permission, setPermission] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
    console.log(role)
    const { singleUser, SingleUserAPI, updateUser, UpdateUserAPI } = props
    const user = singleUser.user;
    console.log(updateUser? updateUser : "!!!")

    useEffect(() => {
        if (!token) {
            navigate("/Login")
            return;
        }
        SingleUserAPI(id, token)
        setFname(user.first_name);
        setLname(user.last_name);
        setEmail(user.email);
        setPhone(user.phone);
        setGender(user.gender);
        setCountry(user.country || "Null");
        setCity(user.city || "Null");
        setState(user.state || "Null");
    }, [user.user_id]);

    // useEffect(() => {
    //     console.log(message)
    //     if (message === "Data updated successfully.") {
    //         alert(message, "<<<<<")
    //         navigate("/UserList");
    //     }
    // }, [message])

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

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUser = (e) => {
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

        if (phone === "" || phone.length !== 10) {
            setError("Phone must contain 10 digits");
            return;
        }

        try {

            const formData = new FormData();
            formData.append("first_name", Fname);
            formData.append("last_name", Lname);
            formData.append("gender", gender);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("image", file);
            formData.append("country", country);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("permission", permission)

            const response = UpdateUserAPI(id, formData)
            if (response.status === 200) {
                console.log("Data updated successfully.");
                alert("Data updated successfully.", response);
                navigate("/UserList");
            } else {
                console.log("Unexpected response:", response);
                if(role === "Admin"){
                    navigate("/UserList")
                }
                else{
                    navigate(`/SingleUser`)
                }
                
            }
        }
        catch (err) {
            console.log(err.response);

            if (
                err.response &&
                err.response.data.error &&
                err.response.data.message === "Email already exists"
            ) {
                alert("Email already exists");
            } else if (
                err.response &&
                err.response.data.error &&
                err.response.data.message === "Phone already exists"
            ) {
                alert("Phone already exists");
            } else {
                console.log("Unexpected error:", err);
            }
        }
    };
    return (
        <div className='Add-wrapper'>
            <form className='Add-form'>
                <div className='title'>
                    Update User
                </div>
                <hr className="solid" />
                <div className="form-group">
                    <label htmlFor="exampleInputFname1">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputFname1"
                        onChange={handleFnameChange}
                        value={Fname}
                    />
                    {error === "Please enter your first name" && (
                        <span className="error-message">{error}</span>
                    )}

                    <br />
                    <label htmlFor="exampleInputLname1">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputLname1"
                        onChange={handleLnameChange}
                        value={Lname}
                    />
                    {error === "Please enter your last name" && (
                        <span className="error-message">{error}</span>
                    )}

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

                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    {error === "Please enter a valid email address" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputPhone1">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPhone1"
                        onChange={handlePhoneChange}
                        value={phone}
                    />
                    {error === "Phone must contain 10 digits" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputCity1">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputCity1"
                        onChange={handleCityChange}
                        value={city}
                    />
                    <br />
                    <label htmlFor="exampleInputState1">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputState1"
                        onChange={handleStateChange}
                        value={state}
                    />
                    <br />
                    <label htmlFor="exampleInputCountry1">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputCountry1"
                        onChange={handleCountryChange}
                        value={country}
                    />
                    <br />
                    <label htmlFor="exampleInputImage1">Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        id="exampleInputImage1"
                        onChange={saveFile}
                    />
                    <br />
                    {role === "Admin" && (

                        <div className="form-check">
                            <span>Permission :  &nbsp;</span>
                            <input
                                type="radio"
                                id="exampleCheck4"
                                name="Choose"
                                value="1"
                                checked={permission === "1"}
                                onChange={(e) => setPermission(e.target.value)}
                            />
                            <label htmlFor="exampleCheck4">Active &nbsp;</label>
                            <input
                                type="radio"
                                id="exampleCheck5"
                                name="Choose"
                                value="0"
                                checked={permission === "0"}
                                onChange={(e) => setPermission(e.target.value)}
                            />
                            <label htmlFor="exampleCheck5">Inactive &nbsp;</label>
                        </div>
                    )}
                    <button type="submit"
                        id="but"
                        className="btn"
                        onClick={handleUser}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUserComponent;