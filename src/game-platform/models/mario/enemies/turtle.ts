import {EnemieModel} from '../../core/enemie.model';
import {LevelModel} from '../../core/level.model';
import * as Phaser from 'phaser-ce';

export class Turtle extends EnemieModel {

  state: string;
  stopped: boolean = false;
  origin: Phaser.Point;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.loadTexture('enemies', 'turtle-walk1');
    this.setState(data.defaultState ? data.defaultState : 'normal');
    this.animations.add('walk', Phaser.Animation.generateFrameNames('turtle-walk', 1, 2), 6, true);
    this.animations.add('shell-walk', Phaser.Animation.generateFrameNames('turtle-shell', 1, 3), 6, true);
    this.animations.add('die', ['turtle-walk1'], 1, false);
    this.origin = this.position.clone();
  }

  update() {
    super.update();

    this.play(this.getAnimationName('walk'));
    let directionMultiplicateur = this.scale.x > 0 ? -1 : 1;

    if (this.body.touching.down) {
      this.body.velocity.x = directionMultiplicateur * this.getVelocity();
    }
  }

  inverseScale() {
    if (this.body.touching.left) {
      this.scale.x = -1;
    } else if (this.body.touching.right) {
      this.scale.x = 1;
    }
  }

  touchDecor() {
    this.inverseScale();
  }

  touchItem() {
    this.inverseScale();
  }

  touchPlayer(player) {
    if (this.state === 'shell') {
      if (this.stopped) {
        if ((player.body.touching.left && this.body.touching.right) ||
          (player.body.touching.right && this.body.touching.left)) {
          if (player.body.touching.left) {
            this.scale.x = 1;
          } else {
            this.scale.x = -1;
          }
          this.stopped = false;
        }
      } else {
        if (player.body.touching.down && this.body.touching.up) {
        } else {
          player.setCurrentLife(player.getCurrentLife() - 1);
        }
      }
    } else {
      super.touchPlayer(player);
    }
  }

  touchEnemie(enemie) {
    if (this.state === 'shell') {
      if (this.stopped) {
        if ((enemie.body.touching.left && this.body.touching.right) ||
          (enemie.body.touching.right && this.body.touching.left)) {
          if (enemie.body.touching.left) {
            this.scale.x = 1;
          } else {
            this.scale.x = -1;
          }
          this.stopped = false;
        }
      } else {
        enemie.killedBy(this);
      }
    } else {
      this.inverseScale();
      super.touchEnemie(enemie);
    }
  }

  getVelocity() {
    if (this.stopped === false) {
      return this.state === 'shell' ? 200 : 50;
    } else {
      return 0;
    }
  }

  setState(type, setCurrentLife?: boolean) {
    if (type === 'shell') {
      if (setCurrentLife !== false) {
        this.setCurrentLife(1);
      }
      this.state = type;
      this.setSize();
    } else if (type === 'normal') {
      if (setCurrentLife !== false) {
        this.setCurrentLife(2);
      }
      this.state = type;
      this.setSize();
    } else if (type === 'fly') {
      if (setCurrentLife !== false) {
        this.setCurrentLife(3);
      }
      this.state = type;
      this.setSize();
    }
  }

  setSize() {
    if (this.state === 'normal') {
      this.body.setSize(16, 27, 0, 0);
    } else if (this.state === 'shell') {
      this.body.setSize(16, 16, 0, 0);
    }
  }

  setCurrentLife(value) {
    if (value === 0) {
      this.stopped = !this.stopped;
    } else {
      super.setCurrentLife(value);
      if (this.getCurrentLife() === 1) {
        this.stopped = true;
        this.setState('shell', false);
      } else if (this.getCurrentLife() === 2) {
        this.setState('normal', false);
      }
    }
  }

  getAnimationName(type: string): string {
    if (this.state !== 'normal') {
      type = this.state + '-' + type;
    }
    return type;
  }
}
