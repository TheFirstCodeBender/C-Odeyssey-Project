cContext.fillRect(0, 0, canvas.width, canvas.height);
const play = document.querySelector('#PlayBtn')
const gravity = 0.1
let gameStart = false
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

const player1 = Hyperion


const player2 = Kenji


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
        player1.velocity.x = -5 * player1.stats.Speed;
        player1.switchSprite('run')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5 * player1.stats.Speed;
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
        player2.velocity.x = -5 * player2.stats.Speed;
         player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5 * player2.stats.Speed;
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
        player2.takeHit(player1.stats.Offense,player2.stats.Defense)
        player1.isAttacking = false
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
        player1.takeHit(player2.stats.Offense,player1.stats.Defense,)
        player2.isAttacking = false
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
    if (player1.health <= 0 || player2.health <= 0) {
        player2.isAttacking = false
        player1.isAttacking = false
        determineWinner(player1.health,player2.health, timerId)
    }
}
function startGame() {
    decreaseTimer(), audio.Stage.play()
    play.style.display = 'none'
    gameStart = true
    animate()
}

play.addEventListener('click', () => startGame())

window.addEventListener('keydown', (event) => {
    if (!player1.dead && gameStart) {
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
                player1.velocity.y = -7 - (player1.stats.Speed / 2)
                break
        
            case ' ':
                if (player1.lastKey === 'attack1') {
                    player1.attack('attack2')
                    player1.lastKey = undefined
                } else {
                player1.attack('attack1')
                player1.lastKey = 'attack1'
                }
                
                break
        }
    }
    if (!player2.dead && gameStart) {
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
        player2.velocity.y = -7 - (player2.stats.Speed / 2)
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

