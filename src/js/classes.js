class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        
    }
    
    draw() {
        cContext.drawImage(this.image, this.position.x, this.position.y)
    }


    //Update location of Sprites
    update() {
        this.draw()
    }

}



class Fighter {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },

            //offset argument for hitbox
            offset,
            width: 100,
            height: 50 
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
    }


    //Draws initial character sprite
    draw() {
        cContext.fillStyle = this.color
        cContext.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        if (this.isAttacking) {
        cContext.fillStyle = 'green'
        cContext.fillRect(this.attackBox.position.x, this.attackBox.position.y+ 20, this.attackBox.width, this.attackBox.height)
        }
        
    }


    //Update location of Sprites
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height-96) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


