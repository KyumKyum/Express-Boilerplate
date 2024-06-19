import {Observable, Subject} from "rxjs";
import {SystemStatus} from "../../src/constants/SystemStatus";
import sampleHcObservable from "./sample.resource";

class HealthChecker {
    private _monitor = new Subject<SystemStatus>();
    public source: string = ''


    constructor() {
        //* Basic status
        this._monitor.next(SystemStatus.PULSE)

        this.subscribeSample();

    }

    public get monitor(): Observable<SystemStatus> {
        return this._monitor.asObservable();
    }

    private subscribeSample() {
        sampleHcObservable.subscribe({
            next: (status: SystemStatus) => {
                if(status === SystemStatus.FLATLINE) {
                    //* DEAD!
                    this.changeStatus('sample', SystemStatus.FLATLINE)
                }else{
                    this.changeStatus('sample', SystemStatus.PULSE)
                }
            },
            error: (err) => {
                this.changeStatus('sample', SystemStatus.FLATLINE)
            }
        })
    }

    private changeStatus(source:string, status: SystemStatus){
        this.source = source;
        this._monitor.next(status);
    }


}

const hc = new HealthChecker().monitor;
export default hc;

// export default hc;