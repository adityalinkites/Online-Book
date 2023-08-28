import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./component.css"

function CartComponent(props) {
    const navigate = useNavigate();
    const { cartItems, removeItemFromCart, CheckOutAPI, checkOut } = props
    const token = localStorage.getItem("token");
    // console.log(checkOut);

    const TotalComics = cartItems.length;
    let id = [];
    let TotalCost = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const itemCost = parseFloat(cartItems[i].cost);
        id.push(parseInt(cartItems[i].comic_id));
        TotalCost += itemCost;
    }

    // console.log("TotalCost", TotalCost);
    // console.log("Comic IDs", id);

    const handelRemove = (itemId) => {
        console.log(itemId)
         removeItemFromCart(itemId);
    }


    const handleCheckOut = async () => {

        if(TotalComics === 0){
            alert("Cart is empty")
        }
        else{
            try {
            const response = await CheckOutAPI(token, {id})
            console.log(response);

            if(checkOut.status){
                navigate("/")
            }
        } catch (error) {
            console.log(error, "<<<<<<");
        }
        }
    }

    return (
        <div className='Cart'>
            <div className='title'>
                <h1>Your Cart</h1>
            </div>
            <span className='Cart-wrap'>
                <hr className="solid" />
                {cartItems.map((list, i) => (
                    <div key={i} className='card-wrap'>
                        <div className='card' style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`http://localhost:3005/${list.comic_img}`} alt="" height="200" width="600" />
                            <div className="card-body">
                                <h5 className="card-title">{list.name}</h5>
                                <h6 className="card-title">Genre: {list.genre}</h6>
                                <h6 className="card-title">Author: {list.author}</h6>
                                <h6 className="card-title">Language: {list.language}</h6>
                                <h6 className="card-title">Cost: ${list.cost}</h6>
                                <p className="card-text">
                                    About: {list.info}
                                </p>
                                <button className="btn btn-danger" onClick={() => handelRemove(list.comic_id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </span>
            <hr className="solid" />
            <div className='cal'>
                <h2>Ready for Check-Out</h2>
                <div className='card-wrap'>
                    <h5>Number of Comics : {TotalComics}</h5>
                    <h5>Total Cost : ${TotalCost}</h5>
                    <br />
                </div>
                
                <div className='cart-btn'>
                <button className='btn' onClick={handleCheckOut}>
                    checkout
                </button>
                </div>
            </div>
        </div>
    )
}

export default CartComponent
