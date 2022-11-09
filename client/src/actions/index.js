import axios from "axios";

export function getGames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames", {})

        return dispatch({
            type: "GET_GAMES",
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres", {})

        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/platforms", {})

        return dispatch({
            type: "GET_PLATFORMS",
            payload: json.data
        })
    }
}

export function postGame(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/videogames", payload)
        return response
    }
}

export function getGamesByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: "GET_GAME_BY_NAME",
                payload: json.data
            })
        }
        catch (err){
            console.log(err)
        } 
    }
}

export function getGameDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + id)
            return dispatch({
                type:"GET_GAME_DETAIL",
                payload: json.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function filterByName(payload){
    return {
        type: "FILTER_BY_NAME",
        payload
    }
}

export function filterByRating(payload){
    return{
        type: "FILTER_BY_RATING",
        payload
    }
}

export function filterByGenre(payload){
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterByCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function loading(payload){
    return {
        type: "LOADING",
        payload
    }
}