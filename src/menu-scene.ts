import "phaser";
import { GameScene } from './main';
import { Player } from "./Player";
// Standard Tile
import map from "../assets/map.png";
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
      this.load.image("map", map);
      this.load.image("player", char);
      
    },
    create() {
      const MAPWIDTH = 30 * GameScene.TILE_SIZE;
      const MAPHEIGHT = 20 * GameScene.TILE_SIZE;


      this.add.tileSprite(MAPWIDTH / 2, MAPHEIGHT / 2, MAPWIDTH, MAPHEIGHT, "map")
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
