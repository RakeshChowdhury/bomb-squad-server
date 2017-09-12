const ARMED = 0, DISARMED = 1, DEFUSED = 2, EXPLODED = 3;

class Bomb {
    constructor(number, rfid, status) {
        this.number = number;
        this.rfid = rfid;
        this.status = status;
    }

    static get ARMED() {
        return ARMED;
    }
    static get DISARMED() {
        return DISARMED;
    }
    static get DEFUSED() {
        return DEFUSED;
    }
    static get EXPLODED() {
        return EXPLODED;
    }

    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}

module.exports = Bomb;
