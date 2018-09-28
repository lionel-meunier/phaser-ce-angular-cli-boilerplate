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
  }

}
