import * as Phaser from 'phaser-ce';
import {PlayerModel} from '../../core/player.model';
import {LevelModel} from '../../core/level.model';
import {PhaserInteractionHelperService} from '../../../services/phaser-interaction-helper.service';

export class Mario extends PlayerModel {

  cursors: any;
  state: string;

  constructor(public level: LevelModel, x: number, y: number) {
    super(level, x, y, 'mario', null);
    this.anchor.setTo(0.5, 1.0);
    // small
    this.animations.add('small-walk', Phaser.Animation.generateFrameNames('small-walk', 1, 2), 6, true);
    this.animations.add('small-jump', ['small-jump'], 6, true);
    this.animations.add('small-idle', ['small-idle'], 3, true);
    this.animations.add('small-lower', ['small-lower'], 3, true);
    this.animations.add('small-blink', ['small-idle', 'small-empty'], 12, true);

    // standard
    this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 2), 6, true);
    this.animations.add('jump', ['jump'], 6, true);
    this.animations.add('idle', ['idle'], 3, true);
    this.animations.add('lower', ['lower'], 3, true);
    this.animations.add('blink', ['idle', 'empty'], 12, true);

    this.state = 'small';
    this.setSize();
  }

  collideWith(elements: any, callback: any) {
    if (elements instanceof Phaser.Group) {
      elements.children.forEach((element) => {
        this.collideWith(element, callback);
      });
    } else {
      if (this.level.physics.arcade) {
        if (typeof this.level.physics.arcade['collideHandler'] === 'function') {
          this.level.physics.arcade['collideHandler']
          (this, elements, callback, null, null, elements.overlapOnly ? elements.overlapOnly : false);
        }
      }
    }
  }

  update() {
    super.update();
    //
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
    if (this.body.touching.down && this.cursors.up.isDown) {
      // jump if the player is on top of a platform and the up key is pressed
      this.body.velocity.y = -400;
    }

    let touching = this.body.touching.down;
    if (this.invincible) {
      this.play(this.getAnimationName('blink'));
    } else if (touching) {
      if (this.body.velocity.x === 0) {
        // if it is not moving horizontally play the idle or lower
        if (this.cursors.down.isDown) {
          this.play(this.getAnimationName('lower'));
        } else {
          this.play(this.getAnimationName('idle'));
        }
      } else {
        // if it is moving play the walk
        this.play(this.getAnimationName('walk'));
      }
    } else {
      // it is not touching the platforms so it means it is jumping.
      if (this.cursors.down.isDown) {
        this.play(this.getAnimationName('lower'));
      } else {
        this.play(this.getAnimationName('jump'));
      }
    }
  }

  touchEnemie(enemie) {
    if (this.body.touching.down && enemie.body.touching.up) {
      enemie.play('die', 50, false, true);
    }
    enemie.touchPlayer(this);
  }

  touchItem(item) {
    item.getItemBy(this);
  }

  play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation {
    if (name === 'lower' && this.body.height > 20) {
      this.body.height = 20;
    } else if (name !== 'lower' && this.body.height === 20) {
      this.y -= 8;
      this.body.height = 28;
    }
    return super.play(name, frameRate, loop, killOnComplete);
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

  setState(type, setCurrentLife?: boolean) {
    if (type === 'small') {
      if (this.state === 'standard') {
        if (setCurrentLife !== false) {
          this.setCurrentLife(1);
        }
        this.state = type;
        this.setSize();
      }
    } else if (type === 'standard') {
      if (this.state === 'small') {
        if (setCurrentLife !== false) {
          this.setCurrentLife(2);
        }
        this.state = type;
        this.setSize();
      }

    }
  }

  setCurrentLife(value) {
    super.setCurrentLife(value);
    console.log(this.getCurrentLife(), 'setcurrent life mario');
    if (this.getCurrentLife() === 1) {
      this.setState('small', false);
    } else if (this.getCurrentLife() === 2) {
      this.setState('standard', false);
    }

  }
}
