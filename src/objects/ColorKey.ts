import Phaser from "phaser";
import type { PlayerColor } from "../data/colors";

export class ColorKey extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public readonly color: PlayerColor
  ) {
    super(scene, x, y, `key-${color}`);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(6);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    body.setSize(34, 34);
    body.setOffset(11, 10);

    scene.tweens.add({
      targets: this,
      y: y - 8,
      angle: 6,
      yoyo: true,
      repeat: -1,
      duration: 900,
      ease: "Sine.InOut"
    });
  }

  collect(): void {
    this.disableBody(true, true);
  }
}
