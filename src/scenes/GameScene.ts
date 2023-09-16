import Phaser from 'phaser'

import { GridControls } from "../components/GridControls";
import { GridPhysics } from "../components/GridPhysics";
import { Direction } from "../components/Direction";
import { Player } from "../components/Player";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  static readonly TILE_SIZE = 48;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;

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

    this.gridPhysics = new GridPhysics(player, firstTilemap);
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