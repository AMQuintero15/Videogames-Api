import React from "react";
import "./Paginado.css"

export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumbers =[]

    for (let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <div className="divPaginado">
        <nav className="navPaginado">
            <ul className="ulPaginado">
                { pageNumbers?.map(number => (
                    <li key={number}>
                        <a className="number" onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
}