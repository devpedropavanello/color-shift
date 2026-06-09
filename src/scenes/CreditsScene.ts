import Phaser from "phaser";
import { addBackdrop, addButton } from "./SceneUI";

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  create(): void {
    addBackdrop(this);

    this.add
      .text(480, 54, "Creditos", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "48px",
        color: "#f8fafc",
        stroke: "#05070d",
        strokeThickness: 6
      })
      .setOrigin(0.5);

    this.add
      .text(
        150,
        118,
        [
          "Desenvolvimento:",
          "Pedro Pavanello",
          "[Nome completo do integrante 2]",
          "[Nome completo do integrante 3]",
          "[Nome completo do integrante 4]",
          "",
          "Game Jam:",
          "Game Dev Cafe Game Jam 2026",
          "",
          "Tema:",
          "A cor e tudo",
          "",
          "Assets:",
          "Elementos visuais criados com formas geometricas via codigo usando Phaser.",
          "Nenhum asset gerado por IA foi utilizado."
        ],
        {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "22px",
          color: "#e2e8f0",
          lineSpacing: 8
        }
      );

    addButton(this, 480, 482, "Voltar ao menu", () => this.scene.start("MenuScene"));
    this.input.keyboard!.once("keydown-ESC", () => this.scene.start("MenuScene"));
  }
}
