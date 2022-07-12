const Sequelize = require( "sequelize" )

const sequelize = new Sequelize( "posts", "root", "********", {
    host: "***.***.*.*",
    dialect: "mysql",
    query: { raw: true }
} )

module.exports = { 
    Sequelize: Sequelize,
    sequelize: sequelize
}