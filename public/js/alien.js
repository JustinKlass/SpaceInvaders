console.log('Alien is running');

function Alien(x, y) {

    this.x = x;
    this.y = y;
    this.xdir = 1;
    this.rad = 50;
    this.demo = false;
    

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
        
        // rect(this.x, this.y, this.rad, this.rad); //POS X, POS Y, WIDTH, LENGTH
    }
}