import React, { useEffect, useState } from 'react'
import "./component.css"
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Dashboard/container';
function ViewPageComponent(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const pageSize = 8; //LIMIT
    const { webList, WebListAPI, cartItems} = props;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    console.log(cartItems)
    useEffect(() => {
        if(!token){
            navigate("/Login")
            return;
        }

        fetchData();
    }, [currentPage])

    const fetchData = () => {
        try {
            const response = WebListAPI(searchKey, currentPage, pageSize, token);
            console.log(response, webList)
        } catch (error) {
            console.log(error)
        }
    }
    const onPageChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchKey(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        console.log(searchKey, "<<<")
        fetchData();
    }

    const handleAddToCart = (item) => {
        props.addToCart(item);
    };
        return (
            <>
            <Navbar />
            <div className='List'>
                <div className='search'>
                    <form className="form-inline" onSubmit={handleSearchSubmit}>
                        <input
                            type="search"
                            placeholder="Search Here"
                            value={searchKey}
                            aria-label="Search"
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
                <div className='list-2'>
                    {webList.comic?.map((list, i) => (
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
                                    <div className='List-btn'>
                                    <button className=" addToCart " onClick={() => handleAddToCart(list)} >
                                        Add to Cart
                                    </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination-container">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={webList.totalRecords}
                        defaultCurrent={1}
                        onChange={onPageChange}
                    />
                </div>
            </div>
            </>
        )
    }

    export default ViewPageComponent;
