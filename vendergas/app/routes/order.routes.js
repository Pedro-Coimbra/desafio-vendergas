module.exports = app => {
    const order = require("../controllers/order.controller.js");
    const login = require('../../middleware/login')

    // NOTE: Caso tenha uma requisição de post na url "/order" os dados são enviados
    // para que um produto seja cadastrado
    app.post("/order", login, (req, res) => {

        order.create(req, res);
    });

    // NOTE: Caso tenha uma requisição de post na url "/order" os dados são enviados
    // para que um produto seja cadastrado
    app.post("/order/addProduct", login, (req, res) => {

        order.addProduct(req, res);
    });

    // NOTE: Exclui um produto de acordo com o id do produto que foi enviado
    app.post("/order/deleteProduct", login, (req, res) => {

        order.deleteProduct(req, res);
    });
    // NOTE: Retorna todos os pedidos e seus produtos de acordo com o cnpj da empresa enviado
    app.post("/order/getAllOrdersAndProducts", login, (req, res) => {

        order.getAllOrdersAndProducts(req, res);
    });

    // NOTE: Retorna um pedido de acordo com o id do pedido que foi enviado
    app.post("/order/getOne", login, (req, res) => {

        order.getOne(req, res);
    });

    // NOTE: Atualiza um pedido de acordo com o id do pedido que foi enviado
    app.post("/order/updateOne", login, (req, res) => {

        order.updateOne(req, res);
    });

    // NOTE: Exclui um pedido de acordo com o numero do pedido que foi enviado
    app.post("/order/delete", login, (req, res) => {

        order.delete(req, res);
    });
}