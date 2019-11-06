// new p5();
let ship;
let flowers = [];
let drops = [];

function setup() {
    createCanvas(600, 400);
    ship = new Ship();
    // drop = new Drop(width / 2, height / 2);
    for (let i = 0; i < 6; i++) {
        flowers[i] = new Flower(i * 80 + 80, 60);
    }
}

function draw() {
    background(51);
    ship.show();

    for (let i = 0; i < drops.length; i++) {

        drops[i].show();
        drops[i].move();

        for (let j = 0; j < flowers.length; j++) {
            if (drops[i].hits(flowers[j])) {
                flowers[j].destroy();
                drops[i].destroy();
                console.log("Watered");
            }
        }
    }

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].show();
    }

    for (let i = drops.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
        if (drops[i].demo) {
            drops.splice(i, 1);
        }
    }

    for (let i = flowers.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
        if (flowers[i].demo) {
            flowers.splice(i, 1);
        }
    }

}









function keyPressed() {

    // while ( === true) {}
    if (keyCode === 32) {
        let drop = new Drop(ship.x, height);
        drops.push(drop);
    }
    

    if (keyCode === RIGHT_ARROW) {  // 39
        ship.move(1);
    } 
    if (keyCode === LEFT_ARROW) {   // 37
        ship.move(-1);
    }

}
