const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre } = require("../db.js")
const { getAllVideogamesMain, getAllVideogamesDetailApi, getAllGenres, getDbInfoDetail, getAllPlatforms} = require("./controllers.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req,res)=>{
    try {
        const name = req.query.name
        let videogamesAll = await getAllVideogamesMain();
            if (name){
                let videogameName =  videogamesAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                videogameName.length ?
                res.status(200).send(videogameName) :
                res.status(404).send('The Videogame Was Not Found') 
            } else{
                res.status(200).send(videogamesAll)
            }
    } catch (error) {
        res.status(404).send(`There was an unexpected error: ${error}`)
    }
})

router.get("/genres", async (req,res) => {
    try {
        let genresAll = await getAllGenres();
        res.status(200).send(genresAll)
    } catch (error) {
        res.status(404).send(`There was an unexpected error: ${error}`)
    }
})
router.get("/platforms", async (req, res) =>{
    try {
        let platformsAll = await getAllPlatforms();
        res.status(200).send(platformsAll)
    } catch (error) {
        res.status(404).send(`There was an unexpected error: ${error}`)
    }
})
router.post("/videogames", async (req,res) => {
    try {
        let {
            name,
            image,
            description,
            launchDate,
            rating,
            platforms,
            genre
        } = req.body
        let videogameCreated = await Videogame.create({
            name,
            image,
            description,
            launchDate,
            rating,
            platforms
        })
        let genreDb = await Genre.findAll({
            where: { name: genre }
        })
        videogameCreated.addGenre(genreDb)
        res.send("The Videogame Was Successfully Created")
    } catch (error) {
        res.status(404).send(`There was an unexpected error: ${error}. Videogame was not created`)
    }
})

router.get("/videogame/:id", async (req,res) =>{
    try {
        const id = req.params.id;
        if(id.length <= 10){
            const detailResponseApi = await getAllVideogamesDetailApi(id)
            res.status(200).send(detailResponseApi)
        }
        else if(id.length > 10) {
            const detailResponseDb = await getDbInfoDetail(id)
            res.status(200).send(detailResponseDb)
        }
    } catch (error) {
        res.status(404).send(`There was an unexpected error: ${error}`)
    }
})

router.delete("/delete/:id", async (req,res)=>{
    const idDelete = req.params.id;
    try{
        await Videogame.destroy({
            where: {
                id: idDelete
            }
        })
        res.status(200).send("Game deleted successfully")
    } catch(err){
        res.status(404).send("Game could not be deleted")
    }
})

module.exports = router;
