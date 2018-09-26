import * as Phaser from 'phaser-ce';

export class PhaserInteractionHelperService {
  static collideOneTorecursiveGroup(object: any, elements: any, callback: any) {
    if (elements instanceof Phaser.Group) {
      elements.children.forEach((element) => {
        PhaserInteractionHelperService.collideOneTorecursiveGroup(object, element, callback);
      });
    } else {
      if (object.level.physics.arcade) {
        if (typeof object.level.physics.arcade['collideHandler'] === 'function') {
          object.level.physics.arcade['collideHandler']
          (object, elements, callback, null, null, elements.overlapOnly ? elements.overlapOnly : false);
        }
      }
    }
  }
}
