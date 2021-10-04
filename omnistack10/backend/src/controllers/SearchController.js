const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        //Mostrar todos os devs num raio de 10km
        //filtrar por techs
        console.log(request.query);

        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    }
                },
                $maxDistance: 10000,
            }
        });

        return response.json({ devs });
    }
}