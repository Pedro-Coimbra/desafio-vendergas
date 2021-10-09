const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;


// NOTE: Cria o produto caso ela esteja de acordo com as validações
exports.create = (req, res) => {

    if (!req.body.nome) {
        res.status(400).send({
            message: "O nome não pode estar vazio!"
        });
        return;
    } else if (!req.body.descricao) {
        res.status(400).send({
            message: "A descrição não pode estar vazio!"
        });
        return;
    } else if (!req.body.valor) {
        res.status(400).send({
            message: "O valor não pode estar vazio!"
        });
        return;
    }

    // NOTE: Dados do produto
    const product = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor: req.body.valor,
        fk_empresa_produto_idx: req.body.cnpj
    }

    // NOTE: Salva um produto no banco de dados
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar o produto"
            })
        })
}