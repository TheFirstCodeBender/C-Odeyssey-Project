

Ryouta = new Fighter({
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
    stats: {
        Offense:2,
        Defense:2,
        Speed:1.5
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

Kenji = new Fighter({
    // initial position of player2
    position: {
    x: canvas.width - 100,
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
    imageSrc: './assets/Characters/kenji/Idle.png',
    scale: 2.5,
    framesMax: 4,
    offset: {
        x:215,
        y:170
    },
    stats: {
        Offense:1,
        Defense:.5,
        Speed:2
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
        attack3: {
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

Hyperion = new Fighter({
    // initial position of player2
    position: {
    x: 50,
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
    stats: {
        Offense:1.5,
        Defense:3,
        Speed:1
    },
    imageSrc: './assets/Characters/kenji/Idle.png',
    scale: 3,
    framesMax: 4,
    offset: {
        x:215,
        y:150
    },
    sprites: {
        idle: {
            imageSrc: './assets/Characters/Hyperion/Idle.png',
            framesMax: 10,
        },
        run: {
            imageSrc: './assets/Characters/Hyperion/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/Characters/Hyperion/Jump.png',
            framesMax: 3,
        },
        fall: {
            imageSrc: './assets/Characters/Hyperion/Fall.png',
            framesMax: 3,
        },
        attack1: {
            imageSrc: './assets/Characters/Hyperion/Attack1.png',
            framesMax: 7,
        },
        attack2: {
            imageSrc: './assets/Characters/Hyperion/Attack2.png',
            framesMax: 7,
        },
        attack3: {
            imageSrc: './assets/Characters/Hyperion/Attack3.png',
            framesMax: 8,
        },
        takeHit: {
        imageSrc: './assets/Characters/Hyperion/Take hit.png',
        framesMax: 3
        },
        death: {
        imageSrc: './assets/Characters/Hyperion/Death.png',
        framesMax: 7
        }
    },
    attackBox: {
            offset: {
                x: -50,
                y: 0
            },
            width: 300,
            height: 200
        }
})