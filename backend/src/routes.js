const {Router} = require('express');
const axios = require('axios');


const routes = Router();

// Rota para cadastrar um "Dev"
routes.post('/devs', async(request, response) => {
    // recupera o Username no body da requisicao
    const {github_username} = request.body

    // busca o username na api do github
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    let {name, bio, avatar_url} = apiResponse.data;

    // Caso o dev nao tenha cadastrado um nome, sera apresentado o username no lugar
    if(!name){
        name = github_username;
    };

    console.log(name, bio, avatar_url);
    return response.json({mensage: "hello Omnsitack"});
});

module.exports = routes;