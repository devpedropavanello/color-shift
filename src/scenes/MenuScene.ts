import Phaser from "phaser";
import { resetGame } from "../data/gameState";
import { addBackdrop, addButton, addTitle } from "./SceneUI";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create(): void {
    addBackdrop(this);
    addTitle(this);

    this.add
      .text(480, 194, "Troque de cor para coletar, abrir portas e sobreviver.", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "22px",
        color: "#e2e8f0",
        align: "center"
      })
      .setOrigin(0.5);

    addButton(this, 480, 270, "Jogar", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 480, 338, "Instruções", () => this.scene.start("InstructionsScene"));
    addButton(this, 480, 406, "Créditos", () => this.scene.start("CreditsScene"));

    this.add
      .text(480, 490, "Game Dev Café Game Jam 2026 - Tema: A cor é tudo", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "18px",
        color: "#94a3b8"
      })
      .setOrigin(0.5);
  }
}
