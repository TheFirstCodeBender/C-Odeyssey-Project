
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
    }
    
    draw() {
        cContext.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
        
        
    }
    
    //Update location of Sprites
    update() {
    this.draw()
    this.animateFrames()
    }

}



class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        stats = { Offense: 10 , Defense: 10, Speed: 10},
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = {
            offset: {}, width: undefined, height: undefined
        }
    }) {
        //We take the properties from the parent constructor that we want to use in the child Fighter Class
        super({
            imageSrc,
            scale,
            framesMax,
            position,
            offset
        })
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
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height 
        }
        this.stats = stats
        this.isAttacking = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false
        // loop over sprites object and change the sprites to a new sprite
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        
    }


    //Draws initial character sprite
    


    //Update location of Sprites
    update() {
        
        this.draw()
        if (!this.dead)
        { this.animateFrames() }
        
        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y

        //Draw attack boxes
        // cContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height-96) {
            this.velocity.y = 0
            this.position.y = 330
        } else this.velocity.y += gravity
        
    }

    attack(attack) {
        this.switchSprite(attack)
        this.isAttacking = true
        
    }
    takeHit(Offense, Defense) {
        // this.switchSprite('takeHit')
        this.health -= (5 * Offense) - Defense
        if (this.health < 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true
                
            }
            return
            
        }
        try {
            //override all other animations with the attack animation
        if (this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1)
            return
        if (this.image === this.sprites.attack2.image &&
            this.framesCurrent < this.sprites.attack2.framesMax - 1)
            return
        if (this.image === this.sprites.attack3.image &&
            this.framesCurrent < this.sprites.attack3.framesMax - 1)
            return
        //override all other animations with take hit animation
        if (this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1)
            return
        } catch (error) {
            
        }
        
        if (this.image !== this.sprites[sprite].image) {
            this.image = this.sprites[sprite].image
            this.framesMax = this.sprites[sprite].framesMax
            this.framesCurrent = 0
        }
   

        
    }
}


