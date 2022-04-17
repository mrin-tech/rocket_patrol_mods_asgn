let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let highScore=0;


// Points Explaination:

// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60):
// I created a ghost theme where the player has to shoot salt at the ghosts who are trying to escape the graveyard.
// I created all the artwork and the music was copyright free.

// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)

// Display the time remaining (in seconds) on the screen (10):
// Referenced code from https://phaser.discourse.group/t/countdown-timer/2471/4 to create timer. The timer is in Play.js

// Add your own (copyright-free) background music to the Play scene (5):
// The background music I added is copyright free (credit to the musician: Music by NaturesEye from Pixabay)

// Track a high score that persists across scenes and display it in the UI (5)