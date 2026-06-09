import Phaser from "phaser";
import { gameState, resetGame } from "../data/gameState";
import { addBackdrop, addButton } from "./SceneUI";

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super("VictoryScene");
  }

  create(): void {
    addBackdrop(this);

    this.add
      .text(480, 98, "Vitória!", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "64px",
        color: "#f9d94a",
        stroke: "#05070d",
        strokeThickness: 8
      })
      .setOrigin(0.5);

    this.add
      .text(480, 188, "Você provou que, nesse mundo, a cor é tudo.", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "26px",
        color: "#f8fafc",
        align: "center"
      })
      .setOrigin(0.5);

    this.add
      .text(480, 246, `Pontuação final: ${gameState.score}`, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "32px",
        color: "#45d483",
        stroke: "#05070d",
        strokeThickness: 5
      })
      .setOrigin(0.5);

    addButton(this, 480, 340, "Jogar novamente", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 480, 408, "Créditos", () => this.scene.start("CreditsScene"));
    addButton(this, 480, 476, "Menu", () => this.scene.start("MenuScene"));
  }
}
