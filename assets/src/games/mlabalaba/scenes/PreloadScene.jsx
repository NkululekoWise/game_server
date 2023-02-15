import Phaser from "phaser";
import GameUtil from "./../assets/GameUtil.json"

class PreloadScene extends Phaser.Scene{
    
    constructor(){
        super("PreloadScene");
    }

    preload(){
        this.load.image( GameUtil.images.backGround["name"] , GameUtil.images.backGround["directory"]);
        this.load.image( GameUtil.images.board["name"] , GameUtil.images.board["directory"] );
        this.load.spritesheet( GameUtil.images.loader["name"]  , GameUtil.images.loader["directory"] ,{
            frameWidth: 134.5 , frameHeight: 147.3333333333333});
    }

    create(){
        this.scene.start("MenuScene");
    }

}

export default PreloadScene;