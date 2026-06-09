import Phaser from "phaser";
import { COLOR_DATA, type PlayerColor } from "../data/colors";

export function createColorBurst(
  scene: Phaser.Scene,
  x: number,
  y: number,
  color: PlayerColor,
  amount = 14,
  radius = 46
): void {
  const hex = COLOR_DATA[color].hex;

  for (let i = 0; i < amount; i += 1) {
    const angle = (Math.PI * 2 * i) / amount;
    const distance = Phaser.Math.Between(radius * 0.45, radius);
    const spark = scene.add
      .rectangle(x, y, Phaser.Math.Between(4, 8), Phaser.Math.Between(4, 8), hex, 0.95)
      .setDepth(40);

    scene.tweens.add({
      targets: spark,
      x: x + Math.cos(angle) * distance,
      y: y + Math.sin(angle) * distance,
      angle: Phaser.Math.Between(-140, 140),
      alpha: 0,
      scale: 0.15,
      duration: Phaser.Math.Between(260, 420),
      ease: "Sine.Out",
      onComplete: () => spark.destroy()
    });
  }
}

export function createFloatingText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  color = "#F5F7FF"
): void {
  const label = scene.add
    .text(x, y, text, {
      fontFamily: '"Inter", "Segoe UI", "Trebuchet MS", sans-serif',
      fontSize: "20px",
      fontStyle: "700",
      color,
      stroke: "#05070d",
      strokeThickness: 5
    })
    .setOrigin(0.5)
    .setDepth(80);

  scene.tweens.add({
    targets: label,
    y: y - 42,
    alpha: 0,
    scale: 1.18,
    duration: 780,
    ease: "Cubic.Out",
    onComplete: () => label.destroy()
  });
}

export function pulseObject(scene: Phaser.Scene, target: Phaser.GameObjects.GameObject, scale = 1.12): void {
  scene.tweens.add({
    targets: target,
    scale,
    yoyo: true,
    duration: 130,
    ease: "Back.Out"
  });
}

export function createSmallCameraShake(scene: Phaser.Scene): void {
  scene.cameras.main.shake(180, 0.008);
}
