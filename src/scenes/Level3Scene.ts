import { BaseLevelScene, type LevelConfig } from "./BaseLevelScene";

const level3Config: LevelConfig = {
  levelNumber: 3,
  title: "Fase 3 - Desafio Final",
  worldWidth: 2700,
  worldHeight: 700,
  start: { x: 90, y: 460 },
  platforms: [
    { x: 180, y: 520, width: 360, height: 40 },
    { x: 630, y: 520, width: 260, height: 40 },
    { x: 1040, y: 520, width: 360, height: 40 },
    { x: 1360, y: 520, width: 300, height: 40 },
    { x: 1250, y: 420, width: 190, height: 18 },
    { x: 2460, y: 520, width: 520, height: 40 }
  ],
  colorPlatforms: [
    { x: 415, y: 454, width: 140, height: 20, color: "green" },
    { x: 790, y: 454, width: 130, height: 20, color: "yellow" },
    { x: 1640, y: 452, width: 140, height: 20, color: "red" },
    { x: 1848, y: 402, width: 140, height: 20, color: "green" },
    { x: 2060, y: 452, width: 140, height: 20, color: "blue" }
  ],
  keys: [
    { x: 220, y: 462, color: "green" },
    { x: 640, y: 462, color: "yellow" },
    { x: 1250, y: 372, color: "blue" }
  ],
  doors: [
    { x: 510, y: 456, color: "green" },
    { x: 940, y: 456, color: "yellow" },
    { x: 1510, y: 456, color: "blue" }
  ],
  enemies: [
    { x: 1140, y: 480, color: "red", range: 80, speed: 62 },
    { x: 2320, y: 480, color: "green", range: 70, speed: 66 },
    { x: 2520, y: 480, color: "blue", range: 60, speed: 70 }
  ],
  checkpoints: [
    { x: 1080, y: 468 },
    { x: 2240, y: 468 }
  ],
  goal: { x: 2630, y: 462 },
  nextScene: "VictoryScene",
  tips: [
    { x: 250, y: 385, text: "Final: misture tudo. Pegue a chave verde e cruze a plataforma verde." },
    { x: 760, y: 388, text: "Amarelo abre o próximo trecho. Troque antes de tocar." },
    { x: 1250, y: 340, text: "Suba, vire azul e pegue a chave azul." },
    { x: 1850, y: 332, text: "Sequência de cores: vermelho, verde, azul." },
    { x: 2440, y: 402, text: "Inimigos finais também seguem a cor." }
  ]
};

export class Level3Scene extends BaseLevelScene {
  constructor() {
    super("Level3Scene");
  }

  create(): void {
    this.createLevel(level3Config);
  }
}
