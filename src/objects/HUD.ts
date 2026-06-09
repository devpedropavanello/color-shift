import Phaser from "phaser";
import { getColorName } from "../data/colors";
import { gameState, getOwnedKeys } from "../data/gameState";

const TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: "Trebuchet MS, Verdana, sans-serif",
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
  private clearMessageEvent?: Phaser.Time.TimerEvent;

  constructor(
    private readonly scene: Phaser.Scene,
    levelTitle: string
  ) {
    const panel = scene.add
      .rectangle(12, 12, 936, 82, 0x05070d, 0.68)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(100);
    panel.setStrokeStyle(2, 0x293244, 0.9);

    scene.add
      .text(24, 20, levelTitle, {
        ...TEXT_STYLE,
        fontSize: "16px",
        color: "#cbd5e1"
      })
      .setScrollFactor(0)
      .setDepth(101);

    this.livesText = scene.add.text(24, 48, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.scoreText = scene.add.text(150, 48, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.colorText = scene.add.text(310, 48, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.keysText = scene.add.text(560, 48, "", TEXT_STYLE).setScrollFactor(0).setDepth(101);
    this.messageText = scene.add
      .text(480, 104, "", {
        ...TEXT_STYLE,
        fontSize: "20px",
        align: "center"
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(101);

    this.update();
  }

  update(): void {
    this.livesText.setText(`Vidas: ${gameState.lives}`);
    this.scoreText.setText(`Score: ${gameState.score}`);
    this.colorText.setText(`Cor atual: ${getColorName(gameState.playerColor)}`);

    const ownedKeys = getOwnedKeys();
    this.keysText.setText(
      ownedKeys.length > 0 ? `Chaves: ${ownedKeys.map(getColorName).join(", ")}` : "Chaves: nenhuma"
    );
  }

  showMessage(message: string, duration = 1600, color = "#f8fafc"): void {
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
      this.messageText.setText("");
    });
  }
}
