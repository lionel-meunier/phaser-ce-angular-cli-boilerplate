import * as Phaser from 'phaser-ce';

export class PhaserInteractionHelperService {
  static collideOneTorecursiveGroup(object: any, elements: any, callback: any, debug?: boolean) {
    if (elements instanceof Phaser.Group) {
      elements.children.forEach((element) => {
        PhaserInteractionHelperService.collideOneTorecursiveGroup(object, element, callback, debug);
      });
    } else {
      if (object.level.physics.arcade) {
        if (typeof object.level.physics.arcade['collideHandler'] === 'function') {
          let overlapOnly = false;
          if (elements.overlapOnly) {
            overlapOnly = true;
          } else if (object.overlapOnly) {
            overlapOnly = true;
          }
          object.level.physics.arcade['collideHandler']
          (object, elements, callback, null, null, overlapOnly);
        }
      }
    }
  }
}
