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


module.exports = (sequelize, Sequelize, Deferrable) => {
    // NOTE: Modelo de tabela de Clientes 
    const Client = sequelize.define("clientes", {
        nome: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        telefone: {
            type: Sequelize.STRING,
        },
        fk_empresa_cliente_idx: {
            type: Sequelize.STRING,
            references: {
                model: 'empresas',
                key: 'cnpj',

            }
        }

    }, {
        createdAt: false,
        updatedAt: false,
    }
    );

    // NOTE: Cada cliente possui uma empresa
    Client.belongsTo(Company, {
        constraint: true,
        foreignKey: 'fk_empresa_cliente_idx'
    })

    // NOTE: Cada empresa possui vários clientes
    Company.hasMany(Client, {
        foreignKey: 'fk_empresa_cliente_idx'
    })

    return Client;
};
