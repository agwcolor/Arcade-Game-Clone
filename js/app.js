// Enemies our player must avoid

class Enemy {
    constructor(x, y, speed = Math.floor(Math.random() * 8 + 3)) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    update(dt) { //advance enemy on x-axis. If x > 500 put enemy back to beginning of row
        //console.log('starting update');
        this.x += this.speed * dt * 20;
        if (this.x > 500) {
            this.x = -80;
        }
    }

    render() { //draw enemy sprite on screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Player class

class Player {
    constructor(x = 3, y, sprite = 'images/char-boy.png') {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    update(dt) { //collision check
        //console.log('starting player update');
        allEnemies.forEach((enemy) => {
            if (enemy.x < this.x + 70 && enemy.x + 70 > this.x && enemy.y < this.y + 70 && enemy.y + 70 > this.y) {
                this.reset();
            }
        });
        //check if in bounds of board. If y < 50, you won : increase winCount
        if (this.y < 50) {
            //console.log('you won!');
            winCount += 1;
            document.querySelector('.wins').innerText = winCount + " Wins";

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

    setSprite(sprite) { //sets value of sprite from dropdown menu
        //console.log("this is value of sprite" + sprite + "in setSprite");
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) { //defines how much to move each key up, down, left, rt
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

    reset() { //after a collision, add 1 to collisionCount and put player back in lower left hand corner
        collisionCount += 1;
        document.querySelector('.collisions').innerText = collisionCount + " Collisions";
        this.y = 400;
        this.x = 0;
        //console.log("collision");
    }
};

function init() { //reset score totals on reload button click
    document.querySelector('.collisions').innerText = "0 Collisions";
    document.querySelector('.wins').innerText = "0 Wins";
}

// Instantiate & enemy & player objects.
const enemy1 = new Enemy(0, 50);
const enemy2 = new Enemy(0, 150);
const enemy3 = new Enemy(0, 230);
const enemy4 = new Enemy(0, 310);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

const player = new Player(3, 380);

// Define variables to count collisions & wins
let collisionCount = 0;
let winCount = 0;


//choose player for game, dropdown menu
document.getElementById('dropdown').addEventListener('change', function() {
    let x = 'images/' + this.value;
    //console.log("this is the value of " + x);
    player.setSprite(x);  //set value of dropdown to sprite
});


//restart game button - reset score totals w/ init()
document.querySelector('.restart').addEventListener('click', init);


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});