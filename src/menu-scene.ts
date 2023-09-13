import "phaser";
import { GameScene } from './main';
// Standard Tile
import map from "../assets/map.png";
import char from "../assets/char.png";

export const menuSceneKey = "MenuScene";

export function menu():
  | Phaser.Types.Scenes.SettingsConfig
  | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
  let startKey: Phaser.Input.Keyboard.Key;
  let sprites: { s: Phaser.GameObjects.Image; r: number }[];
  //initialise global variables
  let player;
  let obstacles;
  let cursors;
  let yLimit;
  let xLimit;
  return {
    key: menuSceneKey,
    preload() {
      sprites = [];
      startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      startKey.isDown = false;
      // Standard Tile
      this.load.image("map", map);
      this.load.image("char", char);
      
    },
    create() {
      const MAPWIDTH = 30 * GameScene.TILE_SIZE;
      const MAPHEIGHT = 20 * GameScene.TILE_SIZE;

      this.add.tileSprite(MAPWIDTH / 2, MAPHEIGHT / 2, MAPWIDTH, MAPHEIGHT, "map")
      player = this.physics.add.sprite(MAPWIDTH / 2, MAPHEIGHT / 2, "char");

    },
    update() {

    },
  };
}
