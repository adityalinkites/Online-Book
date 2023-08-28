import React, { useEffect, useState } from 'react'
import "./component.css"
import { useNavigate } from 'react-router-dom';

function AddComicComponent(props) {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [language, setLanguage] = useState("");
    const [cost, setCost] = useState("");
    const [file, setFile] = useState("");
    const [info, setInfo] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    const {addComic, AddComicAPI } = props
    // console.log(addComic);



    useEffect(() => {
        if(!token || role === "user"){
            navigate("/Login")
            return;
        }
        if(addComic.status === 200){
            alert(addComic.message)
            navigate("/WebList")
        }
    },[addComic.status])

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInfoChange = (e) => {
        setInfo(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "") {
            setError("Please Enter Comic Name");
            return;
        }

        if (genre === "") {
            setError("Please enter Genre");
            return;
        }

        if (author === "") {
            setError("Please choose your Author Name");
            return;
        }
        if (language === "") {
            setError("Please enter Language");
            return;
        }

        const parsedCost = parseInt(cost, 10);
        if (cost === "" || isNaN(parsedCost)) {
            setError("Please enter Integer value");
            return;
        }
        if (info === "") {
            setError("Please enter your About");
            return;
        }

        if (link === "") {
            setError("Please enter comic link here");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("genre", genre);
        formData.append("author", author);
        formData.append("language", language);
        formData.append("cost", cost);
        formData.append("info", info);
        formData.append("link", link);
        formData.append("image", file);

        try {
            const response = await AddComicAPI(formData, token);
            console.log(response, "<<<<<<");
        } catch (error) {
            console.error(error, "<<<<<");
        }
    };
 
    return (
        <div className='Add-wrapper'>
            <form className='Add-form'>
                <div className='Add-title'>
                    Add Comic
                </div>
                <hr className="solid" />
                <br />
                <div className="Add-form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {error === "Please Enter Comic Name" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputGenre1">Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputGenre1"
                        value={genre}
                        onChange={handleGenreChange}
                    />
                    {error === "Please enter Genre" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputAuthor1">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputAuthor1"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                    {error === "Please choose your Author Name" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputLanguage1">Language</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputLanguage1"
                        value={language}
                        onChange={handleLanguageChange}
                    />
                    {error === "Please enter Language" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleInputCost1">Cost</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputCost1"
                        value={cost}
                        onChange={handleCostChange}
                    />
                    {error === "Please enter Integer value" && (
                        <span className="error-message">{error}</span>
                    )}
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
                    <label htmlFor="exampleInputLink1">Comic link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputLink1"
                        value={link}
                        onChange={handleLinkChange}
                    />
                    {error === "Please enter comic link here" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <label htmlFor="exampleFormControlTextarea1">About</label>
                    <textarea className="form-control"
                        id="exampleFormControlTextarea1"
                        value={info} rows="6"
                        onChange={handleInfoChange}>
                    </textarea>
                    {error === "Please enter your About" && (
                        <span className="error-message">{error}</span>
                    )}
                </div>
                <br />
                <button type="button" className="Add-btn" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddComicComponent;
