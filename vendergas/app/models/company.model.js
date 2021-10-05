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

const User = require("./user.model.js")(sequelize, Sequelize);


module.exports = (sequelize, Sequelize, Deferrable) => {
    // NOTE: Modelo da tabela da Empresa 
    const Company = sequelize.define("empresas", {
        nomeFantasia: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        razaoSocial: {
            type: Sequelize.STRING,
        },
        cnpj: {
            type: Sequelize.STRING
        },
        fk_empresa_usuario_idx: {
            type: Sequelize.STRING,
            references: {
                model: 'usuarios',
                key: 'email',

            }
        }
        
    }, {
        createdAt: false,
        updatedAt: false,
    }
    );

    // NOTE: Cada empresa possui um usuário
    Company.belongsTo(User, {
        constraint: true,
        foreignKey: 'email'
    })
    
    // NOTE: Cada usuário possui várias empresas
    User.hasMany(Company, {
        foreignKey: 'email'
    })

    return Company;
};
