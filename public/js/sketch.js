console.log('sketch is running');

let score = 0;  

let pews = [];
let aliens = [];
let aliens2 = [];  
let aliensArray = [];


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

// function preload() {

//     logoImage = loadImage('../img/logo.png');
//     shipImage = loadImage('../img/ship.png');
//     alienImage = loadImage('../img/alien1.png');
//     backgroundImage = loadImage('../img/space.png');
// }


let menu = function(menu) {

    menu.x = 0;
    menu.y = 0;

    menu.preload = function() {
        logoImage = menu.loadImage('../img/logo.png');
        backgroundImage = menu.loadImage('../img/space.png');

    }

    menu.setup = function() {
        menu.createCanvas(1263, 625);
        link = menu.createA('/scores', 'Scores');
        button = menu.createButton('Play');
    }

    menu.draw = function() {
        menu.background(backgroundImage, 255);
    
        link.addClass('button');
        link.id('spaceScoreButton');
        link.position(menu.width / 2.255, menu.height / 1.5);

        button.id('spacePlayButton');
        button.position(menu.width/ 2.175, menu.height / 1.75);
        button.mousePressed(function() {
        });
        menu.image(logoImage, menu.width / 3.35, 50, 500, 200);

    }

}


let game = function(game) {

    let Ship = function() {

        this.x = game.width / 2.25;
        this.y = game.height - 60;
        this.xdir = 0;
    
        this.show = function() {
    
            game.image(shipImage, this.x, this.y, 125, 75);
    
        }
    
        this.setDir= function(dir) {
            this.xdir = dir;
        }
    
        this.move = function(dir) {
            this.x += this.xdir * 5; // Moves 1 pixel 5 times
        }
    }

    let Pew = function(x, y) {
        this.x = x;
        this.y = y;
        this.rad = 8;
        this.demo = false;
    
        this.show = function() {
            game.fill('#22CC02');
            game.rect(this.x, this.y, this.rad / 2, this.rad * 2); //POS X, POS Y, WIDTH, LENGTH
        }
    
        this.destroy = function() {
            this.demo = true;
    
        }
    
        this.hits = function(alien) {
            let distance = game.dist(this.x, this.y, alien.x + 40, alien.y);
            if (distance < alien.rad + this.rad) {
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

    let Alien = function(x, y) {

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
            game.image(alienImage, this.x, this.y, 125, 75);
            
            // rect(this.x, this.y, this.rad, this.rad); //POS X, POS Y, WIDTH, LENGTH
        }
    }

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
    };

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

    x = 0;
    y = 0;


    game.preload = function() {

        shipImage = game.loadImage('../img/ship.png');
        alienImage = game.loadImage('../img/alien1.png');
        backgroundImage = game.loadImage('../img/space.png');

    }

    game.setup = function() {
        
        game.createCanvas(1263, 625);
        ship = new Ship();

        setupAlienRow(aliens, 50);
        setupAlienRow(aliens2, 110);
  
    }

    game.draw = function() {

        game.background(backgroundImage, 255);

        let edge = false;

        game.textSize(30);
        game.fill(255, 255, 255);
        game.text('Score: ' + score, game.width / 2.25, 30)

 
        makeAlienRow(aliens);
        makeAlienRow(aliens2);  
        ship.show();
        ship.move();


        for (let i = 0; i < aliens.length; i++) {
            if (aliens[i].x >= game.width - 70 || aliens[i].x <= 0) {
                edge = true;
            }
    }

        for (let i = 0; i < aliens2.length; i++) {
            if (aliens2[i].x >= game.width - 70 || aliens2[i].x <= 0) {
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
            shift(aliensArray);
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

//         // function mousePressed() {
//         //     if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//         //     let fs = fullscreen();
//         //     fullscreen(!fs);
//         //     }
//         // }
    }

    game.keyPressed = function() {

        if (game.keyCode === 32 || game.keyCode === 38 || game.keyCode === 87) { // SPACEBAR / UP / W
            let pew = new Pew(ship.x + 61, game.height - 70);
            pews.push(pew);
        }

        if (game.keyCode === 39 || game.keyCode === 68) {  // RIGHT / D
            ship.setDir(1);
        } 
        if (game.keyCode === 37 || game.keyCode === 65) {   // LEFT / A
            ship.setDir(-1);
        }
    }

    game.keyReleased = function() {
        if (game.key != ' ' && game.keyCode != 38 && game.keyCode != 87) { // SPACEBAR / UP / W
        ship.setDir(0);
        }
    }
        

 }



let play = true;


if (play === false) {
    let goMenu = new p5(menu);
}

else if (play === true) {
    let goGame = new p5(game);
}



// function setup() {

//     createCanvas(1263, 625);

//     if (play === false) {
//         link = createA('/scores', 'Scores');
//         button = createButton('Play');
//     }

//     else if (play === true) {
        // createCanvas(1263, 625);
        // ship = new Ship();

        // setupAlienRow(aliens, 50);
        // setupAlienRow(aliens2, 110);
//     }

// }

// function draw() {

//     background(backgroundImage, 255);

//     if (play === false) {

//         link.addClass('button');
//         link.id('spaceScoreButton');
//         link.position(width / 2.255, height / 1.5);

//         button.id('spacePlayButton');
//         button.position(width/ 2.175, height / 1.75);
//         button.mousePressed(function() {
//             redraw();
//         });
//         image(logoImage, width / 3.35, 50, 500, 200);
//     }

//     // else if (play === true) {

//         // let edge = false;

//         // textSize(30);
//         // fill(255, 255, 255);
//         // text('Score: ' + score, width / 2.25, 30)

//         // ship.show();
//         // ship.move();

//         // makeAlienRow(aliens);
//         // makeAlienRow(aliens2);    

//         // for (let i = 0; i < aliens.length; i++) {
//         //     if (aliens[i].x >= width - 70 || aliens[i].x <= 0) {
//         //         edge = true;
//         //     }
//         // }

//         // for (let i = 0; i < aliens2.length; i++) {
//         //     if (aliens2[i].x >= width - 70 || aliens2[i].x <= 0) {
//         //         edge = true;
//         //     }
//         // }

//         // if (edge === true) {
//         //     // for (let i = 0; i < aliens.length; i++) {
//         //     //     aliens[i].shiftDown();
//         //     //     shift(aliensArray);
//         //     // }
//         //     // for (let i = 0; i < aliens2.length; i++) {
//         //     //     aliens2[i].shiftDown();
//         //     //     shift(aliensArray);
//         //     // }
//         //     shift(aliensArray)
//         // }

//         // // HIT DETECTION
//         // pews.forEach((pew) => {

//         //     pew.show();
//         //     pew.move();

//         //     aliensArray.forEach((array) => {
//         //         array.forEach((alien) => {
//         //             if (pew.hits(alien)) {
//         //                 alien.destroy();
//         //                 pew.destroy();
//         //             }
//         //         });
//         //     });
//         // });

//         // // PEW PEW HIT DETECTION
//         // for (let i = pews.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
//         //     if (pews[i].demo) {
//         //         pews.splice(i, 1);
//         //     }
//         // }

//         // function mousePressed() {
//         //     if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//         //     let fs = fullscreen();
//         //     fullscreen(!fs);
//         //     }
//         // }

//         // function keyPressed() {

//         //     if (keyCode === 32 || keyCode === 38 || keyCode === 87) { // SPACEBAR / UP / W
//         //         let pew = new Pew(ship.x + 61, height - 70);
//         //         pews.push(pew);
//         //     }

//         //     if (keyCode === 39 || keyCode === 68) {  // RIGHT / D
//         //         ship.setDir(1);
//         //     } 
//         //     if (keyCode === 37 || keyCode === 65) {   // LEFT / A
//         //         ship.setDir(-1);
//         //     }
//         // }

//         // function keyReleased() {
//         //     if (key != ' ' && keyCode != 38 && keyCode != 87) { // SPACEBAR / UP / W
//         //     ship.setDir(0);
//         //     }
//         // }
//     // }
// }
