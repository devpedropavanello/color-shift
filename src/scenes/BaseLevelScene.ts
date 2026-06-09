import Phaser from "phaser";
import { COLOR_DATA, getColorName, getLowerColorName, type PlayerColor } from "../data/colors";
import {
  addScore,
  gameState,
  grantKey,
  hasKey,
  prepareLevel,
  setCheckpoint
} from "../data/gameState";
import { Checkpoint } from "../objects/Checkpoint";
import { ColorDoor } from "../objects/ColorDoor";
import { ColorEnemy } from "../objects/ColorEnemy";
import { ColorKey } from "../objects/ColorKey";
import { HUD } from "../objects/HUD";
import { Player } from "../objects/Player";

interface RectDef {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ColoredRectDef extends RectDef {
  color: PlayerColor;
}

interface ColoredPointDef {
  x: number;
  y: number;
  color: PlayerColor;
}

interface EnemyDef extends ColoredPointDef {
  range?: number;
  speed?: number;
}

interface TextTip {
  x: number;
  y: number;
  text: string;
}

export interface LevelConfig {
  levelNumber: number;
  title: string;
  worldWidth: number;
  worldHeight?: number;
  start: { x: number; y: number };
  platforms: RectDef[];
  colorPlatforms: ColoredRectDef[];
  keys: ColoredPointDef[];
  doors: ColoredPointDef[];
  enemies: EnemyDef[];
  checkpoints: { x: number; y: number }[];
  goal: { x: number; y: number };
  nextScene: string;
  tips: TextTip[];
}

export abstract class BaseLevelScene extends Phaser.Scene {
  protected player!: Player;
  protected hud!: HUD;
  private levelConfig!: LevelConfig;
  private platforms!: Phaser.GameObjects.Group;
  private colorPlatforms!: Phaser.GameObjects.Group;
  private keys!: Phaser.GameObjects.Group;
  private doors!: Phaser.GameObjects.Group;
  private enemies!: Phaser.GameObjects.Group;
  private checkpoints!: Phaser.GameObjects.Group;
  private damageLocked = false;
  private finished = false;
  private lastDoorMessageAt = 0;
  private lastKeyMessageAt = 0;
  private levelStartScore = 0;
  private restartKey!: Phaser.Input.Keyboard.Key;
  private escapeKey!: Phaser.Input.Keyboard.Key;

  protected createLevel(config: LevelConfig): void {
    this.levelConfig = config;
    this.damageLocked = false;
    this.finished = false;
    this.lastDoorMessageAt = 0;
    this.lastKeyMessageAt = 0;
    this.levelStartScore = gameState.score;

    prepareLevel(config.levelNumber, config.start.x, config.start.y);

    const worldHeight = config.worldHeight ?? 660;
    this.physics.world.setBounds(0, 0, config.worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, config.worldWidth, 540);

    this.createBackground(config.worldWidth);
    this.platforms = this.add.group();
    this.colorPlatforms = this.add.group();
    this.keys = this.add.group();
    this.doors = this.add.group();
    this.enemies = this.add.group();
    this.checkpoints = this.add.group();

    config.platforms.forEach((platform) => this.addPlatform(platform));
    config.colorPlatforms.forEach((platform) => this.addColorPlatform(platform));
    config.keys.forEach((key) => this.keys.add(new ColorKey(this, key.x, key.y, key.color)));
    config.doors.forEach((door) => this.doors.add(new ColorDoor(this, door.x, door.y, door.color)));
    config.enemies.forEach((enemy) => {
      this.enemies.add(new ColorEnemy(this, enemy.x, enemy.y, enemy.color, enemy.range, enemy.speed));
    });
    config.checkpoints.forEach((checkpoint) => this.checkpoints.add(new Checkpoint(this, checkpoint.x, checkpoint.y)));

    const goal = this.physics.add.staticSprite(config.goal.x, config.goal.y, "goal").setDepth(4);
    (goal.body as Phaser.Physics.Arcade.StaticBody).setSize(42, 42).setOffset(3, 3).updateFromGameObject();

    this.addTips(config.tips);

    this.player = new Player(this, config.start.x, config.start.y, (color) => {
      this.hud.update();
      this.hud.showMessage(`Cor alterada para ${getLowerColorName(color)}.`, 1200, COLOR_DATA[color].css);
    });
    this.hud = new HUD(this, config.title);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(
      this.player,
      this.colorPlatforms,
      undefined,
      (_player, platform) => this.processColorPlatform(platform as unknown as Phaser.GameObjects.Rectangle),
      this
    );
    this.physics.add.collider(
      this.player,
      this.doors,
      undefined,
      (_player, door) => this.processDoor(door as unknown as ColorDoor),
      this
    );
    this.physics.add.overlap(this.player, this.keys, (_player, key) => this.collectKey(key as unknown as ColorKey));
    this.physics.add.overlap(this.player, this.enemies, (_player, enemy) =>
      this.handleEnemy(enemy as unknown as ColorEnemy)
    );
    this.physics.add.overlap(this.player, this.checkpoints, (_player, checkpoint) =>
      this.activateCheckpoint(checkpoint as unknown as Checkpoint)
    );
    this.physics.add.overlap(this.player, goal, () => this.completeLevel());

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(160, 80);

    this.restartKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.escapeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void {
    if (this.finished) {
      return;
    }

    this.player.update();
    this.enemies.children.each((enemy) => {
      (enemy as ColorEnemy).update();
      return true;
    });

    if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
      gameState.score = this.levelStartScore;
      this.scene.restart();
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
      this.scene.start("MenuScene");
      return;
    }

    if (this.player.y > (this.levelConfig.worldHeight ?? 660) - 18) {
      this.damagePlayer("Você caiu. De volta ao checkpoint.");
    }
  }

