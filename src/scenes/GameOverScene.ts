import Phaser from "phaser";
import { gameState, getLevelSceneKey, resetGame } from "../data/gameState";
import { addBackdrop, addButton } from "./SceneUI";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create(): void {
    addBackdrop(this);

    const failedLevel = Phaser.Math.Clamp(gameState.currentLevel, 1, 3);

    this.add
      .text(480, 104, "Game Over", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "64px",
        color: "#f94144",
        stroke: "#05070d",
        strokeThickness: 8
      })
      .setOrigin(0.5);

    this.add
      .text(480, 194, `Pontuacao: ${gameState.score}`, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "30px",
        color: "#f8fafc"
      })
      .setOrigin(0.5);

    this.add
      .text(480, 238, "Tente trocar para a cor certa antes de tocar em perigos.", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "22px",
        color: "#cbd5e1"
      })
      .setOrigin(0.5);

    addButton(this, 480, 330, "Tentar novamente", () => {
      resetGame(failedLevel);
      this.scene.start(getLevelSceneKey(failedLevel));
    });
    addButton(this, 480, 402, "Voltar ao menu", () => this.scene.start("MenuScene"));

    this.input.keyboard!.once("keydown-R", () => {
      resetGame(failedLevel);
      this.scene.start(getLevelSceneKey(failedLevel));
    });
    this.input.keyboard!.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
