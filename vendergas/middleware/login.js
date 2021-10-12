const jwt = require('jsonwebtoken')
const JWT_KEY = require('../enviroments/enviroments.js')

module.exports = (req, res, next) => {
    // NOTE: Verifica se a sessão do usuário é válida
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, JWT_KEY.JWT_KEY);

        req.user = decode
        next();
    } catch (error) {
        return res.status(401).send({message: 'Falha na autenticação'})
    }
}