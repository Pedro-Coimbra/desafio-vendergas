module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const login = require('../../middleware/login')

    // NOTE: Caso tenha uma requisição de post na url "/client" os dados são enviados
    // para que um cliente seja cadastrado
    app.post("/client", login, (req, res) => {

        client.create(req, res);
    });

    // NOTE: Caso tenha uma requisição de post na url "/client/getAll" o usuário
    // é validado e caso ele esteja autorizado os dados são enviados para que a
    // pesquisa de clientes seja feita
    app.post("/client/getAll", login, (req, res) => {

        client.getAll(req, res);
    });

    // NOTE: Atualiza um cliente de acordo com o email do cliente que foi enviado
    app.post("/client/updateOne", login, (req, res) => {

        client.updateOne(req, res);
    });

    // NOTE: Retorna um cliente de acordo com o email do cliente que foi enviada
    app.post("/client/getOne", login, (req, res) => {

        client.getOne(req, res);
    });

    // NOTE: Exclui um cliente de acordo com o email do cliente que foi enviado
    app.post("/client/delete", login, (req, res) => {

        client.delete(req, res);
    });
}