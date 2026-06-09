import Phaser from "phaser";

export function addBackdrop(scene: Phaser.Scene): void {
  scene.add.rectangle(480, 270, 960, 540, 0x080a12);

  const graphics = scene.add.graphics();
  graphics.fillStyle(0xf94144, 0.18);
  graphics.fillCircle(135, 115, 128);
  graphics.fillStyle(0x277dff, 0.16);
  graphics.fillCircle(815, 125, 155);
  graphics.fillStyle(0x45d483, 0.13);
  graphics.fillCircle(735, 455, 150);
  graphics.fillStyle(0xf9d94a, 0.13);
  graphics.fillCircle(190, 440, 120);

  for (let x = 0; x <= 960; x += 48) {
    graphics.lineStyle(1, 0xffffff, x % 96 === 0 ? 0.06 : 0.025);
    graphics.lineBetween(x, 0, x, 540);
  }
  for (let y = 0; y <= 540; y += 48) {
    graphics.lineStyle(1, 0xffffff, y % 96 === 0 ? 0.06 : 0.025);
    graphics.lineBetween(0, y, 960, y);
  }
}

export function addTitle(scene: Phaser.Scene, y = 88): void {
  scene.add
    .text(480, y, "COLOR SHIFT", {
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "70px",
      color: "#f8fafc",
      stroke: "#05070d",
      strokeThickness: 8,
      align: "center"
    })
    .setOrigin(0.5);

  scene.add
    .text(480, y + 58, "A cor e a regra do mundo", {
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "22px",
      color: "#cbd5e1",
      stroke: "#05070d",
      strokeThickness: 4
    })
    .setOrigin(0.5);
}

export function addButton(scene: Phaser.Scene, x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Text {
  const text = scene.add
    .text(x, y, label, {
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "28px",
      color: "#f8fafc",
      backgroundColor: "#111827",
      padding: { left: 22, right: 22, top: 10, bottom: 10 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  text.on("pointerover", () => {
    text.setColor("#f9d94a");
    text.setScale(1.04);
  });
  text.on("pointerout", () => {
    text.setColor("#f8fafc");
    text.setScale(1);
  });
  text.on("pointerdown", onClick);

  return text;
}
