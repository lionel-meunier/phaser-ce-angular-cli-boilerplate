import * as Phaser from 'phaser-ce';
import {Background} from './background.model';
import {Back} from './back.model';
import {Player} from './player.model';
import {Mario} from './mario.model';

export class Level extends Phaser.State {

  game: Phaser.Game;
  world: Phaser.World;
  cursors: any;
  fBG: Background;
  fWater: Phaser.Sprite;
  fFruits: Phaser.Group;
  fPlayer: Player;
  fPlayerMario: Mario;
  fCollisionLayer: Phaser.Group;

  init() {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.debug.start();
  }

  preload() {
    this.load.pack('level', 'assets/assetsPlatform/pack.json');
  }

  create() {
    this.beforeCreate();

    let _BG = new Background(this.game, -11, -7, 1713, 750, 'BG', null);

    let _back = new Back(this.game);

    let _Bush__2_ = this.add.tileSprite(103, 1459, 133, 65, 'objects', 'Bush (2)', _back);
    _Bush__2_.scale.setTo(1.2436090513997489, 1.4061541519275604);

    this.add.sprite(1114, 493, 'objects', 'Crate', _back);

    this.add.sprite(1074, 1143, 'tiles', '1', _back);

    this.add.tileSprite(1202, 1143, 512, 128, 'tiles', '2', _back);

    this.add.sprite(1714, 1143, 'tiles', '3', _back);

    this.add.sprite(1714, 1527, 'tiles', '16', _back);

    this.add.sprite(1074, 1527, 'tiles', '12', _back);

    this.add.tileSprite(1202, 1527, 512, 128, 'tiles', '9', _back);

    this.add.tileSprite(1074, 1271, 129, 256, 'tiles', '4', _back);

    this.add.tileSprite(1714, 1271, 128, 256, 'tiles', '6', _back);

    this.add.tileSprite(1202, 1271, 512, 256, 'tiles', '5', _back);

    this.add.sprite(-11, 1529, 'tiles', '1', _back);

    this.add.tileSprite(117, 1529, 512, 128, 'tiles', '2', _back);

    this.add.sprite(629, 1529, 'tiles', '3', _back);

    this.add.sprite(629, 1657, 'tiles', '16', _back);

    this.add.sprite(254, 1495, 'objects', 'Mushroom_2', _back);

    this.add.sprite(-11, 1657, 'tiles', '12', _back);

    this.add.tileSprite(117, 1657, 512, 128, 'tiles', '9', _back);

    this.add.sprite(1013, 1273, 'tiles', '1', _back);

    this.add.tileSprite(1141, 1273, 512, 128, 'tiles', '2', _back);

    this.add.sprite(1653, 1273, 'tiles', '3', _back);

    this.add.sprite(2037, 1657, 'tiles', '16', _back);

    this.add.sprite(1013, 1657, 'tiles', '12', _back);

    this.add.tileSprite(1141, 1657, 896, 128, 'tiles', '9', _back);

    this.add.tileSprite(1141, 1401, 512, 256, 'tiles', '5', _back);

    this.add.tileSprite(1653, 1401, 128, 128, 'tiles', '6', _back);

    this.add.tileSprite(1013, 1401, 129, 256, 'tiles', '4', _back);

    this.add.sprite(1781, 1529, 'tiles', '11', _back);

    this.add.sprite(1653, 1529, 'tiles', '10', _back);

    this.add.sprite(2037, 1529, 'tiles', '3', _back);

    this.add.sprite(1909, 1529, 'tiles', '2', _back);

    this.add.sprite(-11, 505, 'tiles', '1', _back);

    this.add.tileSprite(117, 505, 512, 128, 'tiles', '2', _back);

    let _Bush__2_1 = this.add.sprite(34, 382, 'objects', 'Bush (2)', _back);
    _Bush__2_1.scale.setTo(1.9849624160619828, 1.9384615456376617);

    this.add.sprite(629, 505, 'tiles', '3', _back);

    this.add.sprite(629, 633, 'tiles', '16', _back);

    this.add.sprite(27, 234, 'objects', 'Tree_3', _back);

    this.add.sprite(-11, 633, 'tiles', '12', _back);

    this.add.tileSprite(117, 633, 512, 128, 'tiles', '9', _back);

    this.add.sprite(1397, 377, 'tiles', '15', _back);

    this.add.sprite(1269, 377, 'tiles', '13', _back);

    this.add.sprite(1013, 761, 'tiles', '13', _back);

    this.add.sprite(1141, 761, 'tiles', '14', _back);

    this.add.sprite(1269, 761, 'tiles', '15', _back);

    this.add.sprite(503, 1030, 'tiles', '13', _back);

    this.add.sprite(631, 1030, 'tiles', '14', _back);

    this.add.sprite(759, 1030, 'tiles', '15', _back);

    this.add.sprite(29, 1233, 'objects', 'Tree_2', _back);

    this.add.sprite(509, 1494, 'objects', 'Mushroom_1', _back);

    this.add.sprite(729, 955, 'objects', 'Crate', _back);

    this.add.sprite(652, 955, 'objects', 'Crate', _back);

    this.add.sprite(575, 955, 'objects', 'Crate', _back);

    this.add.sprite(652, 878, 'objects', 'Crate', _back);

    this.add.sprite(1056, 491, 'objects', 'Tree_3', _back);

    this.add.sprite(1052, 724, 'objects', 'Mushroom_2', _back);

    this.add.sprite(1899, 1259, 'objects', 'Tree_3', _back);

    this.add.sprite(1855, 1457, 'objects', 'Crate', _back);

    this.add.sprite(1354, 340, 'objects', 'Mushroom_1', _back);

    this.add.sprite(1292, 107, 'objects', 'Tree_3', _back);

    this.add.sprite(-7, 446, 'objects', 'Bush (1)', _back);

    this.add.sprite(1642, 1110, 'objects', 'Tree_1', _back);

    this.add.tileSprite(-46, 1742, 2245, 201, 'tiles', '18', _back);

    this.add.sprite(571, 456, 'objects', 'Stone', _back);

    this.add.sprite(1115, 1213, 'objects', 'Bush (1)', _back);

    this.add.sprite(1378, 1212, 'objects', 'Bush (2)', _back);

    this.add.sprite(1511, 1077, 'objects', 'Crate', _back);

    this.add.sprite(1471, 1001, 'objects', 'Crate', _back);

    let _player = new Player(this.game, 203, 1331, 'player', 0);
    let _playerMario = new Mario(this.game, 203, 1331, 'mario', 0);

    let _water = this.add.tileSprite(-51, 1644, 2241, 99, 'tiles', '17');

    let _fruits = this.add.physicsGroup(Phaser.Physics.ARCADE);
    _fruits.position.setTo(-11, -7);

    this.add.sprite(639, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(564, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(489, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(414, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(339, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(264, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(189, 444, 'objects', 'fruit', _fruits);

    this.add.sprite(1100, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1150, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1200, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1250, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1300, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1350, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1400, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1450, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1500, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1875, 1350, 'objects', 'fruit', _fruits);

    this.add.sprite(1925, 1300, 'objects', 'fruit', _fruits);

    this.add.sprite(1950, 1250, 'objects', 'fruit', _fruits);

    this.add.sprite(1975, 1200, 'objects', 'fruit', _fruits);

    this.add.sprite(1975, 1150, 'objects', 'fruit', _fruits);

    this.add.sprite(1950, 1100, 'objects', 'fruit', _fruits);

    this.add.sprite(1900, 1050, 'objects', 'fruit', _fruits);

    this.add.sprite(1100, 675, 'objects', 'fruit', _fruits);

    this.add.sprite(1150, 675, 'objects', 'fruit', _fruits);

    this.add.sprite(1200, 675, 'objects', 'fruit', _fruits);

    this.add.sprite(325, 1425, 'objects', 'fruit', _fruits);

    this.add.sprite(375, 1425, 'objects', 'fruit', _fruits);

    this.add.sprite(425, 1425, 'objects', 'fruit', _fruits);

    this.add.sprite(475, 1425, 'objects', 'fruit', _fruits);

    this.add.sprite(525, 1425, 'objects', 'fruit', _fruits);

    this.add.sprite(525, 1375, 'objects', 'fruit', _fruits);

    this.add.sprite(475, 1375, 'objects', 'fruit', _fruits);

    this.add.sprite(425, 1375, 'objects', 'fruit', _fruits);

    this.add.sprite(375, 1375, 'objects', 'fruit', _fruits);

    this.add.sprite(325, 1375, 'objects', 'fruit', _fruits);

    this.add.sprite(325, 1325, 'objects', 'fruit', _fruits);

    this.add.sprite(375, 1325, 'objects', 'fruit', _fruits);

    this.add.sprite(425, 1325, 'objects', 'fruit', _fruits);

    this.add.sprite(475, 1325, 'objects', 'fruit', _fruits);

    this.add.sprite(525, 1325, 'objects', 'fruit', _fruits);

    this.add.sprite(1173, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1223, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1273, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1323, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1373, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1423, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1473, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1523, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(1573, 1500, 'objects', 'fruit', _fruits);

    this.add.sprite(114, 444, 'objects', 'fruit', _fruits);

    let _front = this.add.group();
    _front.position.setTo(-11, -7);

    let _Tree_10 = this.add.sprite(1302, 1083, 'objects', 'Tree_3', _front);
    _Tree_10.scale.setTo(0.7332871556082268, 0.7658318667609785);

    this.add.sprite(371, 465, 'objects', 'Bush (2)', _front);

    this.add.sprite(178, 464, 'objects', 'Bush (1)', _front);

    this.add.sprite(586, 997, 'objects', 'Stone', _front);

    this.add.sprite(783, 1007, 'objects', 'Bush (3)', _front);

    this.add.sprite(1181, 997, 'objects', 'Tree_2', _front);

    this.add.sprite(1601, 1253, 'objects', 'Tree_1', _front);

    this.add.sprite(2051, 1497, 'objects', 'Stone', _front);

    this.add.sprite(2063, 1442, 'objects', 'Sign_1', _front);

    this.add.sprite(1206, 717, 'objects', 'Bush (1)', _front);

    this.add.sprite(1293, 351, 'objects', 'Bush (3)', _front);

    this.add.sprite(36, 1490, 'objects', 'Bush (1)', _front);

    this.add.sprite(292, 1506, 'objects', 'Tree_1', _front);

    this.add.sprite(331, 1273, 'objects', 'Tree_3', _front);

    this.add.sprite(594, 1486, 'objects', 'Sign_2', _front);

    let _collisionLayer = this.add.physicsGroup(Phaser.Physics.ARCADE);
    _collisionLayer.position.setTo(-11, -7);

    this.add.tileSprite(3, 1543, 760, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1028, 1289, 760, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(516, 1047, 382, 17, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(4, 522, 760, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1027, 775, 378, 26, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1285, 391, 248, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1085, 1160, 766, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1793, 1546, 378, 38, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(587, 963, 229, 15, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(664, 886, 74, 15, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1524, 1087, 73, 25, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1484, 1010, 73, 25, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1868, 1469, 73, 25, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(1125, 500, 74, 15, 'tiles', 'physics', _collisionLayer);

    this.add.tileSprite(-12, 1740, 2201, 25, 'tiles', 'physics', _collisionLayer);

    _fruits.setAll('body.allowGravity', false);
    _collisionLayer.setAll('body.immovable', true);
    _collisionLayer.setAll('body.allowGravity', false);
    _collisionLayer.setAll('renderable', false);
    _collisionLayer.setAll('body.checkCollision.down', false);


    // public fields

    this.fBG = _BG;
    this.fPlayer = _player;
    this.fPlayerMario = _playerMario;
    this.fWater = _water;
    this.fFruits = _fruits;
    this.fCollisionLayer = _collisionLayer;
    this.afterCreate();
  }

  beforeCreate() {
    // world
    this.world.resize(2200, 1800);

    // start the Arcade system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the global gravity
    this.game.physics.arcade.gravity.y = 800;

    // create the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  afterCreate() {
    if(this.game.debug.dirty === true) {

    } else {
      this.camera.follow(this.fPlayerMario);
    }

  }

  update() {

    this.physics.arcade.collide(this.fPlayer, this.fCollisionLayer);
    this.physics.arcade.collide(this.fPlayerMario, this.fCollisionLayer);

    if(this.game.debug.dirty === true) {
      if (this.cursors.up.isDown) {
        this.game.camera.y -= 4;
      } else if (this.cursors.down.isDown) {
        this.game.camera.y += 4;
      }

      if (this.cursors.left.isDown) {
        this.game.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.game.camera.x += 4;
      }

    } else {
      // a flag to know if the player is (down) touching the platforms
      let touching = this.fPlayer.body.touching.down;
      let touchingMario = this.fPlayerMario.body.touching.down;

      if (touching && this.cursors.up.isDown) {
        // jump if the player is on top of a platform and the up key is pressed
        this.fPlayer.body.velocity.y = -600;
      }
      if (touchingMario && this.cursors.up.isDown) {
        // jump if the player is on top of a platform and the up key is pressed
        this.fPlayerMario.body.velocity.y = -600;
      }

      if (touchingMario) {
        if (this.fPlayerMario.body.velocity.x == 0) {
          if(this.cursors.down.isDown) {
            this.fPlayerMario.play('lower');
          } else {
            this.fPlayerMario.play('idle');
          }
        } else {
          this.fPlayerMario.play('walk');
        }
      } else {
        this.fPlayerMario.play('jump');
      }

      if (touching) {
        if (this.fPlayer.body.velocity.x === 0) {
          // if it is not moving horizontally play the idle
          this.fPlayer.play('idle');
        } else {
          // if it is moving play the walk
          this.fPlayer.play('walk');
        }
      } else {
        // it is not touching the platforms so it means it is jumping.
        this.fPlayer.play('jump');
      }


      // fruits
      this.physics.arcade.overlap(this.fPlayer, this.fFruits, this.playerVsFruit, null, this);

      // water
      this.fWater.tilePosition.x -= 1;
      this.fBG.tilePosition.x = -this.camera.x;
    }
  }

  playerVsFruit(player, fruit) {
    fruit.body.enable = false;

    this.add.tween(fruit).to({
      y: fruit.y - 50
    }, 1000, 'Expo.easeOut', true);

    this.add.tween(fruit.scale).to({
      x: 2,
      y: 2
    }, 1000, 'Linear', true);

    this.add.tween(fruit).to({
      alpha: 0.2
    }, 1000, 'Linear', true).onComplete.add(fruit.kill, fruit);
  }
}
