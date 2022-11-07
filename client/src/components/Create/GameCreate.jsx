import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postGame } from "../../actions";
import "./GameCreate.css"

// function validate(input){

// }


export default function GameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({});

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
    }, [dispatch]);
    
    console.log(input)
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value,
            rating: Number(input.ratingValue)
        })
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]: e.target.value
        // }))
    }

    function handleSelectPlatforms(e){
        for (let i = 0; i < input.platforms.length; i++) {
            if(input.platforms[i] === e.target.value){
                return input
            }
        }
        // for (let i = 0; i < input.genre.length; i++) {
        //     if(input.genre[i] === e.target.value){
        //         return input
        //     }
        // }
        setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
        // genre: [...input.genre, e.target.value]
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
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1>Create Your Game</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}/>
                    {/* {errors.name && (
                        <p className="error" style={ {color: "red"} }>{errors.name}</p>
                    )} */}
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={input.description} name="description" onChange={(e) => handleChange(e)}/>
                    {/* {errors.description && (
                        <p className="error" style={ {color: "red"} }>{errors.description}</p>
                    )} */}
                </div>
                <div>
                    <label>Launch Date:</label>
                    <input type="date" value={input.launchDate} name="launchDate" min="1958-10-01" max="2022-11-08" onChange={(e) => handleChange(e)}/>
                    {/* {errors.launchDate && (
                        <p className="error" style={ {color: "red"} }>{errors.launchDate}</p>
                    )} */}
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" placeholder="rating" min={0} max={5} value={input.ratingValue} name="ratingValue" step={0.01} onChange={(e) => handleChange(e)}/>
                    {/* {errors.launchDate && (
                            <p className="error" style={ {color: "red"} }>{errors.launchDate}</p>
                    )} */}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" placeholder="Url Link ..." value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                    {/* {errors.image && (
                        <p className="error">{errors.image}</p>
                    )} */}
                </div>
                <select onChange={(e) => handleSelectGenres(e)}>
                    <option value="None">Which Genre(s) Is Your Game?</option>
                    {
                        genres?.map(el => {
                            return (
                                    <option id={el.id} value={el.name} key={el.id}>{el.name}</option>
                                )})
                    }
                </select>
                <ul><li>{input.genre.map(el => el + ", ")}</li></ul>
                {input.genre.map(el => 
                <div>
                    <p className="gameCreateGenres">{el}</p>
                    <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                )}
                <select onChange={(e) => handleSelectPlatforms(e)}>
                    <option value="None">On Which Platforms Can You Play Your Game?</option>
                    {
                        platforms?.map((e, i) => {
                            return (
                                    <option id={i} value={e} key={i}>{e}</option>
                                )})
                    }
                </select>
                <ul><li>{input.platforms.map(el => el + ", ")}</li></ul>
                {input.platforms.map(el => 
                <div className="gameCreatePlats">
                    <p>{el}</p>
                    <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                 )}
                <button type="submit" 
                // disabled={ Object.keys(errors).length === 0 ? false : true }
                >Generate Game</button>
            </form>
        </div>
    )
}