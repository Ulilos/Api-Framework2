const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usuarioRepo = require('../repositories/usuarioRepo')

const JWT_SECRET = 'PenaltiFoiPIX'

class AuthService {
    async register(userData) {
        const { nome, email, senha } = userData

        const usuarioExistente = await userRepository.findByEmail(email)
        if (usuarioExistente) {
            throw new Error('E-mail já existente')
        }

        const senhaHash = await bcrypt.hash(senha, 10)
        const novoUsuario = await usuarioRepo.create({
            nome,
            email,
            senha: senhaHash
        })

        return { message: 'Usuario Cadastrado' }
    }

    async login(loginData) {
        const { email, senha } = loginData

        const usuario = await usuarioRepo.findByEmail(email)
        if (!usuario) {
            throw new Error('Credenciais Invalidas')
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            throw new Error('Credenciais Invalidas')
        }

        const token = jwt.sign(
            { nomeUsuario: usuario.nome },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return { token }
    }
}

module.exports = new AuthService()