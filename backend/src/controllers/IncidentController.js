const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query; 

        const [count] = await connection('incidents').count();

        //esquema de paginação
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //traz dados da ong ao comparar os ids e verificar se são iguais
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        //header da resposta com o numero total de casos
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },



    async create(request, response) {
        const { title, description, value } = request.body;
        //cabeçalho guarda informações sobre o contexto da requisição (autenticação, dados do usuário)
        request.headers;
        const ong_id = request.headers.authorization; //authorization nome do insomnia

        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value, 
            ong_id,
        }); //primeira posição do array é id, armazenado na variável

        return response.json({ id });
    }, 
    
    async delete (request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //apenas um resultado será retornado

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not authorized'}); //erro (http status code para nao autorizado), ou seja, id enviado nao é mesma id do incidente 
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //sucesso(no content)
    }
};