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
                this.scene.start(`level${this.level + 1}`)
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
                this.scene.start('mainmenu')
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
            }
        });
    }
}

class End extends Phaser.Scene {
    constructor()
    {
        super('end');
    }

    init(data)
    {
        this.timeSummary = data.timeSummary;
        this.tries = data.tries;
        this.level = data.level;
    }

    create()
    {
        let levelComp = this.add.text(game.config.width/2, 100, 'LEVEL COMPLETE!', {font: `bold 75px Futura`, color: '#000'})
            .setOrigin(0.5);
        
        // this.tweens.add({
        //     targets: levelComp,
        //     y: { from: 1, to: 0 },
        //     duration: 2000,
        //     onComplete: () => {
                
        //     }
        // });
    }
}