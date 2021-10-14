// NOTE: Credenciais do banco de dados
module.exports = {
    HOST: "postgres_container",
    USER: "postgres",
    PASSWORD: "123456",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };