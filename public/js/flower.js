function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 30;
    this.demo = false;
    this.xPos = 1;
    this.yPos = 1;

    this.destroy = function() {
        this.demo = true;

    }

    this.move = function() {
        this.x = this.x + this xPos;
        this.y = this.y + this yPos;
    }

    this.show = function() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.rad * 2, this.rad * 2); //POS X, POS Y, WIDTH, LENGTH
    }
}