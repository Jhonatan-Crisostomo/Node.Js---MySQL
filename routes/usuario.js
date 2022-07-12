const express = require( "express" )
const router = express.Router( )
const User = require( "../models/User" )
const passport = require( "passport" )

router.get( "/login", ( request, response ) => {
    response.render( "login" )
} )

router.post( "/login", ( request, response, next ) => {
    passport.authenticate( "local", {
        successRedirect: "/posts",
        failureRedirect: "/usuario/login"
    } )( request, response, next )
} )

module.exports = router