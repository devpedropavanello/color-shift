import { COLOR_CSS, COLOR_DARK_HEX, COLOR_HEX } from "../theme/palette";

export type PlayerColor = "red" | "blue" | "green" | "yellow";

export interface ColorDefinition {
  key: PlayerColor;
  name: string;
  hex: number;
  darkHex: number;
  css: string;
}

export const COLOR_ORDER: PlayerColor[] = ["red", "blue", "green", "yellow"];

export const COLOR_DATA: Record<PlayerColor, ColorDefinition> = {
  red: {
    key: "red",
    name: "Vermelho",
    hex: COLOR_HEX.red,
    darkHex: COLOR_DARK_HEX.red,
    css: COLOR_CSS.red
  },
  blue: {
    key: "blue",
    name: "Azul",
    hex: COLOR_HEX.blue,
    darkHex: COLOR_DARK_HEX.blue,
    css: COLOR_CSS.blue
  },
  green: {
    key: "green",
    name: "Verde",
    hex: COLOR_HEX.green,
    darkHex: COLOR_DARK_HEX.green,
    css: COLOR_CSS.green
  },
  yellow: {
    key: "yellow",
    name: "Amarelo",
    hex: COLOR_HEX.yellow,
    darkHex: COLOR_DARK_HEX.yellow,
    css: COLOR_CSS.yellow
  }
};

export function getColorName(color: PlayerColor): string {
  return COLOR_DATA[color].name;
}

export function getColorHex(color: PlayerColor): number {
  return COLOR_DATA[color].hex;
}

export function getLowerColorName(color: PlayerColor): string {
  return COLOR_DATA[color].name.toLowerCase();
}
