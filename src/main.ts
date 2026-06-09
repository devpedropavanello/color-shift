import Phaser from "phaser";
import "./styles.css";
import { BootScene } from "./scenes/BootScene";
import { CreditsScene } from "./scenes/CreditsScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { InstructionsScene } from "./scenes/InstructionsScene";
import { Level1Scene } from "./scenes/Level1Scene";
import { Level2Scene } from "./scenes/Level2Scene";
import { Level3Scene } from "./scenes/Level3Scene";
import { MenuScene } from "./scenes/MenuScene";
import { VictoryScene } from "./scenes/VictoryScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 960,
  height: 540,
  backgroundColor: "#0b1020",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 900 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    BootScene,
    MenuScene,
    InstructionsScene,
    CreditsScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    VictoryScene,
    GameOverScene
  ]
};

new Phaser.Game(config);
