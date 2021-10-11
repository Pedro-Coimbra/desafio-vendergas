
module.exports = app => {
    const company = require("../controllers/company.controller.js");
    const login = require('../../middleware/login')


    // NOTE: Caso tenha uma requisição de post na url "/company" os dados são enviados
    // para que uma empresa seja cadastrada
    app.post("/company", login, (req, res) => {

        company.create(req, res);
    });

    // NOTE: Caso tenha uma requisição de post na url "/company/getAll" o usuário
    // é validaddo e caso ele esteja autorizado os dados são enviados para que a
    // pesquisa seja de empresas feita
    app.get("/company/getAll", login, (req, res) => {

        company.getAll(req, res);
    });

    // NOTE: Retorna uma empresa de acordo com o CNPJ da empresa que foi enviada
    app.post("/company/getOne", login, (req, res) => {

        company.getOne(req, res);
    });

    // NOTE: Atualiza uma empresa de acordo com o CNPJ da empresa que foi enviada
    app.post("/company/updateOne", login, (req, res) => {

        company.updateOne(req, res);
    });
    // NOTE: Exclui uma empresa de acordo com o CNPJ da empresa que foi enviada
    app.post("/company/delete", login, (req, res) => {

        company.delete(req, res);
    });

}