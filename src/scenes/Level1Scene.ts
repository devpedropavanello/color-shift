import { BaseLevelScene, type LevelConfig } from "./BaseLevelScene";

const level1Config: LevelConfig = {
  levelNumber: 1,
  title: "Fase 1 - Tutorial",
  worldWidth: 1600,
  start: { x: 90, y: 460 },
  platforms: [
    { x: 800, y: 520, width: 1600, height: 40 },
    { x: 320, y: 430, width: 190, height: 18 }
  ],
  colorPlatforms: [{ x: 1040, y: 488, width: 150, height: 24, color: "blue" }],
  keys: [{ x: 320, y: 382, color: "red" }],
  doors: [{ x: 670, y: 456, color: "red" }],
  enemies: [],
  checkpoints: [{ x: 850, y: 468 }],
  goal: { x: 1470, y: 462 },
  nextScene: "Level2Scene",
  tips: [
    { x: 160, y: 370, text: "A/D ou setas para mover. Espaco, W ou cima para pular." },
    { x: 330, y: 318, text: "Chaves so entram quando voce esta na mesma cor." },
    { x: 680, y: 364, text: "Portas abrem com a chave da mesma cor." },
    { x: 1040, y: 420, text: "Aperte 2 para virar azul antes da plataforma azul." }
  ]
};

export class Level1Scene extends BaseLevelScene {
  constructor() {
    super("Level1Scene");
  }

  create(): void {
    this.createLevel(level1Config);
  }
}
