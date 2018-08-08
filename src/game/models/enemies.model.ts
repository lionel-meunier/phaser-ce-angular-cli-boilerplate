import * as Phaser from "phaser-ce/build/custom/phaser-split";

export class EnemiesModel extends Phaser.Group {
  x: number;
  y: number;
  countLiving: any;

  constructor(public game: Phaser.Game) {
    super(game);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createAliens();
  }

  update() {

  }

  createAliens() {

    for (var y = 0; y < 10; y++) {
      for (var x = 0; x < 4; x++) {
        var alien = this.create(x * 48, y * 50, "invader");
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add("fly", [0, 1, 2, 3], 20, true);
        alien.play("fly");
        alien.body.moves = false;
      }
    }

    this.x = 500;
    this.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = this.game.add.tween(this).to({y: 100}, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(() => {
      this.descend();
    }, this);
  }

  descend() {
    this.x -= 100;
  }
}
