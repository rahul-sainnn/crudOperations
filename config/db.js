const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database:"localhost",
  username:"username",
  password:"userpassword",
  host: "host",
  dialect: "mssql",
  port: port,
  logging: console.log,
});

const dbconnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  dbconnection,
  sequelize,
};
