import * as Phaser from 'phaser-ce';
import {Background} from './background.model';
import {Back} from './back.model';
import {Player} from './player.model';
import {Mario} from './mario.model';
import {InterogationBoxModel} from './items/interogation-box.model';
import {CoinModel} from './tiles/coin.model';

export class Level extends Phaser.State {

  game: Phaser.Game;
  world: Phaser.World;
  cursors: any;
  fBG: Background;
  fWater: Phaser.Sprite;
  fFruits: Phaser.Group;
  fPlayer: Mario;
  fBack: Phaser.Group;
  fItems: Phaser.Group;
  fTiles: Phaser.Group;
  fFront: Phaser.Group;
  fEndGame: Phaser.Group;

  constructor(game: Phaser.Game, private data: any, private debug: boolean) {
    super();
    this.game = game;

  }

  init() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    if (this.debug) {
      this.game.debug.start();

    }
  }

  preload() {
    this.data.assets.forEach((asset) => {
      this.load.pack(asset.key, asset.url);
    });
  }

  create() {
    this.beforeCreate();

    // Create background
    let _BG = new Background(this.game,
      this.data.background.x,
      this.data.background.y,
      this.data.background.width,
      this.data.background.height,
      this.data.background.key,
      null);

    // back
    let back = this.createElements(this.data.elements['back']);
    back.setAll('body.immovable', true);
    back.setAll('body.allowGravity', false);
    // back.setAll('renderable', false);
    back.setAll('body.checkCollision.down', false);

    // player
    let player = new Mario(this.game, 50, 30, 'mario', 0);

    // items collision
    let items = this.createItems(this.data.elements['items']);
    items.setAll('body.immovable', true);
    items.setAll('body.allowGravity', false);
    items.setAll('body.checkCollision', true);

    // tiles ppas de collision
    let tiles = this.createTiles(this.data.elements['tiles']);
    tiles.setAll('body.allowGravity', false);


    // enemies

    // front
    let front = this.createElements(this.data.elements['front']);
    front.setAll('body.immovable', true);
    front.setAll('body.allowGravity', false);

    // end game
    let endGame = this.createElements(this.data.elements['endGame']);
    endGame.setAll('body.immovable', true);
    endGame.setAll('body.allowGravity', false);
    endGame.setAll('body.checkCollision', false);
    // .forEach((element) => {
    //   console.log(element);
    // });

    // let _back = new Back(this.game);
    // this.add.sprite(10, 60, 'backgrounds-objects', 'sol', _back);
    // this.add.sprite(30, 60, 'backgrounds-objects', 'sol', _back);
    // this.add.sprite(50, 60, 'backgrounds-objects', 'sol', _back);


    this.fBG = _BG;
    this.fPlayer = player;
    this.fBack = back;
    this.fItems = items;
    this.fTiles = tiles;
    this.fFront = front;
    this.fEndGame = endGame;

    this.afterCreate();
  }

  beforeCreate() {
    // world
    this.world.resize(this.data.size.width, this.data.size.height);

    // start the Arcade system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the global gravity
    this.game.physics.arcade.gravity.y = 800;

    // create the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  afterCreate() {
    this.camera.follow(this.fPlayer);
  }

  update() {
    let touchingState = {
      back: false,
      items : true
    };

    touchingState.back = this.physics.arcade.collide(this.fPlayer, this.fBack);
    touchingState.items =  this.physics.arcade.collide(this.fPlayer, this.fItems);
    this.physics.arcade.collide(this.fPlayer, this.fEndGame, () => {
      this.state.start('LevelDefault');
    });
    this.physics.arcade.collide(this.fPlayer, this.fTiles, this.getCoin.bind(this));

    // a flag to know if the player is (down) touching the platforms
    let touching = this.fPlayer.body.touching.down;
    if (touching && this.cursors.up.isDown && (touchingState.back || touchingState.items)) {
      // jump if the player is on top of a platform and the up key is pressed
      this.fPlayer.body.velocity.y = -400;
    }

    if (touching) {
      if (this.fPlayer.body.velocity.x === 0) {
        // if it is not moving horizontally play the idle or lower
        if (this.cursors.down.isDown) {
          this.fPlayer.play('lower');
        } else {
          this.fPlayer.play('idle');
        }
      } else {
        // if it is moving play the walk
        this.fPlayer.play('walk');
      }
    } else {
      // it is not touching the platforms so it means it is jumping.
      if (this.cursors.down.isDown) {
        this.fPlayer.play('lower');
      } else {
        this.fPlayer.play('jump');
      }

    }


    // fruits
    // this.physics.arcade.overlap(this.fPlayer, this.fFruits, this.playerVsFruit, null, this);

    // water
    // this.fWater.tilePosition.x -= 1;
    this.fBG.tilePosition.x = -this.camera.x;
  }

  render() {
    if (this.game.debug.dirty === true) {
      // this.game.debug.cameraInfo(this.game.camera, 32, 32);
      // this.game.debug.spriteBounds(this.fBack);


    }
    this.game.debug.spriteBounds(this.fPlayer);
    this.game.debug.bodyInfo(this.fPlayer, 32, 32);
    this.game.debug.body(this.fPlayer);
    // this.game.debug.spriteBounds(this.fPlayer);
  }

  createElements(data: Array<any>): Phaser.Group {
    let group = this.add.physicsGroup(Phaser.Physics.ARCADE);
    data.forEach((element) => {
      this.add.sprite(element.x, element.y, element.key, element.frame, group);
    });
    this.game.world.add(group);
    return group;
  }

  createItems(data: Array<any>): Phaser.Group {
    let group = this.add.physicsGroup(Phaser.Physics.ARCADE);
    data.forEach((element) => {
      switch (element.type) {
        case 'interogationBox':
          let sprite = new InterogationBoxModel(this.game, element.x, element.y);
          // this.game.world.add(sprite);
          group.add(sprite);
          break;
        default:
          this.add.sprite(element.x, element.y, 'backgrounds-objects', 'box-empty', group);
          break;
      }


    });
    this.game.world.add(group);
    return group;
  }

  createTiles(data: Array<any>): Phaser.Group {
    let group = this.add.physicsGroup(Phaser.Physics.ARCADE);
    data.forEach((element) => {
      switch (element.type) {
        case 'coin':
          let sprite = new CoinModel(this.game, element.x, element.y);
          // this.game.world.add(sprite);
          group.add(sprite);
          break;
        default:
          this.add.sprite(element.x, element.y, 'backgrounds-objects', 'box-empty', group);
          break;
      }


    });
    this.game.world.add(group);
    return group;
  }

  getCoin(player, coin) {
    coin.body.enable = false;

    this.add.tween(coin).to({
      y: coin.y - 10
    }, 1000, 'Expo.easeOut', true);

    this.add.tween(coin.scale).to({
      x: 1.1,
      y: 1.1
    }, 1000, 'Linear', true);

    this.add.tween(coin).to({
      alpha: 0.2
    }, 1000, 'Linear', true).onComplete.add(coin.kill, coin);
  }
}
