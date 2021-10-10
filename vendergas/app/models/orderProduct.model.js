const dbConfig = require("../config/db.config.js");
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


const Company = require("./company.model.js")(sequelize, Sequelize);
const Product = require("./product.model.js")(sequelize, Sequelize);
const Client = require("./client.model.js")(sequelize, Sequelize);


module.exports = (sequelize, Sequelize, Deferrable) => {
    // NOTE: Modelo de tabela de relacionamento pedidoProduto 
    const orderProduct = sequelize.define("pedidoProdutos", {
        quantidade: {
            type: Sequelize.INTEGER,
        }

    }, {
        createdAt: false,
        updatedAt: false,
    }
    );

    return orderProduct;
};
