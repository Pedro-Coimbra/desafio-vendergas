// NOTE: Credenciais do banco de dados
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };