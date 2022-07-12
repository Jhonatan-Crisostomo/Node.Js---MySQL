const express = require( "express" )
const session = require( "express-session" )
const app = express( )
const handlebars = require( "express-handlebars" )
const bodyParser = require( "body-parser" )
const Post = require( "./models/Post" )
const usuario = require( "./routes/usuario" )
const passport = require( "passport" )
require( "./config/auth" )( passport )
const path = require( "path" )
const {eAdmin} = require( "./helpers/eAdmin" )

app.use( session({
    secret: "inform-inform",
    resave: true,
    saveUninitialized: true
}) )

app.use( passport.initialize( ) )
app.use( passport.session( ) )

app.engine( "handlebars", handlebars.engine( { defaultLayout: "main" } ) )
app.set( "view engine", "handlebars" )

app.use( express.static( path.join( __dirname, "/public" )) )

app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json( ) )

app.get( "/", ( request, response ) => {
    Post.findAll( { order: [[ "id", "DESC" ]] } ).then( ( posts ) => {
        response.render( "home", { posts: posts } )
    } )  
} )

app.get( "/posts", eAdmin, ( request, response ) => {
    Post.findAll( { order: [[ "id", "DESC" ]] } ).then( ( posts ) => {
        response.render( "form", { posts: posts } )
    } )
    app.get( "/posts", ( request, response ) => {
        response.render( "form" )
    } )  
} )

app.post( "/", ( request, response ) => {
    Post.create( {
        titulo: request.body.titulo,
        texto: request.body.texto
    } ).then( ( ) => { 
        response.redirect( "/posts" )
    } ).catch( ( erro ) => {
        response.send( "ERRO: " + erro )
    } )
})

app.get( "/posts/:id", ( request, response ) => {
    Post.destroy( { where: { 
        "id": request.params.id 
    } } ).then( ( ) => {
        response.redirect( "/posts" )
    } ).catch( ( erro ) => {
        response.send( "ERRO: " + erro )
    } )
} )

app.use( "/usuario", usuario )

app.listen( 8080, ( ) => { } )