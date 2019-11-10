console.log('sketch is running');

let score = 0;

let ship;
let shipImage;
let alienImage;
let backgroundImage;

let pews = [];
let aliens = [];
let aliens2 = [];  
let aliensArray = [];


const shift = (aliensArray) => {

    // alienRowName.forEach((alien) => {
    //     alien.shiftDown();
    // });

    aliensArray.forEach((alien) => {
        alien.forEach((i) => {
            i.shiftDown();
        });
    });


};

const setupAlienRow = (alienRowName, y) => {

    for (let i = 0; i < 11; i++) {
        alienRowName[i] = new Alien(i * 90, y);
    }
    aliensArray.push(alienRowName);
};

const makeAlienRow = (alienRowName) => {

    alienRowName.forEach((alien) => {

        alien.show();
        alien.move();

    });


    //START LOOPING THROUGH ARRAY BACKWARDS SO THAT IT DOESN'T SKIP BACKWARDS
    for (let i = alienRowName.length - 1; i >= 0; i--) {  
        if (alienRowName[i].demo) {
            score = score + 100;
            alienRowName.splice(i, 1);
        }
    }

// MULTIPLE DRAW FUNCTIONS IN AN IF STATEMENT? LOOK UP P5 VIDS
// ADD EXTRA CANVAS THAT GOES OVER FIRST AND HAS A PLAY AND SCORES 
    // BUTTON GOES AWAY WHEN YOU HIT PLAY OR SCORE
// MAKE WIN/LOSS LOGIC AND HAVE IT REDIRECT TO ENTER NEW SOCRE OR PLAY AGAIN

};

// const hitDetection = () => {

//     pews.forEach((pew) => {

//         pew.show();
//         pew.move();

//         aliensArray.forEach((array) => {
//             array.forEach((alien) => {
//                 if (pew.hits(alien)) {
//                     alien.destroy();
//                     pew.destroy();
//                 }
//             });
//         });


        

//         // for (let j = 0; j < aliens.length; j++) {
//             // if (pews[i].hits(aliens[j])) {
//             //     aliens[j].destroy();
//             //     pews[i].destroy();
//             // }
//         // }

//         // for (let j = 0; j < aliens2.length; j++) {
//         //     if (pews[i].hits(aliens2[j])) {
//         //         aliens2[j].destroy();
//         //         pews[i].destroy();
//         //     }
//         // }
//     });
// };

function preload() {

  shipImage = loadImage('../img/ship.png');
  alienImage = loadImage('../img/alien1.png');
  backgroundImage = loadImage('../img/space.png');
}

function setup() {
    createCanvas(1260, 625);
    ship = new Ship();

    setupAlienRow(aliens, 50);
    setupAlienRow(aliens2, 110);

}

function draw() {

    let edge = false;

    background(backgroundImage, 255);

    textSize(30);
    fill(255, 255, 255);
    text('Score: ' + score, width / 2.25, 30)

    ship.show();
    ship.move();

    makeAlienRow(aliens);
    makeAlienRow(aliens2);



    for (let i = 0; i < aliens.length; i++) {
        if (aliens[i].x >= width - 70 || aliens[i].x <= 0) {
            edge = true;
        }
    }

    for (let i = 0; i < aliens2.length; i++) {
        if (aliens2[i].x >= width - 70 || aliens2[i].x <= 0) {
            edge = true;
        }
    }


    if (edge === true) {
        // for (let i = 0; i < aliens.length; i++) {
        //     aliens[i].shiftDown();
        //     shift(aliensArray);
        // }
        // for (let i = 0; i < aliens2.length; i++) {
        //     aliens2[i].shiftDown();
        //     shift(aliensArray);
        // }
        shift(aliensArray)
    }

    

    // HIT DETECTION
    pews.forEach((pew) => {

        pew.show();
        pew.move();

        aliensArray.forEach((array) => {
            array.forEach((alien) => {
                if (pew.hits(alien)) {
                    alien.destroy();
                    pew.destroy();
                }
            });
        });
    });


    // PEW PEW HIT DETECTION
    for (let i = pews.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
        if (pews[i].demo) {
            pews.splice(i, 1);
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
        let pew = new Pew(ship.x + 61, height - 70);
        pews.push(pew);
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