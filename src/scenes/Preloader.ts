import Phaser from 'phaser'

import mapTile from "../../assets/map_tile.png";
import mapJSON from "../../assets/map.json";
import char from "../../assets/characters.png";


export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
    this.load.image("map_tile", mapTile);
    this.load.tilemapTiledJSON("mapJSON", mapJSON);
    this.load.spritesheet("player", char, {
      frameWidth: 26,
      frameHeight: 36,
    });
	}

	create()
	{
		this.scene.start('game-scene')
	}
}