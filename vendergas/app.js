const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const user = require("./app/controllers/user.controller.js");
const company = require("./app/controllers/company.controller.js");
const app = express();
const port = 3000
const login = require('./middleware/login')
const db = require("./app/models");


// NOTE: Seta a origem dos requests
var corsOptions = {origin: [
    "http://localhost:4200"
  ], credentials: true}
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



db.sequelize.sync()

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

// NOTE: Caso tenha uma requisição de post na url "/user" os dados são enviados
// para que um usuário novo seja criado 
app.post("/user", (req, res) => {

    user.create(req, res);
});

// NOTE: Caso tenha uma requisição de post na url "/login" os dados são enviados
// para que as credenciais sejam validadas
app.post("/login", (req, res) => {

    user.login(req, res);
});

// NOTE: Caso tenha uma requisição de post na url "/company" os dados são enviados
// para que uma empresa seja cadastrada
app.post("/company", login, (req, res) => {

    company.create(req, res);
});

// TODO: Organizar as rotas por arquivos (pasta routes)
// require("./app/routes/users.routes");

// NOTE: Seta um "listener" na porta 3000
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
