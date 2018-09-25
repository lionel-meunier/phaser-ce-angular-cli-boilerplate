import * as Phaser from 'phaser-ce';
import {PlayerModel} from '../../core/player.model';
import {GameModel} from '../../core/game.model';

export class Mario extends PlayerModel {

  cursors: any;
  state: string;

  constructor(public parentGame: GameModel, x: number, y: number) {
    super(parentGame, x, y, 'mario', null);
    parentGame.phaserGame.world.add(this);
    this.anchor.setTo(0.5, 1.0);
    // small
    this.animations.add('small-walk', Phaser.Animation.generateFrameNames('small-walk', 1, 2), 6, true);
    this.animations.add('small-jump', ['small-jump'], 6, true);
    this.animations.add('small-idle', ['small-idle'], 3, true);
    this.animations.add('small-lower', ['small-lower'], 3, true);

    // standard
    this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 2), 6, true);
    this.animations.add('jump', ['jump'], 6, true);
    this.animations.add('idle', ['idle'], 3, true);
    this.animations.add('lower', ['lower'], 3, true);
    parentGame.phaserGame.physics.arcade.enable(this);

    this.state = 'small';
    this.setSize();
    // this.body.bounce.set(1);
    this.cursors = parentGame.phaserGame.input.keyboard.createCursorKeys();


  }

  update() {
    //player move
    if (this.cursors.left.isDown && this.x > 0) {
      // move to the left
      this.body.velocity.x = -200;
    } else if (this.cursors.right.isDown && this.x < this.game.world.width) {
      // move to the right
      this.body.velocity.x = 200;
    } else {
      // dont move in the horizontal
      this.body.velocity.x = 0;
    }


    // update the facing of the player
    if (this.cursors.left.isDown) {
      // face left
      this.scale.x = 1;
    } else if (this.cursors.right.isDown) {
      // face right
      this.scale.x = -1;
    }
  }

  play(name, frameRate?, loop?, killOnComplete?) {


    if (name === 'lower' && this.body.height > 20) {
      this.body.height = 20;
    } else if (name !== 'lower' && this.body.height === 20) {
      this.y -= 8;
      this.body.height = 28;
    }
    super.play(name, frameRate, loop, killOnComplete);
  }

  getAnimationName(type: string): string {
    if (this.state !== 'standard') {
      type = this.state + '-' + type;
    }
    return type;
  }

  setSize() {
    if (this.state === 'small') {
      this.body.setSize(14, 16, 0, 0);
    } else {
      this.body.setSize(14, 28, 0, 0);
    }
  }

  setState(type) {
    if (type === 'standard' && this.state === 'small') {
      this.state = type;
      this.setSize();
    }
  }
}
