import Phaser from "phaser";
import { resetGame } from "../data/gameState";
import { COLOR_CSS, COLOR_HEX, PALETTE, type NeonColorName } from "../theme/palette";
import { addNeonPanel, addScreenTitle, FONT_FAMILY } from "../theme/visualStyle";
import { addBackdrop, addButton } from "./SceneUI";

const CONTROL_LINES = [
  "A/D ou setas: mover",
  "Espaço, W ou seta cima: pular",
  "R: reiniciar fase",
  "ESC: voltar ao menu"
];

export class InstructionsScene extends Phaser.Scene {
  constructor() {
    super("InstructionsScene");
  }

  create(): void {
    addBackdrop(this);
    addScreenTitle(this, 54, "Instruções", "#F5F7FF");

    addNeonPanel(this, 480, 264, 820, 350, 24);

    this.add
      .text(166, 126, "OBJETIVO", {
        fontFamily: FONT_FAMILY,
        fontSize: "22px",
        fontStyle: "900",
        color: "#FFD43B",
        stroke: "#05070d",
        strokeThickness: 4
      })
      .setDepth(30);

    this.add
      .text(
        166,
        164,
        "Complete três fases curtas alternando cores para coletar chaves, abrir portas, atravessar plataformas e derrotar inimigos.",
        {
          fontFamily: FONT_FAMILY,
          fontSize: "19px",
          fontStyle: "600",
          color: "#F5F7FF",
          lineSpacing: 5,
          wordWrap: { width: 650 }
        }
      )
      .setDepth(30);

    this.add.rectangle(480, 230, 680, 1, PALETTE.outline, 0.14).setDepth(30);
    this.add.rectangle(480, 324, 1, 126, PALETTE.outline, 0.14).setDepth(30);

    this.add
      .text(166, 260, "CONTROLES", {
        fontFamily: FONT_FAMILY,
        fontSize: "21px",
        fontStyle: "900",
        color: "#32E875"
      })
      .setDepth(30);

    this.add
      .text(166, 296, CONTROL_LINES, {
        fontFamily: FONT_FAMILY,
        fontSize: "17px",
        fontStyle: "700",
        color: "#E2E8F0",
        lineSpacing: 8
      })
      .setDepth(30);

    this.add
      .text(575, 260, "REGRA PRINCIPAL", {
        fontFamily: FONT_FAMILY,
        fontSize: "21px",
        fontStyle: "900",
        color: "#2F80FF"
      })
      .setDepth(30);

    this.add
      .text(
        575,
        296,
        "A cor atual define o que você pode usar. Mesma cor ajuda. Cor errada geralmente custa uma vida e volta ao checkpoint.",
        {
          fontFamily: FONT_FAMILY,
          fontSize: "18px",
          fontStyle: "700",
          color: "#E2E8F0",
          lineSpacing: 6,
          wordWrap: { width: 310 }
        }
      )
      .setDepth(30);

    this.add.rectangle(480, 392, 680, 1, PALETTE.outline, 0.12).setDepth(30);
    this.addColorChip(252, 416, "1 Vermelho", "red");
    this.addColorChip(404, 416, "2 Azul", "blue");
    this.addColorChip(556, 416, "3 Verde", "green");
    this.addColorChip(708, 416, "4 Amarelo", "yellow");

    addButton(this, 350, 494, "Jogar", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 610, 494, "Menu", () => this.scene.start("MenuScene"));

    const keyboard = this.input.keyboard!;
    keyboard.once("keydown-ENTER", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    keyboard.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }

  private addColorChip(x: number, y: number, label: string, color: NeonColorName): void {
    this.add.rectangle(x, y, 132, 34, COLOR_HEX[color], 0.16).setDepth(30);
    this.add.rectangle(x, y, 124, 28, PALETTE.panel, 0.92).setStrokeStyle(2, COLOR_HEX[color], 0.8).setDepth(31);
    this.add
      .text(x, y, label, {
        fontFamily: FONT_FAMILY,
        fontSize: "15px",
        fontStyle: "900",
        color: COLOR_CSS[color]
      })
      .setOrigin(0.5)
      .setDepth(32);
  }
}
