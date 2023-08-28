import React, { useEffect } from 'react';
import "./component.css"
import Navbar from '../Dashboard/Navbar';
import { useNavigate, useParams } from 'react-router-dom';

function OrderListComponent(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { orderList, OrderListAPI } = props;

  console.log(orderList.order);

  useEffect(() => {

    if (!token || role !== "user") {
      navigate("/Login")
    }
    fetchData();
  }, [])

  const fetchData = async () => {
    try{
      const response = await OrderListAPI(id, token)
    console.log(response);
    }catch(error){
      console.log(error);
    }
    
  }
  return (
    <>
      <Navbar />
      <div className="OrderList">
      {orderList.order.length === 0 ? (
        <h1>No orders to display.</h1>
      ) : (
        <div className="order-card">
            {orderList.order?.map((list, i) => (
              <div key={i} className='card-wrap'>
                <div className='card' style={{ width: "18rem" }}>
                  <img className="card-img-top" src={`http://localhost:3005/${list.comic_img}`} alt="" height="200" width="600" />
                  <hr className="solid" />
                  <div className="card-body">
                    <h5 className="card-title">{list.name}</h5>
                    <h6 className="card-title">Genre: {list.genre}</h6>
                    <h6 className="card-title">Author: {list.author}</h6>
                    <h6 className="card-title">Language: {list.language}</h6>
                    <h6 className="card-title">Cost: ${list.cost}</h6>
                    <h6 className="card-title">
                      About: {list.info}
                    </h6>
                    <hr className="solid" />
                    <div className='read'>
                    <button className="read-btn">
                    <a href={list.comic_link}>
                    Read
                    </a>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}
      </div>
    </>
  )
}

export default OrderListComponent

