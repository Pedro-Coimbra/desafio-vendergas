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
    // NOTE: Modelo de tabela de Produtos 
    const Product = sequelize.define("produtos", {
        nome: {
            type: Sequelize.STRING,
        },
        descricao: {
            type: Sequelize.STRING
        },
        valor: {
            type: Sequelize.DECIMAL,
        },
        fk_empresa_produto_idx: {
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

    // NOTE: Cada produto possui uma empresa
    Product.belongsTo(Company, {
        constraint: true,
        foreignKey: 'fk_empresa_produto_idx'
    })

    // NOTE: Cada empresa possui vários produtos
    Company.hasMany(Product, {
        foreignKey: 'fk_empresa_produto_idx'
    })

    return Product;
};
