module.exports = (sequelize, Sequelize) => {
    // NOTE: Modelo da tabela de usuário 
    const User = sequelize.define("usuarios", {
        nome: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        senha: {
            type: Sequelize.STRING
        },
        
    }, {

        createdAt: false,
        updatedAt: false,
    }
    );

    return User;
};