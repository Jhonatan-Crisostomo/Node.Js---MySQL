const db = require( "./db" )

const Post = db.sequelize.define( "post", {
    titulo: {
        type: db.Sequelize.STRING
    },
    texto: {
        type: db.Sequelize.TEXT
    }
} )

module.exports = Post

//Post.sync( { force: true } )