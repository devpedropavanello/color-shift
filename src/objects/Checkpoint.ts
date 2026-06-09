import Phaser from "phaser";

export class Checkpoint extends Phaser.Physics.Arcade.Sprite {
  public activated = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "checkpoint");
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.setDepth(4);

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(34, 54);
    body.setOffset(4, 1);
    body.updateFromGameObject();
  }

  activate(): void {
    if (this.activated) {
      return;
    }

    this.activated = true;
    this.setTint(0xffffff);
    this.scene.tweens.add({
      targets: this,
      scale: 1.15,
      yoyo: true,
      duration: 140,
      ease: "Back.Out"
    });
  }
}
