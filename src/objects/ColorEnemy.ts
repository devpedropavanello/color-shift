import Phaser from "phaser";
import type { PlayerColor } from "../data/colors";

export class ColorEnemy extends Phaser.Physics.Arcade.Sprite {
  private readonly spawnX: number;
  private direction = 1;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public readonly color: PlayerColor,
    private readonly range = 80,
    private readonly speed = 55
  ) {
    super(scene, x, y, `enemy-${color}`);
    this.spawnX = x;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(7);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    body.setSize(34, 30);
    body.setOffset(5, 8);
    body.setVelocityX(this.speed);
  }

  update(): void {
    if (!this.active) {
      return;
    }

    const body = this.body as Phaser.Physics.Arcade.Body;
    if (this.x > this.spawnX + this.range) {
      this.direction = -1;
    } else if (this.x < this.spawnX - this.range) {
      this.direction = 1;
    }

    body.setVelocityX(this.speed * this.direction);
  }

  defeat(): void {
    this.disableBody(true, true);
  }
}
