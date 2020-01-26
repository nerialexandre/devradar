const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    // PESQUISAR OS "DEVS"
    async index(request, response) {

        // busca os filtros de busca na query
        const { latitude, longitude, techs } = request.query;

        // transforma a String de tecnologias em um array e remove os espacos desnecessarios
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json(devs);
    }

};
