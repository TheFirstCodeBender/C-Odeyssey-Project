
let canvas = document.querySelector('canvas');
let cContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=rectangle2.position.x
        &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        &&
        rectangle1.attackBox.position.y +rectangle2.attackBox.height >=rectangle2.position.y
        &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
}
function flipHorizontally(img, x, y) {
		// move to x + img's width
		c.translate(this.position.x + this.width, y);

		// scaleX by -1; this "trick" flips horizontally
		cContext.scale(this.reverse, 1);

		// draw the img
		// no need for x,y since we've already translated
		this.draw()

		// always clean up -- reset transformations to default
		cContext.setTransform(1, 0, 0, 1, 0, 0);
	} 


function determineWinner(player1Health, player2Health, timerId) {
    clearTimeout(timerId)
    document.querySelector('#DisplayResult').style.display = 'flex'
    if (player1Health === player2Health) {
        document.querySelector('#DisplayResult').innerHTML = 'Tie'
        player2.switchSprite('death')
        player1.switchSprite('death')
        }
            
        if (player1Health > player2Health) {
            document.querySelector('#DisplayResult').innerHTML = 'Player 1 Wins'   
            player2.switchSprite('death')
        }
        if (player1Health < player2Health) {
            document.querySelector('#DisplayResult').innerHTML = 'Player 2 Wins'
            player1.switchSprite('death')
        }
}
let timer = 120
let timerId
function decreaseTimer() {
    if (timer === 11) {
        document.querySelector('#timer').style.color = 'red'
    }
    if (timer > 0) {
       timerId = setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if(timer === 0) {
        
        determineWinner(player1.health, player2.health, timerId)   
    }
}

function determineAttack(player, lastkey) {
    if (lastkey === 'attack1') {
         player.attack('attack2')
        if (player.sprites.attack3) {
            lastkey = 'attack2'
        } else {
            lastkey = undefined
        }
    } else if (lastkey === 'attack2') {
        player.attack('attack3')
        lastkey = undefined
    }
    else {
        player.attack('attack1')
        lastkey = 'attack1'
    }
    return lastkey
}