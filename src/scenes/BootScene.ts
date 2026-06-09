import Phaser from "phaser";
import { COLOR_DATA, COLOR_ORDER } from "../data/colors";
import { PALETTE } from "../theme/palette";

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
      graphics.fillStyle(data.hex, 0.22);
      graphics.fillCircle(22, 25, 22);
      graphics.fillStyle(PALETTE.outline, 1);
      graphics.fillRoundedRect(9, 18, 26, 29, 8);
      graphics.fillRoundedRect(7, 6, 30, 24, 9);
      graphics.fillRoundedRect(2, 14, 8, 13, 5);
      graphics.fillRoundedRect(34, 14, 8, 13, 5);
      graphics.fillStyle(0x05070d, 1);
      graphics.fillRoundedRect(12, 11, 20, 13, 6);
      graphics.fillStyle(0xf5f7ff, 1);
      graphics.fillRoundedRect(16, 15, 5, 6, 3);
      graphics.fillRoundedRect(25, 15, 5, 6, 3);
      graphics.fillStyle(data.hex, 0.34);
      graphics.fillRoundedRect(5, 34, 8, 13, 4);
      graphics.fillRoundedRect(31, 34, 8, 13, 4);
      graphics.fillStyle(0x05070d, 1);
      graphics.fillRoundedRect(15, 31, 14, 14, 3);
      graphics.fillStyle(COLOR_DATA.red.hex, 1);
      graphics.fillRect(17, 33, 5, 5);
      graphics.fillStyle(COLOR_DATA.blue.hex, 1);
      graphics.fillRect(23, 33, 5, 5);
      graphics.fillStyle(COLOR_DATA.green.hex, 1);
      graphics.fillRect(17, 39, 5, 5);
      graphics.fillStyle(COLOR_DATA.yellow.hex, 1);
      graphics.fillRect(23, 39, 5, 5);
      graphics.lineStyle(3, data.hex, 0.95);
      graphics.strokeRoundedRect(7, 6, 30, 24, 9);
      graphics.strokeRoundedRect(9, 18, 26, 29, 8);
      graphics.lineStyle(1, 0xffffff, 0.88);
      graphics.lineBetween(14, 19, 30, 8);
      graphics.generateTexture(`player-${color}`, 44, 52);

      graphics.clear();
      graphics.fillStyle(data.hex, 0.2);
      graphics.fillCircle(25, 20, 23);
      graphics.lineStyle(5, data.hex, 1);
      graphics.strokeCircle(23, 18, 12);
      graphics.lineStyle(4, 0xf5f7ff, 0.95);
      graphics.strokeCircle(23, 18, 8);
      graphics.lineStyle(7, data.hex, 1);
      graphics.lineBetween(32, 27, 45, 40);
      graphics.lineBetween(42, 37, 50, 33);
      graphics.lineBetween(37, 32, 43, 28);
      graphics.lineStyle(3, 0xf5f7ff, 0.9);
      graphics.lineBetween(31, 26, 45, 40);
      graphics.generateTexture(`key-${color}`, 56, 56);

      graphics.clear();
      graphics.fillStyle(data.hex, 0.16);
      graphics.fillRoundedRect(2, 2, 60, 98, 18);
      graphics.fillStyle(0x111827, 1);
      graphics.fillRoundedRect(7, 8, 50, 90, 18);
      graphics.fillStyle(data.darkHex, 1);
      graphics.fillRoundedRect(13, 16, 38, 78, 15);
      graphics.fillStyle(data.hex, 0.82);
      graphics.fillRoundedRect(17, 21, 30, 68, 12);
      graphics.fillStyle(0x05070d, 0.66);
      graphics.fillRoundedRect(22, 29, 20, 52, 10);
      graphics.lineStyle(4, data.hex, 1);
      graphics.strokeRoundedRect(13, 16, 38, 78, 15);
      graphics.lineStyle(2, 0xf5f7ff, 0.82);
      graphics.strokeRoundedRect(7, 8, 50, 90, 18);
      graphics.fillStyle(0xf5f7ff, 1);
      graphics.fillCircle(32, 55, 6);
      graphics.fillRect(29, 60, 6, 12);
      graphics.fillStyle(data.hex, 1);
      graphics.fillCircle(32, 55, 3);
      graphics.generateTexture(`door-${color}`, 64, 102);

      graphics.clear();
      graphics.fillStyle(data.hex, 0.2);
      graphics.fillCircle(22, 20, 20);
      if (color === "green") {
        graphics.fillStyle(data.hex, 1);
        graphics.fillTriangle(10, 10, 15, 1, 20, 10);
        graphics.fillTriangle(22, 9, 27, 0, 32, 9);
      }
      if (color === "yellow") {
        graphics.lineStyle(3, data.hex, 1);
        graphics.lineBetween(13, 6, 8, 0);
        graphics.lineBetween(31, 6, 36, 0);
        graphics.fillStyle(data.hex, 1);
        graphics.fillCircle(8, 0, 3);
        graphics.fillCircle(36, 0, 3);
      }
      graphics.fillStyle(data.hex, 1);
      graphics.fillRoundedRect(5, 8, 34, 27, 8);
      graphics.fillStyle(data.darkHex, 0.58);
      graphics.fillRoundedRect(5, 24, 34, 11, 6);
      graphics.lineStyle(2, 0xf5f7ff, 0.92);
      graphics.strokeRoundedRect(5, 8, 34, 27, 8);
      graphics.fillStyle(0xf5f7ff, 1);
      graphics.fillRoundedRect(15, 15, 15, 10, 5);
      graphics.fillStyle(0x05070d, 1);
      graphics.fillCircle(24, 20, 3);
      graphics.lineStyle(3, 0x05070d, 1);
      graphics.lineBetween(13, 15, 24, 13);
      graphics.fillStyle(0x05070d, 0.7);
      graphics.fillRoundedRect(11, 34, 7, 4, 2);
      graphics.fillRoundedRect(27, 34, 7, 4, 2);
      graphics.generateTexture(`enemy-${color}`, 44, 40);
    }

    graphics.clear();
    graphics.fillStyle(PALETTE.yellow, 0.18);
    graphics.fillCircle(22, 28, 22);
    graphics.fillStyle(PALETTE.outline, 1);
    graphics.fillRoundedRect(8, 4, 5, 50, 2);
    graphics.fillStyle(PALETTE.yellow, 1);
    graphics.fillTriangle(13, 7, 40, 18, 13, 30);
    graphics.lineStyle(2, PALETTE.black, 0.8);
    graphics.strokeRect(8, 4, 5, 50);
    graphics.lineBetween(13, 7, 40, 18);
    graphics.lineBetween(40, 18, 13, 30);
    graphics.generateTexture("checkpoint", 44, 58);

    graphics.clear();
    graphics.fillStyle(PALETTE.white, 0.16);
    graphics.fillCircle(24, 24, 22);
    graphics.fillStyle(PALETTE.outline, 1);
    graphics.fillCircle(24, 24, 17);
    graphics.fillStyle(PALETTE.black, 1);
    graphics.fillCircle(24, 24, 10);
    graphics.lineStyle(4, PALETTE.yellow, 1);
    graphics.strokeCircle(24, 24, 18);
    graphics.fillStyle(PALETTE.yellow, 1);
    graphics.fillTriangle(24, 2, 30, 18, 18, 18);
    graphics.fillTriangle(24, 46, 18, 30, 30, 30);
    graphics.generateTexture("goal", 48, 48);

    graphics.destroy();
  }
}
