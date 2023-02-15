import EventSingleton from "../assets/EventSingleton";
import GameStateSingleton from "../assets/GameStateSingleton";

class Button {
    name;
    occupiedBy;
    constructor(x, y, scene) {
        this.gameState = GameStateSingleton.getGameState();
        this.emmiter = EventSingleton.getEmitter();
        this.button = scene.add.text(x, y, "  ")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: "#ffffff55" })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.info(this.gameState , this.occupiedBy)
                if (this.gameState.isPlacement && this.gameState.isMyTurn && (this.occupiedBy == "" || !this.occupiedBy)) {
                    this.occupiedBy = "me";
                    this.button.setStyle({ backgroundColor: "#00f" });
                    this.gameState.myCaps++;
                    this.gameState.to = this.name;
                    this.emmiter.emit("test-fire" , this.name)
                }
            })
            .on('pointerover', () => {
                if (this.gameState.isPlacement  && this.gameState.isMyTurn && (this.occupiedBy == "" || !this.occupiedBy)) {
                    this.button.setStyle({ backgroundColor: '#0a5' })
                }
            })
            .on('pointerout', () => {
                if (this.gameState.isPlacement  && (this.occupiedBy == "" || !this.occupiedBy)) {
                    this.button.setStyle({ backgroundColor: "#ffffff55" })
                }
            });

        this.emmiter.on("start-game", () => {
            this.scene.start("GamePlayScene");
        });
    }
    
    setEnemy(){
        this.occupiedBy = "enemy";
        this.button.setStyle({ backgroundColor: "#f00" });
    }
}

export default Button;