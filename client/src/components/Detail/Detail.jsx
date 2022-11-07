import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetail } from "../../actions";
import { useEffect } from "react";

export default function GameDetail(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameDetail(props.match.params.id));
    }, [dispatch]);

    const gameDetail = useSelector((state) => state.detail)

    return(
        <div>
            {
                gameDetail !== "Game Not Loaded" ?
                <div>
                    <h3>{gameDetail.name}</h3>
                    <h4>{gameDetail.genre}</h4>
                    <h5>{gameDetail.description}</h5>
                    <h5>{gameDetail.launchDate}</h5>
                    <h5>{gameDetail.rating}</h5>
                    <h5>{gameDetail.platforms}</h5>
                    <img src={gameDetail.image? gameDetail.image : "https://pbs.twimg.com/media/Do_MJoHXkAEya2z.jpg"} alt="" width="400px" height="300px"/>
                </div> : <p>Loading...</p>
            }
            <Link className="detailGoBack" to="/home">Go Back</Link>
        </div>
    )
}