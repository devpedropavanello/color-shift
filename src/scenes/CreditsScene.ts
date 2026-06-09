import Phaser from "phaser";
import { PALETTE } from "../theme/palette";
import { addNeonPanel, addScreenTitle, FONT_FAMILY } from "../theme/visualStyle";
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
    addScreenTitle(this, 54, "Créditos", "#F5F7FF");
    addNeonPanel(this, 480, 266, 780, 318, 24);

    this.add
      .text(480, 120, "DESENVOLVIMENTO", {
        fontFamily: FONT_FAMILY,
        fontSize: "24px",
        fontStyle: "900",
        color: "#FFD43B",
        stroke: "#05070d",
        strokeThickness: 4
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(480, 158, TEAM_MEMBERS, {
        fontFamily: FONT_FAMILY,
        fontSize: "23px",
        fontStyle: "700",
        color: "#E2E8F0",
        align: "center",
        lineSpacing: 9
      })
      .setOrigin(0.5, 0)
      .setDepth(30);

    this.add.rectangle(480, 274, 660, 1, PALETTE.outline, 0.16).setDepth(30);

    this.add
      .text(260, 308, "GAME JAM", {
        fontFamily: FONT_FAMILY,
        fontSize: "20px",
        fontStyle: "900",
        color: "#32E875"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(260, 340, "Game Dev Café Game Jam 2026", {
        fontFamily: FONT_FAMILY,
        fontSize: "19px",
        fontStyle: "700",
        color: "#E2E8F0",
        align: "center"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(700, 308, "TEMA", {
        fontFamily: FONT_FAMILY,
        fontSize: "20px",
        fontStyle: "900",
        color: "#2F80FF"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(700, 340, "A cor é tudo", {
        fontFamily: FONT_FAMILY,
        fontSize: "19px",
        fontStyle: "700",
        color: "#E2E8F0"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(
        480,
        402,
        "Assets: elementos visuais criados com formas geométricas via código usando Phaser. Nenhum asset gerado por IA foi usado no jogo.",
        {
          fontFamily: FONT_FAMILY,
          fontSize: "17px",
          fontStyle: "700",
          color: "#AAB3CC",
          align: "center",
          wordWrap: { width: 680 }
        }
      )
      .setOrigin(0.5)
      .setDepth(30);

    addButton(this, 480, 492, "Voltar ao menu", () => this.scene.start("MenuScene"));
    this.input.keyboard!.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
