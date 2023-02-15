import BaseScene from "./BaseScene";


class MenuScene extends BaseScene{
    
    constructor(config){
        super("MenuScene" ,config);
        this.menu = [
            {scene:"WaitScene" , text: "Play"},
            {scene:"ScoreScene" , text: "Score"},
            {scene:null , text: "Exit"}
        ];
    }

    preload(){
        
    }

    create(){
        super.createDefaultBackGround();
        this.createMenu(this.menu , this.setupMenuEvents.bind(this));
    }

    setupMenuEvents(menuItem){
        menuItem.menuText.on("pointerover" , ()=>{
            menuItem.menuText.setStyle({fill:"#50f"})
        })

        menuItem.menuText.on("pointerout" , ()=>{
            menuItem.menuText.setStyle({fill:"#fff"})
        })

        menuItem.menuText.on("pointerup" , ()=>{
            menuItem.scene && this.scene.start(menuItem.scene);
            menuItem.text === "Exit" && this.game.destroy(true);
        })
    }

}

export default MenuScene;