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
            message: "A descrição não pode estar vazia!"
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

// NOTE: Faz a pesquisa no banco de dados dos produtos por empresa
exports.getAll = (req, res) => {

    Product.findAll({
        where: {
            fk_empresa_produto_idx: req.body.cnpj
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar os produtos"
            })
        })

}

// NOTE: Faz a pesquisa no banco de dados pelo id e retorna o produto
exports.getOne = (req, res) => {

    Product.findAll({
        where: {
            id: req.body.id
        }
    }).then(data => {

        if (data.length == 1) {

            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar procurar o produto");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar o produto"
            })
        })

}


// NOTE: Edita o produto enviado de acordo com o id dele
exports.updateOne = (req, res) => {

    // NOTE: Valida se os campos foram enviados
    if (!req.body.nome) {
        res.status(400).send({
            message: "O nome não pode estar vazio!"
        });
        return;
    } else if (!req.body.descricao) {
        res.status(400).send({
            message: "A descrição não pode estar vazia!"
        });
        return;
    } else if (!req.body.valor) {
        res.status(400).send({
            message: "O valor não pode estar vazio!"
        });
        return;
    }

    Product.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(data => {

        if (data.length) {
            res.send(data);

        } else {
            res.send("Ocorreu algum erro ao tentar editar o produto")
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar editar o produto"
            })
        })

}
