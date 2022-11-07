import React from "react";
import {Link} from "react-router-dom";

export default function Card({name, image, genre, rating, id}) {
    return (
        <div className="cardMain">
            <Link to={"/home/"+ id}>
            <h3 className="gamelink">{name}</h3>
            </Link>
            <h4 className="genres">{genre}</h4>
            <h4>{rating}</h4>
            <img src={image} alt="img not found" width="400px" height="250px"/>
        </div>
    );
}