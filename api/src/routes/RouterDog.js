const { Router } = require("express");
const router = Router();

const { getAllInfo } = require('../controllers/ControllerDog.js');
const { Dogs, Temperaments } = require("../db");

router.get('/', async (req, res) => {
    let { name } = req.query
    const allDogs = await getAllInfo()
    if (name) {
        name = name.toLowerCase()
        let name_breed = await allDogs.filter(e => e.name.toLowerCase().includes(name))
        console.log(name_breed)
        name_breed.length > 0 ?
            res.status(200).send(name_breed) :
            res.status(404).send('Dog not Found!')
    }
    else {
        res.status(200).send(allDogs)
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params
    const allDogs = await getAllInfo()
    let id_breed = await allDogs.filter(e => e.id.toString() === id.toString())
    if (id_breed.length > 0) res.status(200).send(id_breed)
    else res.status(404).send('Dog not Found!')
})

router.post('/', async (req, res, next) => {
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        temperament,
        life_span,
        image
    } = req.body
    name= name.toLowerCase()

    try {
        let findDog = await Dogs.findAll({
            where:{
                name: name
            }
        })
        if(findDog.length > 0){
            res.status(404).send("existe")
        }else{
            let new_Breed = await Dogs.create({
                name,
                min_height,
                max_height,
                min_weight,
                max_weight,
                life_span,
                image
            })

            let temperament_dog = await Temperaments.findAll({
                where: {
                    name: temperament
                }
            })
            new_Breed.addTemperaments(temperament_dog)
            res.send("Exito!")  
        }
    
    } catch (err) {
        console.log(err)
    }

})
module.exports = router;