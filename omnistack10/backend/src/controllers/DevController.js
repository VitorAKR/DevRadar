const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//controller será responsável por ativar uma requisição fazer tratamentos e devolver isso
module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        //evitar cadastro duplicado
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            //chamar a api do github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            //retonar os dados da resposta
            //console.log(apiResponse.data);
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            //tratar o array de techs
            const techsArray = parseStringAsArray(techs);
        
            //tratar a geolocalização
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        //return response.send("Hi I'm the backend of this shit!");
        return response.json(dev);
    }
};