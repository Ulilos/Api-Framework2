const jwt = require('jsonwebtoken')

const JWT_SECRET = 'PenaltiFoiPIX'

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: 'Token Invalido' })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Acesso negado' })
        }
        req.user = user
        next()
    })
}

module.exports = authenticationToken