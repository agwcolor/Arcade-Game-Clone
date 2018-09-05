// Enemies our player must avoid

class Enemy {
    constructor(x, y, speed = Math.floor(Math.random() * 8 + 3)) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    update(dt) { //methods inherited by all instances
        //console.log('starting update');

        this.x += this.speed * dt * 20;
        if (this.x > 500) {
            this.x = -80;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x = 3, y, sprite = 'images/char-boy.png') {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    update(dt) { //methods inherited by all instances
        //console.log('starting player update');
        allEnemies.forEach((enemy) => {
            if (enemy.x < this.x + 70 && enemy.x + 70 > this.x && enemy.y < this.y + 70 && enemy.y + 70 > this.y) {
                this.reset();
            }
        });
        //if in bounds of board
        if (this.y < 50) {
            console.log('you won!');
            this.y = 400;
            this.x = 0;
            return;
                //if too close to bottom
        } else if (this.y > 380) {
            this.y = 380;
            //if too far to left
        } else if (this.x < 3) {
            this.x = 3;
            //if too far to right
        } else if (this.x > 390) {
            this.x = 403;

        }
    }

    setSprite(sprite) {
        console.log("this is value of sprite" + sprite + "in setSprite");
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        //console.log(key + " is the key!");
        switch (key) {
            case 'left':
                this.x -= 100;
                break;
            case 'down':
                this.y += 80;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'up':
                this.y -= 80;
                break;
        }
    }

    reset() {
        this.y = 400;
        this.x = 0;
        console.log("collision");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(0, 50);
const enemy2 = new Enemy(0, 150);
const enemy3 = new Enemy(0, 230);
const enemy4 = new Enemy(0, 310);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

//choose player for game, dropdown menu

document.getElementById('dropdown').addEventListener('change', function() {
    let x = 'images/' + this.value;
    console.log("this is the value of " + x);
    player.setSprite(x);
});


const player = new Player(3, 380);

//console.log("this is the value of " + player.sprite);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});