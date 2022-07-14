const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    //Draws initial character sprite
    draw(color) {
        cContext.fillStyle = color
        cContext.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //Update location of Sprites
    update(color) {
        this.draw(color)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
        
    }
}

const player1 = new Sprite({
    // initial position of player1
    position: {
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0,
    }
})


const player2 = new Sprite({
    // initial position of player2
    position: {
    x: canvas.width - 50,
    y:0
    },
    velocity: {
        x: 0,
        y: 0,
    }
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate)
    cContext.fillStyle = 'black'
    cContext.fillRect(0,0,canvas.width,canvas.height)
    player1.update('red')
    player2.update('blue')

    // default velocity if nothing is pressed
    player1.velocity.x = 0
    player2.velocity.x = 0

    if (keys.a.pressed && player1.lastKey === 'a' ) {
        player1.velocity.x = -5;
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
    }
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' ) {
        player2.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {

        //Player 1 keys
        case 'd':
        keys.d.pressed = true
        player1.lastKey = 'd'
        break

        case 'a':
        keys.a.pressed = true
        player1.lastKey = 'a'
        break

        case 'w':
        player1.velocity.y = -20
        break
        
        //Player 2 keys
        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        player2.lastKey = 'ArrowRight'
        break

        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        player2.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp':
        player2.velocity.y = -20
        break
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //Player 1 keys
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break

        //Player 2 keys
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
        case 'ArrowUp':
        keys.ArrowUp.pressed = false
        break
    }
})

