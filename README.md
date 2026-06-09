# Color Shift

Color Shift é um protótipo Web 2D de plataforma, puzzle e sobrevivência por cor criado para a **Game Dev Café Game Jam 2026**.

Tema da Jam: **"A cor é tudo"**.

No jogo, a cor não é apenas estética: ela define as regras. O jogador alterna entre vermelho, azul, verde e amarelo para coletar chaves, abrir portas, atravessar plataformas coloridas e derrotar inimigos da mesma cor.

## Tecnologia

- Phaser 3
- TypeScript
- Vite
- HTML/CSS
- Build Web estática para Itch.io
- Sem backend

## Visual

O visual usa uma direção neon futurista inspirada em uma imagem de conceito, mas todos os elementos do jogo foram desenhados via código com Phaser.

A imagem de conceito não foi incluída como asset, textura, sprite ou background.

## Controles

- A/D ou setas: mover
- Espaço, W ou seta para cima: pular
- 1: vermelho
- 2: azul
- 3: verde
- 4: amarelo
- R: reiniciar fase
- ESC: voltar ao menu

## Como rodar localmente

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
```

O Vite gera a pasta `dist`. O projeto usa `base: './'` em `vite.config.ts`, então a build está preparada para hospedagem estática.

## Como visualizar a build

```bash
npm run preview
```

## Publicação no Itch.io

1. Rode `npm run build`.
2. Compacte o conteúdo da pasta `dist`.
3. Crie a página do jogo no Itch.io.
4. Envie o `.zip`.
5. Marque o projeto como HTML/Web.
6. Inclua os controles e os créditos na descrição da página.

## Integrantes

- Pedro Henrique Guimarães Pavanello
- Bryan Brum Paz
- Gustavo Mautoni

## Créditos

Os elementos visuais principais foram criados com formas geométricas via código usando Phaser.

Nenhum asset gerado por IA foi utilizado no jogo.
