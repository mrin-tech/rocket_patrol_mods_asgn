class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        // load audio
        // this.load.audio('sfx_select', './assets/blip_select12.wav');
        // this.load.audio('sfx_explosion', './assets/explosion38.wav');
        // this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        this.load.audio('sfx_select', './ghost_assets/ghost_blip.wav');
        this.load.audio('sfx_explosion', './ghost_assets/whoosh.wav');
        this.load.audio('sfx_salt', './ghost_assets/salt_sound.wav');
        // Music by NaturesEye from Pixabay (copyright free)
        this.load.audio('sfx_music', './ghost_assets/ghostly_music.mp3')
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#64747c',
            color: '#c8cfd4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GHOST HUNTER 👻', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#977073';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_music');
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_music');
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
      
  }