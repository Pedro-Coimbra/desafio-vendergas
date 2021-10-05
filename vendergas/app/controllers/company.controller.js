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