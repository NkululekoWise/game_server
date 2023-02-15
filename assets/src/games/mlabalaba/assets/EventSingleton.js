import Phaser from "phaser";

let instance = null;
class EventSingleton extends Phaser.Events.EventEmitter {
    constructor() {
        super();       
    }

    static getEmitter() {
        if (instance == null) {
            instance = new EventSingleton();
        }
        return instance;
    }
}

export default EventSingleton;