const Sequalize = require("sequelize");

const sequelize = new Sequalize( "used_cars" , "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;