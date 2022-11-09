import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetail, loading } from "../../actions";
import { useEffect } from "react";
import "./Detail.css"

export default function GameDetail(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameDetail(props.match.params.id));
        return dispatch(loading());
    }, [dispatch]);

    const gameDetail = useSelector((state) => state.detail)

    return(
        <div className="divDetailContainer">
            {
                gameDetail !== "Game Not Loaded" ?
                <div className="divDetail">
                    <h2 className="titleDetail">{gameDetail.name}</h2>
                    <img src={gameDetail.image? gameDetail.image : "https://pbs.twimg.com/media/Do_MJoHXkAEya2z.jpg"} alt="" width="400px" height="300px"/>
                    <h5 className="descriptionDetail">{gameDetail.description}</h5>
                    <h5>Rating: {gameDetail.rating} &#9733;</h5>
                    <h3>Genres: {gameDetail.genre.map(el => " " + el).toString()}</h3>
                    <h4>Platforms: {gameDetail.platforms.map(el => " " + el).toString()}</h4>
                    <h5>Released on: {gameDetail.launchDate}</h5>
                </div> : <p>Loading...</p>
            }
            <Link className="detailGoBack" to="/home">Go Back</Link>
        </div>
    )
}