const { Router } = require("express");
const router = Router();

const { getAllInfo } = require('../controllers/ControllerDog.js');
const { Dogs, Temperaments } = require("../db");
const Dog = require("../models/Dog.js");

router.get('/', async (req, res) => {
    let { name } = req.query
    const allDogs = await getAllInfo()
    if (name) {
        name = name.toLowerCase()
        let name_breed = await allDogs.filter(e => e.name.toLowerCase().includes(name))
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
    name = name.toLowerCase()

    try {
        let findDog = await Dogs.findAll({
            where: {
                name: name
            }
        })
        if (findDog.length > 0) {
            res.status(403).send("El perro no se pudo crear")
        } else {
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
            res.status(200).send("Exito!")
        }

    } catch (err) {
        console.log(err)
    }

})

router.put("/:id", (req, res, next) =>{
    const {name } = req.query
    const {id} = req.params
    try{
        return Dogs.update({
            name
        },{
            where: {id: id}
        })
        .then(() =>{
            res.status(200).send("se updateo")
        })
    }catch(err){
        console.log(err)
    }

})

module.exports = router;