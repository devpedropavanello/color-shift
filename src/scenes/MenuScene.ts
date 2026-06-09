import Phaser from "phaser";
import { resetGame } from "../data/gameState";
import { FONT_FAMILY } from "../theme/visualStyle";
import { addBackdrop, addButton, addTitle } from "./SceneUI";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create(): void {
    addBackdrop(this);
    addTitle(this, 54);

    this.add
      .text(480, 272, "Troque de cor para coletar chaves, abrir portas e sobreviver.", {
        fontFamily: FONT_FAMILY,
        fontSize: "21px",
        fontStyle: "700",
        color: "#AAB3CC",
        align: "center"
      })
      .setOrigin(0.5)
      .setDepth(32);

    addButton(this, 480, 334, "Jogar", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 480, 394, "Instruções", () => this.scene.start("InstructionsScene"));
    addButton(this, 480, 454, "Créditos", () => this.scene.start("CreditsScene"));

    this.add
      .text(480, 512, "Game Dev Café Game Jam 2026 - Tema: A cor é tudo", {
        fontFamily: FONT_FAMILY,
        fontSize: "17px",
        color: "#AAB3CC"
      })
      .setOrigin(0.5)
      .setDepth(32);
  }
}
