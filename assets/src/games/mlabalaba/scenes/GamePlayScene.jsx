import BaseScene from "./BaseScene";
import GameUtil from "./../assets/GameUtil.json";
import Button from "../component/button";
import GameStateSingleton from "../assets/GameStateSingleton";
import EventSingleton from "../assets/EventSingleton";


class GamePlayScene extends BaseScene{
    emitter;
    constructor(config){
        super("GamePlayScene" ,config);
        this.buttons = new Array();
        this.GameState = GameStateSingleton.getGameState();
        this.gameUpdateText = ["Place Caps" , "Wait"]
    }

    create(){
        this.emitter = EventSingleton.getEmitter();
        this.createUI();
        this.createButtons();
        this.createEvents();
        
    }
    createUI(){
        this.add.image(this.config.offset,this.config.offset, GameUtil.images.board['name']).setOrigin(0);
        let colour = this.GameState.isMyTurn ? "#090" : "#900" ;
        this.gameText = this.add.text(630 , 100 , this.GameState.isMyTurn ? this.gameUpdateText[0] : this.gameUpdateText[1] , {font: "bold 32px Arial", fill: colour});
        this.add.text(650, 200, "  ")
        .setPadding(10)
        .setStyle({ backgroundColor: "#00f" });
        this.myCapsText = this.add.text(700, 210, "x" + this.GameState.myCaps)
        .setStyle({ fill: "#000" , fontSize: "28px" });

        this.add.text(650, 280, "  ")
        .setPadding(10)
        .setStyle({ backgroundColor: "#f00" });
        this.enemyText = this.add.text(700, 290, "x" + this.GameState.enemyCaps)
        .setStyle({ fill: "#000" , fontSize: "28px" });
    }

    createButtons(){
        for (let index = 0; index < GameUtil.postions.length; index++) {
            let label = GameUtil.postions[index][0];
            let x = GameUtil.postions[index][1] + this.config.offset;
            let y = GameUtil.postions[index][2] + this.config.offset;
            let button = new Button(x,y,this);
            button.name = label;
            this.buttons.push(button);
        }
    }

    createEvents(){
        this.emitter.on("enemyplacement" , this.placeEnermy ,this);
        this.emitter.on("next-player", this.changeToWait , this);
        this.emitter.on("test-fire" ,this.checkForComb , this);
        this.emitter.on("take", this.takeCap , this);
    }

    takeCap(...args){

    }

    placeEnermy(payload ,duraction){
        this.GameState.enemyCaps = payload.enemyCaps;
        this.enemyText.setText( "x" + this.GameState.enemyCaps);
        this.gameText.setText(this.gameUpdateText[0])
        .setStyle({fill:"#090"});
        let button = this.buttons.find((data)=>{
            return data.name == payload.to;
        });
        button.setEnemy();
    }

    changeToWait(...args){
        this.gameText.setText(this.gameUpdateText[1])
        .setStyle({fill:"#900"});
        this.myCapsText.setText("x" + this.GameState.myCaps);
    }

    //todo
    checkForComb(btnName){
        let possibleCombo = GameUtil.strike.filter((list)=>{
            return list.includes(btnName);
        })

        console.log(possibleCombo);

        for (let index = 0; index < possibleCombo.length; index++) {
            const element = possibleCombo[index];
            let numb = 0;
            element.forEach((elemName)=>{
                if(this.buttons.includes(elemName))
                numb++;
            });

            if(numb == 3){
                this.GameState.isTake = true;
                this.emitter.emit("take");
            }

            numb = 0;
        }

        this.emitter.emit("next-player");
    }
}

export default GamePlayScene;