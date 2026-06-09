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
    hex: 0xf94144,
    darkHex: 0x8a1c23,
    css: "#f94144"
  },
  blue: {
    key: "blue",
    name: "Azul",
    hex: 0x277dff,
    darkHex: 0x164a96,
    css: "#277dff"
  },
  green: {
    key: "green",
    name: "Verde",
    hex: 0x45d483,
    darkHex: 0x1e7a49,
    css: "#45d483"
  },
  yellow: {
    key: "yellow",
    name: "Amarelo",
    hex: 0xf9d94a,
    darkHex: 0x9c7b16,
    css: "#f9d94a"
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
