import socket from "./user_socket";
import EventSingleton from "./EventSingleton";
import GameStateSingleton from "./GameStateSingleton";

class MlabalabaChannel {
    channel;
    room;
    emitter;
    user;
    gameState;
    takeRoom;

    //Join lobby
    static async init() {
        this.channel = socket.channel('mlabalaba:lobby');
        const join = await this.channel.join();
        MlabalabaChannel.#getUserId();
        this.emitter = EventSingleton.getEmitter();
        this.gameState = GameStateSingleton.getGameState();
    }
    //Assigned userID
    static #getUserId() {
        this.channel.push("getuserid", {})
            .receive("ok", resp => {
                MlabalabaChannel.#addToGameRoom(resp)
                this.user = resp.user;
            });

    }

    //Look for room
    static #addToGameRoom(resp) {
        MlabalabaChannel.#listenForUser(resp);
        this.channel.push("addToGameRoom", resp);
    }

    //Listen for response on useID
    static #listenForUser(resp) {
        this.channel.on("user:" + resp.user, payload => {
            MlabalabaChannel.#startRoom(payload);
        })
    }

    //Room started , Leave lobby
    static async #startRoom(resp) {
        this.room = "mlabalaba:" + resp.room;
        this.takeRoom = "mlabalaba:take:" + + resp.room ;
        if (this.user == resp.userTurn) {
            this.gameState.isMyTurn = true;
        }
        else {
            this.gameState.isMyTurn = false;
        }

        this.channel.leave();
        this.channel = socket.channel(this.room);
        const join = await this.channel.join();
        MlabalabaChannel.#listenOnRoom();
        MlabalabaChannel.#listenOnTake();
        this.emitter.emit("start-game");
        this.emitter.on("next-player", MlabalabaChannel.#send.bind(this))
        this.emitter.on("take", MlabalabaChannel.#sendOnTake.bind(this))
    }

    static #listenOnRoom() {
        this.channel.on(this.room, payload => {
            //update state/ change turns
            if (payload.currentUser == this.user)
                return;
            this.emitter.emit("enemyplacement", payload);
            this.gameState.isMyTurn = true;
        });
    }

    static #send(...arg) {
        this.gameState.isMyTurn = false;
        if (this.gameState.isPlacement) {
            if (this.gameState.enemyCaps == 12 && this.gameState.myCaps == 12)
                this.gameState.isPlacement = true
            this.channel.push(this.room, {
                "currentUser": this.user,
                "enemyCaps": this.gameState.myCaps,
                "myCaps": this.gameState.enemyCaps,
                "isPlacement": this.gameState.isPlacement,
                "from": "",
                "to": this.gameState.to,
                "event": "turn"
            });
        } else {
            this.channel.push(this.room, {
                "currentUser": this.user,
                "enemyCaps": this.gameState.myCaps,
                "myCaps": this.gameState.enemyCaps,
                "isPlacement": this.gameState.isPlacement,
                "from": this.gameState.from,
                "to": this.gameState.to,
                "event": "turn"
            });
        }
    }

    static #listenOnTake() {
        this.channel.on(this.takeRoom, payload => {
            //update state/ change turns
            if(payload.take == ""){
                this.emitter.emit("enemyplacement", payload);
            }
        });
    }

    static #sendOnTake(capToTake) {
        if (this.gameState.isPlacement) {
            this.channel.push(this.room + ":take", {
                "from": "",
                "to": this.gameState.to,
                "take" : capToTake
            });
        }
    }

}


export default MlabalabaChannel;