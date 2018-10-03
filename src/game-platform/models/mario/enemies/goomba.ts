import {EnemieModel} from '../../core/enemie.model';
import {LevelModel} from '../../core/level.model';
import * as Phaser from 'phaser-ce';

export class Goomba extends EnemieModel {

  state: string;
  origin: Phaser.Point;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.loadTexture('enemies', 'goomba-walk1');
    this.setState(data.defaultState ? data.defaultState : 'normal');
    this.animations.add('die', ['goomba-die'], 1, false);
    this.animations.add('fly-walk', Phaser.Animation.generateFrameNames('goomba-fly', 1, 4), 6, true);
    this.animations.add('walk', Phaser.Animation.generateFrameNames('goomba-walk', 1, 2), 6, true);
    this.origin = this.position.clone();
  }

  update() {
    super.update();
    if (this.animations.currentAnim.name !== 'die') {
      this.play(this.getAnimationName('walk'));
      let directionMultiplicateur = this.scale.x > 0 ? -1 : 1;
      if (this.state === 'fly') {
        this.body.allowGravity = false;
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;
        if (this.data.movement) {
          for (let i in this.data.movement.next) {
            this.body.velocity[i] = directionMultiplicateur * this.data.movement.next[i];
          }
        }
      } else {
        if (this.body.touching.down) {
          this.body.velocity.x = directionMultiplicateur * 50;
        }
      }

      if (this.body.touching.left) {
        this.scale.x = -1;
      } else if (this.body.touching.right) {
        this.scale.x = 1;
      }

      // console.log(this.x);

      if (this.state === 'fly') {
        if (this.data.movement) {
          if (this.data.movement.distanceMax) {
            let currentDist = Math.floor(Math.sqrt(
              Math.pow((this.x - this.origin.x), 2) +
              Math.pow((this.y - this.origin.y), 2)
            ));

            if (currentDist > this.data.movement.distanceMax) {
              // console.log('calcul distance not get current velocity');
              // this.scale.x = this.scale.x * -1;
            }
          }
        }
      }
    }

  }

  setState(type, setCurrentLife?: boolean) {
    if (type === 'normal') {
      if (setCurrentLife !== false) {
        this.setCurrentLife(1);
      }
      this.state = type;
      this.setSize();
    } else if (type === 'fly') {
      if (setCurrentLife !== false) {
        this.setCurrentLife(2);
      }
      this.state = type;
      this.setSize();
    }
  }

  setSize() {
    if (this.state === 'normal') {
      this.body.setSize(14, 16, 0, 0);
    } else if (this.state === 'fly') {
      this.body.setSize(20, 24, 0, 0);
    }
  }

  setCurrentLife(value) {
    if (value === 0) {
      this.play('die');
      this.level.add.tween(this).to({
        y: this.y - 20,
        angle: 120,
        alpha: 0.2
      }, 1000, 'Expo.easeOut', true).onComplete.add(() => {
        super.setCurrentLife(value);
      });
    } else {
      super.setCurrentLife(value);
      if (this.getCurrentLife() === 1) {
        this.setState('normal', false);
      } else if (this.getCurrentLife() === 2) {
        this.setState('fly', false);
      }
    }
  }

  getAnimationName(type: string): string {
    if (this.state !== 'normal') {
      type = this.state + '-' + type;
    }
    return type;
  }

  killedBy(enemie) {
    this.body.enable = false;
    this.play('die');
    this.level.add.tween(this).to({
      y: this.y - 20,
      angle: 120,
      alpha: 0.2
    }, 1000, 'Expo.easeOut', true).onComplete.add(this.kill, this);
  }
}
