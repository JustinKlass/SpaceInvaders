let ship;
let score = 0;
let shipImage;
let alienImage;
let drops = [];
let flowers = [];
let backgroundImage;


function preload() {

  shipImage = loadImage('./img/ship.png');
  alienImage = loadImage('./img/alien1.png');
  backgroundImage = loadImage('./img/space.png');
}

function setup() {

    createCanvas(1260, 625);
    ship = new Ship();

    for (let i = 0; i < 8; i++) {
        flowers[i] = new Flower(i * 125, 50);
    }

}

function draw() {

    background(backgroundImage, 255);

    textSize(30);
    fill(255, 255, 255);
    text('Score: ' + score, width / 2.25, 30)

    ship.show();
    ship.move();

    for (let i = 0; i < drops.length; i++) {

        drops[i].show();
        drops[i].move();

        for (let j = 0; j < flowers.length; j++) {
            if (drops[i].hits(flowers[j])) {
                flowers[j].destroy();
                drops[i].destroy();
            }
        }
    }

    let edge = false;

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].show();
        flowers[i].move();

        if (flowers[i].x >= width || flowers[i].x <= 0) {
            edge = true;
        }
    }

    if (edge) {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].shiftDown();
        }
    }

    for (let i = drops.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
        if (drops[i].demo) {
            drops.splice(i, 1);
        }
    }

    for (let i = flowers.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
        if (flowers[i].demo) {
            score = score + 100;
            flowers.splice(i, 1);
        }
    }
    
}

// function mousePressed() {
//     if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//       let fs = fullscreen();
//       fullscreen(!fs);
//     }
// }

function keyPressed() {

    if (keyCode === 32 || keyCode === 38 || keyCode === 87) { // SPACEBAR / UP / W
        let drop = new Drop(ship.x + 61, height - 70);
        drops.push(drop);
    }
    

    if (keyCode === 39 || keyCode === 68) {  // RIGHT / D
        ship.setDir(1);
    } 
    if (keyCode === 37 || keyCode === 65) {   // LEFT / A
        ship.setDir(-1);
    }
}

function keyReleased() {
    if (key != ' ' && keyCode != 38 && keyCode != 87) { // SPACEBAR / UP / W
    ship.setDir(0);
    }
}
 