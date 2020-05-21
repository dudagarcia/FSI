const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //listagem de ongs
    async index (request, response)  {
        const ongs = await connection('ongs').select('*'); //get em todas as ongs do banco 
        
        return response.json(ongs);
    }, 

    //criação de ong
    async create(request, response) { 
        const { name, email, whatsapp, city, uf } = request.body; //puxa o corpo da requisção
        const id = crypto.randomBytes(4).toString('HEX'); //gera 4 bytes de caracteres hexadec 

        await connection('ongs').insert({ //await faz com que esse código rode antes de seguir com o script
            id,
            name,
            email, 
            whatsapp,
            city, 
            uf,
        })

        return response.json( { id });
    }
};