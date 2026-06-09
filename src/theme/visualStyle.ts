import Phaser from "phaser";
import { COLOR_CSS, COLOR_HEX, PALETTE, type NeonColorName } from "./palette";

export const FONT_FAMILY = '"Inter", "Segoe UI", "Trebuchet MS", sans-serif';

export const TEXT_COLORS = {
  primary: "#F5F7FF",
  secondary: "#AAB3CC",
  dark: "#05070D"
};

export function createNeonBackground(scene: Phaser.Scene, width = 960, height = 540): void {
  scene.add.rectangle(width / 2, height / 2, width, height, PALETTE.background).setDepth(-20);

  const glow = scene.add.graphics().setDepth(-19);
  glow.fillStyle(PALETTE.red, 0.14);
  glow.fillCircle(width * 0.14, height * 0.25, 145);
  glow.fillStyle(PALETTE.blue, 0.14);
  glow.fillCircle(width * 0.86, height * 0.23, 170);
  glow.fillStyle(PALETTE.green, 0.11);
  glow.fillCircle(width * 0.25, height * 0.82, 135);
  glow.fillStyle(PALETTE.yellow, 0.11);
  glow.fillCircle(width * 0.74, height * 0.78, 145);

  const grid = scene.add.graphics().setDepth(-18);
  for (let x = 0; x <= width; x += 64) {
    grid.lineStyle(1, PALETTE.grid, x % 128 === 0 ? 0.38 : 0.18);
    grid.lineBetween(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += 64) {
    grid.lineStyle(1, PALETTE.grid, y % 128 === 0 ? 0.38 : 0.18);
    grid.lineBetween(0, y, width, y);
  }

  const tech = scene.add.graphics().setDepth(-17);
  for (let i = 0; i < 28; i += 1) {
    const x = Phaser.Math.Between(30, width - 30);
    const y = Phaser.Math.Between(28, height - 28);
    const color = [PALETTE.red, PALETTE.blue, PALETTE.green, PALETTE.yellow][i % 4];
    tech.fillStyle(color, 0.2);
    tech.fillRect(x, y, Phaser.Math.Between(4, 9), Phaser.Math.Between(4, 9));
  }

  for (let i = 0; i < 12; i += 1) {
    const x = Phaser.Math.Between(80, width - 80);
    const y = Phaser.Math.Between(70, height - 80);
    const lineWidth = Phaser.Math.Between(56, 150);
    tech.lineStyle(2, PALETTE.outline, 0.08);
    tech.lineBetween(x, y, x + lineWidth, y);
    tech.lineBetween(x + lineWidth, y, x + lineWidth + 24, y + 24);
  }
}

export function addNeonPanel(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  depth = 20
): Phaser.GameObjects.Rectangle {
  const shadow = scene.add.rectangle(x + 4, y + 7, width, height, PALETTE.black, 0.42).setDepth(depth - 1);
  const panel = scene.add.rectangle(x, y, width, height, PALETTE.panel, 0.86).setDepth(depth);
  panel.setStrokeStyle(2, PALETTE.outline, 0.26);
  shadow.setStrokeStyle(1, PALETTE.blue, 0.16);
  return panel;
}

export function addScreenTitle(scene: Phaser.Scene, y: number, title: string, color = "#F5F7FF"): void {
  scene.add
    .text(480, y, title.toUpperCase(), {
      fontFamily: FONT_FAMILY,
      fontSize: "50px",
      fontStyle: "800",
      color,
      stroke: "#05070d",
      strokeThickness: 8
    })
    .setOrigin(0.5)
    .setDepth(30);
}

export function addColorShiftLogo(scene: Phaser.Scene, y = 78): void {
  const letters = [
    { value: "C", color: COLOR_CSS.red },
    { value: "O", color: COLOR_CSS.blue },
    { value: "L", color: COLOR_CSS.green },
    { value: "O", color: COLOR_CSS.yellow },
    { value: "R", color: COLOR_CSS.red }
  ];

  let x = 326;
  for (const letter of letters) {
    scene.add
      .text(x, y, letter.value, {
        fontFamily: FONT_FAMILY,
        fontSize: "72px",
        fontStyle: "900",
        color: letter.color,
        stroke: "#05070d",
        strokeThickness: 9
      })
      .setOrigin(0.5)
      .setDepth(30);
    x += 77;
  }

  scene.add
    .text(480, y + 78, "SHIFT", {
      fontFamily: FONT_FAMILY,
      fontSize: "76px",
      fontStyle: "900",
      color: "#F5F7FF",
      stroke: "#05070d",
      strokeThickness: 10
    })
    .setOrigin(0.5)
    .setDepth(30);

  const bars = [
    { x: 392, color: PALETTE.red },
    { x: 452, color: PALETTE.blue },
    { x: 512, color: PALETTE.green },
    { x: 572, color: PALETTE.yellow }
  ];
  for (const bar of bars) {
    scene.add.rectangle(bar.x, y + 138, 42, 8, bar.color, 1).setDepth(30);
  }
}

export function addNeonButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void,
  accent: NeonColorName = "blue"
): Phaser.GameObjects.Container {
  const glow = scene.add.rectangle(0, 0, 236, 52, COLOR_HEX[accent], 0.12);
  const base = scene.add.rectangle(0, 0, 226, 48, PALETTE.panel, 0.94);
  base.setStrokeStyle(2, COLOR_HEX[accent], 0.78);
  const text = scene.add
    .text(0, 0, label, {
      fontFamily: FONT_FAMILY,
      fontSize: "25px",
      fontStyle: "800",
      color: "#F5F7FF"
    })
    .setOrigin(0.5);

  const container = scene.add.container(x, y, [glow, base, text]).setDepth(35);
  container.setSize(236, 54).setInteractive({ useHandCursor: true });

  container.on("pointerover", () => {
    glow.setAlpha(0.38);
    base.setFillStyle(PALETTE.panelSoft, 0.98);
    text.setColor(COLOR_CSS[accent]);
    scene.tweens.add({ targets: container, scale: 1.04, duration: 120, ease: "Sine.Out" });
  });
  container.on("pointerout", () => {
    glow.setAlpha(0.12);
    base.setFillStyle(PALETTE.panel, 0.94);
    text.setColor("#F5F7FF");
    scene.tweens.add({ targets: container, scale: 1, duration: 120, ease: "Sine.Out" });
  });
  container.on("pointerdown", onClick);

  return container;
}