  private createBackground(worldWidth: number): void {
    this.add.rectangle(worldWidth / 2, 270, worldWidth, 540, 0x0b1020).setDepth(-10);
    const graphics = this.add.graphics().setDepth(-9);

    graphics.fillStyle(0xf94144, 0.08);
    graphics.fillCircle(160, 118, 118);
    graphics.fillStyle(0x277dff, 0.08);
    graphics.fillCircle(worldWidth - 210, 115, 150);
    graphics.fillStyle(0x45d483, 0.07);
    graphics.fillCircle(worldWidth * 0.54, 455, 140);
    graphics.fillStyle(0xf9d94a, 0.07);
    graphics.fillCircle(worldWidth * 0.28, 410, 100);

    for (let x = 0; x <= worldWidth; x += 64) {
      graphics.lineStyle(1, 0xffffff, x % 128 === 0 ? 0.06 : 0.025);
      graphics.lineBetween(x, 0, x, 540);
    }
    for (let y = 0; y <= 540; y += 64) {
      graphics.lineStyle(1, 0xffffff, y % 128 === 0 ? 0.06 : 0.025);
      graphics.lineBetween(0, y, worldWidth, y);
    }
  }

  private addPlatform(def: RectDef): void {
    const platform = this.add.rectangle(def.x, def.y, def.width, def.height, 0x536176, 1).setDepth(1);
    platform.setStrokeStyle(2, 0x111827, 0.9);
    this.physics.add.existing(platform, true);
    const body = platform.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(def.width, def.height);
    body.updateFromGameObject();
    this.platforms.add(platform);
  }

  private addColorPlatform(def: ColoredRectDef): void {
    const colorData = COLOR_DATA[def.color];
    const platform = this.add.rectangle(def.x, def.y, def.width, def.height, colorData.hex, 0.92).setDepth(2);
    platform.setData("color", def.color);
    platform.setStrokeStyle(3, 0xffffff, 0.78);
    this.physics.add.existing(platform, true);
    const body = platform.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(def.width, def.height);
    body.updateFromGameObject();
    this.colorPlatforms.add(platform);

    this.add
      .text(def.x, def.y - def.height / 2 - 24, getColorName(def.color), {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "16px",
        color: colorData.css,
        stroke: "#05070d",
        strokeThickness: 4
      })
      .setOrigin(0.5)
      .setDepth(3);
  }

  private addTips(tips: TextTip[]): void {
    for (const tip of tips) {
      this.add
        .text(tip.x, tip.y, tip.text, {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "18px",
          color: "#e2e8f0",
          stroke: "#05070d",
          strokeThickness: 4,
          align: "center",
          wordWrap: { width: 360 }
        })
        .setOrigin(0.5)
        .setDepth(3);
    }
  }

