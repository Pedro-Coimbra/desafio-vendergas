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
                    err.message || "Ocorreu algum erro ao tentar salvar o cliente"
            })
        })
}

// NOTE: Faz a pesquisa no banco de dados dos clientes por empresa
exports.getAll = (req, res) => {

    Client.findAll({
        where: {
            fk_empresa_cliente_idx: req.body.cnpj
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar os clientes"
            })
        })

}

// NOTE: Edita o cliente enviado de acordo com o email dele
exports.updateOne = (req, res) => {

    // NOTE: Valida se os campos foram enviados
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


    Client.update(req.body, {
        where: {
            email: req.body.email
        }
    }).then(data => {

        if (data.length) {
            res.send(data);

        } else {
            res.send("Ocorreu algum erro ao tentar editar o cliente")
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar editar o cliente"
            })
        })

}

// NOTE: Faz a pesquisa no banco de dados pelo email e retorna o cliente
exports.getOne = (req, res) => {

    Client.findAll({
        where: {
            email: req.body.email
        }
    }).then(data => {

        if (data.length == 1) {

            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar procurar o usuário");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar o usuário"
            })
        })

}

// NOTE: Faz o delete de um cliente no banco de dados pelo email
exports.delete = (req, res) => {

    Client.destroy({
        where: {
            email: req.body.email
        }
    }).then(data => {

        if (data.length == 1) {
            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar deletar o cliente");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar deletar o cliente"
            })
        })

}
