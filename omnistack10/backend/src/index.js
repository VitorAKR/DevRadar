const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://vireiter_devradar:vireiter_devradar@cluster0-shard-00-00.nvfb9.mongodb.net:27017,cluster0-shard-00-01.nvfb9.mongodb.net:27017,cluster0-shard-00-02.nvfb9.mongodb.net:27017/week10?ssl=true&replicaSet=atlas-11f7g4-shard-0&authSource=admin&retryWrites=true&w=majority');

//linguagem utilizada pra se comunicar: JSON
app.use(express.json());
//definir arquivo routes como rotas da app
app.use(routes);

//BANCO DE DADOS: MongoDB (Não-relacional e leve pra aplicações que não precise de muitos relacionamentos).


//definir porta do backend
app.listen(3333);