import * as Phaser from 'phaser-ce';
import {Background} from './background.model';
import {GameModel} from './game.model';
import {ItemDefaultModel} from './item-default.model';
import {PlayerModel} from './player.model';
import {GroupModel} from './group.model';

export class LevelModel extends Phaser.State {

  game: Phaser.Game;
  world: Phaser.World;
  cursors: any;
  fBG: Background;
  fPlayer: PlayerModel;
  fEnemies: Phaser.Group;
  fDecor: Phaser.Group;
  fItems: Phaser.Group;

  typePlayers: Array<any> = [];
  typeElements: Array<any> = [];


  constructor(public name: string, public parentGame: GameModel, private data: any) {
    super();
    this.game = this.parentGame.phaserGame;
    this.key = name;
    this.typeElements.push(GroupModel);
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
    this.createDecorsElements();
    this.createEnemiesElements();
    this.createItemsElements();
    this.createPlayersElements();
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

  createDecorsElements() {
    this.fDecor = this.createGroup(this.data.elements['decor']);
  }

  createEnemiesElements() {
    this.fEnemies = this.createGroup(this.data.elements['enemies']);
  }

  createPlayersElements() {
    const TypePlayer = this.typePlayers.find((provider) => {
      return provider.name === this.data.player.type;
    });
    if (TypePlayer) {
      this.fPlayer = new TypePlayer(this, 50, 30);
    } else {
      console.error('player not exist');
    }
  }

  createItemsElements() {
    // items collision
    this.fItems = this.createGroup(this.data.elements['items']);
  }

  createGroup(elementConfig: any): Phaser.Group {
    let group = new GroupModel(this, {});
    this.createElementsInGroup(elementConfig.data, group);
    for (let i in elementConfig.config) {
      group.setAll(i, elementConfig.config[i]);
    }
    this.game.world.add(group);
    return group;
  }

  createElementsInGroup(data, group) {
    data.forEach((subElementConfig) => {
      let sprite: any = this.createElement(subElementConfig);
      group.add(sprite);
    });
  }

  createElements(elementConfig: any): Phaser.Group {
    let group = new GroupModel(this, {});
    elementConfig.data.forEach((subElementConfig) => {
      let sprite: any = this.createElement(subElementConfig);
      if (sprite instanceof GroupModel) {
        subElementConfig.data.forEach((subSubElementConfig) => {
          let subSprite: any = this.createElement(subSubElementConfig);
          sprite.add(subSprite);
        });
        for (let j in subElementConfig.config) {
          console.log(j,subElementConfig.config[j]);
          sprite.setAll(j, subElementConfig.config[j]);
        }
      }
      group.add(sprite);
    });
    // add config to group with set all
    for (let i in elementConfig.config) {
      group.setAll(i, elementConfig.config[i]);
    }
    this.game.world.add(group);
    return group;
  }

  createElement(dataElement: any): Phaser.Sprite | Phaser.Group {
    const TypeElement = this.typeElements.find((provider) => {
      return provider.name === dataElement.type;
    });
    if (dataElement.type === 'GroupModel') {
      return this.createGroup(dataElement);
    } else if (TypeElement) {
      return new TypeElement(this, dataElement);
    } else {
      return new ItemDefaultModel(this, dataElement);
    }
  }

  afterCreate() {
    this.camera.follow(this.fPlayer);
    console.log(this.fItems)
  }

  update() {

    //enemies intercation
    this.physics.arcade.collide(this.fEnemies, this.fDecor, (enemie, element) => {
      // console.log('enemie test touchDecor');
      enemie.touchDecor(element);
    });
    this.physics.arcade.collide(this.fEnemies, this.fItems, (enemie, item) => {
      // console.log('enemie test touchDecor');
      enemie.touchItem(item);
    });


    // let touchingState = {
    //   back: false,
    //   items: true
    // };
    // touchingState.back = this.physics.arcade.collide(this.fPlayer, this.fBack);
    // this.physics.arcade.collide(this.fEnemies, this.fBack);
    // touchingState.items = this.physics.arcade.collide(this.fPlayer, this.fItems, this.playerVsItem, null, this);
    // this.physics.arcade.collide(this.fEnemies, this.fItems, (enemie, item) => {
    //   enemie.touchItem(item);
    // });
    // this.physics.arcade.collide(this.fPlayer, this.fEnemies);
    // this.physics.arcade.collide(this.fPlayer, this.fEndGame, () => {
    //   // this.state.start('LevelDefault');
    //   this.parentGame.nextLevel();
    // });
    //
    //
    // // a flag to know if the player is (down) touching the platforms
    // let touching = this.fPlayer.body.touching.down;
    // if (touching && this.cursors.up.isDown && (touchingState.back || touchingState.items)) {
    //   // jump if the player is on top of a platform and the up key is pressed
    //   this.fPlayer.body.velocity.y = -400;
    // }
    //
    // // console.log('touching',touching);
    //

    //
    //
    // // fruits
    // // this.physics.arcade.overlap(this.fPlayer, this.fFruits, this.playerVsFruit, null, this);
    // this.physics.arcade.overlap(this.fPlayer, this.fTiles, this.getItem, null, this);
    // // water
    // // this.fWater.tilePosition.x -= 1;
    // this.fBG.tilePosition.x = -this.camera.x;
  }

  render() {
    // if (this.game.debug.dirty === true) {
    //   // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    //   // this.game.debug.spriteBounds(this.fBack);
    //
    //
    // }
    // this.game.debug.spriteBounds(this.fPlayer);
    // this.game.debug.bodyInfo(this.fPlayer, 32, 32);
    // this.game.debug.body(this.fPlayer);
    // this.game.debug.spriteBounds(this.fPlayer);
  }

  getItem(player, coin) {
    coin.getItem();
  }

  playerVsItem(player, item) {
    item.collideWithPlayer(player);
  }

}
