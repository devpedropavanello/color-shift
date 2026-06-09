import Phaser from "phaser";
import type { PlayerColor } from "../data/colors";

export class ColorDoor extends Phaser.Physics.Arcade.Sprite {
  public isOpen = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public readonly color: PlayerColor
  ) {
    super(scene, x, y, `door-${color}`);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDepth(5);
    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(48, 88);
    body.setOffset(8, 8);
    body.updateFromGameObject();
  }

  open(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.12,
      scaleY: 0.92,
      yoyo: true,
      duration: 90,
      ease: "Sine.Out"
    });
    this.scene.tweens.add({
      targets: this,
      y: this.y - 40,
      alpha: 0,
      duration: 260,
      ease: "Cubic.Out",
      onComplete: () => this.disableBody(true, true)
    });
  }
}
