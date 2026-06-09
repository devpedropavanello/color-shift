import Phaser from "phaser";
import {
  addColorShiftLogo,
  addNeonButton,
  addScreenTitle,
  createNeonBackground,
  FONT_FAMILY
} from "../theme/visualStyle";

export function addBackdrop(scene: Phaser.Scene): void {
  createNeonBackground(scene);
}

export function addTitle(scene: Phaser.Scene, y = 74): void {
  addColorShiftLogo(scene, y);

  scene.add
    .text(480, y + 176, "A cor é tudo", {
      fontFamily: FONT_FAMILY,
      fontSize: "28px",
      fontStyle: "800",
      color: "#F5F7FF",
      stroke: "#05070d",
      strokeThickness: 5
    })
    .setOrigin(0.5)
    .setDepth(31);
}

export function addButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void
): Phaser.GameObjects.Container {
  const lower = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const accent = lower.includes("credit")
    ? "yellow"
    : lower.includes("menu")
      ? "green"
      : lower.includes("instr")
        ? "blue"
        : "red";

  return addNeonButton(scene, x, y, label, onClick, accent);
}

export { addScreenTitle };
