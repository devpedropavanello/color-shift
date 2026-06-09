import Phaser from "phaser";
import { getColorName } from "../data/colors";
import { gameState, getOwnedKeys } from "../data/gameState";
import { COLOR_CSS, PALETTE } from "../theme/palette";
import { FONT_FAMILY } from "../theme/visualStyle";

const TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: FONT_FAMILY,
  fontSize: "18px",
  color: "#f8fafc",
  stroke: "#05070d",
  strokeThickness: 4
};

export class HUD {
  private readonly livesText: Phaser.GameObjects.Text;
  private readonly scoreText: Phaser.GameObjects.Text;
  private readonly colorText: Phaser.GameObjects.Text;
  private readonly keysText: Phaser.GameObjects.Text;
  private readonly messageText: Phaser.GameObjects.Text;
  private readonly messagePanel: Phaser.GameObjects.Rectangle;
  private clearMessageEvent?: Phaser.Time.TimerEvent;

  constructor(
    private readonly scene: Phaser.Scene,
    levelTitle: string
  ) {
    const panel = scene.add
      .rectangle(480, 47, 936, 72, PALETTE.panel, 0.86)
      .setScrollFactor(0)
      .setDepth(100);
    panel.setStrokeStyle(2, PALETTE.outline, 0.28);

    scene.add.rectangle(480, 86, 936, 2, PALETTE.blue, 0.28).setScrollFactor(0).setDepth(101);

    for (const x of [134, 292, 535, 756]) {
      scene.add.rectangle(x, 56, 1, 42, PALETTE.outline, 0.16).setScrollFactor(0).setDepth(101);
    }

    scene.add
      .text(24, 19, levelTitle.toUpperCase(), {
        ...TEXT_STYLE,
        fontSize: "15px",
        fontStyle: "700",
        color: "#AAB3CC"
      })
      .setScrollFactor(0)
      .setDepth(101);

    this.livesText = scene.add.text(24, 50, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.scoreText = scene.add.text(154, 50, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.colorText = scene.add.text(314, 50, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.keysText = scene.add.text(558, 50, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);

    this.messagePanel = scene.add
      .rectangle(480, 115, 620, 40, PALETTE.panel, 0.9)
      .setScrollFactor(0)
      .setDepth(100)
      .setVisible(false);
    this.messagePanel.setStrokeStyle(2, PALETTE.outline, 0.24);

    this.messageText = scene.add
      .text(480, 115, "", {
        ...TEXT_STYLE,
        fontSize: "20px",
        fontStyle: "700",
        align: "center"
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(101)
      .setVisible(false);

    this.update();
  }

  update(): void {
    this.livesText.setText(`Vidas: ${gameState.lives}`);
    this.scoreText.setText(`Score: ${gameState.score}`);
    this.colorText.setText(`Cor atual: ${getColorName(gameState.playerColor)}`);
    this.colorText.setColor(COLOR_CSS[gameState.playerColor]);

    const ownedKeys = getOwnedKeys();
    this.keysText.setText(
      ownedKeys.length > 0 ? `Chaves: ${ownedKeys.map(getColorName).join(", ")}` : "Chaves: nenhuma"
    );
  }

  showMessage(message: string, duration = 1600, color = "#f8fafc"): void {
    this.messagePanel.setVisible(true).setAlpha(1);
    this.messageText.setVisible(true).setAlpha(1);
    this.messageText.setText(message).setColor(color);
    this.messageText.setScale(0.95);
    this.scene.tweens.add({
      targets: this.messageText,
      scale: 1,
      duration: 120,
      ease: "Back.Out"
    });

    this.clearMessageEvent?.remove(false);
    this.clearMessageEvent = this.scene.time.delayedCall(duration, () => {
      this.scene.tweens.add({
        targets: [this.messagePanel, this.messageText],
        alpha: 0,
        duration: 220,
        ease: "Sine.Out",
        onComplete: () => {
          this.messageText.setText("").setVisible(false);
          this.messagePanel.setVisible(false);
        }
      });
    });
  }
}
