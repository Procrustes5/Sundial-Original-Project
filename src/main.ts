import "./style.css";

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
//   <div id="game"></div>
// `;

import "phaser";
import Preloader from './scenes/Preloader';
import { GameScene } from './scenes/GameScene';


const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sundial",
  version: "1.0",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: [Preloader, GameScene],
  scale: {
    width: 1440,
    height: 960,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "app",
  backgroundColor: "#48C4F8",
  // `as as Phaser.Types.Scenes.SettingsConfig[]` is required until https://github.com/photonstorm/phaser/pull/6235
  input: {
    keyboard: true,
  },
};

export const game = new Phaser.Game(GameConfig);

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

window.addEventListener("load", () => {
  // Expose `_game` to allow debugging, mute button and fullscreen button
  (window as any)._game = game;
});
