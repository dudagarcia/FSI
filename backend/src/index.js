const express =  require('express'); //variável contém todas as funcionalidades do express disponíveis
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes'); //./ indica que é arquivo dentro da pasta atual, não pacote 


const app = express(); //instancia aplicação

app.use(cors());
app.use(express.json()); //requisições ao express serão realizadas através de objetos json
//comando para que express converta json em js
app.use(routes);
app.use(errors());

app.listen(3333); //aplicação vai "ouvir a porta" 3333// aplicação roda em localhost:3333
