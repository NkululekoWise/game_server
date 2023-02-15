import Phaser from "Phaser";
import { Scene, Scenes } from "phaser";
import React , {useEffect} from "react";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import GamePlayScene from "./scenes/GamePlayScene";
import WaitScene from "./scenes/WaitScene";

function Mlabalaba(){

    useEffect(()=>{
        const sharedConfig = {
            height: 640,
            width: 840,
            screenCenter: [800/2 , 600/2] ,
            offset: 20
          };

        const config = {
            type: Phaser.AUTO ,
            width: sharedConfig.width,
            height: sharedConfig.height,
            backgroundColor: "#f8f4da" , 
            scale: {
                parent: "uMlabalaba"
            },
            scene: [PreloadScene,
                   new MenuScene(sharedConfig) ,
                   new WaitScene(sharedConfig) ,
                   new GamePlayScene(sharedConfig)]
        }

        new Phaser.Game(config);
    });

    return <div id="uMlabalaba"></div>;

}

export default Mlabalaba;