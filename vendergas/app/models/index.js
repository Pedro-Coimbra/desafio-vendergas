const dbConfig = require("../config/db.config.js");
// NOTE: O Sequelize é utilizado para fazer as transações com os banco de dados
const Sequelize = require("sequelize");
// NOTE: inicializa um objeto Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;