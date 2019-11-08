console.log('ship is running');

function Ship() {
    this.x = width / 2.25;
    this.xdir = 0;
    // let im = loadImage('./img/sprites.png');

    this.show = function() {
        // fill(220);
        image(shipImage, this.x, height - 60, 125, 75);
        // rectMode(CENTER); //Draws rect from center
        // rect(this.x, height - 20, 20, 60); //POS X, POS Y, WIDTH, LENGTH

    }

    this.setDir= function(dir) {
        this.xdir = dir;
    }

    this.move = function(dir) {
        this.x += this.xdir * 5; // Moves 1 pixel 5 times
    }
}