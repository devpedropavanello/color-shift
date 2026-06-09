import Phaser from "phaser";
import { addBackdrop, addButton } from "./SceneUI";

const TEAM_MEMBERS = [
  "Pedro Henrique Guimarães Pavanello",
  "Bryan Brum Paz",
  "Gustavo Mautoni"
];

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  create(): void {
    addBackdrop(this);

    this.add
      .text(480, 52, "Creditos", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "48px",
        color: "#f8fafc",
        stroke: "#05070d",
        strokeThickness: 6
      })
      .setOrigin(0.5);

    this.add
      .rectangle(480, 264, 760, 318, 0x111827, 0.82)
      .setStrokeStyle(2, 0xf8fafc, 0.12);

    this.add
      .text(480, 120, "Desenvolvimento", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        color: "#f9d94a",
        stroke: "#05070d",
        strokeThickness: 4
      })
      .setOrigin(0.5);

    this.add
      .text(
        480,
        160,
        TEAM_MEMBERS,
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "23px",
          color: "#e2e8f0",
          align: "center",
          lineSpacing: 9
        }
      )
      .setOrigin(0.5, 0);

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 0.16);
    graphics.lineBetween(150, 272, 810, 272);

    this.add
      .text(260, 304, "Game Jam", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        color: "#45d483"
      })
      .setOrigin(0.5);

    this.add
      .text(260, 336, "Game Dev Cafe Game Jam 2026", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        color: "#e2e8f0",
        align: "center"
      })
      .setOrigin(0.5);

    this.add
      .text(700, 304, "Tema", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        color: "#277dff"
      })
      .setOrigin(0.5);

    this.add
      .text(700, 336, "A cor e tudo", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        color: "#e2e8f0"
      })
      .setOrigin(0.5);

    this.add
      .text(
        480,
        390,
        "Assets: elementos visuais criados com formas geometricas via codigo usando Phaser.",
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "17px",
          color: "#cbd5e1",
          align: "center",
          wordWrap: { width: 680 }
        }
      )
      .setOrigin(0.5);

    addButton(this, 480, 486, "Voltar ao menu", () => this.scene.start("MenuScene"));
    this.input.keyboard!.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
