import Phaser from "phaser";
import { COLOR_DATA, COLOR_ORDER } from "../data/colors";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create(): void {
    this.createGeneratedTextures();
    this.scene.start("MenuScene");
  }

  private createGeneratedTextures(): void {
    const graphics = this.add.graphics();

    for (const color of COLOR_ORDER) {
      const data = COLOR_DATA[color];

      graphics.clear();
      graphics.fillStyle(data.hex, 1);
      graphics.fillRoundedRect(2, 2, 28, 28, 5);
      graphics.lineStyle(2, 0xffffff, 0.9);
      graphics.strokeRoundedRect(2, 2, 28, 28, 5);
      graphics.lineStyle(2, data.darkHex, 0.75);
      graphics.lineBetween(9, 22, 23, 8);
      graphics.generateTexture(`player-${color}`, 32, 32);

      graphics.clear();
      graphics.fillStyle(data.hex, 1);
      graphics.beginPath();
      graphics.moveTo(16, 2);
      graphics.lineTo(30, 16);
      graphics.lineTo(16, 30);
      graphics.lineTo(2, 16);
      graphics.closePath();
      graphics.fillPath();
      graphics.lineStyle(2, 0xffffff, 0.95);
      graphics.strokePath();
      graphics.fillCircle(22, 16, 4);
      graphics.generateTexture(`key-${color}`, 32, 32);

      graphics.clear();
      graphics.fillStyle(data.darkHex, 1);
      graphics.fillRoundedRect(3, 0, 42, 84, 8);
      graphics.fillStyle(data.hex, 0.92);
      graphics.fillRoundedRect(8, 7, 32, 72, 5);
      graphics.lineStyle(3, 0xffffff, 0.82);
      graphics.strokeRoundedRect(3, 0, 42, 84, 8);
      graphics.fillStyle(0x05070d, 0.8);
      graphics.fillCircle(34, 43, 4);
      graphics.generateTexture(`door-${color}`, 48, 86);

      graphics.clear();
      graphics.fillStyle(data.hex, 1);
      graphics.fillCircle(16, 16, 14);
      graphics.lineStyle(2, 0xffffff, 0.95);
      graphics.strokeCircle(16, 16, 14);
      graphics.fillStyle(0x05070d, 1);
      graphics.fillCircle(11, 13, 2);
      graphics.fillCircle(21, 13, 2);
      graphics.lineStyle(2, 0x05070d, 1);
      graphics.lineBetween(10, 22, 22, 22);
      graphics.generateTexture(`enemy-${color}`, 32, 32);
    }

    graphics.clear();
    graphics.fillStyle(0xf8fafc, 1);
    graphics.fillRect(8, 4, 4, 50);
    graphics.fillStyle(0xf9d94a, 1);
    graphics.fillTriangle(12, 6, 38, 17, 12, 28);
    graphics.lineStyle(2, 0x05070d, 0.8);
    graphics.strokeRect(8, 4, 4, 50);
    graphics.lineBetween(12, 6, 38, 17);
    graphics.lineBetween(38, 17, 12, 28);
    graphics.generateTexture("checkpoint", 44, 58);

    graphics.clear();
    graphics.fillStyle(0xf8fafc, 1);
    graphics.fillCircle(24, 24, 18);
    graphics.lineStyle(4, 0xf9d94a, 1);
    graphics.strokeCircle(24, 24, 18);
    graphics.fillStyle(0xf9d94a, 1);
    graphics.fillTriangle(24, 2, 30, 18, 18, 18);
    graphics.fillTriangle(24, 46, 18, 30, 30, 30);
    graphics.generateTexture("goal", 48, 48);

    graphics.destroy();
  }
}
