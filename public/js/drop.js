console.log('drop is running');

function Drop(x, y) {
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

    this.hits = function(flower) {
        var d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.rad + flower.rad) {
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