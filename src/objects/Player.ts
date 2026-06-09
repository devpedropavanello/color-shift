import Phaser from "phaser";
import { COLOR_DATA, type PlayerColor } from "../data/colors";
import { gameState, setPlayerColor } from "../data/gameState";

type PlayerKeyMap = Record<"left" | "right" | "up" | "jump" | "red" | "blue" | "green" | "yellow", Phaser.Input.Keyboard.Key>;

export class Player extends Phaser.Physics.Arcade.Sprite {
  public currentColor: PlayerColor;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly keys: PlayerKeyMap;
  private readonly onColorChanged: (color: PlayerColor) => void;
  private readonly speed = 230;
  private readonly jumpVelocity = -470;

  constructor(scene: Phaser.Scene, x: number, y: number, onColorChanged: (color: PlayerColor) => void) {
    super(scene, x, y, `player-${gameState.playerColor}`);
    this.currentColor = gameState.playerColor;
    this.onColorChanged = onColorChanged;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(10);
    this.setCollideWorldBounds(false);
    this.setDragX(1200);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(28, 30);
    body.setOffset(2, 2);
    body.setMaxVelocity(260, 620);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.keys = scene.input.keyboard!.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      red: Phaser.Input.Keyboard.KeyCodes.ONE,
      blue: Phaser.Input.Keyboard.KeyCodes.TWO,
      green: Phaser.Input.Keyboard.KeyCodes.THREE,
      yellow: Phaser.Input.Keyboard.KeyCodes.FOUR
    }) as PlayerKeyMap;
  }

  update(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const movingLeft = this.cursors.left?.isDown || this.keys.left.isDown;
    const movingRight = this.cursors.right?.isDown || this.keys.right.isDown;

    if (movingLeft) {
      body.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (movingRight) {
      body.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      body.setVelocityX(0);
    }

    const wantsJump =
      Phaser.Input.Keyboard.JustDown(this.keys.jump) ||
      Phaser.Input.Keyboard.JustDown(this.keys.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.up!);

    if (wantsJump && (body.blocked.down || body.touching.down)) {
      body.setVelocityY(this.jumpVelocity);
      this.scene.tweens.add({
        targets: this,
        scaleX: 0.9,
        scaleY: 1.1,
        yoyo: true,
        duration: 90
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.red)) {
      this.changeColor("red");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.blue)) {
      this.changeColor("blue");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.green)) {
      this.changeColor("green");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.yellow)) {
      this.changeColor("yellow");
    }
  }

  respawn(x: number, y: number): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    this.setPosition(x, y);
    body.setVelocity(0, 0);
  }

  flashDamage(): void {
    this.setTintFill(0xffffff);
    this.scene.tweens.add({
      targets: this,
      alpha: 0.35,
      yoyo: true,
      repeat: 5,
      duration: 75,
      onComplete: () => {
        this.clearTint();
        this.setAlpha(1);
      }
    });
  }

  private changeColor(color: PlayerColor): void {
    if (this.currentColor === color) {
      return;
    }

    this.currentColor = color;
    setPlayerColor(color);
    this.setTexture(`player-${color}`);
    this.createShiftBurst(color);
    this.scene.tweens.add({
      targets: this,
      scale: 1.18,
      yoyo: true,
      duration: 120,
      ease: "Sine.Out"
    });
    this.onColorChanged(color);
  }

  private createShiftBurst(color: PlayerColor): void {
    const hex = COLOR_DATA[color].hex;
    for (let i = 0; i < 10; i += 1) {
      const angle = (Math.PI * 2 * i) / 10;
      const spark = this.scene.add.circle(this.x, this.y, 3, hex, 0.9).setDepth(9);
      this.scene.tweens.add({
        targets: spark,
        x: this.x + Math.cos(angle) * 34,
        y: this.y + Math.sin(angle) * 28,
        alpha: 0,
        duration: 260,
        ease: "Sine.Out",
        onComplete: () => spark.destroy()
      });
    }
  }
}
