console.log('ship is running');

function Ship() {

    this.x = game.width / 2.25;
    this.y = game.height - 60;
    this.xdir = 0;

    this.show = function() {

        image(shipImage, this.x, this.y, 125, 75);

    }

    this.setDir= function(dir) {
        this.xdir = dir;
    }

    this.move = function(dir) {
        this.x += this.xdir * 5; // Moves 1 pixel 5 times
    }
}