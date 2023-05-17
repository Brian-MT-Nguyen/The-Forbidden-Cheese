class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    preload() {
        this.load.image('mousetunnel' , 'assets/MouseTunnel.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
        this.load.image('dirt'  , 'assets/Dirt.png');
        this.load.image('grass' , 'assets/Grass.png');
        this.load.image('sand' , 'assets/TrickSand.png');
    }

    create() {
        // variables and settings
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 1000;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 2000;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1600;
        this.physics.world.gravity.y = 5000;

        // Debugging: draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // print Level name and tip
        this.add.text(game.config.width/2, 30, 'Level 1: A Regular Starter Level...?', { font: '32px Impact', fill: '#000000' }).setOrigin(0.5);
        this.add.text(game.config.width/2, 70, 'Trick Platform, Watch your Step or you\'ll regret!', { font: '32px Futura', fill: '#000000' }).setOrigin(0.5);

        // make ground tiles group
        this.ground = this.add.tileSprite(0, 1080-(tileSize*SCALE), tileSize * 5, tileSize, 'grass').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        // set up dirt platform
        this.platform = this.add.tileSprite(1000, 1080-tileSize, tileSize * 7, tileSize, 'dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.platform);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;
        this.platform.body.gravity.y = -5000;
        console.log(this.platform.body.gravity.y)

        // set up sand platform
        this.trickplatform = this.add.tileSprite((game.config.width/4) + 42, (game.config.height - (tileSize*SCALE)), tileSize * 14, tileSize, 'sand').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.trickplatform);
        this.trickplatform.body.immovable = true;
        this.trickplatform.body.allowGravity = false;
        
        // make mouse tunnel
        this.mousetunnel = this.physics.add.sprite(100, 892, 'mousetunnel').setOrigin(0.5,0.5).setScale(0.8);
        this.mousetunnel.body.immovable = true;
        this.mousetunnel.body.allowGravity = false;

        // set up mouse
        this.mouse = this.physics.add.sprite(100, 500, 'mouse').setOrigin(0.5,0.5).setScale(0.2);
        this.mouse.setCollideWorldBounds(true);
        this.mouse.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.mouse.hasCheese = false;

        // set up cheese
        this.cheese = this.physics.add.sprite(1650, 835, 'cheese').setOrigin(0.5,0.5).setScale(0.2);
        this.cheese.body.allowGravity = false;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics colliders/overlaps
        this.physics.add.collider(this.mouse, this.ground);
        this.physics.add.collider(this.mouse, this.platform);
        this.physics.add.collider(this.mouse, this.trickplatform, this.trickPlatform, null, this);
        this.physics.add.overlap(this.mouse, this.cheese, this.collectCheese, null, this);
        this.physics.add.overlap(this.mouse, this.mousetunnel, this.advanceScene, null, this);
    }

    update() {
        if(this.mouse.body.y >= 975) {
            this.mouse.setCollideWorldBounds(false);
            this.time.delayedCall(500, () => {
                this.scene.start('level1');
            });
        } else {
            this.mouse.setCollideWorldBounds(true);
        }
        // check keyboard input
        if(cursors.left.isDown) {
            this.mouse.body.setAccelerationX(-this.ACCELERATION);
            this.mouse.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.mouse.body.setAccelerationX(this.ACCELERATION);
            this.mouse.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.mouse.body.setAccelerationX(0);
            this.mouse.body.setDragX(this.DRAG);
        }

        // Jump logic
	    if(Phaser.Input.Keyboard.JustDown(cursors.up) && this.mouse.body.touching.down) {
	        this.mouse.setVelocityY(this.JUMP_VELOCITY);
	    }
    }

    collectCheese (mouse, cheese)
    {
        mouse.hasCheese = true;
        cheese.destroy();
    }

    trickPlatform(mouse, platform)
    {
        platform.body.allowGravity = true;
    }

    advanceScene(mouse) {
        if(mouse.hasCheese == true) {
            this.scene.start('level2');
        }
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    preload() {
        this.load.image('mousetunnel' , 'assets/MouseTunnel.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
        this.load.image('dirt'  , 'assets/Dirt.png');
        this.load.image('grass' , 'assets/Grass.png');
        this.load.image('lava' , 'assets/LavaRock.png');
    }

    create() {
        // variables and settings
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 1000;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 2000;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1600;
        this.physics.world.gravity.y = 5000;

        // Debugging: draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // print Level name and tip
        this.add.text(game.config.width/2, 30, 'Level 2: The Platform Is Lava!', { font: '32px Impact', fill: '#000000' }).setOrigin(0.5);
        this.add.text(game.config.width/2, 70, 'You must be at max speed while touching the platform', { font: '32px Futura', fill: '#000000' }).setOrigin(0.5);

        // make ground tiles group
        this.ground = this.add.tileSprite(0, 1080-(tileSize*SCALE), tileSize * 7, tileSize, 'grass').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        // set up platform
        this.platform = this.add.tileSprite(1400, 900, tileSize * 5, tileSize, 'dirt').setScale(SCALE, SCALE/2);
        this.physics.add.existing(this.platform);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;
        this.platform.body.moves = false;

        // set up platform2
        this.platform2 = this.add.tileSprite(900, 670, tileSize * 3, tileSize, 'dirt').setScale(SCALE, SCALE/2);
        this.physics.add.existing(this.platform2);
        this.platform2.body.immovable = true;
        this.platform2.body.allowGravity = false;
        this.platform2.body.moves = false;

        // set up platform3
        this.platform3 = this.add.tileSprite(1400, 500, tileSize * 3, tileSize, 'dirt').setScale(SCALE, SCALE/2);
        this.physics.add.existing(this.platform3);
        this.platform3.body.immovable = true;
        this.platform3.body.allowGravity = false;
        this.platform3.body.moves = false;

        // set up lava platform
        this.lavaplatform = this.add.tileSprite(700, 350, tileSize * 7, tileSize, 'lava').setScale(SCALE, SCALE/2);
        this.physics.add.existing(this.lavaplatform);
        this.lavaplatform.body.immovable = true;
        this.lavaplatform.body.allowGravity = false;
        
        // make mouse tunnel
        this.mousetunnel = this.physics.add.sprite(100, 892, 'mousetunnel').setOrigin(0.5,0.5).setScale(0.8);
        this.mousetunnel.body.immovable = true;
        this.mousetunnel.body.allowGravity = false;

        // set up mouse
        this.mouse = this.physics.add.sprite(100, 500, 'mouse').setOrigin(0.5,0.5).setScale(0.2);
        this.mouse.setCollideWorldBounds(true);
        this.mouse.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        // set up cheese
        this.cheese = this.physics.add.sprite(400, 290, 'cheese').setOrigin(0.5,0.5).setScale(0.2);
        this.cheese.body.allowGravity = false;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.mouse, this.ground);
        this.physics.add.collider(this.mouse, this.platform);
        this.physics.add.collider(this.mouse, this.platform2);
        this.physics.add.collider(this.mouse, this.platform3);
        this.physics.add.collider(this.mouse, this.lavaplatform, this.lavaPlatform, null, this);
        this.physics.add.overlap(this.mouse, this.cheese, this.collectCheese, null, this);
        this.physics.add.overlap(this.mouse, this.mousetunnel, this.advanceScene, null, this);
    }

    update() {
        // check for out of bounds
        if(this.mouse.body.y >= 975) {
            this.mouse.setCollideWorldBounds(false);
            this.time.delayedCall(500, () => {
                this.scene.start('level2');
            });
        } else {
            this.mouse.setCollideWorldBounds(true);
        }
        // check keyboard input
        if(cursors.left.isDown) {
            this.mouse.body.setAccelerationX(-this.ACCELERATION);
            this.mouse.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.mouse.body.setAccelerationX(this.ACCELERATION);
            this.mouse.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.mouse.body.setAccelerationX(0);
            this.mouse.body.setDragX(this.DRAG);
        }

        // Jump logic
	    if(Phaser.Input.Keyboard.JustDown(cursors.up) && this.mouse.body.touching.down) {
	        this.mouse.setVelocityY(this.JUMP_VELOCITY);
	    }
    }

    collectCheese (mouse, cheese)
    {
        mouse.hasCheese = true;
        cheese.destroy();
    }

    lavaPlatform(mouse, platform)
    {
        if(mouse.body.speed < 1000) {
            console.log(mouse.body.velocity.x)
            this.scene.start('level2');
        }
    }
    advanceScene(mouse) {
        if(mouse.hasCheese == true) {
            this.scene.start('level3');
        }
    }
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }

    preload() {
        this.load.image('mousetunnel' , 'assets/MouseTunnel.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
        this.load.image('dirt'  , 'assets/Dirt.png');
        this.load.image('grass' , 'assets/Grass.png');
        this.load.image('lava' , 'assets/LavaRock.png');
        this.load.image('sand' , 'assets/TrickSand.png');
    }

    create() {
        // variables and settings
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 1000;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 2000;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1600;
        this.physics.world.gravity.y = 5000;

        // Debugging: draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // print Level name and tip
        this.add.text(game.config.width/2, 30, 'Level 3: A Real Man\'s Level', { font: '32px Impact', fill: '#000000' }).setOrigin(0.5);
        this.add.text(game.config.width/2, 70, 'You know all the block types, good luck!', { font: '32px Futura', fill: '#000000' }).setOrigin(0.5);

        // make ground tiles group
        this.ground = this.add.tileSprite(0, 1080-(tileSize*SCALE), tileSize * 19, tileSize, 'grass').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        // set up lava platform
        this.lavaplatform = this.add.tileSprite(1300, 770, tileSize * 7, tileSize, 'dirt').setScale(SCALE, SCALE/2);
        this.physics.add.existing(this.lavaplatform);
        this.lavaplatform.body.immovable = true;
        this.lavaplatform.body.allowGravity = false;
        
        // make mouse tunnel
        this.mousetunnel = this.physics.add.sprite(100, 892, 'mousetunnel').setOrigin(0.5,0.5).setScale(0.8);
        this.mousetunnel.body.immovable = true;
        this.mousetunnel.body.allowGravity = false;

        // set up mouse
        this.mouse = this.physics.add.sprite(100, 500, 'mouse').setOrigin(0.5,0.5).setScale(0.2);
        this.mouse.setCollideWorldBounds(true);
        this.mouse.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        // set up cheese
        this.cheese = this.physics.add.sprite(1550, 710, 'cheese').setOrigin(0.5,0.5).setScale(0.2);
        this.cheese.body.allowGravity = false;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.mouse, this.ground);
        this.physics.add.collider(this.mouse, this.platform);
        this.physics.add.collider(this.mouse, this.lavaplatform, this.lavaPlatform, null, this);
        this.physics.add.overlap(this.mouse, this.cheese, this.collectCheese, null, this);
        this.physics.add.overlap(this.mouse, this.mousetunnel, this.advanceScene, null, this);
    }

    update() {
        // check for out of bounds
        if(this.mouse.body.y >= 975) {
            this.mouse.setCollideWorldBounds(false);
            this.time.delayedCall(500, () => {
                this.scene.start('level2');
            });
        } else {
            this.mouse.setCollideWorldBounds(true);
        }
        // check keyboard input
        if(cursors.left.isDown) {
            this.mouse.body.setAccelerationX(-this.ACCELERATION);
            this.mouse.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.mouse.body.setAccelerationX(this.ACCELERATION);
            this.mouse.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.mouse.body.setAccelerationX(0);
            this.mouse.body.setDragX(this.DRAG);
        }

        // Jump logic
	    if(Phaser.Input.Keyboard.JustDown(cursors.up) && this.mouse.body.touching.down) {
	        this.mouse.setVelocityY(this.JUMP_VELOCITY);
	    }
    }

    collectCheese (mouse, cheese)
    {
        mouse.hasCheese = true;
        cheese.destroy();
    }

    lavaPlatform(mouse, platform)
    {
        if(mouse.body.speed < 1000) {
            console.log(mouse.body.velocity.x)
            this.scene.start('level2');
        }
    }
    advanceScene(mouse) {
        if(mouse.hasCheese == true) {
            this.scene.start('level2');
        }
    }
}