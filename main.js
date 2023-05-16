// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 100;

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    backgroundColor: 0x87CEEB,
    scene: [Demo],
    title: "The Forbidden Cheese",
});