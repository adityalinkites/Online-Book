import React, { useEffect, useState } from 'react'
import "./component.css"
import { useNavigate, useParams } from 'react-router-dom';

function UpdateComicComponent(props) {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [language, setLanguage] = useState("");
    const [cost, setCost] = useState("");
    const [file, setFile] = useState("");
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [permission, setPermission] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    const { updateComic, PreFillDataAPI, UpdateComicAPI } = props
    const user = updateComic.user;

    useEffect(() => {
        if(!token || role === "user"){
            navigate("/");
            return;
        }
        
        PreFillDataAPI(id, token)
        console.log(user)
        setName(user.name);
        setGenre(user.genre);
        setAuthor(user.author);
        setLanguage(user.language);
        setCost(user.cost);
        setInfo(user.info);
    }, [user.comic_id])

    useEffect(()=>{
    console.log(updateComic.message)
    if(updateComic.message === "Comic Info Updated Successfully"){
      alert(updateComic.message)
      navigate("/webList")
    }
  },[updateComic.message])

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
        if (cost === "") {
            setError("Please enter your cost");
            return;
        }
        if (info === "") {
            setError("Please enter your About");
            return;
        }
        if (permission === "") {
            setError("Please choose your gender");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("genre", genre);
        formData.append("author", author);
        formData.append("language", language);
        formData.append("cost", cost);
        formData.append("info", info);
        formData.append("image", file);
        formData.append("permission", permission)

        try {
            const response = await UpdateComicAPI(id, formData, token);
            console.log(response, "<<<<<<");
        } catch (error) {
            console.error(error, "<<<<<");
        }
    };

    return (
        <div className='Add-wrapper'>
            <form className='Add-form'>
                <div className='Add-title'>
                    Update Comic
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
                    <label htmlFor="exampleInputPrize1">Prize</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPrize1"
                        value={cost}
                        onChange={handleCostChange}
                    />
                    {error === "Please enter your Prize" && (
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
                    <label htmlFor="exampleFormControlTextarea1">About</label>
                    <textarea className="form-control"
                        id="exampleFormControlTextarea1"
                        value={info} rows="6"
                        onChange={handleInfoChange}>
                    </textarea>
                    {error === "Please enter your About" && (
                        <span className="error-message">{error}</span>
                    )}
                    <br />
                    <div className="radio-box">
                        <span>Permission :  &nbsp;</span>
                        <input
                            type="radio"
                            id="exampleCheck1"
                            name="Choose"
                            value="1"
                            checked={permission === "1"}
                            onChange={(e) => setPermission(e.target.value)}
                        />
                        <label htmlFor="exampleCheck1">Active &nbsp;</label>
                        <input
                            type="radio"
                            id="exampleCheck2"
                            name="Choose"
                            value="0"
                            checked={permission === "0"}
                            onChange={(e) => setPermission(e.target.value)}
                        />
                        <label htmlFor="exampleCheck2">Inactive &nbsp;</label>
                    </div>
                </div>
                <br />
                <button type="button" className="btn" onClick={handleSubmit}>
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateComicComponent;
