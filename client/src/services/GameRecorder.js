export default class GameRecorder {

    constructor() {
        this.recording = false;
        this.time = 0;
        this.numDel = 0;
        this.data = [];
        this.snippet = "";
    }

    start() {
        this.recording = true;
    }

    stop() {
        this.recording = false;
        return this.data;
    }

    restart() {
        this.recording = false;
        this.time = 0;
        this.numDel = 0;
        this.data = [];
        this.snippet = "";
    }

    tick() {
        this.time ++;
        this.data[this.time] = [];
    }

    type(c) {
        this.data[this.time].push(c);
        this.snippet += c;
    }

}