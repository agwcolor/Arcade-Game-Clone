// Enemies our player must avoid

class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = Math.floor(Math.random() * 8 + 1);
    }
    update(dt) { //methods inherited by all instances
        //console.log('starting update');
        this.x += this.speed * dt;
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
        //console.log('starting player update');
        allEnemies.forEach((enemy) => {
                if (enemy.x < this.x + 70 && enemy.x + 70 > this.x && enemy.y < this.y + 70 && enemy.y + 70 > this.y) {
                    this.reset();
                }
            });
        }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

    handleInput(key) {
        //console.log(key + " is the key!");
            switch (key) {
                case 'left':
                    this.x -= 90;
                    break;
                case 'down':
                    this.y += 80;
                    break;
                case 'right':
                    this.x += 80;
                    break;
                case 'up':
                    this.y -= 80;
                    break;
            }
    }

    reset() {
        console.log("I'm in the reset function");
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
    const player = new Player(0, 400);


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