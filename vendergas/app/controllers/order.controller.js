const { product } = require("../models");
const db = require("../models");
const Product = db.product;
const Order = db.order;
const Client = db.client;
const OrderProduct = db.orderProduct;
const Op = db.Sequelize.Op;


// NOTE: Cria o peido caso ela esteja de acordo com as validações
exports.create = (req, res) => {


    if (!req.body.observacao) {
        res.status(400).send({
            message: "A observação não pode estar vazia!"
        });
        return;
    } else if (!req.body.emailCliente) {
        res.status(400).send({
            message: "O cliente não pode estar vazio!"
        });
        return;
    }

    // NOTE: Dados do pedido
    const order = {
        observacao: req.body.observacao,
        fk_empresa_pedido_idx: req.body.cnpj,
        fk_cliente_pedido_idx: req.body.emailCliente,
        fk_empresa_produto_idx: req.body.cnpj
    }

    // NOTE: Salva um pedido no banco de dados
    Order.create(order)
        .then(data => {
            res.send(data)

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar salvar o pedido"
            })
        })

}
// NOTE: Salva a relação de produto e pedido na tabela "pedidoProduto"
exports.addProduct = (req, res) => {

    const orderProduct = {
        quantidade: req.body.quantidade,
        produtoId: parseInt(req.body.produtoId),
        pedidoNumero: req.body.idPedido
    }

    OrderProduct.create(orderProduct)
        .then(data => {
            Product.findByPk(req.body.produtoId)
                .then(data2 => {
                    // NOTE: Retorna o registro de relacionamento entre as tabelas
                    // e o produto que foi adicionado
                    res.send({
                        'product': data2,
                        'orderProduct': data
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Ocorreu algum erro ao tentar salvar o pedido"
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


// NOTE: Faz o delete do relacionamento de um produto e um pedido no banco de dados
// pelo id do produto e o numero do pedido
exports.deleteProduct = (req, res) => {

    OrderProduct.destroy({
        where: {
            pedidoNumero: req.body.pedidoNumero,
            produtoId: req.body.produtoId
        }
    }).then(data => {

        if (data.length == 1) {
            res.send(data);
        } else {
            res.send("Ocorreu algum erro ao tentar deletar o produto do pedido");
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar deletar o produto do pedido"
            })
        })

}

// NOTE: Faz a pesquisa no banco de dados de todos os pedidos e os seus produtos por empresa
exports.getAllOrdersAndProducts = (req, res) => {

    Order.findAll({
        where: {
            fk_empresa_pedido_idx: req.body.cnpj
        },
        include: [Product, Client]
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao tentar procurar os pedidos"
            })
        })

}