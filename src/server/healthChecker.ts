import {Observable, Subject} from "rxjs";
import {SystemStatus} from "../constants/SystemStatus";
import sampleHcObservable from "../provider/hc/sample.hc";
import logger from "../utils/logger";

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
                logger.error(`Error for health check!: ${err}`);
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