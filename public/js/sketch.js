console.log('sketch is running');

let score = 0;  

let pews = [];
let aliens = [];
let aliens2 = [];  
let aliensArray = [];

let menu = function(menu) {

    const playGame = () => {
        menu.remove();
        new p5(game);

    };

    menu.preload = function() {
        logoImage = menu.loadImage('../img/logo.png');
        backgroundImage = menu.loadImage('../img/space.png');

    }

    menu.setup = function() {
        menu.createCanvas(1263, 620);
        link = menu.createA('/scores', 'Scores');
        button = menu.createButton('Play');
        button.mousePressed(playGame);
    }

    menu.draw = function() {
        menu.background(backgroundImage, 255);
    
        link.addClass('button');
        link.id('spaceScoreButton');
        link.position(menu.width / 2.255, menu.height / 1.5);

        button.id('spacePlayButton');
        button.position(menu.width/ 2.175, menu.height / 1.75);
        menu.image(logoImage, menu.width / 3.35, 50, 500, 200);

    }

}


let game = function(game) {

    let Ship = function() {

        this.x = game.width / 2.25;
        this.y = game.height - 60;
        this.rad = 25;
        this.xdir = 0;
    
        this.show = function() {
    
            game.image(shipImage, this.x, this.y, 125, 75);
    
        }
    
        this.setDir= function(dir) {
            this.xdir = dir;
        }
    
        this.move = function() {
            this.x += this.xdir * 5; // Moves 1 pixel 5 times
        }

        this.hits = function(alien) {
            let distance = game.dist(this.x, this.y, alien.x, alien.y);
            if (distance < alien.rad + this.rad) {
                return true;
            }
            else {
                return false;
            }
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
            this.x = this.x + this.xdir * 3;
        }
    
        this.show = function() {
            // noStroke();
            // fill(0, 0, 255);
            game.image(alienImage, this.x, this.y, 60, 35);
            
            // rect(this.x, this.y, this.rad, this.rad); //POS X, POS Y, WIDTH, LENGTH
        }

    }

    const setupAlienRow = (alienRowName, y) => {

        for (let i = 0; i < 12; i++) {
            alienRowName[i] = new Alien(i * 90, y);
        }
    
        aliensArray.push(alienRowName);
    };
    
    const makeAlienRow = (alienRowName) => {
        
        alienRowName.forEach((alien) => {
    
            alien.show();
            alien.move();
    
        });
    
        alienRowName.forEach((alien) => {
            if (alien.demo) {
                score = score + 100;
                alienRowName.splice(alienRowName.indexOf(alien), 1);
            }
        })
    };

    const shift = (aliensArray) => {

        // alienRowName.forEach((alien) => {
        //     alien.shiftDown();
        // });
    
        aliensArray.forEach((row) => {
            row.forEach((alien) => {
                alien.shiftDown();
            });
        });
    
    
    };

    const enterScore = () => {
        game.remove();
        new p5(enter);
    };

    game.preload = function() {

        shipImage = game.loadImage('../img/ship.png');
        alienImage = game.loadImage('../img/alien1.png');
        backgroundImage = game.loadImage('../img/space.png');

    }

    game.setup = function() {
        
        game.createCanvas(1263, 620);
        ship = new Ship();

        setupAlienRow(aliens, 50);
        setupAlienRow(aliens2, 110);
  
    }

    game.draw = function() {

        game.background(backgroundImage, 255);

        game.textSize(30);
        game.fill(255, 255, 255);
        game.text('Score: ' + score, game.width / 2.25, 30)

 
        makeAlienRow(aliens);
        makeAlienRow(aliens2);  
        ship.show();
        ship.move();

        let edge = false;

        aliensArray.forEach((row) => {
            row.forEach((alien) => {
                if (alien.x >= game.width - 70 || alien.x <= 0) {
                    edge = true;
                }
            });
        });

        if (edge === true) {
            shift(aliensArray);
        }

        // HIT DETECTION
        pews.forEach((pew) => {

            pew.show();
            pew.move();

            // SETS DEMO TO TRUE
            aliensArray.forEach((row) => {
                row.forEach((alien) => {
                    if (pew.hits(alien)) {
                        alien.destroy();
                        pew.destroy();
                    }
                });
            });
        });

        // REMOVES PEW PEW FROM PEW PEW ARRAY
        for (let i = pews.length - 1; i >= 0; i--) {   //Start looping through Array backwards so that it doesn't skipp backwards
            if (pews[i].demo) {
                pews.splice(i, 1);
            }
        }

        // REMOVES ROW FROM ALIENSARRAY
        aliensArray.forEach((row) => {
            if (row.length === 0) {
                aliensArray.splice(aliensArray.indexOf(row), 1);    
            }
        });

        // GAME WIN LOGIC
        if (aliensArray.length === 0) {
            enterScore();
        }

        // GAME LOSS LOGIC
        aliensArray.forEach((row) => {
            row.forEach((alien) => {
                if (alien.y >= game.height - 20) {
                    enterScore();
                }
                if (ship.hits(alien)) {
                    enterScore();
                }
            });
        });

    }

//         // function mousePressed() {
//         //     if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//         //     let fs = fullscreen();
//         //     fullscreen(!fs);
//         //     }
//         // }

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

let enterScore = function(score) {

 }
 new p5(menu);


// ADD: BUTTON TO SWITCH BETWEEN SCREENS
// ADD: LOGIC TO LOSE
// ADD: SUBMIT NEW WITH SCORE ATTACHED
// ADD: CSS


// EXTRAS

// ADD: CUSTOM COLOR FOR PEWS OR SHIPS
// ADD: MUSIC