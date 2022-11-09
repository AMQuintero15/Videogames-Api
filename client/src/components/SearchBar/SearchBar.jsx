import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName, loading } from "../../actions";
import "./SearchBar.css"

export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        dispatch(loading())
        setName(" ")
        await dispatch(getGamesByName(name))
        setCurrentPage(1)
        dispatch(loading())
    }

    return (
        <div className="searchContainer">
            <input className="searchInput" id="searchInput" type="text" placeholder="Search..." value={name} onChange={(e) => handleInputChange(e)}/>
            <button className="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>Go!</button>
        </div>
    )

}