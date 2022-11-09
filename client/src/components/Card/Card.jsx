import React from "react";
import {Link} from "react-router-dom";
import "./Card.css"

export default function Card({name, image, genre, rating, id}) {
    const gamesGenresSlash = genre.map(el => " " + el)
    const gamesGenresStr = gamesGenresSlash.toString()
    return (
        <div className="divCard">
            <Link to={"/home/"+ id}>
            <h3 className="gamelink">{name}</h3>
            </Link>
            <h4 className="genres">Genres: {gamesGenresStr}</h4>
            <h4>{rating} &#9733;</h4>
            <img src={image} alt="img not found" width="400px" height="250px"/>
        </div>
    );
}