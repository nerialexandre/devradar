const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    // EXIBIR OS "DEVS"
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    // CADASTRAR UM "DEV"
    async store(request, response) {
        // recupera o Username e as techs no body da requisicao
        const { github_username, techs, latitude, longitude } = request.body

        // Verificar se já existe Usuario cadastrado na base
        let dev = await Dev.findOne({ github_username });
        console.log(dev);

        if (!dev) {
            // transforma a String de tecnologias em um array e remove os espacos desnecessarios
            const techsArray = parseStringAsArray(techs);

            // busca o username na api do github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name, bio, avatar_url } = apiResponse.data;

            // Caso o dev nao tenha cadastrado um nome, sera apresentado o github_username no lugar
            if (!name) {
                name = github_username;
            };

            // recebendo localizacao de acordo com a documentacao do mongoose
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            // salvar dev no MongoDB atraves do Dev.create()
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        };

        return response.json(dev);
    }

};