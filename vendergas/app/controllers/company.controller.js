const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;

// NOTE: Cria a empresa caso ela esteja de acordo com as validações
exports.create = (req, res) => {

    if (!req.body.nomeFantasia) {
        res.status(400).send({
            message: "O nome fantasia não pode estar vazio!"
        });
        return;
    } else if (!req.body.razaoSocial) {
        res.status(400).send({
            message: "A razão social não pode estar vazio!"
        });
        return;
        // TODO: Validar o cnpj com uma mascara
    } else if (!req.body.cnpj) {
        res.status(400).send({
            message: "O CNPJ não pode estar vazio!"
        });
        return;
    }

    // NOTE: Dados da empresa
    const company = {
        nomeFantasia: req.body.nomeFantasia,
        razaoSocial: req.body.razaoSocial,
        cnpj: req.body.cnpj,
        fk_empresa_usuario_idx: req.user.email
    }

    // NOTE: Salva uma empresa no banco de dados
    Company.create(company)
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

// NOTE: Faz a pesquisa no banco de dados pelas empresas do usuário atual
exports.getAll = (req, res) => {

    Company.findAll({
        where: {
            fk_empresa_usuario_idx: req.user.email
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar as empresas"
            })
        })

}
// NOTE: Faz a pesquisa no banco de dados pelo CNPJ e retorna a empresa
exports.getOne = (req, res) => {

    Company.findAll({
        where: {
            cnpj: req.body.cnpj
        }
    }).then(data => {

        if (data.length == 1) {

            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar procura a empresas");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procura a empresas"
            })
        })

}

// NOTE: Edita a empresa enviada de acordo com o CNPJ dela
exports.updateOne = (req, res) => {
    const cnpj = req.body.cnpj

    // NOTE: Valida se os campos foram enviados
    if (!req.body.nomeFantasia) {
        res.status(400).send({
            message: "O nome fantasia não pode estar vazio!"
        });
        return;
    } else if (!req.body.razaoSocial) {
        res.status(400).send({
            message: "A razão social não pode estar vazio!"
        });
        return;
        // TODO: Validar o cnpj com uma mascara
    } else if (!req.body.cnpj) {
        res.status(400).send({
            message: "O CNPJ não pode estar vazio!"
        });
        return;
    }

    Company.update(req.body, {
        where: {
            cnpj: cnpj
        }
    }).then(data => {

        if (data.length) {
            res.send(data);

        } else {
            res.send("Ocorreu algum erro ao tentar editar a empresa")
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar editar a empresa"
            })
        })

}

// NOTE: Faz o delete no banco de dados pelo CNPJ
exports.delete = (req, res) => {

    Company.destroy({
        where: {
            cnpj: req.body.cnpj,
            fk_empresa_usuario_idx: req.user.email
        }
    }).then(data => {

        if (data.length == 1) {
            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar deletar a empresas");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar deletar a empresas"
            })
        })

}
