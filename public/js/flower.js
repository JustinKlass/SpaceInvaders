function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 50;
    this.demo = false;
    this.xdir = 1;
    

    this.destroy = function() {
        this.demo = true;

    }

    this.shiftDown = function() {
        this.xdir *= -1;
        this.y += this.rad;
    }

    this.move = function() {
        this.x = this.x + this.xdir * 4;
 
    }

    this.show = function() {
        // noStroke();
        // fill(0, 0, 255);
        image(alienImage, this.x, this.y, 75, 50);
        
        // ellipse(this.x, this.y, this.rad * 2, this.rad * 2); //POS X, POS Y, WIDTH, LENGTH
    }
}