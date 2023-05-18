class LevelSummary extends Phaser.Scene {
    constructor()
    {
        super('levelsummary');
    }

    init(data)
    {
        this.timeSummary = data.timeSummary;
        this.attempts = data.attempts;
        this.level = data.level;
    }

    create()
    {
        // Create the text
        // Level Complete!
        let levelComp = this.add.text(game.config.width/2, -500, 'LEVEL COMPLETE!', {font: `bold 100px Futura`, color: '#000'})
            .setOrigin(0.5);

        // Level: #
        let level = this.add.text(-500, 400, 'Level: ', {font: `50px Futura`, color: '#000'})
            .setOrigin(1, 0.5);
        let levelNum = this.add.text(2420, 400, `${this.level}`, {font: `50px Futura`, color: '#000'})
            .setOrigin(0, 0.5);

        // Attempts: #
        let attempts = this.add.text(-500, 550, 'Attempts: ', {font: `50px Futura`, color: '#000'})
            .setOrigin(1, 0.5);
        let attemptsNum = this.add.text(2420, 550, `${this.attempts}`, {font: `50px Futura`, color: '#000'})
            .setOrigin(0, 0.5);

        // Time: #
        let time = this.add.text(-500, 700, 'Time: ', {font: `50px Futura`, color: '#000'})
            .setOrigin(1, 0.5);
        
        const seconds = Math.floor(this.timeSummary / 1000);
        const milliseconds = this.timeSummary % 1000;
        const formattedTime = (seconds < 10 ? '0' : '') + seconds + '.' + (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds + " s";
        let timeNum = this.add.text(2420, 700, `${formattedTime}`, {font: `50px Futura`, color: '#000'})
            .setOrigin(0, 0.5);

        // Next Level & Main Menu
        let nextLevel = this.add.text((game.config.width/2) - 50, 1200, 'Next Level', { font: 'bold 50px Futura', color: '#000000' })
            .setOrigin(1, 0.5);
        nextLevel.setInteractive()
            .on('pointerover', () => {
                nextLevel.setColor('#006400');
                this.tweens.add({
                    targets: nextLevel,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                nextLevel.setColor('#000000');
                this.tweens.add({
                    targets: nextLevel,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start(`level${this.level + 1}`, {attempts: 1}));    
            });

        let mainMenu = this.add.text((game.config.width/2) + 50, 1200, 'Main Menu', {font: `bold 50px Futura`, color: '#000'})
            .setOrigin(0, 0.5);
            mainMenu.setInteractive()
            .on('pointerover', () => {
                mainMenu.setColor('#006400');
                this.tweens.add({
                    targets: mainMenu,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                mainMenu.setColor('#000000');
                this.tweens.add({
                    targets: mainMenu,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start('mainmenu'));
            });

        // Next for Level 3
        let next = this.add.text((game.config.width/2), 1200, 'Next', { font: 'bold 50px Futura', color: '#000000' })
            .setOrigin(0.5);
            next.setInteractive()
            .on('pointerover', () => {
                next.setColor('#006400');
                this.tweens.add({
                    targets: next,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                next.setColor('#000000');
                this.tweens.add({
                    targets: next,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start('end'));    
            });
        
        // Animation for Level Complete
        this.tweens.add({
            targets: levelComp,
            y: { from: -500, to: 200 },
            ease: 'Expo.Out',
            duration: 1000,
            delay: 500,
            onComplete: () => {
                // Animations For Level: #
                this.tweens.add({
                    targets: level,
                    x: { from: -500, to: (game.config.width/2) - 20 },
                    ease: 'Expo.Out',
                    duration: 1000
                });
                this.tweens.add({
                    targets: levelNum,
                    x: { from: 2420, to: (game.config.width/2) + 20 },
                    ease: 'Expo.Out',
                    duration: 1000
                });

                // Animations for Attempts: #
                this.tweens.add({
                    targets: attempts,
                    x: { from: -500, to: (game.config.width/2) - 20 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });
                this.tweens.add({
                    targets: attemptsNum,
                    x: { from: 2420, to: (game.config.width/2) + 20 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                // Animations for Time: #
                this.tweens.add({
                    targets: time,
                    x: { from: -500, to: (game.config.width/2) - 20 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 1000
                });
                this.tweens.add({
                    targets: timeNum,
                    x: { from: 2420, to: (game.config.width/2) + 20 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 1000
                });

                if(this.level != 3) {
                    // Animations for Next Level & Main Menu
                    this.tweens.add({
                        targets: nextLevel,
                        y: { from: 1200, to: 900 },
                        ease: 'Expo.Out',
                        duration: 1000,
                        delay: 1500
                    });
                    this.tweens.add({
                        targets: mainMenu,
                        y: { from: 1200, to: 900 },
                        ease: 'Expo.Out',
                        duration: 1000,
                        delay: 1500
                    });
                } else {
                    this.tweens.add({
                        targets: next,
                        y: { from: 1200, to: 900 },
                        ease: 'Expo.Out',
                        duration: 1000,
                        delay: 1500
                    });
                }
            }
        });
    }
}

class MainMenu extends Phaser.Scene {
    constructor()
    {
        super('mainmenu');
    }
    preload()
    {
        this.load.image('mousetunnel' , 'assets/MouseTunnel.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
    }

    create()
    {
        // Create the text
        // Level Complete!
        let title = this.add.text(game.config.width/2, -500, 'The Forbidden Cheese', {font: `bold 100px Futura`, color: '#FFD60B', stroke: '#000000', strokeThickness: 7})
            .setOrigin(0.5);

        // PLAY (RECC FOR FIRST TIME PLAYERS)
        let play = this.add.text(game.config.width/2, 1100, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        play.setInteractive()
            .on('pointerover', () => {
                play.setColor('#006400');
                this.tweens.add({
                    targets: play,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                play.setColor('#000000');
                this.tweens.add({
                    targets: play,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start(`level1`, {attempts: 1}));
            });

        // LEVEL 1
        let level1 = this.add.text(game.config.width/2, 1250, 'LEVEL 1', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        level1.setInteractive()
            .on('pointerover', () => {
                level1.setColor('#006400');
                this.tweens.add({
                    targets: level1,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                level1.setColor('#000000');
                this.tweens.add({
                    targets: level1,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start(`level1`, {attempts: 1}));
            });
        // LEVEL 2
        let level2 = this.add.text(game.config.width/2, 1400, 'LEVEL 2', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        level2.setInteractive()
            .on('pointerover', () => {
                level2.setColor('#006400');
                this.tweens.add({
                    targets: level2,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                level2.setColor('#000000');
                this.tweens.add({
                    targets: level2,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start(`level2`, {attempts: 1}));
            });

        // LEVEL 3
        let level3 = this.add.text(game.config.width/2, 1550, 'LEVEL 3', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        level3.setInteractive()
            .on('pointerover', () => {
                level3.setColor('#006400');
                this.tweens.add({
                    targets: level3,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                level3.setColor('#000000');
                this.tweens.add({
                    targets: level3,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start(`level3`, {attempts: 1}));
            });

        // Create the sprites
        let mousetunnel = this.add.sprite(-700, 1000, 'mousetunnel')
            .setOrigin(0, 1).setScale(2.6);
        let mouse = this.add.sprite(-700, 1000, 'mouse')
            .setOrigin(0, 1);
        let cheese = this.add.sprite(2620, 1000, 'cheese')
            .setOrigin(1, 1).setScale(1.4);
        
        // Animation for title
        this.tweens.add({
            targets: title,
            y: { from: -500, to: 150 },
            ease: 'Linear',
            duration: 2000,

            onComplete: () => {
                // Animations for mouse and tunnel
                this.tweens.add({
                    targets: [mouse, mousetunnel],
                    x: { from: -700, to: 200 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                // Animation for cheese
                this.tweens.add({
                    targets: cheese,
                    x: { from: 2620, to: (game.config.width - 200) },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                // Animations for Text
                this.tweens.add({
                    targets: play,
                    y: { from: 1100, to: 400 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                this.tweens.add({
                    targets: level1,
                    y: { from: 1250, to: 550 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 600
                });

                this.tweens.add({
                    targets: level2,
                    y: { from: 1400, to: 700 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 700
                });

                this.tweens.add({
                    targets: level3,
                    y: { from: 1550, to: 850 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 800
                });
            }
        });
    }
}

class End extends Phaser.Scene {
    constructor()
    {
        super('end');
    }

    preload()
    {
        this.load.image('mousetunnel' , 'assets/MouseTunnel.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
    }

    create()
    {
        // Create the text
        let thanks = this.add.text(game.config.width/2, -500, 'THANKS FOR PLAYING!', {font: `bold 100px Futura`, color: '#FFD60B', stroke: '#000000', strokeThickness: 7})
            .setOrigin(0.5);
        
        // Create the sprites
        let mousetunnel = this.add.sprite(-700, 1000, 'mousetunnel')
            .setOrigin(0, 1).setScale(2.6);
        let mouse = this.add.sprite(-700, 1000, 'mouse')
            .setOrigin(0, 1);
        let cheese = this.add.sprite(2620, 1000, 'cheese')
            .setOrigin(1, 1).setScale(1.4);
        // PLAY (RECC FOR FIRST TIME PLAYERS)
        let mainmenu = this.add.text(game.config.width/2, 1100, 'Main Menu', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        mainmenu.setInteractive()
            .on('pointerover', () => {
                mainmenu.setColor('#006400');
                this.tweens.add({
                    targets: mainmenu,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                mainmenu.setColor('#000000');
                this.tweens.add({
                    targets: mainmenu,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(750, 135, 206, 235);
                this.time.delayedCall(740, () => this.scene.start('mainmenu'));
            });

        this.tweens.add({
            targets: thanks,
            y: { from: -500, to: 150 },
            ease: 'Expo.out',
            duration: 1500,
            onComplete: () => {
                // Animations for mouse and tunnel
                this.tweens.add({
                    targets: [mouse, mousetunnel],
                    x: { from: -700, to: 200 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                // Animation for cheese
                this.tweens.add({
                    targets: cheese,
                    x: { from: 2620, to: (game.config.width - 200) },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });

                // Animations for Text
                this.tweens.add({
                    targets: mainmenu,
                    y: { from: 1100, to: game.config.height/2 },
                    ease: 'Expo.Out',
                    duration: 1000,
                    delay: 500
                });
            }
        });
    }
}