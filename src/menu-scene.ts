import "phaser";
import { GameScene } from './main';
import { Player } from "./Player";
// Standard Tile
import mapTile from "../assets/map_tile.png";
import mapJSON from "../assets/map.json";
import char from "../assets/character.png";

import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { Direction } from "./Direction";


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
      this.load.tilemapTiledJSON("mapJSON", mapJSON);
      this.load.spritesheet("player", char, {
        frameWidth: 26,
        frameHeight: 36,
      });
    },
    create() {
      const firstTilemap = this.make.tilemap({ key: "mapJSON" });
      const tileset = firstTilemap.addTilesetImage("tiles", "map_tile", 48, 48);
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

      this.GameScene.createPlayerAnimation(Direction.UP, 90, 92);
      this.GameScene.createPlayerAnimation(Direction.RIGHT, 78, 80);
      this.GameScene.createPlayerAnimation(Direction.DOWN, 54, 56);
      this.GameScene.createPlayerAnimation(Direction.LEFT, 66, 68);
    },
    update(_time: number, delta: number) {
      this.gridControls.update();
      this.gridPhysics.update(delta);
    },
  };
}
