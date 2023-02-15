import BaseScene from "./BaseScene";
import GameUtil from "./../assets/GameUtil.json";
import MlabalabaChannel from "../assets/mlabalaba_channel";
import EventSingleton from "../assets/EventSingleton";

class WaitScene extends BaseScene {

    constructor(config) {
        super("WaitScene", config);
    }

    create() {
        super.createDefaultBackGround();
        const menuPosition = [this.config.screenCenter[0], this.config.screenCenter[1]];
        this.add.text(...menuPosition, "Waiting for other Player!")
            .setInteractive()
            .setOrigin(0.5);

        this.loader = this.add.sprite(this.config.screenCenter[0], this.config.screenCenter[1] + 100, GameUtil.images.loader["name"]);

        this.anims.create({
            key: "loader",
            frames: this.anims.generateFrameNumbers("loader",{start: 0, end: 11}),
            frameRate: 6,
            repeat: -1
        });

        this.loader.play("loader");
        MlabalabaChannel.init();
        this.emmiter = EventSingleton.getEmitter();

        this.emmiter.on("start-game" , ()=>{
            this.scene.start("GamePlayScene");
        } ,this);

    }

}

export default WaitScene;