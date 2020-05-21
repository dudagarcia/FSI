const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const { id } = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if(!ong) //caso ong nao exista, ou seja, variavel esteja vazio
        {
            return response.status(400).json({ error: 'No ONG found'});
        } 

        return response.json(ong);
        
    }
}