const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// conectar a base de dados MongoDB
mongoose.connect('mongodb+srv://tenark:tenark@cluster0-bwfwx.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useUnifiedTopology: true,   
    useNewUrlParser: true,
    useCreateIndex: true
});

// .use para express entender o formato json(antes das rotas)
app.use(express.json());

// rotas
app.use(routes);

// definindo porta para acessar a aplicacao
app.listen(3333);
