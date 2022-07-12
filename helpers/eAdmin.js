module.exports = {
    eAdmin: ( request, response, next ) => {
        if( request.isAuthenticated( ) ) {
            return next( )
        }
        response.redirect( "/" )
    }
}