  private processColorPlatform(platform: Phaser.GameObjects.Rectangle): boolean {
    const color = platform.getData("color") as PlayerColor;
    if (this.player.currentColor !== color) {
      this.damagePlayer(`Plataforma ${getLowerColorName(color)}: use a cor certa.`);
      return false;
    }

    return true;
  }

  private processDoor(door: ColorDoor): boolean {
    if (door.isOpen) {
      return false;
    }

    if (hasKey(door.color)) {
      door.open();
      this.createBurst(door.x, door.y, door.color);
      this.hud.showMessage(`Porta ${getLowerColorName(door.color)} aberta.`, 1300, COLOR_DATA[door.color].css);
      return false;
    }

    if (this.time.now - this.lastDoorMessageAt > 800) {
      this.hud.showMessage(`Você precisa da chave ${getLowerColorName(door.color)}.`, 1300, COLOR_DATA[door.color].css);
      this.lastDoorMessageAt = this.time.now;
    }

    return true;
  }

  private collectKey(key: ColorKey): void {
    if (!key.active) {
      return;
    }

    if (this.player.currentColor !== key.color) {
      if (this.time.now - this.lastKeyMessageAt > 800) {
        this.hud.showMessage(
          `Troque para ${getLowerColorName(key.color)} para pegar esta chave.`,
          1300,
          COLOR_DATA[key.color].css
        );
        this.lastKeyMessageAt = this.time.now;
      }
      return;
    }

    grantKey(key.color);
    addScore(100);
    key.collect();
    this.createBurst(key.x, key.y, key.color);
    this.hud.update();
    this.hud.showMessage(`Chave ${getLowerColorName(key.color)} coletada. +100`, 1300, COLOR_DATA[key.color].css);
  }

  private handleEnemy(enemy: ColorEnemy): void {
    if (!enemy.active) {
      return;
    }

    if (enemy.color === this.player.currentColor) {
      addScore(150);
      this.createBurst(enemy.x, enemy.y, enemy.color);
      enemy.defeat();
      this.hud.update();
      this.hud.showMessage(`Inimigo ${getLowerColorName(enemy.color)} derrotado. +150`, 1300, COLOR_DATA[enemy.color].css);
      return;
    }

    this.damagePlayer(`Inimigo ${getLowerColorName(enemy.color)}: troque para essa cor.`);
  }

  private activateCheckpoint(checkpoint: Checkpoint): void {
    if (checkpoint.activated) {
      return;
    }

    checkpoint.activate();
    setCheckpoint(checkpoint.x, checkpoint.y);
    this.createBurst(checkpoint.x, checkpoint.y, "yellow");
    this.hud.showMessage("Checkpoint ativado.", 1300, "#f9d94a");
  }

  private damagePlayer(message: string): void {
    if (this.damageLocked || this.finished) {
      return;
    }

    this.damageLocked = true;
    gameState.lives -= 1;
    this.hud.update();
    this.player.flashDamage();
    this.cameras.main.shake(180, 0.008);

    if (gameState.lives <= 0) {
      this.hud.showMessage("Sem vidas. Fim de jogo.", 900, "#f94144");
      this.time.delayedCall(520, () => this.scene.start("GameOverScene"));
      return;
    }

    this.hud.showMessage(message, 1300, "#f94144");
    this.player.respawn(gameState.checkpointX, gameState.checkpointY);

    this.time.delayedCall(900, () => {
      this.damageLocked = false;
    });
  }

  private completeLevel(): void {
    if (this.finished) {
      return;
    }

    this.finished = true;
    addScore(300);
    this.hud.update();
    this.hud.showMessage("Fase concluída. +300", 900, "#45d483");
    this.cameras.main.flash(260, 248, 250, 252);

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    body.enable = false;

    this.time.delayedCall(850, () => {
      this.scene.start(this.levelConfig.nextScene);
    });
  }

  private createBurst(x: number, y: number, color: PlayerColor): void {
    const hex = COLOR_DATA[color].hex;
    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const distance = Phaser.Math.Between(20, 46);
      const spark = this.add.circle(x, y, 4, hex, 0.95).setDepth(20);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.2,
        duration: 340,
        ease: "Sine.Out",
        onComplete: () => spark.destroy()
      });
    }
  }
}
