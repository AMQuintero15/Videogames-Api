import React from "react";
import { Component } from "react";
import videogame from "./videogame.png"
import "./Logo.css"

export default class Logo extends Component{
    render() {
        return (
          <div className="logo-main">
            <img src={videogame} alt="Not Found" width="160px"/>
          </div>
        )
      }
    
}