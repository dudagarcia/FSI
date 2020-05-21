const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //desacoplando módulo de rotas do express em nova variável

//listagem de ongs
routes.get('/ongs', OngController.index);
//cadastro de ong
routes.post('/ongs', OngController.create); 

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create); //post cria uma sessão

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
//id é route param para saber qual ong deletar


module.exports = routes; // exporta variável de dentro do arquivo