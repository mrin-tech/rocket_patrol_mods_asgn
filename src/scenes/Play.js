class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        // this.load.image('rocket', './assets/rocket.png');
        this.load.image('salt', './ghost_assets/salt2.png');
        this.load.image('ghost', './ghost_assets/ghosty.png');
        this.load.image('starfield', './ghost_assets/graveyard.png');
        this.load.image('ghost2img', './ghost_assets/hoodie_ghost.png');
        // load spritesheet
        this.load.spritesheet('explosion', './ghost_assets/ghost_vanish.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x64747c).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize-25, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize+25, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize-25, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize+25, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'salt').setOrigin(0.5, 0);

          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'ghost', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'ghost', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'ghost', 0, 10).setOrigin(0,0);

        // add extra ghost 
        this.ghost2 = new Spaceship(this, game.config.width + borderUISize*10, borderUISize*4, 'ghost2img', 0, 50).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#cdbbbc',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        let txtConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            backgroundColor: '#cdbbbc',
            color: '#843605',
            align: 'center',
            padding: {
            top: 2,
            bottom: 2,
            },
            // fixedWidth: 100
        }

        let timeConfig =
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#cdbbbc',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        };

        // displays player's current score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 + 10, this.p1Score, scoreConfig);
        this.currentScore = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 - 10, 'Score:', txtConfig);

        // display high score
        this.scoreMiddle = this.add.text(borderUISize + borderPadding + 128, borderUISize + borderPadding*2 + 10, this.highScore, scoreConfig);
        this.highScoreTxt = this.add.text(borderUISize + borderPadding + 128, borderUISize + borderPadding*2 - 10, 'HighScore:', txtConfig);

        // display timer
        // code refrences https://phaser.discourse.group/t/countdown-timer/2471/4 to create timer
        // this sets the total game time 
        this.gameTotalTime = game.settings.gameTimer;
        // add "Timer" text
        this.timeTxt = this.add.text(borderUISize + borderPadding + 448, borderUISize + borderPadding*2 - 10, 'Timer:', txtConfig);
        // display the actual timer
        this.displayTime = this.add.text(borderUISize + borderPadding + 448, borderUISize + borderPadding*2 + 10, this.timeFormat(this.gameTotalTime), timeConfig);
        // decrement from the timer
        this.timedEvent = this.time.addEvent
        (
            {delay: 1000,
            callback: () => {this.gameTotalTime -= 1000; this.displayTime.text = this.timeFormat(this.gameTotalTime);}, scope: this, loop: true
            }
        );


        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            if (this.p1Score > highScore) highScore = this.p1Score;
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'HighScore: ' + highScore, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ghost2.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);  
            // this.addTime(this.ship03); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            // this.addTime(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            // this.addTime(this.ship01);
        }

        // ghost 2 collision
        if (this.checkCollision(this.p1Rocket, this.ghost2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ghost2);
            // this.addTime(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height  &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    // adds time for every correct collision
    addTime(ship) {
        if (ship == this.ship01) this.gameTotalTime += 2000;  
        if (ship == this.ship02) this.gameTotalTime += 4000; 
        if (ship == this.ship03) this.gameTotalTime += 6000; 

    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;   
        this.scoreMiddle.text = this.p1Score;
        if (this.p1Score > highScore) this.highScoreTxt.text = 'New High Score!';
        this.sound.play('sfx_explosion');  
        // this.gameTotalTime += 5000;
        
      }
    
    // format the time with the given parameter in miliseconds
    // time is formatted as min:seconds
    timeFormat(ms) {
        let sec = ms/1000;
        let seconds = sec%60;
        let min = Math.floor(sec/60);
        seconds = seconds.toString().padStart(2, "0");
        if (seconds < 0) timedEvent.remove(true);
        return `${min}:${seconds}`;
     }

  }
