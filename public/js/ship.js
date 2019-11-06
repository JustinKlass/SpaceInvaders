function Ship() {
    this.x = width / 2;

    this.show = function() {
        fill(220);
        rectMode(CENTER); //Draws rect from center
        rect(this.x, height - 20, 20, 60); //POS X, POS Y, WIDTH, LENGTH
    }

    this.move = function(dir) {
        this.x += dir * 5; //Moves 1 pixel 5 times
    }
}