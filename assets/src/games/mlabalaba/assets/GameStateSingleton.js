class GameState{
    isMyTurn;
    myCaps;
    enemyCaps;
    isPlacement;
    from;
    to;
    constructor(){
        this.isMyTurn = false;
        this.myCaps = 0;
        this.enemyCaps = 0 ;
        this.isPlacement = true;
        this.isTake = false;
        this.from = "";
        this.to  = "";
    }
}

class GameStateSingleton{
    GameState;

    static getGameState(){
        if(!this.GameState)
        {
            this.GameState = new GameState()
            return this.GameState;
        }
        else{
            return this.GameState
        }
    }
}

export default GameStateSingleton;