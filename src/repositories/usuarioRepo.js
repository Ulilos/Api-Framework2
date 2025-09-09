const Usuario = require('../models/User')

class usuarioRepo {
    async findByEmail(email){
        return await Usuario.findOne({where: {email}})
    }

    async create(usuario){
        return await Usuario.create(usuario)
    }
}

module.exports = new usuarioRepo()
