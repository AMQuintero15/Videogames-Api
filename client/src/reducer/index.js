const initialState = {
    games: [],
    allGames: [],
    detail: "Game Not Loaded",
    genres: [],
    platforms: []
}

function rootReducer(state = initialState, action){
    switch(action.type) {
        case "GET_GAMES":
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
                detail: "Game Not Loaded"
            }
        case "GET_PLATFORMS":
            return{
                ...state,
                platforms: action.payload
            }
        case "GET_GAME_BY_NAME":
            return {
                ...state,
                games: action.payload 
            }
        case "GET_GAME_DETAIL":
            return {
                ...state,
                detail: action.payload
            }
        case "POST_GAME":
            return{
                ...state,
            }
        case "FILTER_BY_NAME":
            const gamesSort = action.payload === "Asc Name" ? state.allGames.sort(function (a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0
            }) : state.allGames.sort(function (a, b){
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                games: gamesSort
            }
        case "FILTER_BY_RATING":
            const allGamesRating = state.allGames
            const allGamesRatingFiltered = allGamesRating.filter(el => el.rating !== false)

            const gamesRating = action.payload
                if(gamesRating === "Asc Rating"){
                    const allGamesRatingOrdered = allGamesRatingFiltered.sort(function(a, b){
                        return a.rating - b.rating
                    }) 
                    return {
                        ...state,
                        games: allGamesRatingOrdered
                    }
                } else {
                    const allGamesRatingOrdered = allGamesRatingFiltered.sort(function(a, b){
                        return b.rating - a.rating
                    }) 
                    return {
                        ...state,
                        games: allGamesRatingOrdered
                    }
                }
        case "FILTER_BY_GENRE":
            const allGames = state.allGames
            const genreFiltered = action.payload === "All" ? allGames : allGames.filter(el => {
                    return el.genre.includes(action.payload)
            })
            return{
                ...state,
                games: genreFiltered
            }
        case "FILTER_CREATED":
            const createdFilter = action.payload === "Created Games" ? state.allGames.filter( el => el.createdInDb) : state.allGames.filter( el => !el.createdInDb)
            return {
                ...state,
                games: action.payload === "All Games" ? state.allGames : createdFilter
            }
        default:
            return state
    }
}

export default rootReducer