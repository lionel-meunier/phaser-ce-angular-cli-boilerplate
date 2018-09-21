import * as Phaser from 'phaser-ce';
import {Background} from './background.model';
import {GameModel} from './game.model';
import {ItemDefaultModel} from './item-default.model';
import {PlayerModel} from './player.model';

export class LevelModel extends Phaser.State {

  game: Phaser.Game;
  world: Phaser.World;
  cursors: any;
  fBG: Background;
  fPlayer: PlayerModel;
  fBack: Phaser.Group;
  fItems: Phaser.Group;
  fTiles: Phaser.Group;
  fFront: Phaser.Group;
  fEndGame: Phaser.Group;
  typePlayers: Array<any> = [];
  typeElements: Array<any> = [];

  constructor(public name: string, public parentGame: GameModel, private data: any) {
    super();
    this.game = this.parentGame.phaserGame;
    this.key = name;
  }

  init() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  preload() {
    this.data.assets.forEach((asset) => {
      this.load.pack(asset.key, asset.url);
    });
  }

  create() {
    this.beforeCreate();
    this.createBackground();
    this.createBacksElements();
    this.createPlayersElements();
    this.createItemsElements();
    this.createTilesElements();
    this.createFrontsElements();
    this.createEndGame();
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

  createBackground() {
    // Create background
    this.fBG = new Background(this.game,
      this.data.background.x,
      this.data.background.y,
      this.data.background.width,
      this.data.background.height,
      this.data.background.key,
      null);
  }

  createBacksElements() {
    // back
    this.fBack = this.createElements(this.data.elements['back']);
    this.fBack.setAll('body.immovable', true);
    this.fBack.setAll('body.allowGravity', false);
    this.fBack.setAll('body.checkCollision.down', false);
  }

  createPlayersElements() {
    const TypePlayer = this.typePlayers.find((provider) => {
      return provider.name === this.data.player.type;
    });
    if (TypePlayer) {
      this.fPlayer = new TypePlayer(this.parentGame, 50, 30);
    } else {
      console.error('player not exist');
    }
  }

  createItemsElements() {
    // items collision
    this.fItems = this.createElements(this.data.elements['items']);
    this.fItems.setAll('body.immovable', true);
    this.fItems.setAll('body.allowGravity', false);
    this.fItems.setAll('body.checkCollision', true);
  }

  createTilesElements() {
    // tiles ppas de collision
    this.fTiles = this.createElements(this.data.elements['tiles']);
    this.fTiles.setAll('body.allowGravity', false);
  }

  createFrontsElements() {
    this.fFront = this.createElements(this.data.elements['front']);
    this.fFront.setAll('body.immovable', true);
    this.fFront.setAll('body.allowGravity', false);
  }

  createEndGame() {
    this.fEndGame = this.createElements(this.data.elements['endGame']);
    this.fEndGame.setAll('body.immovable', true);
    this.fEndGame.setAll('body.allowGravity', false);
    this.fEndGame.setAll('body.checkCollision', false);
  }

  createElements(data: Array<any>): Phaser.Group {
    let group = this.add.physicsGroup(Phaser.Physics.ARCADE);
    data.forEach((element) => {
      let sprite: Phaser.Sprite = this.createElement(element);
      group.add(sprite);
    });
    this.game.world.add(group);
    return group;
  }

  createElement(dataElement: any): Phaser.Sprite {
    const TypeElement = this.typeElements.find((provider) => {
      return provider.name === dataElement.type;
    });
    if (TypeElement) {
      return new TypeElement(this, dataElement.x, dataElement.y);
    } else {
      return new ItemDefaultModel(this, dataElement.x, dataElement.y, dataElement.key, dataElement.frame);
    }
  }

  afterCreate() {
    this.camera.follow(this.fPlayer);
  }

  update() {
    let touchingState = {
      back: false,
      items: true
    };
    touchingState.back = this.physics.arcade.collide(this.fPlayer, this.fBack);
    touchingState.items = this.physics.arcade.collide(this.fPlayer, this.fItems, this.playerVsItem, null, this);
    this.physics.arcade.collide(this.fPlayer, this.fEndGame, () => {
      // this.state.start('LevelDefault');
      this.parentGame.nextLevel();
    });


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
    this.physics.arcade.overlap(this.fPlayer, this.fTiles, this.getCoin, null, this);
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

  getCoin(player, coin) {
    coin.getCoin();
  }

  playerVsItem(player, item) {
    item.collideWithPlayer(player);
  }

}
