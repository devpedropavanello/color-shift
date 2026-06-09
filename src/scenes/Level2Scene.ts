import { BaseLevelScene, type LevelConfig } from "./BaseLevelScene";

const level2Config: LevelConfig = {
  levelNumber: 2,
  title: "Fase 2 - Puzzle",
  worldWidth: 2100,
  start: { x: 90, y: 460 },
  platforms: [
    { x: 1050, y: 520, width: 2100, height: 40 },
    { x: 430, y: 414, width: 190, height: 18 },
    { x: 1030, y: 422, width: 180, height: 18 }
  ],
  colorPlatforms: [
    { x: 430, y: 394, width: 190, height: 18, color: "blue" },
    { x: 1030, y: 402, width: 180, height: 18, color: "red" }
  ],
  keys: [
    { x: 430, y: 348, color: "blue" },
    { x: 1030, y: 356, color: "red" }
  ],
  doors: [
    { x: 720, y: 456, color: "blue" },
    { x: 1390, y: 456, color: "red" }
  ],
  enemies: [{ x: 1160, y: 480, color: "blue", range: 90, speed: 58 }],
  checkpoints: [{ x: 900, y: 468 }],
  goal: { x: 1970, y: 462 },
  nextScene: "Level3Scene",
  tips: [
    { x: 205, y: 386, text: "A fase agora pede ordem: cor certa, chave certa, porta certa." },
    { x: 430, y: 316, text: "Aperte 2 para usar azul e pegar a chave azul." },
    { x: 1150, y: 356, text: "Inimigo azul: toque nele estando azul para derrotar." },
    { x: 1510, y: 398, text: "Depois da porta vermelha, siga até o objetivo." }
  ]
};

export class Level2Scene extends BaseLevelScene {
  constructor() {
    super("Level2Scene");
  }

  create(): void {
    this.createLevel(level2Config);
  }
}
