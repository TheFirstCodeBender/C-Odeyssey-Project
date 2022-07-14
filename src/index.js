const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }
    //Draws initial character sprite
    draw(color) {
        cContext.fillStyle = color
        cContext.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //Update location of Sprites
    update(color) {
        this.draw(color)
        
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
        
    }
}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0,
    }
})


const enemy = new Sprite({
    position: {
    x: canvas.width - 50,
    y:0
    },
    velocity: {
        x: 0,
        y: 0,
    }
})




function animate() {
    window.requestAnimationFrame(animate)
    cContext.fillStyle = 'black'
    cContext.fillRect(0,0,canvas.width,canvas.height)
    player.update('red')
    enemy.update('blue')
}

animate()
