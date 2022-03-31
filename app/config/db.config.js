module.exports = {
    HOST: "localhost",
    USER: "pi",
    PASSWORD: "",
    DB: "iprwcdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };