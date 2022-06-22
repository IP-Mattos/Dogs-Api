const axios = require('axios')
const { Dogs, Temperaments } = require("../db");


const get_DogsApi = async () => {

    try {
        const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
        const apiDog = await apiUrl.data.map((x) => {
            const weight = x.weight.metric.split('-')
            const height = x.height.metric.split('-')
            const min_weight = parseInt(weight[0])
            const max_weight = parseInt(weight[1])
            const min_height = parseInt(height[0])
            const max_height = parseInt(height[1])
            const id = x.id+""
            return {
                id: id,
                name: x.name,
                min_weight: min_weight ? min_weight : 1, //En el caso de que una o los dos valores no exista
                max_weight: max_weight ? max_weight : 100,
                min_height: min_height ? min_height: 1,
                max_height: max_height ? max_height : 100,
                life_span: x.life_span,
                image: x.image.url,
                temperament: x.temperament ? x.temperament: "No tiene temperamento"
            }
            
        }
        )  
        return apiDog
    } catch (err) {
        console.log(err)
    }
}

const get_DogsDb = async () => {
    try {
        const dbDog = await Dogs.findAll({
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        return dbDog
    } catch (err) {
        console.log(err)
    }

}

const getAllInfo = async () => {
    const dogs_Api = await get_DogsApi()
    const dogs_Db = await get_DogsDb()
    const info = dogs_Api.concat(dogs_Db)
    return info
}

module.exports = {getAllInfo}