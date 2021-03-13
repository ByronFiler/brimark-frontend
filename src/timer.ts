
export class Timer {
    private timerName : string;
    private startTime : number = -1;
    private stopTime : number = -1;
    constructor(timerName: string) {
        this.timerName = timerName;
    }
    
    private getTimeName() : string {
        return this.timerName;
    }

    private getStartTime() : number {
        return this.startTime;
    }

    private getStopTime() : number {
        return this.stopTime;
    }

    start() : void {
        this.startTime = performance.now();
    }

    stop() : void {
        this.stopTime = performance.now();
        console.log(`${this.getTimeName()} took ${this.getStopTime() - this.getStartTime()} ms.`);
    }
    
}

export default Timer;