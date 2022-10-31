const axios = require("axios")
const { Videogame, Genre } = require("../db.js")
const { API_KEY } = process.env

const getVideogamesMainApi = async() =>{
  let apiUrlVideogames = `https://api.rawg.io/api/games?key=${API_KEY}`
  let apiInfoVideogames = []
  for (let i = 0; i < 5; i++) {
    const response = await axios.get(apiUrlVideogames)
    response.data.results.map(el => {
      apiInfoVideogames.push({
        id: el.id,
        name: el.name,
        image: el.background_image,
        genre: el.genres.map(genre => genre.name)
      })
    })
    apiUrlVideogames = response.data.next
  }
  // let countIds = 0;
  // apiInfoVideogames.forEach((element, index, array) => {
  //   countIds++
  // });
  // console.log(countIds)
  return apiInfoVideogames.sort( (a,b) => a.id - b.id )
  }

const getDbInfo = async () => {
  return await Videogame.findAll({
      include:{
          model: Genre,
          attributes: ["name"],
          through: {
              attributes: [],
          },
      }
  })
}

const getAllVideogamesMain = async () =>{
  const apiInfo = await getVideogamesMainApi();
  const dbInfo = await getDbInfo();
    const dbInfoString = dbInfo.map(el =>{
      let newVideogame = {
        id: el.id,
        name: el.name,
        image: el.background_image,
        genre: el.genres
      }
      return newVideogame
    })
    const allVideogames = apiInfo.concat(dbInfoString)
    return allVideogames
  }
  
  const getAllVideogamesDetailApi = async (id) =>{
    try {
      const apiUrlVideogames = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      const videogameDetail = apiUrlVideogames.data
      const videogameId = {
        id: videogameDetail.id,
        name: videogameDetail.name,
        image: videogameDetail.background_image,
        genre: videogameDetail.genres.map(genre => genre.name),
        description: videogameDetail.description_raw,
        launchDate: videogameDetail.released,
        rating: videogameDetail.rating,
        platforms: videogameDetail.platforms.map(platforms => platforms.platform.name)
      }
      return videogameId
    } catch (error) {
      return "The Videogame Was Not Found"
    }
  }
  
  const getDbInfoDetail = async (id) => {
    try {
      const videogameDetail = await Videogame.findOne({
          where: { id: id},
          include:{
              model: Genre,
              attributes: ["name"],
              through: {
                  attributes: [],
              },
          }
      })
    let newVideogame = {
        id: videogameDetail.id,
        name: videogameDetail.name,
        image: videogameDetail.image,
        genre: videogameDetail.genres.map(genre => genre.name),
        description: videogameDetail.description,
        launchDate: videogameDetail.launchDate,
        rating: Number(videogameDetail.rating),
        platforms: videogameDetail.platforms
    }
    return newVideogame
    } catch (error) {
      return "The Videogame Was Not Found"
    }
  }

  const getAllGenres = async () =>{
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresInfo = genresApi.data.results.map(el => {
      return {
        id: el.id,
        name: el.name
      }
    })
    genresInfo.sort( (a,b) => a.id - b.id )
    genresInfo.forEach(el => {
      Genre.findOrCreate({
        where: {
          id: el.id,
          name: el.name 
        } 
        
      })
    });
    console.log("Genres Loaded Successfully")
    return genresInfo
  }

  module.exports = {
    getAllVideogamesMain,
    getAllVideogamesDetailApi,
    getAllGenres,
    getDbInfoDetail
  }