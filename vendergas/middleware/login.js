const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // NOTE: Verifica se a sessão do usuário é válida
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, "segredo");

        req.user = decode
        next();
    } catch (error) {
        return res.status(401).send({message: 'Falha na autenticação'})
    }
}