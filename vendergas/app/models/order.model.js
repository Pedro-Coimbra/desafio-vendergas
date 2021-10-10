const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
var moment = require('moment'); // require
moment().format(); 
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
    // NOTE: Modelo de tabela de Pedidos 
    const Order = sequelize.define("pedidos", {
        numero: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        observacao: {
            type: Sequelize.STRING
        },
        fk_empresa_pedido_idx: {
            type: Sequelize.STRING,
            references: {
                model: 'empresas',
                key: 'cnpj',

            }
        },
        fk_cliente_pedido_idx: {
            type: Sequelize.STRING,
            references: {
                model: 'clientes',
                key: 'email',

            }
        },
        createdAt: {
            type: Sequelize.DATE,
            // NOTE: Faz com que retorne a data de criação formatada  
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },

    }, {
        updatedAt: false,
    }
    );

    // NOTE: Cada pedido possui uma empresa
    Order.belongsTo(Company, {
        constraint: true,
        foreignKey: 'fk_empresa_pedido_idx'
    })

    // NOTE: Cada empresa possui vários pedidos
    Company.hasMany(Order, {
        foreignKey: 'fk_empresa_pedido_idx'
    })

    // NOTE: Cada pedido possui um cliente
    Order.belongsTo(Client, {
        constraint: true,
        foreignKey: 'fk_cliente_pedido_idx'
    })

    // NOTE: Cada cliente possui vários pedidos
    Client.hasMany(Order, {
        foreignKey: 'fk_cliente_pedido_idx'
    })

    // NOTE: Um pedido pertece a vários produtos
    Order.belongsToMany(Product, {
        through: 'pedidoProdutos'

    })

    // NOTE: Um produto pertence a vários pedidos
    Product.belongsToMany(Order, {
        through: 'pedidoProdutos'
    })

    return Order;
};
