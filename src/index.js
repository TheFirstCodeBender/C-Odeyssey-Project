const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/Stages/Hidden-Forest/background.png'
})
const shop = new Sprite({
    position: {
        x: 625,
        y: 128
    },
    imageSrc: '../assets/Stages/Hidden-Forest/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player1 = new Fighter({
    // initial position of player1
    position: {
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0
    }
})


const player2 = new Fighter({
    // initial position of player2
    position: {
    x: canvas.width - 50,
    y:0
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
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



decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    cContext.fillStyle = 'black'
    cContext.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player1.update('red')
    player2.update('blue')

    // default velocity if nothing is pressed
    player1.velocity.x = 0
    player2.velocity.x = 0

    //Player 1 Movement
    if (keys.a.pressed && player1.lastKey === 'a' ) {
        player1.velocity.x = -5;
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
    }

    //Player 2 Movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' ) {
        player2.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
    }

    // detect for collision
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
    }) && player1.isAttacking
    ) {
        player1.isAttacking = false
        player2.health -= 10
        document.querySelector('#Player2Health').style.width = player2.health + '%'
    }
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
    }) && player2.isAttacking
    ) {
        player2.isAttacking = false
        player1.health -= 10
        document.querySelector('#Player1Health').style.width = player1.health + '%'
    }

    // end game based on health
    if (player1.health === 0 || player2.health === 0) {
        determineWinner(player1.health,player2.health, timerId)
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
        
        case ' ':
        player1.attack()
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
        
        case 'ArrowDown':
        player2.attack()
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

