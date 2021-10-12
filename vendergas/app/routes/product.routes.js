module.exports = app => {
    const product = require("../controllers/product.controller.js");
    const login = require('../../middleware/login')


    // NOTE: Caso tenha uma requisição de post na url "/product" os dados são enviados
    // para que um produto seja cadastrado
    app.post("/product", login, (req, res) => {

        product.create(req, res);
    });

    // NOTE: Caso tenha uma requisição de post na url "/product/getAll" o usuário
    // é validado e caso ele esteja autorizado os dados são enviados para que a
    // pesquisa de produtos seja feita
    app.post("/product/getAll", login, (req, res) => {

        product.getAll(req, res);
    });

    // NOTE: Retorna um produto de acordo com o id do produto que foi enviada
    app.post("/product/getOne", login, (req, res) => {

        product.getOne(req, res);
    });

    // NOTE: Atualiza um produto de acordo com o id do produto que foi enviado
    app.post("/product/updateOne", login, (req, res) => {

        product.updateOne(req, res);
    });

    // NOTE: Exclui um produto de acordo com o id do produto que foi enviado
    app.post("/product/delete", login, (req, res) => {

        product.delete(req, res);
    });

}