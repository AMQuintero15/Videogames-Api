import React from "react";
import { Link } from "react-router-dom";
import Welcome from "./Welcome.png"
import Logo from '../Logo/Logo';
import "./Landing.css"

export default function LandingPage(){
    return (
        <div className="Landing">
            <Logo/>
            <h1 className="videogamesapp">Videogames App</h1>
            <Link to="/home">
                <div className="buttonAccessContainer">
                <button className="buttonAccess">Access</button>
                </div>
            </Link>
                <div className="welcome-image">
                <img src={Welcome} alt="Not Found" width="200px"
                />
                </div>
        </div>
    )
}