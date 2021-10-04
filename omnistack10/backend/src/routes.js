const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//CONCEITOS:
//métodos HTTP a serem utilizados get, post, put e delete
// Tipos de parâmetros:
//Query Params: query params são visíveis na URL (usados pra filtros, ordenação, paginação) e são acessados através de 
//req.query (ex.: http://dominio/?search=Algo).
//Route Params: são acessados através de req.params, são usados pra reconhecer algum recurso (ex.: http://dominio/:id).
//Body: Possui vários formatos possíveis, que possuem suas propriedades e dados de um ou mais registros.

//definir request/response no localhost
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;