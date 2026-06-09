export type NeonColorName = "red" | "blue" | "green" | "yellow";

export const PALETTE = {
  background: 0x070a16,
  backgroundDeep: 0x02040a,
  panel: 0x0d1324,
  panelSoft: 0x121a2d,
  grid: 0x1c2740,
  text: 0xf5f7ff,
  mutedText: 0xaab3cc,
  platform: 0x59677c,
  platformDark: 0x263246,
  outline: 0xdde6ff,
  black: 0x05070d,
  white: 0xffffff,
  red: 0xff304f,
  redDark: 0x8d1527,
  blue: 0x2f80ff,
  blueDark: 0x164a96,
  green: 0x32e875,
  greenDark: 0x167a3e,
  yellow: 0xffd43b,
  yellowDark: 0x9c7611
} as const;

export const COLOR_HEX: Record<NeonColorName, number> = {
  red: PALETTE.red,
  blue: PALETTE.blue,
  green: PALETTE.green,
  yellow: PALETTE.yellow
};

export const COLOR_DARK_HEX: Record<NeonColorName, number> = {
  red: PALETTE.redDark,
  blue: PALETTE.blueDark,
  green: PALETTE.greenDark,
  yellow: PALETTE.yellowDark
};

export const COLOR_CSS: Record<NeonColorName, string> = {
  red: "#FF304F",
  blue: "#2F80FF",
  green: "#32E875",
  yellow: "#FFD43B"
};

export const COLOR_GLOW_CSS: Record<NeonColorName, string> = {
  red: "rgba(255, 48, 79, 0.55)",
  blue: "rgba(47, 128, 255, 0.55)",
  green: "rgba(50, 232, 117, 0.55)",
  yellow: "rgba(255, 212, 59, 0.55)"
};
