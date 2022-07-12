const menu = document.querySelector( ".btn" )
const seta = document.querySelector( ".seta" )
const nav = document.querySelector( ".nav-list" )

menu.addEventListener( "click", ( ) => {
    nav.classList.toggle( "active" )
    seta.classList.toggle( "deg" )
} )

const form = document.getElementById( "form" )
const posts = document.querySelector( ".posts" )
const n = document.querySelector( ".n" )
const g = document.querySelector( ".g" )

n.addEventListener( "click", ( ) => {
    if ( form.style.display = "none" ) {
        form.style.display = "flex"
    }
    posts.style.display = "none"
} )

g.addEventListener( "click", ( ) => {
    if ( posts.style.display = "none" ) {
        posts.style.display = "flex"
    }
    form.style.display = "none"
} )