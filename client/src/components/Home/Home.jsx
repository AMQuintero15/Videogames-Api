import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, filterByName, filterByRating, filterByGenre, getGenres, filterByCreated } from "../../actions";
import { Link } from "react-router-dom";
import "./Home.css"
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar"


export default function Home(){

    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.games)
    const allGenres = useSelector((state) => state.genres)
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGames = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGames, indexOfLastGame)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(getGames());
        dispatch(getGenres());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
        setCurrentPage(1)        
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterGenre(e){
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className="Home">
            <Link className="homeCreateGame" to= "/creategame">Create Game</Link>
            <h1>Videogames Information Matrix</h1>
            <button  onClick={ e => {handleClick(e)}}>
                Reload All Games
            </button>
            <div>
                <select onChange={e => handleSortName(e)}>
                    <option value="Asc Name">Sort By Name (A - Z)</option>
                    <option value="Desc Name">Sort By Name (Z - A)</option>
                </select>
                <select onChange={e => handleSortRating(e)}>
                    <option value="Asc Rating">Sort By Rating (0 - 5)</option>
                    <option value="Desc Rating">Sort By Rating (5 - 0)</option>
                </select>
                <select onChange={e => handleFilterGenre(e)}>
                    <option value="All">Sort By Genres</option>
                    {
                        allGenres?.map(el => {
                                return (
                                    <option id={el.id} value={el.name} key={el.id}>{el.name}</option>
                                )
                        })
                    }
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All Games">All Games</option>
                    <option value="Created Games">Created Games</option>
                    <option value="Api Games">Existing Games</option>
                </select>
                <Paginado
                gamesPerPage={gamesPerPage}
                allGames={allGames.length}
                paginado={paginado}
                />
                <SearchBar/>
                {/* {currentGames?.map((el)=> {
                    return (
                        <div key={el.id} className="cardsHome">
                                    <Card name={el.name} image={el.image ? el.image : "https://pbs.twimg.com/media/Do_MJoHXkAEya2z.jpg"} genre={el.genre} id={el.id} rating={el.rating} />
                            </div>
                        )})} */}
            </div>
            <div className="cardsHome">
            {currentGames?.map((el)=> {
                    return (
                        <div key={el.id}>
                                    <Card name={el.name} image={el.image ? el.image : "https://pbs.twimg.com/media/Do_MJoHXkAEya2z.jpg"} genre={el.genre} id={el.id} rating={el.rating} />
                            </div>
                        )})}
            </div>
        </div>
    )
}