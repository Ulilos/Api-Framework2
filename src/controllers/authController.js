const authService = require('../services/authService')

class AuthController {
    async register(req, res) {
        try {
            const result = await authService.register(req.body)
            res.status(201).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async login(req, res) {
        try {
            const result = await authService.login(req.body)
            res.json(result)
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    }
}

module.exports = new AuthController()