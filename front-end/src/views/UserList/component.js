import React, { useState, useEffect } from "react";
import Navbar from "../Dashboard/Navbar";
import "./component.css";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const UserComponent = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const pageSize = 5;
  const{userList, UserListAPI, DeleteUserAPI} = props

  console.log(userList)
  console.log(searchKey, "<<<<")

  useEffect(() => {

    if(!token || role === "user"){
      navigate("/login")
    }
    fetchData();
    console.log(UserListAPI, "<<<<user list");
  }, [currentPage]);

  const fetchData= () => { 
    UserListAPI(searchKey, currentPage, pageSize, token)
    console.log(currentPage)
  }

  const onPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };
  
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchKey(e.target.value);
    fetchData();
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(searchKey, "<<<")
    fetchData();
  }

  const handleDelete = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this User?"
    );

    if (confirmBox) {
      setTimeout(() => {
        fetchData();
      }, 1000);
      DeleteUserAPI(id);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="tableDesign">
      <h2 className="UserTitle">USER LIST</h2>
      <form className="form-search" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search Here"
          value={searchKey}
          aria-label="Search"
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>City</th>
            <th>State</th>
            <th>Profile Image</th>
            <th>Permission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.users.map((user, i) => (
            <tr key={i}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.country ? user.country : "Null"}</td>
              <td>{user.city ? user.city : "Null"}</td>
              <td>{user.state ? user.state : "Null"}</td>
              <td>
                <img className="user-img"
                  src={`http://localhost:3005/${user.image_path}`}
                  alt="Upload_image"
                  width="105"
                  height="100"
                />
              </td>
              <td  style={user.permission? {color: "green"} : {color: "red"}} > {user.permission? "Active" : "Inactive"} </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.user_id)}
                >
                  Delete
                </button>

                  <a className= "btn btn-primary" href={`/UpdateUser/${user.user_id}`}>Update</a>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        <Pagination
          onChange={onPageChange}
          current={currentPage}
          pageSize={pageSize}
          defaultCurrent={1}
          total={userList.totalUsers}
        />
      </div>
    </div>
    </>
  );
};

export default UserComponent;
