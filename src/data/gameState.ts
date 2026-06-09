import { COLOR_ORDER, type PlayerColor } from "./colors";

export type KeyInventory = Record<PlayerColor, boolean>;

export interface GameState {
  playerColor: PlayerColor;
  lives: number;
  score: number;
  keys: KeyInventory;
  checkpointX: number;
  checkpointY: number;
  currentLevel: number;
}

function createEmptyKeys(): KeyInventory {
  return {
    red: false,
    blue: false,
    green: false,
    yellow: false
  };
}

export const gameState: GameState = {
  playerColor: "red",
  lives: 3,
  score: 0,
  keys: createEmptyKeys(),
  checkpointX: 90,
  checkpointY: 460,
  currentLevel: 1
};

export function resetGame(startLevel = 1): void {
  gameState.playerColor = "red";
  gameState.lives = 3;
  gameState.score = 0;
  gameState.keys = createEmptyKeys();
  gameState.currentLevel = startLevel;
  gameState.checkpointX = 90;
  gameState.checkpointY = 460;
}

export function prepareLevel(level: number, checkpointX: number, checkpointY: number): void {
  gameState.currentLevel = level;
  gameState.keys = createEmptyKeys();
  gameState.checkpointX = checkpointX;
  gameState.checkpointY = checkpointY;
}

export function setCheckpoint(x: number, y: number): void {
  gameState.checkpointX = x;
  gameState.checkpointY = y;
}

export function setPlayerColor(color: PlayerColor): void {
  gameState.playerColor = color;
}

export function grantKey(color: PlayerColor): void {
  gameState.keys[color] = true;
}

export function hasKey(color: PlayerColor): boolean {
  return gameState.keys[color];
}

export function getOwnedKeys(): PlayerColor[] {
  return COLOR_ORDER.filter((color) => gameState.keys[color]);
}

export function addScore(points: number): void {
  gameState.score += points;
}

export function getLevelSceneKey(level: number): string {
  return `Level${level}Scene`;
}
