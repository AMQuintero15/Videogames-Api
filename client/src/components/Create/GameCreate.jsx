import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, loading, postGame } from "../../actions";
import "./GameCreate.css"

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "A name is required"
    }
    else if(!input.description){
        errors.description = "Please tell us more about your game"
    }
    else if(!input.launchDate){
        errors.launchDate = "When was your game made?"
    }
    else if(!input.ratingValue){
        errors.rating = "How Good Is Your Game?"
    }
    else if(Number(input.ratingValue) < 0 || Number(input.ratingValue) > 5){
        errors.rating = "Rating Must Be Between 0 and 5"
    }
    else if(input.image && !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(input.image)){
        errors.image = "Image Must Be An URL"
    }
    // else if(input.genre.length >= 1){
    //     errors.genre = "Add At Least One Genre To Your Game";
    // }
    // else if(!input.platforms.length < 1){
    //     errors.platforms = "On Which Platform Can Your Game Be Played?";
    // }
    return errors
}

export default function GameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({
        name: "A Name Is Required",
    });

    const [input, setInput] = useState({
        name: "",
        description: "",
        launchDate: "",
        rating: "",
        ratingValue: "",
        image: "",
        platforms: [],
        genre: []
    })
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
        return dispatch(loading())
    }, [dispatch]);
    
    console.log(input)
    console.log(errors)
    console.log(input.genre.length)
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value,
            rating: Number(input.ratingValue)
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelectPlatforms(e){
        for (let i = 0; i < input.platforms.length; i++) {
            if(input.platforms[i] === e.target.value){
                return input
            }
        }
        setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
    })
    }

    function handleSelectGenres(e){
        for (let i = 0; i < input.genre.length; i++) {
            if(input.genre[i] === e.target.value){
                return input
            }
        }
        setInput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postGame(input))
        alert("Game Created")
        setInput({
            name: "",
            description: "",
            launchDate: "",
            rating: "",
            image: "",
            platforms: [],
            genre: []
        })
        history.push("/home")
    }

    function handleDelete(el){
        setInput({
            ...input,
            platforms: input.platforms.filter( temp => temp !== el),
            genre: input.genre.filter( temp => temp !== el)
        })
    }

    return(
        <div className="divCreate">
            <Link to="/home"><button className="buttonGoBack">Go Back</button></Link>
            <h1>Create Your Game</h1>
            <form className="formCreateGame" onSubmit={(e) => handleSubmit(e)}>
                <div className="inputNameContainer">
                    <label>Name:</label>
                    <input className="inputName" type="text" value={input.name} name="name" placeholder="Game's Name..." onChange={(e) => handleChange(e)}/>
                    {errors.name && (
                        <p className="error" style={{color: "red"} }>{errors.name}</p>
                    )}
                </div>
                <div className="inputDescriptionContainer">
                    <label>Description:</label>
                    <textarea className="textAreaDescription" name="description" placeholder="A Brief Description Of The Game..." value={input.description} onChange={(e) => handleChange(e)} cols="64" rows="5"></textarea>
                    {errors.description && (
                        <p className="error" style={{color: "red"} }>{errors.description}</p>
                    )}
                </div>
                <div className="inputDateContainer">
                    <label>Launch Date:</label>
                    <input className="inputDate" type="date" value={input.launchDate} name="launchDate" min="1958-10-01" max="2022-11-09" onChange={(e) => handleChange(e)}/>
                    {errors.launchDate && (
                        <p className="error" style={{color: "red"} }>{errors.launchDate}</p>
                    )}
                </div>
                <div className="inputRatingContainer">
                    <label>Rating:</label>
                    <input className="inputRating" type="number" placeholder="Rating..." min={0} max={5} value={input.ratingValue} name="ratingValue" step={0.01} onChange={(e) => handleChange(e)}/>
                    {errors.rating && (
                            <p className="error" style={{color: "red"} }>{errors.rating}</p>
                    )}
                </div>
                <div className="inputImageContainer">
                    <label>Image:</label>
                    <input className="inputImage" type="text" placeholder="Url Link ..." value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                    {errors.image && (
                        <p className="error" style={{color: "red"}}>{errors.image}</p>
                    )}
                </div>
                <div className="selectGenreContainer">
                <select className="selectGenre" onChange={(e) => handleSelectGenres(e)}>
                    <option value="None">Which Genre(s) Is Your Game?</option>
                    {
                        genres?.map(el => {
                            return (
                                    <option id={el.id} value={el.name} key={el.id}>{el.name}</option>
                                )})
                    }
                </select>
                {errors.genre && (
                        <p className="error" style={{color: "red"}}>{errors.genre}</p>
                    )}
                </div>
                
                <div className="selectPlatsContainer">
                <select className="selectPlats" onChange={(e) => handleSelectPlatforms(e)}>
                    <option value="None">On Which Platforms Can You Play Your Game?</option>
                    {
                        platforms?.map((e, i) => {
                            return (
                                    <option id={i} value={e} key={i}>{e}</option>
                                )})
                    }
                </select>
                </div>

                <div className="submitButtonContainer">
                <button className="submitButton" type="submit" 
                disabled={ Object.keys(errors).length === 0 ? false : true }
                >Generate Game</button>
                </div>
            </form>

                <div>
                <div className="gameCreateGenresContainer">
                <p>Your game's genres: </p>
                {input.genre.map((el, i) => 
                <div key={i}>
                    <p className="gameCreateGenres">{el}</p>
                    <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                )}
                </div>
                </div>

                <div className="gameCreatePlatsContainer">
                <p>Your game's platforms: </p>
                {input.platforms.map((el, i) => 
                <div className="gameCreatePlats" key={i}>
                    <p>{el}</p>
                    <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                 )}
                </div>

                <img className="imgCreate" src="https://images8.alphacoders.com/547/547511.jpg" alt="" />
        </div>
    )
}