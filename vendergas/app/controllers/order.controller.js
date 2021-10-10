const { product } = require("../models");
const db = require("../models");
const Product = db.product;
const Order = db.order;
const OrderProduct = db.orderProduct;
const Op = db.Sequelize.Op;


// NOTE: Cria o peido caso ela esteja de acordo com as validações
exports.create = (req, res) => {


    if (!req.body.quantidade) {
        res.status(400).send({
            message: "A quantidade não pode estar vazia!"
        });
        return;
    } else if (!req.body.observacao) {
        res.status(400).send({
            message: "A observação não pode estar vazia!"
        });
        return;
    } else if (!req.body.produtoId) {
        res.status(400).send({
            message: "O produto não pode estar vazio!"
        });
        return;
    } else if (!req.body.clientEmail) {
        res.status(400).send({
            message: "O cliente não pode estar vazio!"
        });
        return;
    }

    // NOTE: Dados do pedido
    const order = {
        observacao: req.body.observacao,
        fk_empresa_pedido_idx: req.body.cnpj,
        fk_cliente_pedido_idx: req.body.clientEmail,
        fk_empresa_produto_idx: req.body.cnpj
    }

    // NOTE: Salva um pedido no banco de dados
    Order.create(order)
        .then(data => {
            Product.findByPk(req.body.produtoId)
                .then(data2 => {

                    const orderProduct = {
                        quantidade: req.body.quantidade,
                        produtoId: parseInt(req.body.produtoId),
                        pedidoNumero: data.dataValues.numero
                    }

                    // NOTE: Salva a relação de produto e pedido na tabela "pedidoProduto"
                    OrderProduct.create(orderProduct)
                        .then(data3 => {
                            res.send(data3)
                        })
                        .catch(err => {
                            // NOTE: Caso ocorra algum erro ao tentar salvar
                            // o relacionamento entre as tabelas o pedido que foi
                            // adicionado é removido e um erro é retornado
                            Order.destroy({
                                where: {
                                    numero: data.dataValues.numero
                                }
                            })
                            res.status(500).send({
                                message:
                                    err.message || "Ocorreu algum erro ao tentar salvar o pedido"
                            })
                        })
                })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar o pedido"
            })
        })

}
