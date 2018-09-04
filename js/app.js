// Enemies our player must avoid

class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }
    update() { //methods inherited by all instances
        console.log('starting engines…');
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }
    update(dt) { //methods inherited by all instances
        console.log('starting player update');
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 50);
const enemy2 = new Enemy(0, 150);
const enemy3 = new Enemy(0, 230);
const enemy4 = new Enemy(0, 310);

const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player(0, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});