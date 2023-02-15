import Phaser from "phaser";
import GameUtil from "./../assets/GameUtil.json";

class BaseScene extends Phaser.Scene {

    constructor(key, config) {
        super(key);
        this.config = config;
        this.createMarkUp();

    }


    createDefaultBackGround() {
       this.add.image(0,0, GameUtil.images.backGround['name']).setOrigin(0);
    }

    createMarkUp() {
        this.config.protoyprimaryTextColour = "#fff";
        this.config.primaryText = { fontSize: "32px", fill: "#fff" };

        this.config.accentColour = "#e0e";
        this.config.secondaryText = { fontSize: "20px", fill: "#fff" };
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPosY = 0;
        menu.forEach(menuItem => {
            const menuPosition = [this.config.screenCenter[0] + this.config.offset, this.config.screenCenter[1] +this.config.offset + lastMenuPosY];
            menuItem.menuText = this.add.text(...menuPosition, menuItem.text)
                .setInteractive()
                .setOrigin(0.5);

            setupMenuEvents(menuItem);
            lastMenuPosY += 42;
        });


    }

}

export default BaseScene;