const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController')


const routes = Router();

// ROTA PARA EXIBIR OS "DEVS"
routes.get('/devs', DevController.index);

// ROTA PARA PESQUISAR OS "DEVS"
routes.get('/search', SearchController.index);

// ROTA PARA CADASTRAR UM "DEV"
routes.post('/devs', DevController.store);

module.exports = routes;