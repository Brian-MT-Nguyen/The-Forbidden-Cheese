class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    preload() {
        this.load.image('cloud' , 'assets/Cloud.png');
        this.load.image('mouse' , 'assets/Mouse.png');
        this.load.image('cheese', 'assets/Cheese.png');
        this.load.image('dirt'  , 'assets/Dirt.png');
        this.load.image('grass' , 'assets/Grass.png');
    }

    create() {
        // variables and settings
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 1000;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 1200;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 2; // change for double/triple/etc. jumps 🤾‍♀️
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

        // this.cloud01 = this.physics.add.sprite(600, 200, 'cloud').setOrigin(0.5,0.5).setScale(0.1);
        // this.cloud01.body.setAllowGravity(false).setVelocityX(25);
        // this.cloud02 = this.physics.add.sprite(200, 300, 'cloud').setOrigin(0.5,0.5).setScale(0.1);
        // this.cloud02.body.setAllowGravity(false).setVelocityX(45);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += (tileSize*SCALE)) {
            let groundTile = this.physics.add.sprite(i, game.config.height - (tileSize*SCALE), 'grass').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // for(let i = tileSize*2; i < game.config.width-tileSize*13; i += tileSize) {
        //     let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*7, 'dirt').setScale(SCALE).setOrigin(0);
        //     groundTile.body.immovable = true;
        //     groundTile.body.allowGravity = false;
        //     this.ground.add(groundTile);
        // }

        this.platform = this.add.tileSprite(1300, 600, tileSize * 7, tileSize, 'dirt').setScale(SCALE);
        this.physics.add.existing(this.platform);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;
        console.log(this.platform);
        

        // set up mouse
        this.mouse = this.physics.add.sprite(100, 500, 'mouse').setOrigin(0.5,0.5).setScale(0.2);
        this.mouse.setCollideWorldBounds(true);
        this.mouse.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        // set up cheese
        this.cheese = this.physics.add.sprite(1550, 510, 'cheese').setOrigin(0.5,0.5).setScale(0.2);
        this.cheese.body.allowGravity = false;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.mouse, this.ground);
        this.physics.add.collider(this.mouse, this.platform, this.lavaPlatform, null, this);
        this.physics.add.overlap(this.mouse, this.cheese, this.collectCheese, null, this);
    }

    update() {
        // check keyboard input
        if(cursors.left.isDown) {
            this.mouse.body.setAccelerationX(-this.ACCELERATION);
            this.mouse.setFlip(true, false);
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
            // play(key [, ignoreIfPlaying] [, startFrame])
        } else if(cursors.right.isDown) {
            this.mouse.body.setAccelerationX(this.ACCELERATION);
            this.mouse.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.mouse.body.setAccelerationX(0);
            this.mouse.body.setDragX(this.DRAG);
        }

		// check if alien is grounded
	    this.mouse.isGrounded = this.mouse.body.touching.down;
	    // if so, we have jumps to spare 
	    if(this.mouse.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.JustDown(cursors.up)) {
	        this.mouse.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        // check if mouse is on lava platform

        // wrap physics object(s) .wrap(gameObject, padding)
        // this.physics.world.wrap(this.cloud01, this.cloud01.width/2);
        // this.physics.world.wrap(this.cloud02, this.cloud02.width/2);
    }

    collectCheese (mouse, cheese)
    {
        console.log("Cheese Collected... Move on to next level");
        cheese.disableBody(true, true);
        
    }

    lavaPlatform(mouse, platform)
    {
        console.log(mouse.body.speed);
        if(mouse.body.speed < 1000) {
            console.log(mouse.body.velocity.x)
            this.scene.start('level2');
        }
    }
}