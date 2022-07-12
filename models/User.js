const db = require( "./db" )

const User = db.sequelize.define( "user", {
    usuario: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
} )

module.exports = User

//User.sync( { force: true } )