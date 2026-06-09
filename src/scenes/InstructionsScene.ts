import Phaser from "phaser";
import { resetGame } from "../data/gameState";
import { addBackdrop, addButton } from "./SceneUI";

const CONTROL_LINES = [
  "A/D ou setas: mover",
  "Espaco, W ou seta cima: pular",
  "1: vermelho   2: azul",
  "3: verde      4: amarelo",
  "R: reiniciar fase",
  "ESC: voltar ao menu"
];

export class InstructionsScene extends Phaser.Scene {
  constructor() {
    super("InstructionsScene");
  }

  create(): void {
    addBackdrop(this);

    this.add
      .text(480, 52, "Instrucoes", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "48px",
        color: "#f8fafc",
        stroke: "#05070d",
        strokeThickness: 6
      })
      .setOrigin(0.5);

    this.add
      .rectangle(480, 262, 800, 326, 0x111827, 0.82)
      .setStrokeStyle(2, 0xf8fafc, 0.12);

    this.add
      .text(480, 118, "Objetivo", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        color: "#f9d94a",
        stroke: "#05070d",
        strokeThickness: 4
      })
      .setOrigin(0.5);

    this.add
      .text(
        480,
        154,
        "Complete tres fases curtas alternando cores para coletar chaves, abrir portas, atravessar plataformas e derrotar inimigos.",
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "20px",
          color: "#e2e8f0",
          align: "center",
          wordWrap: { width: 680 }
        }
      )
      .setOrigin(0.5, 0);

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 0.16);
    graphics.lineBetween(140, 222, 820, 222);
    graphics.lineBetween(480, 242, 480, 402);

    this.add
      .text(180, 252, "Controles", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "21px",
        color: "#45d483"
      })
      .setOrigin(0, 0.5);

    this.add
      .text(180, 294, CONTROL_LINES, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "17px",
        color: "#e2e8f0",
        align: "left",
        lineSpacing: 3
      })
      .setOrigin(0, 0);

    this.add
      .text(665, 252, "Regra principal", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "21px",
        color: "#277dff"
      })
      .setOrigin(0.5);

    this.add
      .text(
        665,
        304,
        "A cor atual define quais elementos voce pode usar com seguranca. Mesma cor ajuda; cor errada geralmente custa uma vida e volta ao checkpoint.",
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "18px",
          color: "#e2e8f0",
          align: "center",
          lineSpacing: 5,
          wordWrap: { width: 340 }
        }
      )
      .setOrigin(0.5, 0);

    addButton(this, 350, 478, "Jogar", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 610, 478, "Menu", () => this.scene.start("MenuScene"));

    const keyboard = this.input.keyboard!;
    keyboard.once("keydown-ENTER", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    keyboard.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
