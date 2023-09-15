import "./style.css";

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
//   <div id="game"></div>
// `;

import "phaser";
import { menu } from "./menu-scene";

import mapTile from "../assets/map_tile.png";
import mapJSON from "../assets/map.json";
import char from "../assets/characters.png";

import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { Direction } from "./Direction";
import { Player } from "./Player";

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  static readonly TILE_SIZE = 48;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;

  public preload() {
    this.load.image("map_tile", mapTile);
    this.load.tilemapTiledJSON("mapJSON", mapJSON);
    this.load.spritesheet("player", char, {
      frameWidth: 26,
      frameHeight: 36,
    });
  }
  public create() {
    const firstTilemap = this.make.tilemap({ key: "mapJSON" });
    const tileset = firstTilemap.addTilesetImage("tiles", "map_tile", 48, 48);
    for (let i = 0; i < firstTilemap.layers.length; i++) {
      const layer = firstTilemap.createLayer(i, tileset, 0, 0)
      layer.setDepth(i);
    }


    // player = this.physics.add.sprite(MAPWIDTH / 2, MAPHEIGHT / 2, "char");
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);
    playerSprite.scale = 3;
    
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));

    this.gridPhysics = new GridPhysics(player);
    this.gridControls = new GridControls(
      this.input,
      this.gridPhysics
    );

    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
  }

  public update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }

  private createPlayerAnimation(
    name: string,
    startFrame: number,
    endFrame: number
  ) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers("player", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    })
  }
}

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sundial",
  version: "1.0",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: GameScene,
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
