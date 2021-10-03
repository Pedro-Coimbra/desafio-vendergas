const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;


// NOTE: Cria o usuário caso ele esteja de acordo com as validações
exports.create = (req, res) => {
    // NOTE: Valida o request
    console.log(req)
    if (!req.body.nome) {
        res.status(400).send({
            message: "O nome não pode estar vazio!"
        });
        return;
    } else if (!req.body.email) {
        // TODO: Falta validar quando já existe um usuário com aquele email
        res.status(400).send({
            message: "O email não pode estar vazio!"
        });
        return;
    } else if (!req.body.senha) {
        res.status(400).send({
            message: "A senha não pode estar vazia!"
        });
        return;
    } else if (!req.body.confSenha) {
        res.status(400).send({
            message: "A senha de confirmação não pode estar vazia!"
        });
        return;
    } else if (req.body.senha != req.body.confSenha) {
        res.status(400).send({
            message: "A senha está diferente da senha de confirmação!"
        });
        return;
    }

    // NOTE: Dados do usuário
    const user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    // NOTE: Salva um usuário no vanco de dados
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar o usuário."
            });
        });
};

