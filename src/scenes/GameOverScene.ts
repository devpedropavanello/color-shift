import Phaser from "phaser";
import { gameState, getLevelSceneKey, resetGame } from "../data/gameState";
import { PALETTE } from "../theme/palette";
import { addNeonPanel, FONT_FAMILY } from "../theme/visualStyle";
import { addBackdrop, addButton } from "./SceneUI";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create(): void {
    addBackdrop(this);

    const failedLevel = Phaser.Math.Clamp(gameState.currentLevel, 1, 3);
    addNeonPanel(this, 480, 242, 700, 268, 24);

    this.add
      .text(480, 106, "GAME OVER", {
        fontFamily: FONT_FAMILY,
        fontSize: "64px",
        fontStyle: "900",
        color: "#FF304F",
        stroke: "#05070d",
        strokeThickness: 8
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(480, 190, `Pontuação: ${gameState.score}`, {
        fontFamily: FONT_FAMILY,
        fontSize: "30px",
        fontStyle: "900",
        color: "#F5F7FF"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add.rectangle(480, 226, 460, 2, PALETTE.outline, 0.16).setDepth(30);

    this.add
      .text(480, 260, "Tente trocar para a cor certa antes de tocar nos perigos.", {
        fontFamily: FONT_FAMILY,
        fontSize: "21px",
        fontStyle: "700",
        color: "#AAB3CC"
      })
      .setOrigin(0.5)
      .setDepth(30);

    addButton(this, 480, 352, "Tentar novamente", () => {
      resetGame(failedLevel);
      this.scene.start(getLevelSceneKey(failedLevel));
    });
    addButton(this, 480, 422, "Voltar ao menu", () => this.scene.start("MenuScene"));

    this.input.keyboard!.once("keydown-R", () => {
      resetGame(failedLevel);
      this.scene.start(getLevelSceneKey(failedLevel));
    });
    this.input.keyboard!.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
