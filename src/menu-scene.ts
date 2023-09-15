import "phaser";
import { GameScene } from './main';
import { Player } from "./Player";
// Standard Tile
import mapTile from "../assets/map_tile.png";
import mapJSON from "../assets/map.json";
import char from "../assets/char.png";

import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";

export const menuSceneKey = "MenuScene";

export function menu():
  | Phaser.Types.Scenes.SettingsConfig
  | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
  let startKey: Phaser.Input.Keyboard.Key;
  let sprites: { s: Phaser.GameObjects.Image; r: number }[];
  let gridControls: GridControls;
  let gridPhysics: GridPhysics;

  
  return {
    key: menuSceneKey,
    
    preload() {
      this.load.image("map_tile", mapTile);
      this.load.image("player", char);
      this.load.tilemapTiledJSON("mapJSON", mapJSON);
    },
    create() {
      const firstTilemap = this.make.tilemap({ key: "mapJSON" });
      console.log(this.cache.tilemap);
      const tileset = firstTilemap.addTilesetImage("tiles", "map_tile", 48, 48);
      console.log(tileset);
      for (let i = 0; i < firstTilemap.layers.length; i++) {
        const layer = firstTilemap.createLayer(i, tileset, 0, 0)
        layer.setDepth(i);
      }

 
      // player = this.physics.add.sprite(MAPWIDTH / 2, MAPHEIGHT / 2, "char");
      const playerSprite = this.add.sprite(0, 0, "player");
      playerSprite.setDepth(2);
      
      this.cameras.main.startFollow(playerSprite);
      this.cameras.main.roundPixels = true;
      const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));

      this.gridPhysics = new GridPhysics(player);
      this.gridControls = new GridControls(
        this.input,
        this.gridPhysics
      );

    },
    update(_time: number, delta: number) {
      this.gridControls.update();
      this.gridPhysics.update(delta);
    },
  };
}
