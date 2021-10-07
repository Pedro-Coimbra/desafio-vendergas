const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// NOTE: Cria o cliente caso ela esteja de acordo com as validações
exports.create = (req, res) => {

    if (!req.body.nome) {
        res.status(400).send({
            message: "O nome não pode estar vazio!"
        });
        return;
    } else if (!req.body.email) {
        res.status(400).send({
            message: "A email não pode estar vazio!"
        });
        return;
        // TODO: Validar o telefone com uma mascara
    } else if (!req.body.telefone) {
        res.status(400).send({
            message: "O telefone não pode estar vazio!"
        });
        return;
    }

    // NOTE: Dados do cliente
    const client = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        fk_empresa_cliente_idx: req.body.cnpj
    }

    // NOTE: Salva um cliente no banco de dados
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar a empresa"
            })
        })
}