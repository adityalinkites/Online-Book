import React, { useEffect, useState } from 'react'
import "./component.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../Dashboard/Navbar';
import { Pagination } from 'antd';
function WebListComponent(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate();
    const pageSize = 8; //LIMIT
    const { webList, WebListAPI, DeleteUser } = props;
    const token = localStorage.getItem("token")

    useEffect(() => {
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
    const handleDelete = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this User?"
        );

        if (confirmBox) {
            setTimeout(() => {
                fetchData();
            }, 1000);
            DeleteUser(id);
        }
    }
    function addComic() {
        navigate("/AddComic")
    }

    return (
        <>
            <Navbar />
            <div className='List'>
                <div className='List-Element'>
                    <form className="form-search2" onSubmit={handleSearchSubmit}>
                        <input
                            type="search"
                            placeholder="Search Here"
                            value={searchKey}
                            aria-label="Search"
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                    <button className='Add-Comic' onClick={addComic}>
                        +ADD
                    </button>
                </div>
                {webList.comic?.map((list, i) => (
                    <div key={i} className='card-wrap'>
                        <div className='card' style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`http://localhost:3005/${list.comic_img}`} alt="" height="200" width="600" />
                            <div className="card-body">
                                <h5 className="card-title">{list.name}</h5>
                                <h6 className="card-title">Genre: {list.genre}</h6>
                                <h6 className="card-title">Author: {list.author}</h6>
                                <h6 className="card-title">Language: {list.language}</h6>
                                <h6 className="card-title">Cost: ${list.cost}</h6>
                                <h6 className="card-title" style={list.permission ? { color: "green" } : { color: "red" }}>Status: {list.permission ? "Active" : "Inactive"}</h6>
                                <p className="card-text">
                                    About: {list.info}
                                </p>
                                <button className="btn btn-danger" onClick={() => handleDelete(list.comic_id)}>
                                    Remove
                                </button>
                                <a href={`/UpdateComic/${list.comic_id}`} className="btn btn-primary">
                                    Update
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="pagination-container">
                    <Pagination className='page'
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

export default WebListComponent;
