const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const JWT_KEY = require('../../enviroments/enviroments.js')
 
// NOTE: Cria o usuário caso ele esteja de acordo com as validações
exports.create = (req, res) => {
    // NOTE: Valida o request

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
    // NOTE: Gera o hash da senha
    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({ error: errBcrypt })
        } else {

            // NOTE: Dados do usuário
            const user = {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            };

            // NOTE: Salva um usuário no banco de dados
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
        }
    })
};

// NOTE: Valida as credenciais do usuário para saber se o login está de acordo
// com os dados do banco de dados
exports.login = (req, res) => {

    // NOTE: Valida se o existe algum usuário cadastrado com o email que foi passado
    User.findByPk(req.body.email)
        .then(data => {

            if (data === null) {
                return res.status(401).send({ message: "Falha na autenticação" })
            }
            // NOTE: Caso exista um usuário com o email informado a senha é validada
            bcrypt.compare(req.body.senha, data["senha"], (err, result) => {
                if (err) {
                    return res.status(401).send({ message: "Falha na autenticação" })
                }

                if (result) {
                    // NOTE: Cria o token do usuário
                    let token = jwt.sign({
                        nome: data["nome"],
                        email: data["email"]
                    }, JWT_KEY.JWT_KEY, {
                        expiresIn: "72h"
                    })

                    return res.status(200).send({
                        message: "Autenticado com sucesso!",
                        'token': token
                    })
                }
                return res.status(401).send({ message: "Falha na autenticação" })
            })

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar o usuário."
            });
        });
}
