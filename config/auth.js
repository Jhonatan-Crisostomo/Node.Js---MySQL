const localStrategy = require( "passport-local" ).Strategy
const bcrypt = require( "bcryptjs" )
const User = require( "../models/User" )

module.exports = ( passport ) => {

    passport.use( new localStrategy({ usernameField: "usuario", passwordField: "senha" }, ( usuario, senha, done ) => { 
        User.findOne({ usuario: usuario }).then( ( usuario ) => {
            if ( !usuario ) {
                return done( null, false )
            }
        
            bcrypt.compare( senha, usuario.senha, ( err, success ) => {
                if ( success ) {
                    return done( null, usuario )
                }else {
                    return done( null, false )
                }
            } )
        } )
        
    } ))

    passport.serializeUser( ( usuario, done ) => {
        done( null, usuario.id )
    } )

    passport.deserializeUser(( id, done ) => {
        User.findByPk( id, { raw: true } )
        .then(( usuario ) => {
            done( null, usuario )
        }) 
        .catch(( err ) => {
            done( err, null )
        })
    })
}