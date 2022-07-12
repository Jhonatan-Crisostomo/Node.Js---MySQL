const canvas = document.getElementById( "canvas" )
const gc = canvas.getContext( "2d" ) 

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray

class Particles {
    constructor( x, y, directionX, directionY, size, color ) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
    }

    draw( ) {
        gc.beginPath( )
        gc.arc( this.x, this.y, this.size, 0, Math.PI * 2, false )
        gc.fillStyle = "#fff"
        gc.fill( )
    }

    update( ) {
        if ( this.x > canvas.width || this.x < 0 ) {
            this.directionX = -this.directionX
        }
        if ( this.y > canvas.height || this.y < 0 ) {
            this.directionY = -this.directionY
        }

        this.x += this.directionX
        this.y += this.directionY
        this.draw( )
    }
}

function init( ) {
    particlesArray = [ ]
    let numberOfParticles = ( canvas.height * canvas.width ) / 7000

    for ( let i = 0; i < numberOfParticles; i++ ) {
        let size = Math.random( ) + 1
        let x = ( Math.random( ) * (( innerWidth - size * 2 ) - ( size * 2 )) + size * 2 )
        let y = ( Math.random( ) * (( innerHeight - size * 2 ) - ( size * 2 )) + size * 2 )
        let directionX = ( Math.random( ) * 5 ) - 2.5
        let directionY = ( Math.random( ) * 5 ) - 2.5
        let color = "#fff"

        particlesArray.push( new Particles( x, y, directionX, directionY, size, color ) )
    }
}

function connect( ) {
    let opacityValue = 1
    for ( let a = 0; a < particlesArray.length; a++ ) {
        for ( let b = a; b < particlesArray.length; b++ ) {
            let distance = (( particlesArray[a].x - particlesArray[b].x ) * ( particlesArray[a].x - particlesArray[b].x ))
            + (( particlesArray[a].y - particlesArray[b].y) * ( particlesArray[a].y  - particlesArray[b].y ))
            if ( distance < ( canvas.width / 7 ) * ( canvas.height / 7 ) ) {
                opacityValue = 1 - ( distance / 20000 )
                gc.strokeStyle = `rgba(255, 255, 255, ${ opacityValue })`
                gc.lineWidth = 2
                gc.beginPath( )
                gc.moveTo( particlesArray[a].x, particlesArray[a].y )
                gc.lineTo( particlesArray[b].x, particlesArray[b].y )
                gc.stroke( )
            }
        }
    }
}

function animate( ) {
    requestAnimationFrame( animate )
    gc.clearRect( 0, 0, innerWidth, innerHeight )

    for ( let i = 0; i < particlesArray.length; i++ ) {
        particlesArray[i].update( )
    }
    connect( )
}

window.addEventListener( "resize", function( ) {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init( )
} )

init( )
animate( )