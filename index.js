

const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.1

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/Stages/Hidden-Forest/background.png'
})
const shop = new Sprite({
    position: {
        x: 625,
        y: 128
    },
    imageSrc: './assets/Stages/Hidden-Forest/shop.png',
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
    },
    imageSrc: './assets/Characters/Ryouta/Idle.png',
    scale: 2.5,
    framesMax: 8,
    offset: {
        x:215,
        y:157
    },
    sprites: {
        idle: {
            imageSrc: './assets/Characters/Ryouta/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './assets/Characters/Ryouta/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/Characters/Ryouta/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/Characters/Ryouta/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/Characters/Ryouta/Attack1.png',
            framesMax: 6,
        },
        attack2: {
            imageSrc: './assets/Characters/Ryouta/Attack2.png',
            framesMax: 6,
        },
        takeHit: {
        imageSrc: './assets/Characters/Ryouta/Take Hit - white silhouette.png',
        framesMax: 4
        },
        death: {
        imageSrc: './assets/Characters/Ryouta/Death.png',
        framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 25,
            y: 0
        },
        width: 200,
        height: 100
    },
    
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
    offset: {
        x: -50,
        y: 0
    },
    // imageSrc: './assets/Characters/kenji/Idle.png',
    scale: 2.5,
    // framesMax: 4,
    offset: {
        x:215,
        y:170
    },
    sprites: {
        idle: {
            imageSrc: './assets/Characters/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './assets/Characters/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/Characters/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/Characters/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/Characters/kenji/Attack1.png',
            framesMax: 4,
        },
        attack2: {
            imageSrc: './assets/Characters/kenji/Attack2.png',
            framesMax: 4,
        },
        takeHit: {
        imageSrc: './assets/Characters/kenji/Take hit.png',
        framesMax: 3
        },
        death: {
        imageSrc: './assets/Characters/kenji/Death.png',
        framesMax: 7
        }
    },
    attackBox: {
            offset: {
                x: -150,
                y: 0
            },
            width: 150,
            height: 150
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
    cContext.fillStyle = 'rgba(255,255,255,0.15)'
    cContext.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    // default velocity if nothing is pressed
    player1.velocity.x = 0
    player2.velocity.x = 0

    //Player 1 Movement

    // running
    if (keys.a.pressed && player1.lastKey === 'a' ) {
        player1.velocity.x = -5;
        player1.switchSprite('run')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
        player1.switchSprite('run')
    
    }
    
    // idle
    else { 
        player1.switchSprite('idle')
    }

    //jumping
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0 ){
        player1.switchSprite('fall')
    }

    //Player 2 Movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' ) {
        player2.velocity.x = -5;
         player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
         player2.switchSprite('run')
    }
    // idle
    else { 
        player2.switchSprite('idle')
    }

    //jumping
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump')
    } else if (player2.velocity.y > 0 ){
        player2.switchSprite('fall')
    }

    // detect for collision & player2 gets hit
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) &&
        player1.isAttacking &&
        player1.framesCurrent === 4
    ) {
        player2.takeHit()
        player1.isAttacking = false
        
        // document.querySelector('#Player2Health').style.width = player2.health + '%'
        gsap.to('#Player2Health', {
            width: player2.health + '%'
        }
        )
    }

    // if player1 misses
    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false
    }

    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
    }) && player2.isAttacking && player2.framesCurrent === 2
    ) {
        player1.takeHit()
        player2.isAttacking = false
        // document.querySelector('#Player1Health').style.width = player1.health + '%'
        gsap.to('#Player1Health', {
            width: player1.health + '%'
        }
        )
    }

    //if player2 misses
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false
    }
    // end game based on health
    if (player1.health === 0 || player2.health === 0) {
        determineWinner(player1.health,player2.health, timerId)
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!player1.dead) {
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
                player1.velocity.y = -7
                break
        
            case ' ':
                if (player1.lastKey === 'attack') {
                    player1.attack('attack2')
                    player1.lastKey = undefined
                } else {
                player1.attack('attack1')
                player1.lastKey = 'attack'
                }
                
                break
        }
    }
    if (!player2.dead) {
        switch (event.key) {
        
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
        player2.velocity.y = -6
        break
        
        case 'ArrowDown':
            if (player2.lastKey === 'attack') {
                player2.attack('attack2')
                player2.lastKey = undefined
            } else {
                player2.attack('attack1')
                player2.lastKey = 'attack'
                }
        break
    }
    
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

