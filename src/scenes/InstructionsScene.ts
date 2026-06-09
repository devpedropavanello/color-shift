import Phaser from "phaser";
import { resetGame } from "../data/gameState";
import { addBackdrop, addButton } from "./SceneUI";

export class InstructionsScene extends Phaser.Scene {
  constructor() {
    super("InstructionsScene");
  }

  create(): void {
    addBackdrop(this);

    this.add
      .text(480, 58, "Instrucoes", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "48px",
        color: "#f8fafc",
        stroke: "#05070d",
        strokeThickness: 6
      })
      .setOrigin(0.5);

    this.add
      .text(
        120,
        120,
        [
          "Objetivo:",
          "Complete tres fases curtas. A cor atual define quais chaves voce pega,",
          "quais plataformas sao seguras, quais portas abrem e quais inimigos caem.",
          "",
          "Controles:",
          "A/D ou setas: mover",
          "Espaco, W ou seta para cima: pular",
          "1: vermelho   2: azul   3: verde   4: amarelo",
          "R: reiniciar fase",
          "ESC: voltar ao menu",
          "",
          "Regra principal:",
          "Mesma cor ajuda. Cor errada geralmente custa uma vida e volta ao checkpoint."
        ],
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "22px",
          color: "#e2e8f0",
          lineSpacing: 8
        }
      );

    addButton(this, 350, 468, "Jogar", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    addButton(this, 610, 468, "Menu", () => this.scene.start("MenuScene"));

    const keyboard = this.input.keyboard!;
    keyboard.once("keydown-ENTER", () => {
      resetGame(1);
      this.scene.start("Level1Scene");
    });
    keyboard.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
