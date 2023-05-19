// global variables
let cursors;
const SCALE = 0.5;
const tileSize = 209;

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
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    backgroundColor: 0x87CEEB,
    scene: [BeginIntro, StudioIntro, MainMenu, Level1, Level2, Level3, LevelSummary, End],
    title: "The Forbidden Cheese",
});