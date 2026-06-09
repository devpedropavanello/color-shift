import Phaser from "phaser";
import { gameState, resetGame } from "../data/gameState";
import { createColorBurst } from "../theme/effects";
import { PALETTE } from "../theme/palette";
import { addNeonPanel, FONT_FAMILY } from "../theme/visualStyle";
import { addBackdrop, addButton } from "./SceneUI";

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super("VictoryScene");
  }

  create(): void {
    addBackdrop(this);
    addNeonPanel(this, 480, 242, 700, 280, 24);

    this.time.delayedCall(120, () => {
      createColorBurst(this, 360, 120, "red", 16, 74);
      createColorBurst(this, 440, 120, "blue", 16, 74);
      createColorBurst(this, 520, 120, "green", 16, 74);
      createColorBurst(this, 600, 120, "yellow", 16, 74);
    });

    this.add
      .text(480, 106, "VITÓRIA!", {
        fontFamily: FONT_FAMILY,
        fontSize: "64px",
        fontStyle: "900",
        color: "#FFD43B",
        stroke: "#05070d",
        strokeThickness: 8
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add
      .text(480, 184, "Você provou que, nesse mundo, a cor é tudo.", {
        fontFamily: FONT_FAMILY,
        fontSize: "25px",
        fontStyle: "700",
        color: "#F5F7FF",
        align: "center"
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.add.rectangle(480, 230, 460, 2, PALETTE.outline, 0.18).setDepth(30);

    this.add
      .text(480, 266, `Pontuação final: ${gameState.score}`, {
        fontFamily: FONT_FAMILY,
        fontSize: "32px",
        fontStyle: "900",
        color: "#32E875",
        stroke: "#05070d",
        strokeThickness: 5
      })
      .setOrigin(0.5)
      .setDepth(30);

    addButton(this, 480, 354, "Jogar novamente", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 480, 420, "Créditos", () => this.scene.start("CreditsScene"));
    addButton(this, 480, 486, "Menu", () => this.scene.start("MenuScene"));
  }
}
