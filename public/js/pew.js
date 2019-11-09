console.log('Pew is running');

function Pew(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 8;
    this.demo = false;

    this.show = function() {
        fill('#22CC02');
        rect(this.x, this.y, this.rad / 2, this.rad * 2); //POS X, POS Y, WIDTH, LENGTH
    }

    this.destroy = function() {
        this.demo = true;

    }

    this.hits = function(alien) {
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.rad + alien.rad) {
            return true;
        }
        else {
            return false;
        }

    }

    this.move = function() {
        this.y = this.y - 5;
    }
}