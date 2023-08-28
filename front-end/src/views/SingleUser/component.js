import React, { useEffect } from "react";
import "./component.css"
import { useNavigate, useParams} from "react-router-dom";
import Navbar from "../Dashboard/container";

function SingleUserComponent(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {singleUser, SingleUserAPI} = props
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const user = singleUser?.user;

  useEffect(() => {
    if(!token || role !== "user"){
      navigate("/Login")
      return;
    }

    fetchData();
    console.log(user)
  },[]);

  const fetchData = () => {
    SingleUserAPI(id, token)
    console.log(singleUser)
  };

  function Update(){
    navigate(`/UpdateUser/${user.user_id}`)
  }

  function YourComic(){
    navigate(`/OrderList/${user.user_id}`)
  }

  return (
    <>
    <Navbar/>
    <div className="tableDesign">
      <div className="card" style={{ width: "20rem" }}>
        <img src={`http://localhost:3005/${user.image_path}`} className="card-img-top" alt="..." height="250" width="100" />
        <div className="card-body">
          <h6 className="card-title">Name : {user.first_name} {user.last_name}</h6>
          <h6 className="card-title">Email : {user.email} </h6>
          <h6 className="card-title">Mobile : +91 {user.phone} </h6>
          <h6 className="card-title">Gender : {user.gender} </h6>
          <h6 className="card-title">City : {user.city || "Null"} </h6>
          <h6 className="card-title">State : {user.state || "Null"} </h6>
          <h6 className="card-title">Country : {user.country || "Null"} </h6>
          <div style={{display: "inline"}}>
          <button className="btn btn-primary" onClick={Update}>
            Update
          </button>
          <button className="btn btn-primary" onClick={YourComic}>
            Your Comics
          </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SingleUserComponent;
