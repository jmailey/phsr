var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;

function preload() {
  game.load.audio('bgmusic', '../assets/music.mp3' );
  game.load.image('astronaut', '../assets/astronaut.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('ledge', '../assets/platform.png');
  game.load.spritesheet('character', '../assets/characterSprite.png', 32, 32);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 1300, 600);
  cursors = game.input.keyboard.createCursorKeys();
  createPlayer();
  buildWorld();

  var music = game.add.audio('bgmusic', .1, true);
  music.play();
}

function update() {
  player.body.velocity.x = 0;
  game.physics.arcade.collide(player, platforms);

  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  }
  else {
    player.animations.stop();
    player.frame = 10;
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -270;
  }
}

function createPlayer() {
  player = game.add.sprite(0, game.world.height - 100, 'character');
  game.camera.follow(player);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 400;
  player.body.bounce.y = 0.2;
  player.body.collideWorldBounds = true;
  player.animations.add('left', [21, 23, 23], 10, true);
  player.animations.add('right', [33, 34, 35], 10, true);
}

function buildWorld() {
  platforms = game.add.group();
  platforms.enableBody = true
  var ledge = platforms.create(400, 220, 'ledge');
  var ground = platforms.create(0, game.world.height -64, 'ground');
  ledge.scale.setTo(1,1);
  ground.scale.setTo(4, 4);
  ledge.body.immovable = true;
  ground.body.immovable = true;

  for(i=0; i< 7; i++) {
    var box =  platforms.create(i * 100, (i*90), 'ledge');
    box.scale.setTo(.1, 1);
    if((i % 2) !== 0) {
      box.body.immovable = true;
    }
  }
}
